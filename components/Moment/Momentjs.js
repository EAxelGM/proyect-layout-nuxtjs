import moment from 'moment'
moment.locale('es')

export const fechaAmigable = (value) => {
  if (!value){ return '' }
  let newFecha= moment(value).format('MMMM DD [del] YYYY, h:mm:ss a');
  return newFecha;
}

export const fechaComparacion = (value) => {
  if (!value){ return '' }
  let newFecha= moment(value).fromNow();
  return newFecha;
}