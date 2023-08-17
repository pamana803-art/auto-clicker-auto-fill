import { Button, Modal } from 'react-bootstrap';
import { dataLayerModel } from '../util/data-layer';
import { useTranslation } from 'react-i18next';

const ConfirmModal = ({ visible, message, title, headerClass, noClick, yesClick }) => {
  const { t } = useTranslation();

  return (
    <Modal show={visible} centered backdrop='static' keyboard={false} onShow={() => dataLayerModel('confirm', 'open')} onHide={() => dataLayerModel('confirm', 'close')}>
      <Modal.Body className='p-4 text-center'>
        <h4 className={`my-3 fw-normal ${headerClass}`}>{title || 'Confirm'}</h4>
        {message}
      </Modal.Body>
      <Modal.Footer className='flex-nowrap p-0'>
        <Button variant='link' className='fs-6 text-decoration-none col-6 m-0 rounded-0 border-end' size='lg' onClick={noClick}>
          {t('common.no')}
        </Button>
        <Button variant='link' className={`fs-6 text-decoration-none col-6 m-0 rounded-0 ${headerClass}`} size='lg' onClick={yesClick}>
          {t('common.yes')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
ConfirmModal.displayName = 'ConfirmModal';
export { ConfirmModal };
