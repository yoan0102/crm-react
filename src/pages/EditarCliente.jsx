import { Form, redirect, useActionData, useLoaderData, useNavigate } from "react-router-dom";
import { actualizarCliente, obtenerCliente } from "../api/clientes";
import Errors from "../components/Errors";
import ClienteForm from "../components/forms/ClienteForm";

export async function loader({ params }) {
  const cliente = await obtenerCliente(params.clienteId)
  if (Object.values(cliente).length === 0) throw new Response('', {
    status: 404,
    statusText: 'No hay Resultados'
  })
  return cliente
}

export async function action({ request, params }) {
  const formData = await request.formData()
  const datos = Object.fromEntries(formData)

  const email = formData.get('email')

  const errors = []
  if (Object.values(datos).includes('')) {
    errors.push('Todos los campos son obligatorios')
  }

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  if (!regex.test(email)) {
    errors.push('El email no es válido')
  }

  if (Object.keys(errors).length) {
    return errors
  }

  await actualizarCliente(params.clienteId, datos)

  return redirect('/')
}



export default function EditarCliente() {
  const navigate = useNavigate()
  const cliente = useLoaderData()
  const errores = useActionData()
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
      <p className='mt-3'>A continuación podras modificar los datos de un cliente</p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase "
          onClick={() => navigate(-1)}
        >Volver</button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">

        {errores?.length && errores.map((error, i) => (
          <Errors key={i}>
            <p>{error}</p>
          </Errors>
        ))}
        <Form
          method="POST"
          noValidate
        >
          <ClienteForm cliente={cliente} />
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value={'actualizar cliente'}

          />
        </Form>
      </div>
    </>
  )
}
