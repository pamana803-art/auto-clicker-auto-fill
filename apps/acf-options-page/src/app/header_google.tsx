import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { firebaseLogoutAPI, firebaseSelector } from '../store/firebase';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { switchSubscribeModal } from '../store/subscribe';

export const HeaderGoogle = () => {
  const dispatch = useAppDispatch();
  const { user, role } = useAppSelector(firebaseSelector);
  const navigate = useNavigate();

  const logout = () => {
    dispatch(firebaseLogoutAPI());
    navigate('/login');
  };

  const settings = () => {
    navigate('/settings');
  };

  return (
    <div>
      <NavDropdown title={user?.displayName} id='subscription-nav-dropdown' align='end'>
        {!role && (
          <>
            <NavDropdown.Item title='subscribe' onClick={() => dispatch(switchSubscribeModal())}>
              Subscribe
            </NavDropdown.Item>
            <NavDropdown.Divider />
          </>
        )}
        <NavDropdown.Item title='settings' onClick={settings}>
          Settings
        </NavDropdown.Item>
        <NavDropdown.Item title='logout' onClick={logout}>
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};
