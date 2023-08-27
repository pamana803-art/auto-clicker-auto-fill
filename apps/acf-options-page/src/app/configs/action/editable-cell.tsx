import { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { ColumnDef } from '@tanstack/react-table';
import { Action } from '@dhruv-techapps/acf-common';
import { IN_VALID_CLASS } from '@apps/acf-options-page/src/util';

export const defaultColumn: Partial<ColumnDef<Action>> = {
  cell: Cell,
};

function Cell( {  getValue,  row: { index, original },  column: { id, columnDef },  table,}) {
    const { meta } = columnDef;
  const initialValue = getValue();

  const [value, setValue] = useState(initialValue);
  const [isInvalid, setIsInvalid] = useState(original.error?.includes(id))
  const inputRef = useRef<HTMLInputElement>(null);

  const onBlur = () => {
    if (!inputRef.current?.classList.contains(IN_VALID_CLASS)) {
      table.options.meta?.updateData(index, id, value);
    }
  };

  const onChange = ({ currentTarget: { value: changeValue } }) => {
    setIsInvalid(false)
    setValue(changeValue);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Form.Control
      ref={inputRef}
      aria-label={meta?.ariaLabel}
      type={meta?.type}
      value={value || ''}
      name={id}
      onChange={onChange}
      onBlur={onBlur}
      pattern={meta?.pattern}
      required={meta?.required}
      list={meta?.list}
      isInvalid={isInvalid}
      autoComplete='off'
    />
  );
}
