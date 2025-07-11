import { Link } from 'react-router-dom'
import type Oportunidade from '../../../models/Oportunidade'

interface CardOportunidadesProps{
    oportunidade: Oportunidade
}

function CardOportunidades({ oportunidade }: CardOportunidadesProps) {
    return (
        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
            <header className='py-2 px-6 bg-indigo-800 text-white font-bold text-2xl'>
                Oportunidade
            </header>
            <div className='flex flex-col p-4 bg-slate-200 h-full gap-2'>
                <p className='text-3xl'>Titulo: { oportunidade.titulo }</p>
                <p className='text-3xl'>Status: { oportunidade.status }</p>
                <p className='text-3xl'>Valor: { oportunidade.valor }</p>
                <p className='text-3xl'>Data da Abertura: { oportunidade.data_abertura}</p>
                <p className='text-3xl'>Data do Fechamento: { oportunidade.data_fechamento}</p>
            </div>
            
            <div className="flex">
                <Link to={ `/editaroportunidade/${oportunidade.id}`} 
                    className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 
                        flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>

                <Link to={ `/deletaroportunidade/${oportunidade.id}`} className='text-slate-100 bg-red-400 hover:bg-red-700 w-full 
                    flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>

        </div>
    )
}

export default CardOportunidades