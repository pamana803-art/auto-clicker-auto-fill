import { FormEvent } from 'react';

import { useTimeout } from '@acf-options-page/hooks';
import { ACTION_CONDITION_OPR, getDefaultActionCondition } from '@dhruv-techapps/acf-common';
import { RANDOM_UUID } from '@dhruv-techapps/core-common';
import { Alert, Modal, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  actionStatementSelector,
  addActionStatementCondition,
  selectedConfigSelector,
  setActionStatementError,
  setActionStatementMessage,
  switchActionStatementModal,
  syncActionStatement,
  updateActionStatementCondition
} from '../store/config';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Plus } from '../utils/svg';
import { ActionStatementCondition } from './action-statement/action-statement-condition';
import { ActionStatementRetry } from './action-statement/action-statement-retry';

const FORM_ID = 'actionCondition';

const ActionStatementModal = () => {
  const { t } = useTranslation();
  const { message, visible, statement, error } = useAppSelector(actionStatementSelector);
  const config = useAppSelector(selectedConfigSelector);
  const dispatch = useAppDispatch();

  useTimeout(() => {
    dispatch(setActionStatementMessage());
  }, message);

  const onReset = () => {
    dispatch(syncActionStatement());
    onHide();
  };

  const addCondition = (actionId: RANDOM_UUID, operator?: ACTION_CONDITION_OPR) => {
    dispatch(addActionStatementCondition(getDefaultActionCondition(actionId, operator)));
  };

  const onHide = () => {
    dispatch(switchActionStatementModal());
  };

  const onShow = () => {
    //:TODO
  };

  const verifyConditions = (conditions) => {
    conditions = conditions.map((condition) => {
      if (config !== undefined && condition.actionId === undefined && condition.actionIndex !== undefined) {
        const actionId = config.actions[condition.actionIndex].id;
        dispatch(updateActionStatementCondition({ name: 'actionId', value: actionId, id: condition.id }));
        return { ...condition, actionId };
      }
      return condition;
    });
    return conditions;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    form.checkValidity();
    if (!statement.conditions || !statement.then) {
      dispatch(setActionStatementError(t('error.condition')));
      return;
    }
    const conditions = verifyConditions(statement.conditions);
    const then = statement.then;
    dispatch(syncActionStatement({ ...statement, then, conditions }));
  };

  if (!config) {
    return null;
  }

  return (
    <Modal show={visible} size='lg' onHide={onHide} onShow={onShow} data-testid='action-statement-modal'>
      <form id={FORM_ID} onSubmit={onSubmit} onReset={onReset}>
        <Modal.Header closeButton>
          <Modal.Title as='h6'>{t('modal.actionCondition.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='text-muted'>{t('modal.actionCondition.info')}</p>
          <Table className='mb-0'>
            <thead>
              <tr>
                <th>OPR</th>
                <th>Action</th>
                <th>Status</th>
                <th>
                  <button className='btn' type='button' variant='link' className='mt-2 p-0' aria-label='Add' onClick={() => addCondition(config.actions[0].id, ACTION_CONDITION_OPR.AND)}>
                    <Plus />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {statement.conditions?.map((condition, index) => (
                <ActionStatementCondition key={condition.id} index={index} condition={condition} />
              ))}
            </tbody>
          </Table>
          {statement.conditions ? (
            <ActionStatementRetry then={statement.then} goto={statement.goto} />
          ) : (
            <div className='p-5 d-flex justify-content-center'>
              <button className='btn' type='button' aria-label='Add' onClick={() => addCondition(config.actions[0].id)}>
                <Plus /> {t('modal.actionSettings.title')}
              </button>
            </div>
          )}
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
          <button className='btn' type='reset' variant='outline-primary px-5' data-testid='action-statement-reset'>
            {t('common.clear')}
          </button>{' '}
          <button className='btn' type='submit' variant='primary' className='px-5 ml-3' data-testid='action-statement-save' disabled={statement.conditions === undefined}>
            {t('common.save')}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export { ActionStatementModal };
