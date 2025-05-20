import { CoverLayout } from '@acf-options-page/app/cover-layout';
import { ThemeContext } from '@dhruv-techapps/ui-context';
import { useContext } from 'react';
import { NavLink } from 'react-router';

export const NotFound = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <CoverLayout>
      <h1>404</h1>
      <p className='lead'>This is not the webpage you are looking for</p>
      <NavLink className={`btn btn-${theme === 'light' ? 'dark' : 'light'} btn-lg fw-bold`} to='/'>
        Home
      </NavLink>
    </CoverLayout>
  );
};
