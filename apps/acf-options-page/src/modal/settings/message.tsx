import { Modal } from 'react-bootstrap';
import { useAppSelector } from '../../hooks';
import { settingsSelector } from '../../store/settings.slice';

export type SettingMessageRef = {
  showMessage: (message: string) => void;
};

const SettingMessage = () => {
  const { message } = useAppSelector(settingsSelector);

  if (!message) {
    return null;
  }

  return (
    <Modal.Footer>
      <span className='text-success'>{message}</span>
    </Modal.Footer>
  );
};

SettingMessage.displayName = 'SettingMessage';
export { SettingMessage };
