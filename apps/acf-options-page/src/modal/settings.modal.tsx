import { useEffect, useState } from 'react';
import { LOCAL_STORAGE_KEY } from '@dhruv-techapps/acf-common';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getFieldNameValue } from '../util/element';
import { SettingNotifications } from './settings/notifications';
import { SettingRetry } from './settings/retry';
import { dataLayerModel } from '../util/data-layer';
import { SettingMessage } from './settings/message';
import { ArrowRepeat, BellFill, ChevronLeft, ChevronRight, CloudArrowUpFill } from '../util';
import { SettingsBackup } from './settings/backup';
import { SettingGoogleSheets } from './settings/google-sheets';
import { ErrorAlert, Loading } from '../components';
import { useAppDispatch, useAppSelector } from '../hooks';
import { modeSelector, switchMode } from '../store/mode.slice';
import { getSettings, settingsSelector, switchSettings, updateSettings } from '../store/settings/settings.slice';

enum SETTINGS_PAGE {
  NOTIFICATION = 'notification',
  RETRY = 'retry',
  BACKUP = 'backup',
}

export type SettingsModalRef = {
  showSettings: () => void;
};

const SettingsModal = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<SETTINGS_PAGE>();

  const { loading, error, settings, visible } = useAppSelector(settingsSelector);
  const mode = useAppSelector(modeSelector);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(switchSettings());
  };

  useEffect(() => {
    if (chrome.runtime) {
      dispatch(getSettings());
    }
  }, [dispatch]);

  const onUpdate = (e) => {
    dispatch(updateSettings(getFieldNameValue(e)));
  };

  const toggleMode = () => {
    dispatch(switchMode());
  };

  return (
    <Modal show={visible} onHide={handleClose} size='lg' onShow={() => dataLayerModel(LOCAL_STORAGE_KEY.SETTINGS, 'open')}>
      <Form>
        <Modal.Header closeButton>
          <Modal.Title as='h6'>
            {page && (
              <Button onClick={() => setPage(undefined)} className='btn btn-link me-2 p-0 d-inline-flex align-items-center'>
                <ChevronLeft width='24' height='24' />
              </Button>
            )}
            {t('modal.settings.title')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <Loading />
          ) : (
            <>
              <ErrorAlert error={error} />
              {!page && (
                <ol className='list-group'>
                  <li className='list-group-item d-flex justify-content-between align-items-center'>
                    <Form.Label className='ms-2 me-auto' htmlFor='settings-checkiFrames'>
                      <div className='fw-bold'>{t('modal.settings.checkIFrames')}</div>
                      {t('modal.settings.checkIFramesHint')}
                    </Form.Label>
                    <Form.Check type='switch' name='checkiFrames' onChange={onUpdate} id='settings-checkiFrames' checked={settings.checkiFrames} />
                  </li>
                  <li className='list-group-item d-flex justify-content-between align-items-center'>
                    <Form.Label className='ms-2 me-auto' htmlFor='advance'>
                      <div className='fw-bold'>{t('modal.settings.advance')}</div>
                      {t('modal.settings.advanceHint')}
                    </Form.Label>
                    <Form.Check type='switch' checked={mode === 'pro'} onChange={toggleMode} id='advance' />
                  </li>
                  <li className='list-group-item'>
                    <Button onClick={() => setPage(SETTINGS_PAGE.NOTIFICATION)} className='btn btn-link text-muted d-flex justify-content-between w-100'>
                      <div className='fw-bold'>
                        <BellFill width='24' height='24' className='me-2' />
                        {t('modal.settings.notification.title')}
                      </div>
                      <ChevronRight width='24' height='24' />
                    </Button>
                  </li>
                  <li className='list-group-item'>
                    <Button onClick={() => setPage(SETTINGS_PAGE.RETRY)} className='btn btn-link text-muted d-flex justify-content-between w-100'>
                      <div className='fw-bold'>
                        <ArrowRepeat width='24' height='24' className='me-2' />
                        {t('modal.settings.retry.title')}
                      </div>
                      <ChevronRight width='24' height='24' />
                    </Button>
                  </li>
                  <li className='list-group-item'>
                    <Button onClick={() => setPage(SETTINGS_PAGE.BACKUP)} className='btn btn-link text-muted d-flex justify-content-between w-100'>
                      <div className='fw-bold'>
                        <CloudArrowUpFill width='24' height='24' className='me-2' /> Backup
                      </div>
                      <ChevronRight width='24' height='24' />
                    </Button>
                  </li>
                  <li className='list-group-item'>
                    <SettingGoogleSheets />
                  </li>
                </ol>
              )}
              {page === SETTINGS_PAGE.NOTIFICATION && <SettingNotifications />}
              {page === SETTINGS_PAGE.RETRY && <SettingRetry />}
              {page === SETTINGS_PAGE.BACKUP && <SettingsBackup />}
            </>
          )}
        </Modal.Body>
        <SettingMessage />
      </Form>
    </Modal>
  );
};
SettingsModal.defaultProps = {};

SettingsModal.propTypes = {
  // confirmRef: PropTypes.shape({ current: PropTypes.shape({ confirm: PropTypes.func.isRequired }) }).isRequired,
};

SettingsModal.displayName = 'SettingsModal';
export { SettingsModal };
