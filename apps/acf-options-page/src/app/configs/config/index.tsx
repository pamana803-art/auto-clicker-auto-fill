import { useTranslation } from 'react-i18next';
import { Alert, Badge, Button, ButtonGroup, Card, Col, Form, Row } from 'react-bootstrap';
import ConfigBody from './config-body';
import { Copy, Gear } from '../../../util';
import { getFieldNameValue } from '../../../util/element';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { configSelector, duplicateConfig, selectedConfigSelector, setConfigMessage, switchConfigSettingsModal, updateConfig } from '../../../store/config';

import { useTimeout } from '@apps/acf-options-page/src/_hooks/message.hooks';

function Config() {
  const { message, error } = useAppSelector(configSelector);
  const config = useAppSelector(selectedConfigSelector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useTimeout(() => {
    dispatch(setConfigMessage());
  }, message);

  if (!config) {
    return <Alert variant='secondary'>Please select configuration from left</Alert>;
  }

  const onUpdate = (e) => {
    const update = getFieldNameValue(e, config);
    if (update) {
      dispatch(updateConfig(update));
    }
  };

  const showSettings = () => {
    dispatch(switchConfigSettingsModal());
  };

  const onDuplicateConfig = () => {
    dispatch(duplicateConfig());
  };

  return (
    <Card className='mb-3 shadow-sm'>
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
            <Form className='me-3'>
              <Form.Check type='switch' name='enable' id='config-enable' label={t('configuration.enable')} checked={config.enable} onChange={onUpdate} />
            </Form>
            <ButtonGroup>
              <Button variant='link' title={t('configuration.duplicate')} onClick={onDuplicateConfig} data-testid='duplicate-configuration' className='fs-5'>
                <Copy />
              </Button>
              <Button variant='link' title={t('configuration.settings')} onClick={showSettings} data-testid='configuration-settings' className='fs-5'>
                <Gear />
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Card.Header>
      <ConfigBody />
    </Card>
  );
}
export default Config;
