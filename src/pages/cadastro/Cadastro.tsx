import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import './Cadastro.css';
import type Usuario from '../../models/Usuario';
import { useNavigate } from 'react-router-dom';
import { cadastrarUsuario } from '../../services/Service';
import { RotatingLines } from 'react-loader-spinner';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { Eye, EyeOff } from 'lucide-react';

function Cadastro() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmaSenha, setConfirmaSenha] = useState<string>('');
  const [mostrarSenha, setMostrarSenha] = useState<boolean>(false);
  const [mostrarConfirmaSenha, setMostrarConfirmaSenha] = useState<boolean>(false);

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  });

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);

  function retornar() {
    navigate('/login');
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {
      try {
        const { id, ...usuarioSemId } = usuario;
        await cadastrarUsuario('/usuarios/cadastrar', usuarioSemId, setUsuario);
        ToastAlerta('Usuário cadastrado com sucesso!', 'sucesso');
      } catch (error: any) {
        ToastAlerta('Erro ao cadastrar o usuário. Tente novamente.', 'erro');
      }
    } else {
      ToastAlerta('Dados do usuário inconsistentes! Verifique as informações do cadastro.', 'erro');
      setUsuario({ ...usuario, senha: '' });
      setConfirmaSenha('');
    }

    setIsLoading(false);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen bg-gray-900 text-white font-sans">

      {/* VÍDEO À ESQUERDA */}
      <div className="hidden lg:block w-full h-full relative overflow-hidden">
        <video
          src="https://ik.imagekit.io/dmzx7is6a/Kavio/3fd0dbda5742494a99cad19be4ed898b.mp4?updatedAt=1753154863307"
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-40" />
        <div className="absolute bottom-10 left-10 text-white text-3xl font-bold tracking-wide drop-shadow-lg">
          Bem-vindo à Kavio
        </div>
      </div>

      {/* FORMULÁRIO À DIREITA */}
      <div className="flex items-center justify-center h-full p-6 bg-gradient-to-br from-gray-800 to-gray-900">
        <form
          onSubmit={cadastrarNovoUsuario}
          className="w-full max-w-md backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 space-y-5"
        >
          <h2 className="text-3xl font-semibold text-center mb-4 text-white">
            Crie sua Conta
          </h2>

          <div className="flex flex-col">
            <label htmlFor="nome" className="text-sm text-gray-300">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={usuario.nome}
              onChange={atualizarEstado}
              required
              placeholder="Seu nome completo"
              className="px-4 py-2 rounded-md bg-white/20 border border-white/30 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="usuario" className="text-sm text-gray-300">E-mail</label>
            <input
              type="email"
              id="usuario"
              name="usuario"
              value={usuario.usuario}
              onChange={atualizarEstado}
              required
              placeholder="seu@email.com"
              className="px-4 py-2 rounded-md bg-white/20 border border-white/30 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="foto" className="text-sm text-gray-300">Foto (URL)</label>
            <input
              type="text"
              id="foto"
              name="foto"
              value={usuario.foto}
              onChange={atualizarEstado}
              placeholder="Link da sua foto"
              className="px-4 py-2 rounded-md bg-white/20 border border-white/30 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Campo de Senha com botão de olho */}
          <div className="flex flex-col relative">
            <label htmlFor="senha" className="text-sm text-gray-300">Senha</label>
            <input
              type={mostrarSenha ? 'text' : 'password'}
              id="senha"
              name="senha"
              value={usuario.senha}
              onChange={atualizarEstado}
              required
              placeholder="Mínimo 8 caracteres"
              className="px-4 py-2 pr-10 rounded-md bg-white/20 border border-white/30 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute right-3 top-[65%] -translate-y-1/2 text-white"
              tabIndex={-1}
            >
              {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Campo de Confirmar Senha com botão de olho */}
          <div className="flex flex-col relative">
            <label htmlFor="confirmarSenha" className="text-sm text-gray-300">Confirmar Senha</label>
            <input
              type={mostrarConfirmaSenha ? 'text' : 'password'}
              id="confirmarSenha"
              name="confirmarSenha"
              value={confirmaSenha}
              onChange={handleConfirmarSenha}
              required
              placeholder="Confirme a senha"
              className="px-4 py-2 pr-10 rounded-md bg-white/20 border border-white/30 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setMostrarConfirmaSenha(!mostrarConfirmaSenha)}
              className="absolute right-3 top-[65%] -translate-y-1/2 text-white"
              tabIndex={-1}
            >
              {mostrarConfirmaSenha ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex justify-between gap-2 pt-2">
            <button
              type="reset"
              onClick={retornar}
              className="w-full py-2 rounded-md bg-gray-500 hover:bg-gray-600 text-white font-medium transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold flex justify-center items-center transition"
            >
              {isLoading ? (
                <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="20" visible={true} />
              ) : (
                'Cadastrar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;