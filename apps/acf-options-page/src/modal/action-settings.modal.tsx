import { ChangeEvent, FormEvent, useEffect } from 'react';

import { RETRY_OPTIONS } from '@dhruv-techapps/acf-common';
import { Alert, Button, Card, Col, Form, FormControl, InputGroup, Modal, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useTimeout } from '@acf-options-page/hooks';
import { RANDOM_UUID } from '@dhruv-techapps/core-common';
import {
  actionSettingsSelector,
  selectedConfigSelector,
  setActionSettingsMessage,
  switchActionSettingsModal,
  syncActionSettings,
  updateActionSettings,
  updateActionSettingsGoto
} from '../store/config';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { REGEX } from '../utils';
import { getFieldNameValue, updateForm } from '../utils/element';

const FORM_ID = 'action-settings';

const ActionSettingsModal = () => {
  const { t } = useTranslation();
  const { message, visible, settings, error } = useAppSelector(actionSettingsSelector);
  const config = useAppSelector(selectedConfigSelector);
  const dispatch = useAppDispatch();

  useTimeout(() => {
    dispatch(setActionSettingsMessage());
  }, message);

  useEffect(() => {
    updateForm(FORM_ID, settings);
  }, [settings]);

  const onUpdate = (e) => {
    const update = getFieldNameValue(e, settings);
    if (update) {
      dispatch(updateActionSettings(update));
      if (update.name === 'retryOption' && update.value === RETRY_OPTIONS.GOTO) {
        dispatch(updateActionSettingsGoto(actions[0].id));
      }
    }
  };

  const onReset = () => {
    dispatch(syncActionSettings());
    onHide();
  };

  const onHide = () => {
    dispatch(switchActionSettingsModal());
  };

  const onShow = () => {
    //:TODO
  };

  const onUpdateGoto = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateActionSettingsGoto(e.currentTarget.value as RANDOM_UUID));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    form.checkValidity();
    if (Object.keys(settings).length !== 0) {
      dispatch(syncActionSettings(settings));
    }
  };

  if (!config) {
    return null;
  }

  const { actions } = config;

  return (
    <Modal show={visible} size='lg' onHide={onHide} onShow={onShow} data-testid='action-settings-modal'>
      <form id={FORM_ID} onSubmit={onSubmit} onReset={onReset}>
        <Modal.Header closeButton>
          <Modal.Title as='h6'>{t('modal.actionSettings.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='text-muted'>{t('modal.actionSettings.info')}</p>
          <Card>
            <div className='card-body'>
              <div className="row">
                <Col md={12} sm={12}>
                  <input className="form-check-input" type='switch' name='iframeFirst' checked={settings.iframeFirst || false} onChange={onUpdate} label={t('modal.actionSettings.iframeFirst')} />
                  <small className='text-muted'>{t('modal.actionSettings.iframeFirstHint')}</small>
                </Col>
              </Row>
            </div>
          </div>
          <Card bg='warning-subtle' text='warning-emphasis' className='mt-3'>
            <div className='card-body'>
              <Row className='mb-2 mb-md-0'>
                <Col md={6} sm={12}>
                  <div className="input-group">
                    <span className="input-group-text">{t('modal.actionSettings.retry.title')}</span>
                    <input className="form-control" placeholder={t('modal.actionSettings.retry.title')} name='retry' type='number' onBlur={onUpdate} defaultValue={settings.retry} pattern={REGEX.NUMBER} list='retry' />
                    <div class="invalid-feedback">{t('error.number')} </div>
                  </div>
                </Col>
                <Col md={6} sm={12}>
                  <div className="input-group">
                    <span className="input-group-text">
                      {t('modal.actionSettings.retry.interval')}&nbsp;<small className='text-muted'>({t('common.sec')})</small>
                    </span>
                    <input className="form-control"
                      placeholder={`${t('modal.actionSettings.retry.interval')} (${t('common.sec')})`}
                      list='interval'
                      onBlur={onUpdate}
                      name='retryInterval'
                      defaultValue={settings.retryInterval}
                      pattern={REGEX.INTERVAL}
                    />
                    <div class="invalid-feedback">{t('error.number')} </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <Card bg='danger-subtle' text='danger-subtle' className='mt-3'>
            <div className='card-body'>
              <div className="row">
                <Col xs={12} className='mb-2'>
                  {t('modal.actionSettings.retry.hint')}
                </Col>
                <div className="col">
                  <input className="form-check-input"
                    type='radio'
                    value={RETRY_OPTIONS.STOP}
                    checked={settings.retryOption === RETRY_OPTIONS.STOP}
                    onChange={onUpdate}
                    name='retryOption'
                    label={t('modal.actionSettings.retry.stop')}
                  />
                </Col>
                <div className="col">
                  <input className="form-check-input"
                    type='radio'
                    value={RETRY_OPTIONS.SKIP}
                    checked={settings.retryOption === RETRY_OPTIONS.SKIP}
                    onChange={onUpdate}
                    name='retryOption'
                    label={t('modal.actionSettings.retry.skip')}
                  />
                </Col>
                <div className="col">
                  <input className="form-check-input"
                    type='radio'
                    value={RETRY_OPTIONS.RELOAD}
                    checked={settings.retryOption === RETRY_OPTIONS.RELOAD}
                    onChange={onUpdate}
                    name='retryOption'
                    label={t('modal.actionSettings.retry.refresh')}
                  />
                </Col>
                <div className="col">
                  <input className="form-check-input"
                    type='radio'
                    value={RETRY_OPTIONS.GOTO}
                    checked={settings.retryOption === RETRY_OPTIONS.GOTO}
                    onChange={onUpdate}
                    name='retryOption'
                    label={t('modal.actionSettings.retry.goto')}
                  />
                </Col>
                {settings.retryOption === RETRY_OPTIONS.GOTO && (
                  <Col xs={{ span: 3, offset: 9 }}>
                    <Form.Select value={settings.retryGoto} onChange={onUpdateGoto} name='goto' required>
                      {actions.map((_action, index) => (
                        <option key={_action.id} value={_action.id}>
                          {index + 1} . {_action.name ?? _action.elementFinder}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                )}
              </Row>
            </div>
          </div>
          {error && (
            <Alert className='mt-3' variant='danger'>
              {error}
            </Alert>
          )}
          {message && (
            <Alert className='mt-3' variant='success'>
              {message}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer className='justify-content-between'>
          <button className="btn" type='reset' variant='outline-primary' className='px-5' data-testid='action-settings-reset'>
            {t('common.clear')}
          </button>{' '}
          <button className="btn" type='submit' variant='primary' className='px-5' data-testid='action-settings-save'>
            {t('common.save')}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export { ActionSettingsModal };
