import { GOOGLE_SCOPES, GoogleOauthService } from '@dhruv-techapps/google-oauth';
import { GoogleAuthProvider, getAuth, signInWithCredential } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useEffect } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { firebase } from '../firebase';
import { useAppDispatch, useAppSelector } from '../hooks';
import { appSelector, logout, switchLogin } from '../store/app.slice';
import { getSubscription, subscribeSelector, switchIsPortalLinkLoading, switchSubscribeModal } from '../store/subscribe';
import { addToast } from '../store/toast.slice';

export const HeaderGoogle = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(appSelector);
  const { subscriptions, isPortalLinkLoading } = useAppSelector(subscribeSelector);

  useEffect(() => {
    if (user) {
      dispatch(getSubscription());
    }
  }, [user, dispatch]);

  const onPortalLink = async () => {
    dispatch(switchIsPortalLinkLoading());
    dispatch(addToast({ header: 'Loading Manage Subscription', variant: 'primary' }));
    const token = await GoogleOauthService.getAuthToken(window.EXTENSION_ID, [GOOGLE_SCOPES.PROFILE, GOOGLE_SCOPES.EMAIL]);

    if (!token) {
      return;
    }
    const credential = GoogleAuthProvider.credential(null, token);
    if (credential) {
      await signInWithCredential(getAuth(firebase), credential);
    }

    const functions = getFunctions(firebase, 'us-central1');
    const httpsCallableFunc = httpsCallable<unknown, { url: string }>(functions, 'ext-firestore-stripe-payments-createPortalLink');
    const { data } = await httpsCallableFunc({ returnUrl: window.location.origin });
    if (data?.url) {
      window.location.href = data.url;
    } else {
      dispatch(switchIsPortalLinkLoading());
    }
  };

  return (
    <div>
      {user ? (
        <NavDropdown title={user.displayName} id='subscription-nav-dropdown' align='end'>
          {user ? (
            <>
              {subscriptions ? (
                <NavDropdown.Item onClick={onPortalLink} disabled={isPortalLinkLoading}>
                  Manage Subscription
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item title='subscribe' onClick={() => dispatch(switchSubscribeModal())}>
                  Subscribe
                </NavDropdown.Item>
              )}
              <NavDropdown.Divider />
            </>
          ) : null}

          <NavDropdown.Item title='logout' onClick={() => dispatch(logout())}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      ) : (
        <Nav.Link title='login' onClick={() => dispatch(switchLogin())}>
          Login
        </Nav.Link>
      )}
    </div>
  );
};
