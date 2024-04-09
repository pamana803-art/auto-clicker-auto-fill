/* eslint-disable @typescript-eslint/no-namespace */
import { Button, Form, Modal } from 'react-bootstrap';
import GoogleSignInLight from '../assets/btn_google_signin_light_normal_web.png';
import GoogleSignInDark from '../assets/btn_google_signin_dark_normal_web.png';
import { useAppDispatch, useAppSelector } from '../hooks';
import { themeSelector } from '../store/theme.slice';
import { appSelector, login, switchLogin } from '../store/app.slice';
import { Loading } from '../components';

const LoginModal = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(themeSelector);
  const { loginModal, isLoginLoading } = useAppSelector(appSelector);

  const handleClose = () => {
    dispatch(switchLogin());
  };

  return (
    <Modal show={loginModal} onHide={handleClose} data-testid='login-modal' centered>
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>Please sign in</Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex justify-content-center'>
          {isLoginLoading && <Loading message='Sign in...' />}
          <Button variant='link' onClick={() => dispatch(login())} disabled={isLoginLoading} data-testid='google-sign-in'>
            <img src={theme === 'light' ? GoogleSignInLight : GoogleSignInDark} alt='Logo' />
          </Button>
        </Modal.Body>
      </Form>
    </Modal>
  );
};
export { LoginModal };
