import React from 'react';
import { Accordion} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import BatchBody from './batch-body';
import { useAppSelector } from '../../../hooks';
import { batchSelector } from '@apps/acf-options-page/src/store/config/batch';

function Batch() {
  const { message, error } = useAppSelector(batchSelector);
  const { t } = useTranslation();


  return (
    <Accordion>
      <Accordion.Item eventKey='0'>
        <Accordion.Header>
          {t('batch.title')}
          <small className='text-danger ms-3'>{error}</small>
          <small className='text-success ms-3'>{message}</small>
        </Accordion.Header>
        <Accordion.Body>
          <BatchBody />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
export default React.memo(Batch);
