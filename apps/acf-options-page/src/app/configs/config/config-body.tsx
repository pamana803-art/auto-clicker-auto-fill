import { useEffect, useState } from 'react';
import { Card, Col, Form, FormControl, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getFieldNameValue, updateForm } from '../../../util/element';
import { APP_LINK } from '../../../constants';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectedConfigSelector, updateConfig } from '../../../store/config';

const FORM_ID = 'config-body';

function ConfigBody() {
  const config = useAppSelector(selectedConfigSelector);
  const [isInvalid, setIsInvalid] = useState(true);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const onUpdate = (e) => {
    const update = getFieldNameValue(e, config);
    if (update) {
      dispatch(updateConfig(update));
    }
  };

  const onKeyDown = (e) => {
    setIsInvalid(e.target.value !== '');
  };

  useEffect(() => {
    if (config.url) {
      setIsInvalid(false);
    }
    updateForm(FORM_ID, config);
  }, [config]);

  return (
    <Form id={FORM_ID}>
      <Card.Body>
        <Row>
          <Col md='12' sm='12' className='mb-3'>
            <Form.Group controlId='config-url'>
              <FormControl name='url' required isInvalid={isInvalid} onKeyDown={onKeyDown} defaultValue={config.url} autoComplete='off' onBlur={onUpdate} placeholder={APP_LINK.TEST} />
              <Form.Label>
                {t('configuration.url')}&nbsp;<small className='text-danger'>*</small>
              </Form.Label>
              <Form.Control.Feedback type='invalid'>{t('error.url')}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md='6' sm='12'>
            <Form.Group controlId='config-name'>
              <FormControl name='name' autoComplete='off' defaultValue={config.name} onBlur={onUpdate} placeholder='getautoclicker.com' />
              <Form.Label>{t('configuration.name')}</Form.Label>
            </Form.Group>
          </Col>
          <Col md='6' sm='12'>
            <Form.Group controlId='config-init-wait'>
              <FormControl name='initWait' pattern='INTERVAL' defaultValue={config.initWait} onBlur={onUpdate} autoComplete='off' list='interval' placeholder='0' />
              <Form.Label>
                {t('configuration.initWait')}&nbsp;<small className='text-muted'>({t('common.sec')})</small>
              </Form.Label>
              <Form.Control.Feedback type='invalid'>{t('error.initWait')}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Form>
  );
}

export default ConfigBody;
