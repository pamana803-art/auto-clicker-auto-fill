import { selectedConfigSelector, updateConfig } from '@acf-options-page/store/config';
import { useAppDispatch, useAppSelector } from '@acf-options-page/store/hooks';
import { REGEX } from '@acf-options-page/utils';
import { APP_LINK } from '@acf-options-page/utils/constants';
import { getFieldNameValue, updateForm } from '@acf-options-page/utils/element';
import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

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
    if (config && config.url) {
      setIsInvalid(false);
    }
    updateForm(FORM_ID, config);
  }, [config]);

  if (!config) {
    return null;
  }

  return (
    <form id={FORM_ID}>
      <div className='card-body'>
        <div className="row">
          <Col md='2' sm='12'>
            <Form.Group controlId='config-name'>
              <Form.Label>{t('configuration.name')}</Form.Label>
              <input class='form-control' name='name' autoComplete='off' defaultValue={config.name} onBlur={onUpdate} placeholder='getautoclicker.com' />
            </Form.Group>
          </Col>
          <Col md='8' xxl='9' sm='12'>
            <Form.Group controlId='config-url'>
              <Form.Label>
                {t('configuration.url')}&nbsp;<small className='text-danger'>*</small>
              </Form.Label>
              <input class='form-control' name='url' required isInvalid={isInvalid} onKeyDown={onKeyDown} defaultValue={config.url} autoComplete='off' onBlur={onUpdate} placeholder={APP_LINK.TEST} />
              <div className='invalid-feedback'>{t('error.url')} </div>
            </Form.Group>
          </Col>
          <Col md='2' xxl='1' sm='12'>
            <Form.Group controlId='config-init-wait'>
              <Form.Label>
                {t('configuration.initWait')}&nbsp;<small className='text-muted'>({t('common.sec')})</small>
              </Form.Label>
              <input class='form-control' name='initWait' pattern={REGEX.INTERVAL} defaultValue={config.initWait} onBlur={onUpdate} autoComplete='off' list='interval' placeholder='0' />
              <div className='invalid-feedback'>{t('error.initWait')} </div>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </form>
  );
}

export default ConfigBody;
