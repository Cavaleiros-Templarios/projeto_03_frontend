import { useContext, useEffect, useState } from "react" // Added useState for local darkMode
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Perfil() {
  const navigate = useNavigate()
  const { usuario } = useContext(AuthContext)

  // Local state to track dark mode, mirroring the global theme
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Effect to listen for changes in localStorage 'theme'
  useEffect(() => {
    const handleStorageChange = () => {
      setDarkMode(localStorage.getItem('theme') === 'dark');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlerta("Você precisa estar logado", "info")
      navigate("/")
    }
  }, [usuario.token, navigate]) // Added navigate to dependency array

  return (
    // Main container uses global background color variable and dark mode text
    // Added pt-16 to push content down for fixed Navbar
    <div className="min-h-screen flex items-center justify-center p-4 pt-16"
         style={{ backgroundColor: "var(--cor-primaria-fundo)", color: "var(--cor-texto-principal)" }}>
      {/* Profile card - uses background card variable and dark mode shadow/border */}
      <div className="relative rounded-2xl shadow-2xl p-10 w-full max-w-md text-center space-y-8 min-h-[500px] flex flex-col justify-center overflow-hidden"
           style={{ backgroundColor: "var(--cor-fundo-card)", boxShadow: "0 25px 50px -12px var(--cor-sombra)" }}>

        {/* Imagem ou ícone de perfil */}
        <div className="flex justify-center">
          {usuario.foto ? (
            <img
              // It seems you're using a static image path here.
              // If usuario.foto actually contains the user's photo URL, use it directly.
              // For now, I'll keep your static image from the original code.
              src="https://ik.imagekit.io/dmzx7is6a/Kavio/image.png?updatedAt=1752247517326"
              alt={`Foto de perfil de ${usuario.nome}`}
              className="w-28 h-28 rounded-full border-4 shadow-md"
              style={{ borderColor: "var(--cor-texto-claro)" }} // Border color adapts to theme
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-4xl shadow-md"
                 style={{ color: "var(--cor-texto-secundario)" }}>
              👤
            </div>
          )}
        </div>

        {/* Nome */}
        <h2 className="text-2xl font-semibold drop-shadow"
            style={{ color: "var(--cor-texto-principal)" }}>
          {usuario.nome}
        </h2>

        {/* Contato */}
        <div className="text-left px-6">
          <label className="block text-sm font-medium mb-1"
                 style={{ color: "var(--cor-texto-secundario)" }}> {/* Label adapts */}
            Contato:
          </label>
          <div className="p-2 rounded-md shadow-inner"
               style={{ backgroundColor: darkMode ? "var(--cor-fundo-claro)" : "rgba(255,255,255,0.9)", // Adjusted to use cor-fundo-claro for dark mode and a subtle white for light
                        color: "var(--cor-texto-principal)" }}> {/* Text color adapts */}
            {usuario.usuario}
          </div>
        </div>

        {/* Risco azul claro no canto inferior direito */}
        <div
          className="absolute bottom-0 right-0 w-[150px] h-[150px]"
          style={{
            backgroundColor: "var(--cor-secundaria)", // Using secondary color for the accent
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            opacity: 0.85,
          }}
        ></div>
      </div>
    </div>
  )
}

export default Perfil