import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import type UsuarioLogin from '../../models/UsuarioLogin';
import { AuthContext } from '../../contexts/AuthContext';
import { RotatingLines } from 'react-loader-spinner';
import { Eye, EyeOff } from 'lucide-react';

function Login() {
  const navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);
  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  const [mostrarSenha, setMostrarSenha] = useState<boolean>(false);

  useEffect(() => {
    if (usuario.token !== '') {
      navigate('/home');
    }
  }, [usuario]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen bg-gray-900 text-white font-sans relative">

      <button
        onClick={() => navigate('/')}
        className="fixed top-10 right-205 z-50 flex items-center gap-2 bg-gray-200 text-black border border-white/30 hover:scale-110 px-5 py-2 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 group"
      >
        <span className="transform transition-transform duration-300 group-hover:-translate-x-0.5">
          ←
        </span>
        Início
      </button>

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
      </div>

      {/* FORMULÁRIO À DIREITA */}
      <div className="flex items-center justify-center h-full p-6 bg-gradient-to-br from-gray-800 to-gray-900">
        <form
          onSubmit={login}
          className="w-full max-w-md backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 space-y-5"
        >
          <h2 className="text-3xl font-semibold text-center mb-4 text-white">
            Acesse sua Conta
          </h2>

          <div className="flex flex-col">
            <label htmlFor="usuario" className="text-sm text-gray-300">E-mail</label>
            <input
              type="email"
              id="usuario"
              name="usuario"
              value={usuarioLogin.usuario}
              onChange={atualizarEstado}
              required
              placeholder="seu@email.com"
              className="px-4 py-2 rounded-md bg-white/20 border border-white/30 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col relative">
            <label htmlFor="senha" className="text-sm text-gray-300">Senha</label>
            <input
              type={mostrarSenha ? 'text' : 'password'}
              id="senha"
              name="senha"
              value={usuarioLogin.senha}
              onChange={atualizarEstado}
              required
              placeholder="Digite sua senha"
              className="px-4 py-2 pr-10 rounded-md bg-white/20 border border-white/30 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute right-3 top-2.5 h-full flex items-center justify-center text-white"
              tabIndex={-1}
            >
              {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type='submit'
            className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold flex justify-center items-center transition"
            disabled={isLoading}
          >
            {isLoading ? (
              <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="20" visible={true} />
            ) : (
              'Entrar'
            )}
          </button>

          <div className="text-center">
            <p className="text-gray-300 text-sm">
              Ainda não tem uma conta?{' '}
              <Link
                to="/cadastro"
                className="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:underline"
              >
                Cadastre-se gratuitamente
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
