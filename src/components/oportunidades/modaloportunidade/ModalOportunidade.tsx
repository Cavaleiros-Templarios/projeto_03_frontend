import Popup from 'reactjs-popup';


import 'reactjs-popup/dist/index.css';
import './ModalOportunidade.css'
import FormOportunidade from '../formoportunidade/FormOportunidade';

function ModalOportunidade() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='border rounded px-4 py-2 hover:bg-white hover:text-indigo-800'>
                        Nova Oportunidade
                    </button>
                }
                modal
            >
                <FormOportunidade />
            </Popup>
        </>
    );
}

export default ModalOportunidade;