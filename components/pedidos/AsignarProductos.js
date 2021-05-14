import React from 'react';
import Select from 'react-select';
import {gql, useQuery} from '@apollo/client';

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

    //Consulta a la BD
    const {data, loading, error} = useQuery(OBTENER_PRODUCTOS);

    
    const {obtenerProductos} = data;

    return ( 
        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 p-2 text-gray-700 text-sm font-bold">2.- Selecciona o Busca los Productos</p>
            <Select
                className="mt-3"
                options={obtenerProductos}
                onChange={opcion => seleccionarCliente(opcion)}
                getOptionLabel={opciones => `${opciones.nombre} - ${opciones.existencia} Disponibles`}
                getOptionValue={opciones => opciones.id}
                placeholder="Busque o Seleccione un Producto"
                noOptionsMessage={() => "No hay resultados relacionados"}
            />
        </>
    );
}
 
export default AsignarProductos;