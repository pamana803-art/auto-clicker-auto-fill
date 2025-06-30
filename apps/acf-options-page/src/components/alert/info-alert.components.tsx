import { FC } from 'react';

type InfoAlertProps = {
  message?: string;
};

export const InfoAlert: FC<InfoAlertProps> = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className='alert alert-info' role='alert'>
      {message}
    </div>
  );
};
