import { useTimeout } from '@acf-options-page/hooks';
import { setSettingsMessage, settingsGetAPI, settingsSelector, useAppDispatch, useAppSelector } from '@acf-options-page/store';
import { ArrowRepeat, BellFill, CloudArrowUpFill, FileSpreadsheetFill } from '@acf-options-page/utils';
import { useEffect } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet } from 'react-router';

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
    <Container className='mt-3'>
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
                <BellFill className='me-2' />
                {t('modal.settings.notification.title')}
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='retry' className='nav-link'>
                <ArrowRepeat className='me-2' />
                {t('modal.settings.retry.title')}
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='google-backup' className='nav-link'>
                <CloudArrowUpFill className='me-2' />
                Backup
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='google-sheets' className='nav-link'>
                <FileSpreadsheetFill className='me-2' />
                Google Sheets
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <div className='pt-3'>
        {error && <Alert variant='danger'>{error}</Alert>}
        {message && <Alert variant='success'>{message}</Alert>}
        <Outlet />
      </div>
    </Container>
  );
};

export default SettingsLayout;
