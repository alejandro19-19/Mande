
//------------------------------------------------------------------
//Obtención de los datos del inicio de sesión. -> Necesita controlar la ejecución de estas funciones para poder hacer la autorización.
export let token = null;
export let dataLogin = null;
export let headerToken = null;
export function asignarDataLogin(data) {
  dataLogin = data;
  token = data.token;
  headerToken = {
    headers: {
      Authorization: `Token ${data.token}`,
      "Content-type": "application/json",
    },
  };
}
//------------------------------------------------------------------

//Se le da formato a la información recopilada de la bd.
export let dataMeWithFormat = null;
export let dataMeFull = null;
export function asignarDataMe(data) {
  dataMeWithFormat = {
    id: data.id,
    nombre: data.nombre,
    apellidos: data.apellidos,
    email: data.email,
    numero_celular: data.numero_celular,
    fecha_nacimiento: data.fecha_nacimiento,
    direccion_residencia: data.direccion_residencia,
    direccion_latitud: data.direccion_latitud,
    direccion_longitud: data.direccion_longitud,
    recibo_servicio_publico: data.recibo_servicio_publico
  };
  dataMeFull = data;
}

//-------------------------------------------------------------------