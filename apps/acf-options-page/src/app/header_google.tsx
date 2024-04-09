import { Nav, NavDropdown } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { firebase } from '../firebase';
import { GoogleOauthService } from '@dhruv-techapps/acf-service';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { GOOGLE_SCOPES } from '@dhruv-techapps/acf-common';
import { getSubscription, subscribeSelector, switchSubscribeModal } from '../store/subscribe';
import { useEffect, useState } from 'react';
import { appSelector, logout, switchLogin } from '../store/app.slice';

export const HeaderGoogle = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(appSelector);
  const { subscriptions } = useAppSelector(subscribeSelector);
  const [isPortalLinkLoading, setPortalLinkLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      dispatch(getSubscription());
    }
  }, [user]);

  const onPortalLink = async () => {
    setPortalLinkLoading(true);
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
      setPortalLinkLoading(false);
    }
  };

  return (
    <div>
      {user ? (
        <NavDropdown title={user.displayName} id='subscription-nav-dropdown' align='end'>
          {user ? (
            <>
              {subscriptions ? (
                <>
                  <NavDropdown.Item onClick={onPortalLink} disabled={isPortalLinkLoading}>
                    Manage Subscription
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item title='Google Sheets' onClick={() => dispatch(switchSubscribeModal())}>
                    Google Sheets
                  </NavDropdown.Item>
                  <NavDropdown.Item title='Google Drive' onClick={() => dispatch(switchSubscribeModal())}>
                    Google Drive
                  </NavDropdown.Item>
                  <NavDropdown.Item title='Discord' onClick={() => dispatch(switchSubscribeModal())}>
                    Discord
                  </NavDropdown.Item>
                </>
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
