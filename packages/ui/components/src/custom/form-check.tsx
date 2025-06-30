type FormCheckProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string | React.ReactNode;
};

export const FormCheck = ({ label, ...props }: FormCheckProps) => {
  return (
    <div className='form-check'>
      <input className='form-check-input' id={props.name} {...props} />
      <label className='form-check-label' htmlFor={props.name}>
        {label}
      </label>
    </div>
  );
};
