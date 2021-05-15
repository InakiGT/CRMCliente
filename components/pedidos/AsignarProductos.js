import React, {useEffect, useState, useContext} from 'react';
import Select from 'react-select';
import {gql, useQuery} from '@apollo/client';
import PedidoContext from '../../context/pedidos/PedidoContext';

const OBTENER_PRODUCTOS = gql`
    query obtenerProductos {
        obtenerProductos {
            id
            nombre
            precio
            existencia
        }
    }
`;

const AsignarProductos = () => {
    //Context de Pedidos
    const pedidoContext = useContext(PedidoContext);
    const {agregarProducto} = pedidoContext;
    
    //State del componente
    const [productos, setProdcutos] = useState([]); 

    //Consulta a la BD
    const {data, loading, error} = useQuery(OBTENER_PRODUCTOS);

    useEffect( () => {
        //Función para pasar al state global
        agregarProducto(productos);
    }, [productos]);

    if(loading) return 'Cargando...';

    const {obtenerProductos} = data;

    const seleccionarProducto = producto => {
        setProdcutos(producto);
    }

    return ( 
        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 p-2 text-gray-700 text-sm font-bold">2.- Selecciona o Busca los Productos</p>
            <Select
                className="mt-3"
                options={obtenerProductos}
                onChange={opcion => seleccionarProducto(opcion)}
                getOptionLabel={opciones => `${opciones.nombre} - ${opciones.existencia} Disponibles`}
                getOptionValue={opciones => opciones.id}
                placeholder="Busque o Seleccione un Producto"
                isMulti={true}
                noOptionsMessage={() => "No hay resultados relacionados"}
            />
        </>
    );
}
 
export default AsignarProductos;