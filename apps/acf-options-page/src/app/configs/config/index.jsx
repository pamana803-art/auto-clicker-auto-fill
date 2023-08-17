import React, { createRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Card, Col, Dropdown, Form, Row } from 'react-bootstrap';
import ConfigBody from './config-body';
import { ThreeDots } from '../../../util';
import { DropdownToggle } from '../../../components';
import { getFieldNameValue } from '../../../util/element';
import { download } from '../../../_helpers';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { configSelector, selectedConfigSelector, switchConfigSettingsModal, updateConfig } from '../../../store/config';
import { configImportAPI } from '../../../store/config/config.api';
import { useConfirmationModalContext } from '../../../_providers/confirm.provider';

function Config() {
  const { message, configs } = useAppSelector(configSelector);
  const lastConfig = configs.length === 1
  const modalContext = useConfirmationModalContext();
  const config = useAppSelector(selectedConfigSelector);
  const dispatch = useAppDispatch();
  //  const configsLength = configs.length
  const { t } = useTranslation();
  const importFiled = createRef();
  //const [message, setMessage] = useState()

  const onUpdate = (e) => {
    const update = getFieldNameValue(e);
    dispatch(updateConfig(update));
    /*if (update) {
      dataLayerInput(update, 'configuration')
      setMessage(t('configuration.saveMessage'))
      setTimeout(setMessage, 1500)
    }*/
  };

  const exportConfig = () => {
    let url = config.url.split('/');
    url = url[2] || 'default';
    const name = config.name || url;
    download(name, config);
  };

  const importConfig = ({ currentTarget: { files } }) => {
    if (files.length <= 0) {
      return false;
    }
    const fr = new FileReader();
    fr.onload = function ({ target }) {
      dispatch(configImportAPI(target));
    };
    fr.readAsText(files.item(0));
    return false;
  };

  const showSettings = () => {
    dispatch(switchConfigSettingsModal());
  };

  const removeConfig = () => {
    dispatch(removeConfig());
    /*toastRef.current.push({
      body: t('toast.configuration.remove.body', { name }),
    });*/
  };

  const removeConfigConfirm = async () => {
    const name = config.name || config.url;
    const result = await modalContext.showConfirmation({
      title: t('confirm.configuration.remove.title'),
      message: t('confirm.configuration.remove.message', { name }),
      headerClass: 'text-danger',
      confirmFunc: removeConfig,
    });
    result && removeConfig();
  };

  const duplicateConfig = () => {
    dispatch(duplicateConfig())
    /*toastRef.current.push({
      body: t('toast.configuration.add.body', { name: configCopy.name }),
    });*/
  };

  return (
    <Card className='mb-3'>
      <Card.Header as='h6'>
        <Row>
          <Col className='d-flex align-items-center'>
            {t('configuration.title')}
            <div className='d-flex align-items-center'>
              {!config.enable && (
                <Badge pill bg='secondary' className='ms-2 d-none d-md-block'>
                  {t('common.disabled')}
                </Badge>
              )}
            </div>
            <small className='text-success ms-3'>{message}</small>
          </Col>
          <Col xs='auto' className='d-flex align-items-center'>
            <Form>
              <Form.Check type='switch' className='m-0' name='enable' id='config-enable' label={t('configuration.enable')} checked={config.enable} onChange={onUpdate} />
            </Form>
            <Dropdown id='config-dropdown-wrapper'>
              <Dropdown.Toggle as={DropdownToggle} id='config-dropdown' className='py-0 pe-0' ariaLabel='Configuration more option'>
                <ThreeDots width='24' height='24' />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={exportConfig}>{t('configuration.export')}</Dropdown.Item>
                <Dropdown.Item onClick={() => importFiled.current.click()}>{t('configuration.import')}</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={duplicateConfig}>{t('configuration.duplicate')}</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={removeConfigConfirm} className={lastConfig ? '' : 'text-danger'} disabled={lastConfig}>
                  {t('configuration.remove')}
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={showSettings}>{t('configuration.settings')}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div className='custom-file d-none'>
              <label className='custom-file-label' htmlFor='import-configuration' style={{ fontSize: `${1}rem`, fontWeight: 400 }}>
                {t('configuration.import')}
                <input type='file' className='custom-file-input' ref={importFiled} accept='.json' id='import-configuration' onChange={importConfig} />
              </label>
            </div>
          </Col>
        </Row>
      </Card.Header>
      <ConfigBody />
    </Card>
  );
}
export default Config;
