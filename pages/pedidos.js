import React from 'react'
import Layout from '../components/Layout';
import Link from 'next/link';

const Pedidos = () => {
    return ( 
        <Layout>
            <h1 className="text-3xl text-gray-800 font-light">Pedidos</h1>

            <Link
                href="/nuevopedido"
            >
            <a className="bg-blue-800 px-5 py-2 my-3 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase font-bold">Nuevo Pedido</a>
            </Link>
        </Layout>
     );
}
 
export default Pedidos;