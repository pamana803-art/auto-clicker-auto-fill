import * as ReactDOM from 'react-dom/client';
import './index.scss'
import { disableContextMenu } from './util'
import App from './App'
import './i18n'
import { BROWSER } from './_helpers'
// import { msalConfig } from './authConfig'

window.EXTENSION_ID = process.env[`REACT_APP_${BROWSER}_EXTENSION_ID`]

/**
 * Initialize a PublicClientApplication instance which is provided to the MsalProvider component
 * We recommend initializing this outside of your root component to ensure it is not re-initialized on re-renders
 */
// const msalInstance = new PublicClientApplication(msalConfig)


const root = ReactDOM.createRoot(  document.getElementById('root') as HTMLElement);
root.render(    <App />);

if (process.env.NODE_ENV !== 'development') {
  disableContextMenu()
}
