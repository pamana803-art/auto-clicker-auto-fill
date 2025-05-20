import { FC } from 'react';
import { Alert } from 'react-bootstrap';

type InfoAlertProps = {
  message?: string;
};

export const InfoAlert: FC<InfoAlertProps> = ({ message }) => {
  if (!message) {
    return null;
  }

  return <Alert variant='info'>{message}</Alert>;
};
