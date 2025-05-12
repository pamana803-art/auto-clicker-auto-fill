import { firebaseLoginAPI } from '@acf-options-page/store/firebase';
import { useAppDispatch } from '@acf-options-page/store/hooks';
import { ThemeContext } from '@dhruv-techapps/ui-context';
import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import GoogleSignInDark from '../assets/btn_google_signin_dark_normal_web.png';
import GoogleSignInLight from '../assets/btn_google_signin_light_normal_web.png';

const Login: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const login = async () => {
    await dispatch(firebaseLoginAPI());
    navigation('/');
  };

  return (
    <div className='container my-5'>
      <div className='p-5 text-center bg-body-tertiary rounded-3'>
        <img
          className='img-fluid mx-auto d-none d-sm-block mb-3'
          srcSet='https://getautoclicker.com/brand/bootstrap-social-logo.png, https://getautoclicker.com/brand/bootstrap-social-logo@2x.png 2x'
          src='https://getautoclicker.com/brand/bootstrap-social-logo.png'
          alt='Auto Clicker Auto Fill'
          width='118'
          height='118'
        />
        <h1 className='text-body-emphasis'>Welcome to Auto Clicker Auto Fill</h1>
        <div className='gap-2'>
          <h3 className='text-muted mb-5'>To get started, please sign in</h3>
          <Button variant='link' data-testid='google-sign-in' onClick={login}>
            <img src={theme === 'light' ? GoogleSignInLight : GoogleSignInDark} alt='Logo' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
