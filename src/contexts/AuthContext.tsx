import { createContext, useState, type ReactNode } from "react"
import { login } from "../services/Service"
import type UsuarioLogin from "../models/UsuarioLogin"
import { ToastAlerta } from "../utils/ToastAlerta"

interface AuthContextProps{
    usuario: UsuarioLogin 
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps{
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps){

    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: ''
    })

    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true)

        try {
            await login("/usuarios/logar", usuarioLogin, setUsuario)
            ToastAlerta("O Usuário foi autenticado com sucesso", "sucesso")

        } catch (error) {
            ToastAlerta("Os dados do Usuário estão incorretos!", "erro")
            console.error(error)
        }

        setIsLoading(false)
    }

    function handleLogout(){
        setUsuario({
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: '',
            token: ''
        })
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}