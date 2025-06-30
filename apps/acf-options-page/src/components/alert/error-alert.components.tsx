import { FC } from 'react';

type ErrorAlertProps = {
  heading?: string;
  error?: string;
};

export const ErrorAlert: FC<ErrorAlertProps> = ({ heading, error }) => {
  if (!error) {
    return null;
  }

  return (
    <div className='alert alert-danger' role='alert'>
      {heading && <strong className='me-2'>{heading}</strong>}
      {error}
    </div>
  );
};
