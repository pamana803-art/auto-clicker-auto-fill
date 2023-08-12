import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { StorageService } from '@dhruv-techapps/core-service';
import { LOCAL_STORAGE_KEY, Settings, defaultSettings } from '@dhruv-techapps/acf-common';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getElementProps } from '../util/element';
import { SettingNotifications } from './settings/notifications';
import { SettingRetry } from './settings/retry';
import { dataLayerInput, dataLayerModel } from '../util/data-layer';
import { SettingMessage, SettingMessageRef } from './settings/message';
import { ArrowRepeat, BellFill, ChevronLeft, ChevronRight, CloudArrowUpFill } from '../util';
import { SettingsBackup } from './settings/backup';
import { SettingGoogleSheets } from './settings/google-sheets';
import { ErrorAlert, Loading } from '../components';
import { ConfirmModalRef } from './confirm.modal';
import { useAppDispatch, useAppSelector } from '../hooks';
import { modeSelector, switchMode } from '../store/mode.slice';

enum SETTINGS_PAGE  {
  NOTIFICATION,
  RETRY,
  BACKUP,
};

type SettingsModalProps = {
  confirmRef: React.RefObject<ConfirmModalRef>;
};
export type SettingsModalRef = {
  showSettings: () => void
};
const SettingsModal = forwardRef<SettingsModalRef, SettingsModalProps>(({ confirmRef }, ref) => {
  const { t } = useTranslation();

  const [show, setShow] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [page, setPage] = useState<SETTINGS_PAGE>();
  const messageRef = useRef<SettingMessageRef>(null);
  
  const mode = useAppSelector(modeSelector)
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dataLayerModel(LOCAL_STORAGE_KEY.SETTINGS, 'close');
    setShow(false);
  };

  useImperativeHandle(ref, () => ({
    showSettings() {
      setShow(true);
    },
  }));

  useEffect(() => {
    if (chrome.runtime) {
      StorageService.get<Settings>(window.EXTENSION_ID, LOCAL_STORAGE_KEY.SETTINGS)
        .then((settings) => {
          setSettings(settings || defaultSettings);
        })
        .catch(setError)
        .finally(() => setLoading(false));
    }
  }, []);

  const save = (data: Settings) => {
    StorageService.set(window.EXTENSION_ID, { [LOCAL_STORAGE_KEY.SETTINGS]: data })
      .then(() => {
        messageRef.current?.showMessage(t('modal.settings.saveMessage'));
      })
      .catch(setError);
  };

  const onUpdate = (e) => {
    const update = getElementProps(e);
    if (update) {
      dataLayerInput(update, LOCAL_STORAGE_KEY.SETTINGS);
      setSettings((_settings) => ({ ..._settings, ...update }));
    }
  };

  useEffect(() => {
    if (!loading) {
      save(settings);
    }
  }, [settings]);

  const toggleMode = () => {
    dispatch(switchMode())
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" onShow={() => dataLayerModel(LOCAL_STORAGE_KEY.SETTINGS, 'open')}>
      <Form>
        <Modal.Header closeButton>
          <Modal.Title as="h6">
            {page && (
              <Button onClick={() => setPage(undefined)} className="btn btn-link me-2 p-0 d-inline-flex align-items-center">
                <ChevronLeft width="24" height="24" />
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
                <ol className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <Form.Label className="ms-2 me-auto" htmlFor="settings-checkiFrames">
                      <div className="fw-bold">{t('modal.settings.checkIFrames')}</div>
                      {t('modal.settings.checkIFramesHint')}
                    </Form.Label>
                    <Form.Check type="switch" name="checkiFrames" onChange={onUpdate} id="settings-checkiFrames" checked={settings.checkiFrames} />
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <Form.Label className="ms-2 me-auto" htmlFor="advance">
                      <div className="fw-bold">{t('modal.settings.advance')}</div>
                      {t('modal.settings.advanceHint')}
                    </Form.Label>
                    <Form.Check type="switch" checked={mode === 'pro'} onChange={toggleMode} id="advance" />
                  </li>
                  <li className="list-group-item">
                    <Button onClick={() => setPage(SETTINGS_PAGE.NOTIFICATION)} className="btn btn-link text-muted d-flex justify-content-between w-100">
                      <div className="fw-bold">
                        <BellFill width="24" height="24" className="me-2" />
                        {t('modal.settings.notification.title')}
                      </div>
                      <ChevronRight width="24" height="24" />
                    </Button>
                  </li>
                  <li className="list-group-item">
                    <Button onClick={() => setPage(SETTINGS_PAGE.RETRY)} className="btn btn-link text-muted d-flex justify-content-between w-100">
                      <div className="fw-bold">
                        <ArrowRepeat width="24" height="24" className="me-2" />
                        {t('modal.settings.retry.title')}
                      </div>
                      <ChevronRight width="24" height="24" />
                    </Button>
                  </li>
                  <li className="list-group-item">
                    <Button onClick={() => setPage(SETTINGS_PAGE.BACKUP)} className="btn btn-link text-muted d-flex justify-content-between w-100">
                      <div className="fw-bold">
                        <CloudArrowUpFill width="24" height="24" className="me-2" /> Backup
                      </div>
                      <ChevronRight width="24" height="24" />
                    </Button>
                  </li>
                  <li className="list-group-item">
                    <SettingGoogleSheets />
                  </li>
                </ol>
              )}
              {page === SETTINGS_PAGE.NOTIFICATION && <SettingNotifications notifications={settings.notifications || {}} setSettings={setSettings} />}
              {page === SETTINGS_PAGE.RETRY && <SettingRetry settings={settings} onUpdate={onUpdate} />}
              {page === SETTINGS_PAGE.BACKUP && <SettingsBackup settings={settings} setSettings={setSettings} confirmRef={confirmRef} />}
            </>
          )}
        </Modal.Body>
        <SettingMessage ref={messageRef} />
      </Form>
    </Modal>
  );
});
SettingsModal.defaultProps = {};

SettingsModal.propTypes = {
  // confirmRef: PropTypes.shape({ current: PropTypes.shape({ confirm: PropTypes.func.isRequired }) }).isRequired,
};

SettingsModal.displayName = 'SettingsModal';
export {  SettingsModal };
