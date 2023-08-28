/* eslint-disable @typescript-eslint/no-explicit-any */
import { NUMBER_FIELDS, IN_VALID_CLASS } from './validation';

const getFieldNameValue = <T = any>(e, data?): { name: string; value: T } | null => {
  if (e.target.classList.contains(IN_VALID_CLASS)) {
    return null;
  }

  let { value } = e.target;
  const { name, type } = e.target;
  if (type === 'checkbox') {
    value = e.target.checked;
  } else if (NUMBER_FIELDS.includes(name) && value.indexOf('e') === -1) {
    value = Number(value);
  }
  if (data && data[name] === value) {
    return null;
  }

  return { name, value };
};

const updateForm = (formId: string, data: any) => {
  const form = document.querySelector(`#${formId}`) as HTMLFormElement;
  if (form) {
    Array.from(form.elements).forEach((element) => {
      const inputElement = element as HTMLInputElement;
      if (inputElement.type === 'radio') {
        inputElement.checked = data?.[inputElement.name] === inputElement.value;
      } else if (inputElement.type !== 'checkbox') {
        inputElement.value = data?.[inputElement.name] || '';
      }
    });
  }
};

export { updateForm, getFieldNameValue };
