import { useTimeout } from '@acf-options-page/hooks';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import { Trans, useTranslation } from 'react-i18next';
import { batchSelector, selectedConfigSelector, setBatchMessage, switchBatchModal, updateBatch } from '../store/config';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { REGEX } from '../utils';
import { getFieldNameValue } from '../utils/element';

const FORM_ID = 'batch-body';

const BatchModal = () => {
  const { t } = useTranslation();

  const config = useAppSelector(selectedConfigSelector);
  const { visible, message } = useAppSelector(batchSelector);
  const dispatch = useAppDispatch();

  useTimeout(() => {
    dispatch(setBatchMessage());
  }, message);

  const handleClose = () => {
    dispatch(switchBatchModal());
  };

  const onUpdate = (e) => {
    const update = getFieldNameValue(e, batch);
    if (update) {
      dispatch(updateBatch(update));
    }
  };

  const onShow = () => {
    //:TODO
  };

  if (!config) {
    return null;
  }

  const { batch } = config;

  return (
    <Modal show={visible} size='lg' onHide={handleClose} onShow={onShow} data-testid='config-batch-modal'>
      <form id={FORM_ID}>
        <Modal.Header closeButton>
          <Modal.Title as='h6'>{t('batch.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class='card border-warning'>
            <div className='card-body'>
              <div className="row">
                <Col md='12' sm='12'>
                  <FormCheck type='switch' id='batch-refresh' label={t('batch.refresh')} name='refresh' checked={batch?.refresh || false} onChange={onUpdate} />
                  <Form.Text>
                    <Trans i18nKey='batch.refreshHint' components={{ b: <b /> }} />
                  </Form.Text>
                </Col>
                {!batch?.refresh && (
                  <>
                    <hr className='my-3' />
                    <Col md='6' sm='12'>
                      <Form.Group controlId='batch-repeat'>
                        <Form.Label>{t('batch.repeat')}</Form.Label>
                        <input
                          class='form-control'
                          type='number'
                          name='repeat'
                          pattern={REGEX.NUMBER}
                          defaultValue={batch?.repeat}
                          onBlur={onUpdate}
                          autoComplete='off'
                          placeholder='0'
                          list='repeat'
                        />
                        <div className='invalid-feedback'>{t('error.number')} </div>
                      </Form.Group>
                    </Col>
                    <Col md='6' sm='12'>
                      <Form.Group controlId='batch-repeat-interval'>
                        <Form.Label>
                          {t('batch.repeatInterval')}&nbsp;<small className='text-muted'>({t('common.sec')})</small>
                        </Form.Label>
                        <input
                          class='form-control'
                          name='repeatInterval'
                          pattern={REGEX.INTERVAL}
                          autoComplete='off'
                          defaultValue={batch?.repeatInterval}
                          onBlur={onUpdate}
                          placeholder='0'
                          list='interval'
                        />
                        <div className='invalid-feedback'>{t('error.number')} </div>
                      </Form.Group>
                    </Col>
                    <Form.Text>
                      <Trans i18nKey='batch.repeatHint' components={{ b: <b /> }} />
                    </Form.Text>
                  </>
                )}
              </Row>
            </div>
          </div>
        </Modal.Body>
        {message && (
          <Modal.Footer>
            <span className='text-success'>{message}</span>
          </Modal.Footer>
        )}
      </form>
    </Modal>
  );
};
export { BatchModal };
