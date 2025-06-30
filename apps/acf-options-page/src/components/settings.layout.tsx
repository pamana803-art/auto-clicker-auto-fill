import { useTimeout } from '@acf-options-page/hooks';
import { setSettingsMessage, settingsGetAPI, settingsSelector, useAppDispatch, useAppSelector } from '@acf-options-page/store';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet } from 'react-router';
import { ErrorAlert, SuccessAlert } from './alert';

const SettingsLayout = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { error, message } = useAppSelector(settingsSelector);

  useTimeout(() => {
    dispatch(setSettingsMessage());
  }, message);

  useEffect(() => {
    if (window.chrome?.runtime) {
      dispatch(settingsGetAPI());
    }
  }, [dispatch]);

  return (
    <div className='container mt-3'>
      <nav className='navbar navbar-expand-lg bg-body-tertiary rounded'>
        <div className='container-fluid'>
          <ul className='nav nav-pills'>
            <li className='nav-item'>
              <NavLink to='' className='nav-link' end>
                Common
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='notifications' className='nav-link'>
                <i className='bi bi-bell-fill me-2'></i>
                {t('modal.settings.notification.title')}
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='retry' className='nav-link'>
                <i className='bi bi-arrow-repeat me-2'></i>
                {t('modal.settings.retry.title')}
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='google-backup' className='nav-link'>
                <i className='bi bi-cloud-arrow-up-fill me-2'></i>Backup
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='google-sheets' className='nav-link'>
                <i className='bi bi-file-spreadsheet-fill me-2'></i>Google Sheets
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <div className='pt-3'>
        <ErrorAlert error={error} />
        <SuccessAlert message={message} />
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsLayout;
