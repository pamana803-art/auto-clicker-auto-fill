import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import { useAppDispatch } from '@apps/acf-options-page/src/hooks'

// Create an editable cell renderer
export function EditableCell({ value: initialValue, data, row: { index }, column: { id, required, pattern, validate, dataType, ariaLabel, list } }) {
  // We need to keep and update the state of the cell normally
  // We need to keep and update the state of the cell normally

  const dispatch = useAppDispatch()
  const [value, setValue] = React.useState(initialValue)
  const [invalid, setInvalid] = React.useState(data[index].error === id)
  const input = useRef<HTMLInputElement>(null)
  const onChange = ({ currentTarget: { value: changeValue } }) => {
    input.current?.classList.remove('is-valid')
    setInvalid(false)
    if (changeValue) {
      if (pattern && !pattern.test(changeValue)) {
        setInvalid(true)
      }
      if (validate && !validate(changeValue)) {
        setInvalid(true)
      }
    } else if (required) {
      setInvalid(true)
    }
    setValue(changeValue)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = ({ currentTarget: { value: blurValue } }) => {
    //dispatch(updateAction({name:columnId, value}))
  
    //updateAction(index, id, dataType === 'number' && blurValue.indexOf('e') === -1 ? Number(blurValue) : blurValue)
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <Form.Control ref={input} aria-label={ariaLabel} value={value} name={id} onChange={onChange} onBlur={onBlur} isInvalid={invalid} list={list} autoComplete='off' />
}

EditableCell.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  row: PropTypes.shape({
    index: PropTypes.number.isRequired
  }).isRequired,
  column: PropTypes.shape({
    id: PropTypes.string.isRequired,
    ariaLabel: PropTypes.string,
    required: PropTypes.bool,
    pattern: PropTypes.instanceOf(RegExp),
    validate: PropTypes.func,
    dataType: PropTypes.string,
    list: PropTypes.string
  }).isRequired,
}
