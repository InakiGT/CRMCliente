import React, {useReducer} from 'react';
import PedidoContext from './PedidoContext';

import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS
} from '../../types';

export default (state, action) => {
    switch(action.type) {
        case SELECCIONAR_CLIENTE: 
            return {
                ...state,
                cliente: action.payload
            }
        default:
            return state
    }
}