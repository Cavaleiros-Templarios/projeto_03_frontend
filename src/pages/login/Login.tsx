import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import type UsuarioLogin from '../../models/UsuarioLogin';
import { AuthContext } from '../../contexts/AuthContext';
import { RotatingLines } from 'react-loader-spinner';

function Login() {

    const navigate = useNavigate()

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    )

    const { usuario, handleLogin, isLoading} = useContext(AuthContext)

    useEffect(() => {
        if(usuario.token !== '') {
            navigate("/home")
        }
    })
 
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }
 
    function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)
    }
 
    console.log(JSON.stringify(usuarioLogin))

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <form className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 space-y-6 backdrop-blur-sm" 
                        onSubmit={login}
                        >
                        {/* Logo Section */}
                        <div className="text-center space-y-4">
                            <div className="flex justify-center">
                                <img
                                    src="https://ik.imagekit.io/v5ijt4s2j/projetos/logo_navbar.png?updatedAt=1752232304793"
                                    alt="Logo"
                                    className="h-16 w-auto"
                                />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Bem-vindo de volta</h2>
                                <p className="text-gray-600 text-sm">Entre na sua conta para continuar</p>
                            </div>
                        </div>
                        
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label htmlFor="usuario" className="block text-sm font-semibold text-gray-700">
                                    Usuário
                                </label>
                                <input
                                    type="text"
                                    id="usuario"
                                    name="usuario"
                                    placeholder="Digite seu usuário"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005de3] focus:border-[#005de3] transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-400 text-gray-900"
                                    value={usuarioLogin.usuario}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {atualizarEstado(e)}}
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="senha" className="block text-sm font-semibold text-gray-700">
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    id="senha"
                                    name="senha"
                                    placeholder="Digite sua senha"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005de3] focus:border-[#005de3] transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-400 text-gray-900"
                                    value={usuarioLogin.senha}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {atualizarEstado(e)}}
                                />
                            </div>
                        </div>
                        
                        <button 
                            type='submit' 
                            className="w-full bg-gradient-to-r from-[#005de3] to-[#0066ff] hover:from-[#003d9e] hover:to-[#0052cc] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-lg hover:shadow-[#005de3]/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <RotatingLines
                                      strokeColor="white"
                                      strokeWidth="5"
                                      animationDuration="0.75"
                                      width="20"
                                      visible={true}
                                    />
                                    <span>Entrando...</span>
                                </div>
                            ) : (
                                <span>Entrar na conta</span>
                            )}
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500 font-medium">ou</span>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-gray-600 text-sm">
                                Ainda não tem uma conta?{' '}
                                <Link 
                                    to="/cadastro" 
                                    className="font-semibold text-[#005de3] hover:text-[#003d9e] transition-colors duration-200 hover:underline decoration-2 underline-offset-2"
                                >
                                    Cadastre-se gratuitamente
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
