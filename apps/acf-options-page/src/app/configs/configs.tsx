import { Ads } from '@acf-options-page/components';
import { importAll, importConfig } from '@acf-options-page/store/config';
import { configGetAllAPI } from '@acf-options-page/store/config/config.api';
import { useAppDispatch } from '@acf-options-page/store/hooks';
import { addToast } from '@acf-options-page/store/toast.slice';
import { download } from '@acf-options-page/utils';
import { CHROME_WEB_STORE } from '@acf-options-page/utils/constants';
import { Configuration } from '@dhruv-techapps/acf-common';
import { createRef, useEffect } from 'react';
import { Alert, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { BatchModal, ConfigSettingsModal, ScheduleModal } from '../../modal';
import Footer from '../footer';
import Action from './action';
import Config from './config';
import { ConfigDropdown } from './config/config-dropdown';
import { ConfigSidebar } from './config/config-sidebar';

function Configs(props) {
  const { t } = useTranslation();
  const importFiled = createRef<HTMLInputElement>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (window.chrome?.runtime) {
      dispatch(configGetAllAPI());
    }
  }, [dispatch]);

  const onExportAll = (configs: Array<Configuration>) => {
    download('All Configurations', configs);
  };

  const onImportAll = (e) => {
    const { files } = e.currentTarget;
    if (files.length <= 0) {
      return false;
    }
    const fr = new FileReader();
    fr.onload = function ({ target }) {
      try {
        if (target?.result === null) {
          dispatch(addToast({ header: 'File', body: t('error.json'), variant: 'danger' }));
        } else {
          const importedConfigs: Array<Configuration> | Configuration = JSON.parse(target?.result as string);
          if (!Array.isArray(importedConfigs)) {
            dispatch(importConfig(importedConfigs));
          } else {
            dispatch(importAll(importedConfigs));
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          dispatch(addToast({ header: 'File', body: error.message, variant: 'danger' }));
        } else if (typeof error === 'string') {
          dispatch(addToast({ header: 'File', body: error, variant: 'danger' }));
        } else {
          dispatch(addToast({ header: 'File', body: JSON.stringify(error), variant: 'danger' }));
        }
      }
    };
    fr.readAsText(files.item(0));
    return false;
  };

  return (
    <div class='container-fluid' id='main'>
      {props.error && (
        <Alert variant='danger'>
          <p className='m-0'>
            {props.error}
            {props.errorButton && (
              <Alert.Link href={`${CHROME_WEB_STORE}${import.meta.env.VITE_PUBLIC_CHROME_EXTENSION_ID}`} target='_blank' className='ms-2'>
                download
              </Alert.Link>
            )}
          </p>
        </Alert>
      )}
      <div className='row'>
        <Col lg='3' className='pt-3 d-none d-lg-block'>
          <ConfigSidebar importFiled={importFiled} onExportAll={onExportAll} />
        </div>
        <Col sm='auto' lg='9' className='pt-3'>
          <div>
            <ConfigDropdown importFiled={importFiled} onExportAll={onExportAll} />
            <main>
              <Config />
              <Action />
              <Ads />
              <Footer />
              <ConfigSettingsModal />
              <BatchModal />
              <ScheduleModal />
            </main>
          </div>
        </div>
      </div>
      <div className='custom-file d-none'>
        <label className='custom-file-label' htmlFor='import-configurations' style={{ fontSize: `${1}rem`, fontWeight: 400 }}>
          {t('configuration.importAll')}
          <input type='file' className='custom-file-input' ref={importFiled} accept='.json' id='import-configurations' onChange={onImportAll} />
        </label>
      </div>
    </div>
  );
}
export default Configs;
