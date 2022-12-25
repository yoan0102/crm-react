import { useNavigate, Form, useActionData, redirect } from "react-router-dom"

import Errors from "../components/Errors"
import ClienteForm from "../components/forms/ClienteForm"
import { agregarCliente } from '../api/clientes.js'

export async function action({ request }) {
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

  await agregarCliente(datos)

  return redirect('/')

}

export default function NuevoCliente() {

  const errores = useActionData()
  const navigate = useNavigate()

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Nuevo Cliente</h1>
      <p className='mt-3'>Llena todos los campos para registrar un nuevo cliente</p>

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
          <ClienteForm />
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value={'registrar cliente'}

          />
        </Form>
      </div>
    </>
  )
}
