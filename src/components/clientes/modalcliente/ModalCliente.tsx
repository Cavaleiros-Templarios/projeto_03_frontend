import Popup from 'reactjs-popup';
import FormCliente from '../formcliente/FormCliente';

import 'reactjs-popup/dist/index.css';
import './ModalCliente.css'

function ModalCliente() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='border rounded px-4 py-2 hover:bg-white hover:text-indigo-800'>
                        Novo Cliente
                    </button>
                }
                modal
            >
                <FormCliente />
            </Popup>
        </>
    );
}

export default ModalCliente;