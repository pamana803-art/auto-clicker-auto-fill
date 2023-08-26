import { useEffect, useState } from 'react';
import { StorageService } from '@dhruv-techapps/core-service';
import { Button, Form, Image } from 'react-bootstrap';
import { Google, LOCAL_STORAGE_KEY, RESPONSE_CODE } from '@dhruv-techapps/acf-common';

import GoogleSignInLight from '../../assets/btn_google_signin_light_normal_web.png';
import GoogleSignInDark from '../../assets/btn_google_signin_dark_normal_web.png';
import { useAppSelector } from '../../hooks';
import { themeSelector } from '../../store/theme.slice';
import { GoogleOauthService } from '@dhruv-techapps/acf-service';

function SettingGoogleSheets() {
  const [google, setGoogle] = useState<Google>();
  const theme = useAppSelector(themeSelector);
  useEffect(() => {
    StorageService.get(window.EXTENSION_ID, LOCAL_STORAGE_KEY.GOOGLE)
      .then(({ google: result }) => {
        if (result) {
          setGoogle(result);
        }
      })
      .catch(console.error);
  }, []);

  const connect = async () => {
    const response = await GoogleOauthService.login(window.EXTENSION_ID);
    if (response !== RESPONSE_CODE.ERROR) {
      setGoogle(response);
    }
  };

  const remove = async () => {
    const response = await GoogleOauthService.remove(window.EXTENSION_ID);
    if (response !== RESPONSE_CODE.ERROR) {
      setGoogle(undefined);
    }
  };

  if (google) {
    return (
      <div className='w-100'>
        <div className='d-flex justify-content-between align-items-center'>
          <Form.Label className='mx-3' htmlFor='google-sheets'>
            <b className='text-muted d-block mb-2'>Google Sheets</b>
            <Image alt={google.name} className='me-2' title={google.name} src={google.picture} roundedCircle width='30' height='30' />
            {google.name}
            <Button variant='link' onClick={remove} data-testid='google-sheets-remove'>
              (remove)
            </Button>
          </Form.Label>
        </div>
      </div>
    );
  }

  return (
    <div className='d-flex flex-column align-items-start'>
      <b className='mx-3 text-muted'>Connect with Google Sheets</b>
      <Button variant='link' onClick={connect} data-testid='google-sheets-connect'>
        <img src={theme === 'light' ? GoogleSignInLight : GoogleSignInDark} alt='Logo' />
      </Button>
    </div>
  );
}

SettingGoogleSheets.displayName = 'SettingGoogleSheets';
SettingGoogleSheets.propTypes = {};
export { SettingGoogleSheets };
