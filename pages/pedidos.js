import React from 'react'
import Layout from '../components/Layout';
import Link from 'next/link';
import {useQuery, gql} from '@apollo/client';

import Pedido from '../components/Pedido';


const OBTENER_PEDIDOS = gql`
    query obtenerPedidosVendedor {
        obtenerPedidosVendedor {
            id
            pedido {
                id
                cantidad
            }
            cliente
            vendedor
            total
            estado
        }
    }
`;

const Pedidos = () => {

    const {data, loading, error} = useQuery(OBTENER_PEDIDOS);

    if(loading) return 'Cargando...';

    const {obtenerPedidosVendedor} = data;

    return ( 
        <Layout>
            <h1 className="text-3xl text-gray-800 font-light">Pedidos</h1>

            <Link
                href="/nuevopedido"
            >
            <a className="bg-blue-800 px-5 py-2 my-3 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase font-bold">Nuevo Pedido</a>
            </Link>

            {obtenerPedidosVendedor.length === 0 ? (
                <p className="mt-5 text-center text-2xl">No hay pedidos aún</p>
            ) : (
                obtenerPedidosVendedor.map(pedido => (
                    <Pedido
                        key={pedido.id}
                        pedido={pedido}
                    />
                ))
            )}
        </Layout>
     );
}
 
export default Pedidos;