export let listaTrabajadores = null;
export let listaContratacion = null;

//Darle formato a los datos recogidos de la bd, este formato es necesario para poder modificar datos y regresarlos a la bd.

export const formatoListaTrabajadores = (data) => {
  let newData = data.map(function (item) {
    return {
      id: item.id_trabajador,
      nombre: item.nombre,
      apellidos: item.apellidos,
      calificacion: item.calificacion,
      valor_fraccion: item.valor_fraccion,
    };
  });
  listaTrabajadores = newData;
  return newData;
};

export const formatoListaContratacion = (data) => {
  let newData = data.map(function (item) {
    return {
      id: item.id,
      id_cliente: item.id_cliente,
      id_trabajador: item.id_trabajador,
      id_servicio: item.id_servicio,
      descripcion_trabajo: item.descripcion_trabajo,
      calificacion_servicio: item.calificacion_servicio,
    };
  });
  listaContratacion = newData;
  return newData;
};