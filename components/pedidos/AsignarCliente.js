import React, {useState, useEffect} from 'react';
import Select from 'react-select';

const clientes = [
    {id: 1, nombre: 'Juan'},
    {id: 2, nombre: 'Iñaki'}
]

const AsignarCliente = () => {

    const [cliente, setCliente] = useState([]);

    useEffect(() => {
        console.log(cliente);
    }, [cliente]);

    const seleccionarCliente = client => {
        setCliente(client);
    }

    return ( 
        <Select 
            options={clientes}
            isMulti={true}
            onChange={opcion => seleccionarCliente(opcion)}
            getOptionLabel={opciones => opciones.nombre}
            getOptionValue={opciones => opciones.id}
            placeholder="Busque o Seleccione un Cliente"
            noOptionsMessage={() => "No hay resultados relacionados"}
        />
     );
}
 
export default AsignarCliente;