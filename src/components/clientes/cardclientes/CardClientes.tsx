import { Link } from 'react-router-dom'
import type Cliente from '../../../models/Cliente'

interface CardClientesProps{
    cliente: Cliente
}

function CardClientes({ cliente }: CardClientesProps) {
    return (
        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
            <header className='py-2 px-6 bg-indigo-800 text-white font-bold text-2xl'>
                Cliente
            </header>
            <div className='flex flex-col p-4 bg-slate-200 h-full gap-2'>
                <p className='text-3xl'>Nome: { cliente.nome }</p>
                <p className='text-3xl'>E-mail: { cliente.email }</p>
            </div>
            
            <div className="flex">
                <Link to={ `/editarcliente/${cliente.id}`} 
                    className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 
                        flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>

                <Link to={ `/deletarcliente/${cliente.id}`} className='text-slate-100 bg-red-400 hover:bg-red-700 w-full 
                    flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>

        </div>
    )
}

export default CardClientes