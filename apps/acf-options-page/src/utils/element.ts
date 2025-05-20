/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from 'react';
import { IN_VALID_CLASS, NUMBER_FIELDS } from './validation';

type TValue = string | number | boolean;
type TData = { [key: string]: TValue | TData };

const getFieldNameValue = <T extends { [key: string]: any } = TData>(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, data?: T) => {
  if (e.target.classList.contains(IN_VALID_CLASS)) {
    return null;
  }

  let value: TValue = e.target.value;
  const name = e.target.name;
  const { type } = e.target;
  if (e.target instanceof HTMLInputElement && type === 'checkbox') {
    value = e.target.checked;
  } else if (NUMBER_FIELDS.includes(name) && value.indexOf('e') === -1) {
    value = Number(value);
  }
  if (data && data[name] === value) {
    return null;
  }
  return {
    name: name as keyof T,
    value: value as T[keyof T]
  };
};

const updateForm = (formId: string, data: any) => {
  const form = document.querySelector(`#${formId}`) as HTMLFormElement;
  if (form) {
    Array.from(form.elements).forEach((element) => {
      if (element instanceof HTMLInputElement) {
        if (element.type === 'radio') {
          element.checked = data?.[element.name] === element.value;
        } else if (element.type !== 'checkbox') {
          element.value = data?.[element.name] ?? '';
        }
      }
    });
  }
};

export { getFieldNameValue, updateForm };
