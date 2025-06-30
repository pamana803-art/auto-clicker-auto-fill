import { useTimeout } from '@acf-options-page/hooks';
import { actionSelector, addAction, selectedConfigSelector, setActionMessage, switchBatchModal, useAppDispatch, useAppSelector } from '@acf-options-page/store';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ActionSettingsModal, ActionStatementModal, AddonModal } from '../../../modal';
import { Plus, Repeat } from '../../../utils';
import ActionTable from './action-table';

function Action() {
  const { t } = useTranslation();
  const { message, error } = useAppSelector(actionSelector);
  const config = useAppSelector(selectedConfigSelector);
  const dispatch = useAppDispatch();

  useTimeout(() => {
    dispatch(setActionMessage());
  }, message);

  const onAddAction = () => {
    dispatch(addAction());
  };

  if (!config) {
    return null;
  }

  const { actions } = config;

  return (
    <>
      <Card className='mb-3 shadow-sm'>
        <Card.Header as='h6'>
          <div className="row">
            <Col className='d-flex align-items-center'>
              {t('action.title')}
              <small className='text-success ms-3'>{message}</small>
              <small className='text-danger ms-3'>{error}</small>
            </Col>
            <Col xs='auto' className='d-flex align-items-center'>
              <button className="btn" size='sm' variant='outline-primary px-3' onClick={() => dispatch(switchBatchModal())} id='batch-model'>
                <Repeat className='me-2' /> {t('batch.title')}
              </button>
              <button className="btn" size='sm' variant='outline-primary px-3 mx-3' onClick={onAddAction} id='add-action'>
                <Plus className='me-2' /> {t('action.add')}
              </button>
            </Col>
          </Row>
        </Card.Header>
        <div className='card-body' className='p-0'>
          <ActionTable actions={actions} />
        </div>
      </div>
      <AddonModal />
      <ActionSettingsModal />
      <ActionStatementModal />
    </>
  );
}
export default Action;
