import { Alert, Button, Card, Col, Form, FormControl, InputGroup, Modal, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useTimeout } from '@acf-options-page/hooks';
import { FormEvent, useEffect } from 'react';
import { syncSchedule } from '../store/config';
import { scheduleSelector, setScheduleMessage, switchScheduleModal, updateSchedule } from '../store/config/schedule';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { REGEX } from '../utils';
import { getFieldNameValue, updateForm } from '../utils/element';

const FORM_ID = 'schedule';

export const ScheduleModal = () => {
  const { t } = useTranslation();
  const { visible, message, error, schedule } = useAppSelector(scheduleSelector);

  const dispatch = useAppDispatch();

  useTimeout(() => {
    dispatch(setScheduleMessage());
  }, message);

  const onUpdate = (e) => {
    const update = getFieldNameValue(e, schedule);
    if (update) {
      dispatch(updateSchedule(update));
    }
  };

  useEffect(() => {
    updateForm(FORM_ID, schedule);
  }, [schedule]);

  const onReset = () => {
    dispatch(syncSchedule());
    onHide();
  };

  const onHide = () => {
    dispatch(switchScheduleModal());
  };

  const onShow = () => {
    //:TODO
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    form.checkValidity();
    dispatch(syncSchedule(schedule));
  };

  return (
    <Modal show={visible} size='lg' onHide={onHide} onShow={onShow} data-testid='addon-modal'>
      <form id={FORM_ID} onSubmit={onSubmit} onReset={onReset}>
        <Modal.Header closeButton>
          <Modal.Title as='h6'>{t('modal.schedule.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='text-muted'>{t('modal.schedule.info')}</p>
          <Card className='mb-2'>
            <div className='card-body'>
              <div className="row">
                <Col md='6' sm='12'>
                  <div className="input-group">
                    <span className="input-group-text">{t('modal.schedule.date')}</span>
                    <input className="form-control" name='date' pattern={REGEX.SCHEDULE_DATE} autoComplete='off' defaultValue={schedule.date} onBlur={onUpdate} placeholder='YYYY-MM-DD' list='schedule-date' required />
                    <div class="invalid-feedback">{t('error.scheduleDate')} </div>
                  </div>
                </div>
                <Col md='6' sm='12'>
                  <div className="input-group">
                    <span className="input-group-text">{t('modal.schedule.time')}</span>
                    <input className="form-control" name='time' pattern={REGEX.SCHEDULE_TIME} autoComplete='off' defaultValue={schedule.time} onBlur={onUpdate} placeholder='HH:mm:ss.sss' list='schedule-time' required />
                    <div class="invalid-feedback">{t('error.scheduleTime')} </div>
                  </div>
                </div>
              </div>
              <Row className='mt-3'>
                <Col md='12' sm='12'>
                  <div className="input-group">
                    <span className="input-group-text">{t('modal.schedule.repeat')}</span>
                    <input className="form-control" name='repeat' pattern={REGEX.SCHEDULE_REPEAT} autoComplete='off' defaultValue={schedule.repeat} onBlur={onUpdate} placeholder='60' list='schedule-repeat' required />
                    <span className="input-group-text">{t('common.min')}</span>
                    <div class="invalid-feedback">{t('error.scheduleRepeat')} </div>
                  </div>
                </div>
              </div>
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
          <button className="btn" type='reset' variant='outline-primary' className='px-5' data-testid='config-schedule-reset'>
            {t('common.clear')}
          </button>
          <button className="btn" type='submit' variant='primary' className='px-5' data-testid='config-schedule-save'>
            {t('common.save')}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
