const composeValidators = (...validatros) => value => 
  validatros.reduce((error, validate) => error || validate(value), null)

export default composeValidators