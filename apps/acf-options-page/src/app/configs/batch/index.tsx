import React from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import BatchBody from './batch-body';
import { getFieldNameValue } from '../../../util/element';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectedConfigSelector } from '../../../store/config';
import { updateBatch } from '../../../store/config';
import { batchSelector } from '@apps/acf-options-page/src/store/config/batch';

function Batch() {
  const { batch } = useAppSelector(selectedConfigSelector);
  const { message, error } = useAppSelector(batchSelector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onUpdate = (e) => {
    const update = getFieldNameValue(e);
    if (update) {
      dispatch(updateBatch(update));
    }
  };

  return (
    <Card className='mb-3'>
      <Card.Header as='h6'>
        <Row>
          <Col>
            {t('batch.title')}
            <small className='text-danger ms-3'>{error}</small>
            <small className='text-success ms-3'>{message}</small>
          </Col>
          <Col xs='auto' className='d-flex align-items-center justify-content-end'>
            <Form>
              <Form.Check type='switch' id='batch-refresh' label={t('batch.refresh')} name='refresh' checked={batch?.refresh} onChange={onUpdate} />
            </Form>
          </Col>
        </Row>
      </Card.Header>
      {!batch?.refresh && <BatchBody />}
    </Card>
  );
}
export default React.memo(Batch);
