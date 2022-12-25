

export async function obtenerClientes() {
  const response = await fetch(import.meta.env.VITE_API_URL)
  const result = await response.json()
  return result
}



export async function obtenerCliente(id) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`)
  const result = await response.json()
  return result
}
export async function agregarCliente(datos) {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify(datos),
    });

    await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function actualizarCliente(id, datos) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify(datos),
    });

    await response.json();

  } catch (error) {
    console.log(error);
  }
}



export async function borrarCliente(id) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: 'DELETE'
    });

    await response.json();

  } catch (error) {
    console.log(error);
  }
}