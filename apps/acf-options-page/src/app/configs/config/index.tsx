import { createRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Card, Col, Dropdown, Form, Row } from 'react-bootstrap';
import ConfigBody from './config-body';
import { ThreeDots } from '../../../util';
import { DropdownToggle } from '../../../components';
import { getFieldNameValue } from '../../../util/element';
import { download } from '../../../_helpers';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { configSelector, duplicateConfig, importConfig, removeConfig, selectedConfigSelector, setConfigMessage, switchConfigSettingsModal, updateConfig } from '../../../store/config';
import { useConfirmationModalContext } from '../../../_providers/confirm.provider';
import { addToast } from '@apps/acf-options-page/src/store/toast.slice';
import { Configuration } from '@dhruv-techapps/acf-common';
import { useTimeout } from '@apps/acf-options-page/src/_hooks/message.hooks';

function Config() {
  const { message, configs, error } = useAppSelector(configSelector);
  const lastConfig = configs.length === 1;
  const modalContext = useConfirmationModalContext();
  const config = useAppSelector(selectedConfigSelector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const importFiled = createRef<HTMLInputElement>();

  useTimeout(() => {
    dispatch(setConfigMessage());
  }, message);

  const onUpdate = (e) => {
    const update = getFieldNameValue(e, config);
    if (update) {
      dispatch(updateConfig(update));
    }
  };

  const onExportConfig = () => {
    const url = config.url.split('/')[2] || 'default';
    const name = config.name || url;
    download(name, config);
  };

  const onImportConfig = ({ currentTarget: { files } }) => {
    if (files.length <= 0) {
      return false;
    }
    const fr = new FileReader();
    fr.onload = function ({ target }) {
      try {
        if (target === null || target.result === null) {
          dispatch(addToast({ header: 'File', body: t('error.json'), variant: 'danger' }));
        } else {
          const importedConfig: Configuration = JSON.parse(target.result as string);
          if (Array.isArray(importedConfig)) {
            dispatch(addToast({ header: 'File', body: t('error.json'), variant: 'danger' }));
          } else {
            dispatch(importConfig(importedConfig));
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

  const showSettings = () => {
    dispatch(switchConfigSettingsModal());
  };

  const onRemoveConfigConfirm = async () => {
    const name = config.name || config.url;
    const result = await modalContext.showConfirmation({
      title: t('confirm.configuration.remove.title'),
      message: t('confirm.configuration.remove.message', { name }),
      headerClass: 'text-danger',
    });
    result && dispatch(removeConfig());
  };

  const onDuplicateConfig = () => {
    dispatch(duplicateConfig());
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
            <small className='text-danger ms-3'>{error}</small>
            <small className='text-success ms-3'>{message}</small>
          </Col>
          <Col xs='auto' className='d-flex align-items-center'>
            <Form>
              <Form.Check type='switch' className='m-0' name='enable' id='config-enable' label={t('configuration.enable')} checked={config.enable} onChange={onUpdate} />
            </Form>
            <Dropdown id='config-dropdown-wrapper'>
              <Dropdown.Toggle as={DropdownToggle} id='config-dropdown' className='py-0 pe-0' aria-label='Configuration more option'>
                <ThreeDots width='24' height='24' />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={onExportConfig}>{t('configuration.export')}</Dropdown.Item>
                <Dropdown.Item onClick={() => importFiled.current?.click()}>{t('configuration.import')}</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={onDuplicateConfig}>{t('configuration.duplicate')}</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={onRemoveConfigConfirm} className={lastConfig ? '' : 'text-danger'} disabled={lastConfig}>
                  {t('configuration.remove')}
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={showSettings}>{t('configuration.settings')}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div className='custom-file d-none'>
              <label className='custom-file-label' htmlFor='import-configuration' style={{ fontSize: `${1}rem`, fontWeight: 400 }}>
                {t('configuration.import')}
                <input type='file' className='custom-file-input' ref={importFiled} accept='.json' id='import-configuration' onChange={onImportConfig} />
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
