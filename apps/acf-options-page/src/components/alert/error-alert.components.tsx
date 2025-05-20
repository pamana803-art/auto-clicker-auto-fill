import { FC } from 'react';
import { Alert } from 'react-bootstrap';

type ErrorAlertProps = {
  heading?: string;
  error?: string;
};

export const ErrorAlert: FC<ErrorAlertProps> = ({ heading = 'Error', error }) => {
  if (!error) {
    return null;
  }

  return (
    <Alert variant='danger'>
      <p className='m-0'>
        <strong className='me-2'>{heading}</strong>
        {error}
      </p>
    </Alert>
  );
};
