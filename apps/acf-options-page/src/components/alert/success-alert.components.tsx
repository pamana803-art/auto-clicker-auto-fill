import { FC } from 'react';

type SuccessAlertProps = {
  heading?: string;
  message?: string;
};

export const SuccessAlert: FC<SuccessAlertProps> = ({ heading, message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className='alert alert-success' role='alert'>
      {heading && <strong className='me-2'>{heading}</strong>}
      {message}
    </div>
  );
};
