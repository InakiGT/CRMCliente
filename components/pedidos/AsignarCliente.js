import React, {useState, useEffect, useContext} from 'react';
import Select from 'react-select';
import {gql, useQuery} from '@apollo/client';
import PedidoContext from '../../context/pedidos/PedidoContext';


const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;

const AsignarCliente = () => {

    const [cliente, setCliente] = useState([]);

    //Context de pedidos
    const pedidoContext = useContext(PedidoContext);
    const {agregarCliente} = pedidoContext;

    const {data, loading, error} = useQuery(OBTENER_CLIENTES_USUARIO);

    if(loading) return 'Cargando...';

    const {obtenerClientesVendedor} = data;

    useEffect(() => {
        agregarCliente(cliente);
    }, [cliente]);

    const seleccionarCliente = client => {
        setCliente(client);
    }

    return (
        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 p-2 text-gray-700 text-sm font-bold">1.- Asigna un Cliente al pedido</p>
            <Select
                className="mt-3"
                options={obtenerClientesVendedor}
                onChange={opcion => seleccionarCliente(opcion)}
                getOptionLabel={opciones => opciones.nombre}
                getOptionValue={opciones => opciones.id}
                placeholder="Busque o Seleccione un Cliente"
                noOptionsMessage={() => "No hay resultados relacionados"}
            />
        </>
     );
}
 
export default AsignarCliente;