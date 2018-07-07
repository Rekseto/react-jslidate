export function validate(value, validators) {
  const errors = validators
    .map( validator => validator(value) )
    .filter( result => result.error )
    .map( result => result.error );
  
  return errors;
}

export function splitIntoSpans(errors, spanClassName) {
  const result = errors
    .map(error => `<span class=${spanClassName}>${error}</span>`)
    .join('');
  
  return result;
}
