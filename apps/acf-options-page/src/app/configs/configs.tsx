import { createRef, useEffect, useState } from 'react';

import { Button, Col, Container, Dropdown, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Config from './config';
import { ThreeDots } from '../../util';
import { Ads, DropdownToggle, ErrorAlert, Loading, Sponsors } from '../../components';
import { ActionSettingsModal, AddonModal, ConfigSettingsModal, ReorderConfigsModal, RemoveConfigsModal, ActionStatementModal } from '../../modal';
import { download } from '../../_helpers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addConfig, configSelector, selectConfig, switchConfigRemoveModal, switchConfigReorderModal } from '../../store/config';
import { addToast } from '../../store/toast.slice';
import { configGetAllAPI, configImportAllAPI } from '../../store/config/config.api';
import { modeSelector } from '../../store/mode.slice';
import Batch from './batch';
import Action from './action';

function Configs() {
  const { t, i18n } = useTranslation();

  const [scroll, setScroll] = useState(false);
  const mode = useAppSelector(modeSelector);
  const { configs, loading, selectedConfigIndex } = useAppSelector(configSelector);
  const dispatch = useAppDispatch();

  const importFiled = createRef<HTMLInputElement>();

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.pageYOffset >= 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (chrome.runtime) {
      dispatch(configGetAllAPI());
    }
  }, [dispatch]);

  const onChange = (e) => {
    const { value } = e.currentTarget;
    dispatch(selectConfig(value));
  };

  const onAddConfig = () => {
    dispatch(addConfig());
  };

  const exportAll = () => {
    download('All Configurations', configs);
  };

  const onImportAll = (e) => {
    const { files } = e.currentTarget;
    if (files.length <= 0) {
      return false;
    }
    const fr = new FileReader();
    fr.onload = function ({ target }) {
      dispatch(configImportAllAPI(target));
    };
    fr.readAsText(files.item(0));
    return false;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {!i18n.language.includes('en') && (
        <div className='text-muted text-center my-3'>
          {t('common.translate')}{' '}
          <a href='https://github.com/Dhruv-Techapps/acf-i18n/discussions/4' target='_blank' rel='noopener noreferrer'>
            {t('common.clickHere')}
          </a>
        </div>
      )}
      <div id='configs' className={`${scroll ? 'shadow bg-body-tertiary' : ' mb-4 mt-3'} sticky-top`}>
        <Container>
          <Row className={`rounded-pill ${!scroll && 'border'}`}>
            <Col>
              <Form>
                <Form.Group controlId='selected' className='mb-0'>
                  <Form.Select onChange={onChange} value={selectedConfigIndex} id='configuration-list' className='ps-4 border-0' data-type='number'>
                    {configs.map((config, index) => (
                      <option key={index} value={index} className={!config.enable ? 'bg-secondary' : ''}>
                        {/*style={{ '--bs-bg-opacity': `.25` }}*/}
                        {config.name} {config.url || index}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Form>
            </Col>
            <Col xs='auto' className='d-flex align-items-center'>
              <Button type='button' variant='outline-primary' onClick={onAddConfig} id='add-configuration' className='border-top-0 border-bottom-0 border'>
                {t('configuration.add')}
              </Button>
              <Dropdown id='configurations-dropdown-wrapper'>
                <Dropdown.Toggle as={DropdownToggle} id='configs-dropdown' ariaLabel='Configurations more option'>
                  <ThreeDots width='24' height='24' />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={exportAll}>{t('configuration.exportAll')}</Dropdown.Item>
                  <Dropdown.Item onClick={() => importFiled.current?.click()}>{t('configuration.importAll')}</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item className={configs.length === 1 ? '' : 'text-danger'} disabled={configs.length === 1} onClick={() => dispatch(switchConfigRemoveModal())}>
                    {t('configuration.removeConfigs')}
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => dispatch(switchConfigReorderModal())}>{t('configuration.reorder')}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div className='custom-file d-none'>
                <label className='custom-file-label' htmlFor='import-configurations' style={{ fontSize: `${1}rem`, fontWeight: 400 }}>
                  {t('configuration.importAll')}
                  <input type='file' className='custom-file-input' ref={importFiled} accept='.json' id='import-configurations' onChange={onImportAll} />
                </label>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <main>
        <Container>
          <Config />
          {mode === 'pro' && <Batch />}
          <Ads />
          <Action />
        </Container>
        <ConfigSettingsModal />
        <ReorderConfigsModal />
        <RemoveConfigsModal />
        <Sponsors />
      </main>
    </div>
  );
}
export default Configs;
