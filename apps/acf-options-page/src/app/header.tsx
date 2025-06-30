import { ThemeNavDropdown } from '@dhruv-techapps/ui-components';
import * as Sentry from '@sentry/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import { firebaseSelector } from '../store/firebase';
import { useAppSelector } from '../store/hooks';
import { APP_LANGUAGES, APP_LINK } from '../utils/constants';
import { HeaderGoogle } from './header_google';

function Header() {
  const { role } = useAppSelector(firebaseSelector);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (/(DEV|BETA|LOCAL)/.test(import.meta.env.VITE_PUBLIC_VARIANT ?? '')) {
      window.document.title = `${t('common.appName')} [${import.meta.env.VITE_PUBLIC_VARIANT}]`;
    } else {
      window.document.title = t('common.appName');
    }
  }, [t]);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
    localStorage.setItem('language', lng);
    Sentry.setTag('page_locale', lng);
  };

  let appName = t('common.appName');

  if (/(DEV|BETA)/.test(import.meta.env.VITE_PUBLIC_VARIANT || '')) {
    appName += ` [${import.meta.env.VITE_PUBLIC_VARIANT}]`;
  }

  return (
    <header className='bd-navbar navbar navbar-expand-lg navbar-light sticky-top'>
      <nav className='bd-gutter flex-wrap flex-lg-nowrap container-fluid'>
        <div className='d-lg-none' style={{ width: '4.25rem' }}></div>
        <NavLink to='/' className='p-0 me-0 me-lg-2 navbar-brand'>
          {appName}
          {role && <span className='badge text-bg-danger ms-2'>{role.toUpperCase()}</span>}
        </NavLink>
        <div className='d-flex'>
          <button aria-controls='basic-navbar-nav' type='button' aria-label='Toggle navigation' className='navbar-toggler collapsed' data-bs-toggle='offcanvas' data-bs-target='#header-navbar'>
            <i className='bi bi-three-dots'></i>
          </button>
        </div>
        <div className='offcanvas-lg offcanvas-end flex-grow-1' id='header-navbar'>
          <div className='offcanvas-header px-4 pb-0'>
            <h5 className='offcanvas-title text-white'>{appName}</h5>
            <button type='button' className='btn-close' data-bs-dismiss='offcanvas' aria-label='Close' data-bs-target='#header-navbar'></button>
          </div>
          <div className='offcanvas-body p-4 pt-0 p-lg-0'>
            <hr className='d-lg-none text-white-50'></hr>
            <hr className='d-lg-none text-white-50'></hr>
            <ul className='navbar-nav flex-row flex-wrap bd-navbar-nav'>
              <li className='nav-item col-6 col-lg-auto'>
                <a className='nav-link py-2 px-0 px-lg-2' target='_blank' rel='noopener noreferrer' title='docs' href={`${APP_LINK.DOCS}getting-started`}>
                  {t('footer.docs')}
                </a>
              </li>
              <li className='nav-item col-6 col-lg-auto'>
                <a className='nav-link py-2 px-0 px-lg-2' target='_blank' rel='noopener noreferrer' title='issues' href={APP_LINK.ISSUES}>
                  {t('footer.issues')}
                </a>
              </li>
              <li className='nav-item col-6 col-lg-auto'>
                <a className='nav-link py-2 px-0 px-lg-2' target='_blank' rel='noopener noreferrer' title='discussion' href={APP_LINK.DISCUSSIONS}>
                  {t('footer.discussion')}
                </a>
              </li>
              <li className='nav-item col-6 col-lg-auto'>
                <a className='nav-link py-2 px-0 px-lg-2' target='_blank' rel='noopener noreferrer' title='practice form' href={APP_LINK.TEST}>
                  {t('footer.test')}
                </a>
              </li>
            </ul>
            <hr className='d-lg-none text-white-50'></hr>
            <ul className='navbar-nav flex-row flex-wrap ms-md-auto'>
              <li className='nav-item col-6 col-lg-auto d-flex align-items-center'>
                <iframe src='https://github.com/sponsors/Dhruv-Techapps/button' title='Sponsor Dhruv-Techapps' height='32' width='114' style={{ border: 0, borderRadius: '6px' }}></iframe>
              </li>
              <li className='nav-item py-2 py-lg-1 col-12 col-lg-auto'>
                <div className='vr d-none d-lg-flex h-100 mx-lg-2 text-white'></div>
                <hr className='d-lg-none my-2 text-white-50' />
              </li>
              <li className='col-6 col-lg-auto nav-item'>
                <ThemeNavDropdown />
              </li>
              <li className='col-6 col-lg-auto nav-item dropdown'>
                <button className='nav-link dropdown-toggle text-uppercase fw-bolder' id='language-nav-dropdown' data-bs-toggle='dropdown' aria-expanded='false' data-testid='switch-language'>
                  {i18n.language}
                </button>
                <ul className='dropdown-menu'>
                  {APP_LANGUAGES.map((language) => (
                    <li key={language}>
                      <button className={`dropdown-item ${i18n.language === language ? 'active' : ''}`} onClick={() => changeLanguage(language)}>
                        {t(`language.${language}`)}
                      </button>
                    </li>
                  ))}
                  <li>
                    <hr className='dropdown-divider' />
                  </li>
                  <li>
                    <a className='dropdown-item' title='Add your Language' href='https://github.com/Dhruv-Techapps/acf-i18n/discussions/4' target='_blank' rel='noopener noreferrer'>
                      Add your Language
                    </a>
                  </li>
                </ul>
              </li>
              <li className='py-2 py-lg-1 col-12 col-lg-auto nav-item'>
                <div className='vr d-none d-lg-flex h-100 mx-lg-2 text-white'></div>
                <hr className='d-lg-none my-2 text-white-50' />
              </li>
              <HeaderGoogle />
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
