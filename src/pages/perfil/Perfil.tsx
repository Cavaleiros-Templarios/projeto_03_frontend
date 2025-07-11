import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Perfil() {
	const navigate = useNavigate()
	const { usuario } = useContext(AuthContext)

	useEffect(() => {
		if (usuario.token === "") {
			ToastAlerta("Você precisa estar logado", "info")
			navigate("/")
		}
	}, [usuario.token])

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-400 p-4">
			<div className="relative bg-gradient-to-b from-white to-[#82c0fd] rounded-2xl shadow-2xl p-10 w-full max-w-md text-center space-y-8 min-h-[500px] flex flex-col justify-center overflow-hidden">
				
				{/* Imagem ou ícone de perfil */}
				<div className="flex justify-center">
					{usuario.foto ? (
						<img
							src="https://ik.imagekit.io/dmzx7is6a/Kavio/image.png?updatedAt=1752247517326"
							alt={`Foto de perfil de ${usuario.nome}`}
							className="w-28 h-28 rounded-full border-4 border-white shadow-md"
						/>
					) : (
						<div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-4xl shadow-md">
							👤
						</div>
					)}
				</div>

				{/* Nome */}
				<h2 className="text-2xl font-semibold text-gray-800 drop-shadow">
					{usuario.nome}
				</h2>

				{/* Contato */}
				<div className="text-left px-6">
					<label className="block text-sm font-medium text-gray-700 mb-1">Contato:</label>
					<div className="bg-white/90 p-2 rounded-md text-gray-800 shadow-inner">
						{usuario.usuario}
					</div>
				</div>

				
				

				{/* Risco azul claro no canto inferior direito */}
				<div
					className="absolute bottom-0 right-0 w-[150px] h-[150px] bg-[#4a92db]"
					style={{
						clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
						opacity: 0.85,
					}}
				></div>
			</div>
		</div>
	)
}

export default Perfil