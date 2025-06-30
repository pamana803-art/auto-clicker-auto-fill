import { useNavigate } from 'react-router';
import { firebaseLogoutAPI, firebaseSelector, switchSubscribeModal, useAppDispatch, useAppSelector } from '../store';

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
    <li className='nav-item dropdown' id='subscription-nav-dropdown'>
      <button type='button' className='nav-link dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false'>
        {user?.displayName}
      </button>
      <ul className='dropdown-menu'>
        {!role && (
          <>
            <li>
              <button type='button' className='dropdown-item' onClick={() => dispatch(switchSubscribeModal())}>
                Subscribe
              </button>
            </li>
            <li>
              <hr className='dropdown-divider' />
            </li>
          </>
        )}
        <li>
          <button type='button' className='dropdown-item' onClick={settings}>
            Settings
          </button>
        </li>
        <li>
          <button type='button' className='dropdown-item' onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </li>
  );
};
