import { Alert, Button, Image } from 'react-bootstrap';

import { GOOGLE_SCOPES } from '@dhruv-techapps/google-oauth';
import GoogleSignInDark from '../../assets/btn_google_signin_dark_normal_web.png';
import GoogleSignInLight from '../../assets/btn_google_signin_light_normal_web.png';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { useEffect } from 'react';
import { firebaseSelector, switchFirebaseLoginModal } from '../../store/firebase';
import { googleHasAccessAPI, googleLoginAPI, googleSelector } from '../../store/google';
import { themeSelector } from '../../store/theme.slice';

function SettingGoogleSheets() {
  const theme = useAppSelector(themeSelector);
  const { user } = useAppSelector(firebaseSelector);
  const { grantedScopes } = useAppSelector(googleSelector);
  const scope = GOOGLE_SCOPES.SHEETS;
  const dispatch = useAppDispatch();

  const connect = async () => {
    dispatch(googleLoginAPI([scope]));
  };

  useEffect(() => {
    if (user) {
      if (!grantedScopes.includes(scope)) {
        dispatch(googleHasAccessAPI([scope]));
      }
    }
  }, [user, grantedScopes, scope, dispatch]);

  if (!user) {
    return (
      <p>
        Please
        <Button variant='link' title='login' onClick={() => dispatch(switchFirebaseLoginModal())}>
          Login
        </Button>
        to your account before connecting with Google Sheets.
      </p>
    );
  }

  if (!grantedScopes?.includes(scope)) {
    return (
      <div className='d-flex flex-column align-items-start'>
        {['DEV', 'BETA'].includes(process.env.NX_PUBLIC_VARIANT || '') ? (
          <Alert>
            <Alert.Heading>Use Stable Versions for Google Sheets Features.</Alert.Heading>
            For optimal performance and reliability in Google Sheets, it's recommended to utilize <Alert.Link href={`https://stable.getautoclicker.com`}>stable</Alert.Link> versions of its features.
            These versions undergo thorough testing to ensure seamless functionality, providing you with a dependable platform for your tasks. By prioritizing stability, you can enhance your
            productivity and minimize the risk of encountering unexpected issues. If you need assistance or guidance on leveraging Google Sheets effectively, feel free to reach out for support!.
          </Alert>
        ) : (
          <>
            <b className='mx-3 text-muted'>Connect with Google Sheets</b>
            <Button variant='link' onClick={connect} data-testid='google-sheets-connect' disabled={['DEV', 'BETA'].includes(process.env.NX_PUBLIC_VARIANT || '')}>
              <img src={theme === 'light' ? GoogleSignInLight : GoogleSignInDark} alt='Logo' />
            </Button>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <b className='text-muted d-block mb-2'>Google Sheets</b>
      {user.photoURL && user.displayName && (
        <Image alt={user.displayName} className='me-2' title={user.displayName} src={user.photoURL} roundedCircle width='30' height='30' referrerPolicy='no-referrer' />
      )}
      {user.displayName}
    </div>
  );
}

SettingGoogleSheets.displayName = 'SettingGoogleSheets';
SettingGoogleSheets.propTypes = {};
export { SettingGoogleSheets };
