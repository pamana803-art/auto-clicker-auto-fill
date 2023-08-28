import { Modal } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSettingsMessage, settingsSelector } from '../../store/settings/settings.slice';
import { useTimeout } from '../../_hooks/message.hooks';

export type SettingMessageRef = {
  showMessage: (message: string) => void;
};

const SettingMessage = () => {
  const { message } = useAppSelector(settingsSelector);
  const dispatch = useAppDispatch();

  useTimeout(() => {
    dispatch(setSettingsMessage());
  }, message);

  if (!message) {
    return null;
  }

  return (
    <Modal.Footer data-testid='settings-message'>
      <span className='text-success'>{message}</span>
    </Modal.Footer>
  );
};

SettingMessage.displayName = 'SettingMessage';
export { SettingMessage };
