import { useAppSelector } from '../hooks';
import { appSelector } from '../store/app.slice';
import { GoogleAds } from './google-ads.components';

export function Ads() {
  const { role } = useAppSelector(appSelector);
  if (role === undefined && /.getautoclicker.com/.exec(window.location.href) !== null) {
    return <GoogleAds />;
  }
  return null;
}
