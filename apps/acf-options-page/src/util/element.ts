import { NUMBER_FIELDS, IN_VALID_CLASS } from './validation';

const getElementProps = (e) => {
  if (e.target.classList.contains(IN_VALID_CLASS)) {
    return null;
  }
  let { value } = e.target;
  const { name, type } = e.target;
  if (type === 'checkbox') {
    value = e.target.checked;
  } else if (typeof value === 'string' && NUMBER_FIELDS.indexOf(name) !== -1 && value.indexOf('e') === -1) {
    value = Number(value);
  }
  if (/\./.test(name)) {
    return name.split('.').reduceRight((o, i) => (typeof o !== 'string' ? { [i]: o } : { [i]: { [o]: value } }));
  }
  return { [name]: value };
};

const updateForm = (formId: string, data: any) => {
  const form = document.querySelector(`#${formId}`) as HTMLFormElement;
  if (form) {
    Array.from(form.elements).forEach((element) => {
      const inputElement = element as HTMLInputElement;
      if (inputElement.type === 'radio') {
        inputElement.checked = data[inputElement.name] === inputElement.value;
      } else if (inputElement.type !== 'checkbox') {
        inputElement.value = data[inputElement.name] || '';
      }
    });
  }
};

export { getElementProps, updateForm };
