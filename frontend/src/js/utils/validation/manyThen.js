const manyThen = a => value => value.toString().length >= a ? null : `Must be longer than ${a}`

export default manyThen