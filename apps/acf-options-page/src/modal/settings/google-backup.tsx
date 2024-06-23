import { AUTO_BACKUP } from '@dhruv-techapps/google-drive';
import { GOOGLE_SCOPES } from '@dhruv-techapps/google-oauth';
import { useEffect } from 'react';
import { Accordion, Button, Card, Image, ListGroup, NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useConfirmationModalContext } from '../../_providers/confirm.provider';
import GoogleSignInDark from '../../assets/btn_google_signin_dark_normal_web.png';
import GoogleSignInLight from '../../assets/btn_google_signin_light_normal_web.png';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { ErrorAlert } from '../../components';
import { firebaseSelector, switchFirebaseLoginModal } from '../../store/firebase';
import { googleDriveSelector, googleHasAccessAPI, googleLoginAPI, googleSelector } from '../../store/google';
import { googleDriveAutoBackupAPI, googleDriveBackupAPI, googleDriveDeleteAPI, googleDriveListWithContentAPI, googleDriveRestoreAPI } from '../../store/google/google-drive/google-drive.api';
import { settingsSelector } from '../../store/settings/settings.slice';
import { themeSelector } from '../../store/theme.slice';
import { CloudArrowDownFill, CloudArrowUpFill, Trash } from '../../util';

export function SettingsGoogleBackup() {
  const { t } = useTranslation();
  const theme = useAppSelector(themeSelector);
  const modalContext = useConfirmationModalContext();
  const {
    settings: { backup },
  } = useAppSelector(settingsSelector);
  const { user } = useAppSelector(firebaseSelector);
  const { grantedScopes } = useAppSelector(googleSelector);
  const { files, loading, filesLoading, error } = useAppSelector(googleDriveSelector);

  const scope = GOOGLE_SCOPES.DRIVE;
  const dispatch = useAppDispatch();

  const connect = async () => {
    dispatch(googleLoginAPI([scope]));
  };

  useEffect(() => {
    if (user) {
      if (grantedScopes.includes(scope)) {
        dispatch(googleDriveListWithContentAPI());
      } else {
        dispatch(googleHasAccessAPI([scope]));
      }
    }
  }, [user, grantedScopes, scope, dispatch]);

  const onBackup = async (autoBackup?: AUTO_BACKUP) => {
    if (autoBackup) {
      dispatch(googleDriveAutoBackupAPI(autoBackup));
    } else {
      dispatch(googleDriveBackupAPI());
    }
  };

  const restore = async (id: string, name: string) => {
    const result = await modalContext.showConfirmation({
      title: t('confirm.backup.restore.title'),
      message: t('confirm.backup.restore.message'),
      headerClass: 'text-danger',
    });
    result && dispatch(googleDriveRestoreAPI({ id, name }));
  };

  const deleteFile = async (id: string, name: string) => {
    dispatch(googleDriveDeleteAPI({ id, name }));
  };

  if (!user) {
    return (
      <p>
        Please
        <Button variant='link' title='login' onClick={() => dispatch(switchFirebaseLoginModal())}>
          Login
        </Button>
        to your account before connecting with Google Drive.
      </p>
    );
  }

  if (!grantedScopes?.includes(scope)) {
    return (
      <div className='d-flex flex-column align-items-start'>
        <b className='mx-3 text-muted'>Connect with Google Drive</b>
        <Button variant='link' onClick={connect} data-testid='google-backup-connect'>
          <img src={theme === 'light' ? GoogleSignInLight : GoogleSignInDark} alt='Logo' />
        </Button>
      </div>
    );
  }

  return (
    <>
      <div>
        {error && <ErrorAlert error={error} />}
        {loading && (
          <span className='me-2'>
            <span className='spinner-border spinner-border-sm' aria-hidden='true'></span>
            <span className='visually-hidden' role='status'>
              Loading...
            </span>
          </span>
        )}
        <b className='text-muted d-block mb-2'>Google Drive {t('modal.settings.backup.title')}</b>

        {user.photoURL && user.displayName && (
          <Image alt={user.displayName} className='me-2' title={user.displayName} src={user.photoURL} roundedCircle width='30' height='30' referrerPolicy='no-referrer' />
        )}
        {user.displayName}
      </div>
      <hr />
      <ol className='list-group'>
        <ListGroup.Item as='li'>
          <NavDropdown.Item href='#backup-now' disabled={loading} title={t('modal.settings.backup.now')} onClick={() => onBackup()}>
            <CloudArrowUpFill className='me-2' />
            {t('modal.settings.backup.now')}
          </NavDropdown.Item>
        </ListGroup.Item>
      </ol>
      <h6 className='mt-4'>{t('modal.settings.backup.auto-backup')}</h6>
      <ol className='list-group'>
        <ListGroup.Item as='li' active={backup?.autoBackup === AUTO_BACKUP.DAILY}>
          <NavDropdown.Item href='#backup-daily' title={t('modal.settings.backup.daily')} onClick={() => onBackup(AUTO_BACKUP.DAILY)}>
            {t('modal.settings.backup.daily')}
          </NavDropdown.Item>
        </ListGroup.Item>
        <ListGroup.Item as='li' active={backup?.autoBackup === AUTO_BACKUP.WEEKLY}>
          <NavDropdown.Item href='#backup-weekly' title={t('modal.settings.backup.weekly')} onClick={() => onBackup(AUTO_BACKUP.WEEKLY)}>
            {t('modal.settings.backup.weekly')}
          </NavDropdown.Item>
        </ListGroup.Item>
        <ListGroup.Item as='li' active={backup?.autoBackup === AUTO_BACKUP.MONTHLY}>
          <NavDropdown.Item href='#backup-monthly' title={t('modal.settings.backup.monthly')} onClick={() => onBackup(AUTO_BACKUP.MONTHLY)}>
            {t('modal.settings.backup.monthly')}
          </NavDropdown.Item>
        </ListGroup.Item>
        <ListGroup.Item as='li' active={!backup?.autoBackup || backup?.autoBackup === AUTO_BACKUP.OFF}>
          <NavDropdown.Item href='#backup-off' title={t('modal.settings.backup.off')} onClick={() => onBackup(AUTO_BACKUP.OFF)}>
            {t('modal.settings.backup.off')}
          </NavDropdown.Item>
        </ListGroup.Item>
      </ol>
      <hr />
      <h6 className='mt-4'>{t('modal.settings.backup.restore')}</h6>
      {filesLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {files?.length !== 0 ? (
            <Accordion defaultActiveKey='0'>
              {files?.map((file) => (
                <Accordion.Item eventKey={file.id} key={file.id}>
                  <Accordion.Header>
                    {file.name} <small className='ms-2'>{new Date(file.modifiedTime).toLocaleString()}</small>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Button onClick={() => restore(file.id, file.name)} variant='link' type='button' size='sm' className='text-danger'>
                      <CloudArrowDownFill className='me-2' />
                      Restore
                    </Button>
                    <Button onClick={() => deleteFile(file.id, file.name)} variant='link' type='button' size='sm' className='text-danger'>
                      <Trash className='me-2' />
                      Delete
                    </Button>
                    <Card>
                      <pre>{JSON.stringify(file.content, null, 2)}</pre>
                    </Card>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          ) : (
            <div> No Backup found</div>
          )}
        </div>
      )}
    </>
  );
}
