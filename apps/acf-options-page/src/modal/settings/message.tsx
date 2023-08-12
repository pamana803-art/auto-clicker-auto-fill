import { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal } from 'react-bootstrap';

export type SettingMessageRef = {
  showMessage: (message: string) => void;
};

const SettingMessage = forwardRef<SettingMessageRef>((_, ref) => {
  const [message, setMessage] = useState<string>();

  useImperativeHandle(ref, () => ({
    showMessage(_message) {
      setMessage(_message);
      setTimeout(setMessage, 1500);
    },
  }));

  if (!message) {
    return null;
  }

  return (
    <Modal.Footer>
      <span className="text-success">{message}</span>
    </Modal.Footer>
  );
});

SettingMessage.displayName = 'SettingMessage';
export { SettingMessage };
