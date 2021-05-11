import React, {useState, useEffect, useContext} from 'react';
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/AsignarCliente';
import PedidoContext from '../context/pedidos/PedidoContext';

//Context de pedidos
import PedidoContext from '../context/pedidos/PedidoContext';

const NuevoPedido = () => {

    //Utilizar context de pedidos
    const pedidoContext = useContext(PedidoContext);
    const {} = pedidoContext;

    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Crear Nuevo Pedido</h1>

            <AsignarCliente />

        </Layout>
     );
}
 
export default NuevoPedido;