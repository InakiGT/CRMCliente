import React, {useState} from 'react';
import Layout from '../components/Layout';
import {gql, useMutation} from '@apollo/client';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useRouter} from 'next/router';

const NUEVO_CLIENTE = gql`
    mutation nuevoCliente($input: ClienteInput) {
        nuevoCliente(input: $input) {
            id
            nombre
            apellido
            empresa
            email
            telefono
        }
    }
`;

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

const NuevoCliente = () => {

    //Router
    const router = useRouter();

    //State del mensaje de error
    const [mensaje, setMensaje] = useState(null);

    //Mutation para crear clientes
    const [nuevoCliente] = useMutation(NUEVO_CLIENTE, {
        update(cache, {data: {nuevoCliente}}) { //Actualiza cuando se ejecuta el mutation
            //Obtener el objeto a actualizar del cache
            const {obtenerClientesVendedor} = cache.readQuery({query: OBTENER_CLIENTES_USUARIO});

            //Reescribir el cache
            cache.writeQuery({
                query: OBTENER_CLIENTES_USUARIO, //Lo que se va a actualizar
                data: {
                    obtenerClientesVendedor : [...obtenerClientesVendedor, nuevoCliente]
                }
            })
        } 
    });

    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            empresa: '',
            email: '',
            telefono: ''
        },
        validationSchema: yup.object({
            nombre: yup.string().required('El nombre no puede ir vacío'),
            apellido: yup.string().required('El apellido no puede ir vacío'),
            empresa: yup.string().required('La empresa no puede ir vacía'),
            email: yup.string().required('El email no puede ir vacío').email('El email no es válido')
        }),
        onSubmit: async valores => {
            const {nombre, apellido, empresa, email, telefono} = valores;
            try {
                const {data} = await nuevoCliente({
                    variables: {
                        input: {
                            nombre,
                            apellido,
                            empresa,
                            email,
                            telefono
                        }
                    }
                });
                
                router.push('/'); //Redireccionar hacía clientes

            } catch (error) {
                setMensaje(error.message.replace('GraphQL error: ', ''));

                setTimeout(() => {
                    setMensaje(null);
                }, 3000)
            }
        }
    });

    const mostrarMensaje = () => {
        return (
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        );
    }

    return ( 
        <Layout>
            <h1 className="text-3xl text-gray-800 font-light">Nuevo Cliente</h1>

            {mensaje && mostrarMensaje()}

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                    Nombre:
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="nombre"
                                    type="text"
                                    placeholder="Nombre Cliente"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.nombre}
                                />
                            </div>

                            {formik.touched.nombre && formik.errors.nombre ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.nombre}</p>
                            </div>
                            ) : null}

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                                    Apellido:
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="apellido"
                                    type="text"
                                    placeholder="Apellido Cliente"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.apellido}
                                />
                            </div>

                            {formik.touched.apellido && formik.errors.apellido ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.apellido}</p>
                            </div>
                            ) : null}

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="empresa">
                                    Empresa:
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="empresa"
                                    type="text"
                                    placeholder="Empresa"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.empresa}
                                />
                            </div>

                            {formik.touched.empresa && formik.errors.empresa ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.empresa}</p>
                            </div>
                            ) : null}

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email:
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="correo@correo.com"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                            </div>

                            {formik.touched.email && formik.errors.email ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.email}</p>
                            </div>
                            ) : null}

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                                    Telefono:
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="telefono"
                                    type="tel"
                                    placeholder="Telefono Cliente"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.telefono}
                                />
                            </div>

                            {formik.touched.telefono && formik.errors.telefono ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.telefono}</p>
                            </div>
                            ) : null}

                            <input 
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                                value="Registrar cliente"
                            />
                    </form>
                </div>
            </div>
        </Layout>
     );
}
 
export default NuevoCliente;