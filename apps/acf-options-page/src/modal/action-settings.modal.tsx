import { useEffect } from 'react';

import { Button, Card, Col, Form, FormControl, Modal, Row } from 'react-bootstrap';
import { RETRY_OPTIONS } from '@dhruv-techapps/acf-common';
import { useTranslation } from 'react-i18next';

import { getFieldNameValue, updateForm } from '../util/element';
import { useAppDispatch, useAppSelector } from '../hooks';
import { configSelector, resetActionSetting, updateActionSettings } from '../store/config';
import { actionSettingsSelector, switchActionSettingsModal } from '../store/config/action/settings';
import { selectedActionSelector } from '../store/config';

const FORM_ID = 'action-settings';

const ActionSettingsModal = () => {
  const { t } = useTranslation();
  const {selectedActionIndex, configs, selectedConfigIndex} = useAppSelector(configSelector)
  const action = useAppSelector(selectedActionSelector);
  const {settings } = action
  const { message, visible } = useAppSelector(actionSettingsSelector);
  const dispatch = useAppDispatch();

  const onUpdate = (e) => {
    const update = getFieldNameValue(e,settings);
    if(update){
      dispatch(updateActionSettings(update));
    }
  };

  const handleClose = () => {
    dispatch(switchActionSettingsModal());
  };

  useEffect(() => {
    console.log(settings)
      updateForm(FORM_ID, settings);
  }, [settings]);

  console.log(settings)

  const onReset = () => {
    dispatch(resetActionSetting());
    handleClose();
  };

  console.log(selectedActionIndex,selectedConfigIndex, action ,configs[selectedConfigIndex])

  const onShow = () => {
//:TODO
  }

  return (
    <Modal show={visible} size='lg' onHide={handleClose} onShow={onShow}>
      <Form id={FORM_ID}>
        <Modal.Header closeButton>
          <Modal.Title as='h6'>{t('modal.actionSettings.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='text-muted'>{t('modal.actionSettings.info')}</p>
          <Card className='mb-3'>
            <Card.Body>
              <Row>
                <Col md={12} sm={12}>
                  <Form.Check type='switch' name='iframeFirst' checked={settings?.iframeFirst} onChange={onUpdate} label={t('modal.actionSettings.iframeFirst')} />
                  <small className='text-muted'>{t('modal.actionSettings.iframeFirstHint')}</small>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Row className='mb-2 mb-md-0'>
                <Col md={6} sm={12}>
                  <Form.Group controlId='retry'>
                    <FormControl placeholder={t('modal.actionSettings.retry.title')} name='retry' type='number' onBlur={onUpdate} defaultValue={settings?.retry} pattern='NUMBER' list='retry' />
                    <Form.Label>{t('modal.actionSettings.retry.title')}</Form.Label>
                    <Form.Control.Feedback type='invalid'>{t('error.number')}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group controlId='retry-interval'>
                    <FormControl
                      placeholder={`${t('modal.actionSettings.retry.interval')} (${t('common.sec')})`}
                      list='interval'
                      onBlur={onUpdate}
                      name='retryInterval'
                      defaultValue={settings?.retryInterval}
                      pattern='INTERVAL'
                    />
                    <Form.Label>
                      {t('modal.actionSettings.retry.interval')}&nbsp;<small className='text-muted'>({t('common.sec')})</small>
                    </Form.Label>
                    <Form.Control.Feedback type='invalid'>{t('error.number')}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12} className='mb-2'>
                  <Form.Text className='text-muted'>{t('modal.actionSettings.retry.hint')}</Form.Text>
                </Col>
                <Col xs={12} className='d-flex justify-content-between'>
                  <Form.Check
                    type='radio'
                    value={RETRY_OPTIONS.STOP}
                    checked={settings?.retryOption === RETRY_OPTIONS.STOP}
                    onChange={onUpdate}
                    name='retryOption'
                    label={t('modal.actionSettings.retry.stop')}
                  />
                  <Form.Check
                    type='radio'
                    value={RETRY_OPTIONS.SKIP}
                    checked={settings?.retryOption === RETRY_OPTIONS.SKIP}
                    onChange={onUpdate}
                    name='retryOption'
                    label={t('modal.actionSettings.retry.skip')}
                  />
                  <Form.Check
                    type='radio'
                    value={RETRY_OPTIONS.RELOAD}
                    checked={settings?.retryOption === RETRY_OPTIONS.RELOAD}
                    onChange={onUpdate}
                    name='retryOption'
                    label={t('modal.actionSettings.retry.refresh')}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer className='justify-content-between'>
          <Button type='reset' variant='outline-primary px-5' onClick={onReset}>
            {t('common.clear')}
          </Button>
          <span className='text-success'>{message}</span>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export { ActionSettingsModal };
