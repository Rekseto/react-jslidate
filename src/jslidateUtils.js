export function validate(values, validators) {
  const errors = [];
  let valid = true;
  for (const field in values) {
    const fieldErrors = {field: field, errors: []};
    for (let validate of validators) {
      const result = validate(values[field]);

      if (result.error) {
        fieldErrors.errors.push(result.error);

        valid = false;
      }
    }
    errors.push(fieldErrors);
  }

  return {valid, errors};
}

export function splitIntoSpans(errors, spanClassName) {
  let result = "";
  for (let error of errors) {
    result += `<span class=${spanClassName}>${error}</span>`;
  }
  return result;
}
