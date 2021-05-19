import React, {useReducer} from 'react';
import PedidoContext from './PedidoContext';
import PedidoReducer from './PedidoReducer';

import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS
} from '../../types';

const PedidoState = ({children}) => {
    //State de pedidos
    const initialState = {
        cliente: {},
        productos: [],
        total: 0
    }

    const [ state, dispatch ] = useReducer(PedidoReducer, initialState);

    //Modifica el cliente
    const agregarCliente = cliente => {
        dispatch({
            type: SELECCIONAR_CLIENTE,
            payload: cliente
        })
    }

    //Modifica los productos
    const agregarProducto = producto => {
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: producto
        })
    }

    //Modifica las cantidades de los productos
    const cantidadProductos = nuevoProducto => {
        dispatch({
            type: CANTIDAD_PRODUCTOS,
            payload: nuevoProducto
        });
    }

    return (
        <PedidoContext.Provider
            value={{
                cliente: state.cliente,
                productos: state.productos,
                total: state.total,
                agregarCliente,
                agregarProducto,
                cantidadProductos
            }}
        >
            {children}
        </PedidoContext.Provider>
    )
}

export default PedidoState;