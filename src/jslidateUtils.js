export function validate(value, validators) {
  const errors = [];
  for (let validate of validators) {
    const result = validate(value);

    if (result.error) {
      errors.push(result.error);
    }
  }
  return errors;
}

export function splitIntoSpans(errors, spanClassName) {
  let result = "";
  for (let error of errors) {
    result += `<span class=${spanClassName}>${error}</span>`;
  }
  return result;
}
