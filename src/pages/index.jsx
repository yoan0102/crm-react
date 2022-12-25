import { useLoaderData } from 'react-router-dom'
import Cliente from '../components/Cliente';
import { obtenerClientes } from '../api/clientes'
export function loader() {
  const clientes = obtenerClientes();
  return clientes
}


export default function Index() {
  const clientes = useLoaderData()


  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
      <p className='mt-3'>Administra tus Clientes</p>

      {clientes.length ? (
        <table className='w-full bg-white shadow mt-5 table-auto'>
          <thead className='bg-blue-800 text-white'>
            <tr>
              <th className="p-2">Cliente</th>
              <th className="p-2">Contacto</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(cliente => (
              <Cliente cliente={cliente} key={cliente.id} />
            ))}
          </tbody>


        </table>

      ) : (
        <p className="text-center mt-10">No hay Clientes aún</p>
      )

      }
    </>
  )
}
