import React, { ChangeEvent, useEffect } from 'react';

import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ACTION_RUNNING, defaultActionCondition } from '@dhruv-techapps/acf-common';
import { ActionStatementCondition } from './action-statement/action-statement-condition';
import { Plus } from '../util/svg';
import { selectedActionSelector } from '../store/config';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addActionStatementCondition, configSelector, resetActionStatement, selectedConfigSelector, updateActionStatementGoto, updateActionStatementThen } from '../store/config';
import { actionStatementSelector, switchActionStatementModal } from '../store/config/action/statement';
import { updateForm } from '../util/element';

const FORM_ID = 'actionCondition';

const ActionStatementModal = () => {
  const { t } = useTranslation();
  const { message, visible } = useAppSelector(actionStatementSelector);
  const { statement } = useAppSelector(selectedActionSelector);
  const { actions } = useAppSelector(selectedConfigSelector);
  const { selectedActionIndex } = useAppSelector(configSelector);
  const dispatch = useAppDispatch();

  const onUpdateThen = (then: ACTION_RUNNING) => {
    dispatch(updateActionStatementThen(then));
  };

  const onUpdateGoto = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateActionStatementGoto(Number(e.currentTarget.value)));
  };

  const handleClose = () => {
    dispatch(switchActionStatementModal());
  };

  const onReset = () => {
    dispatch(resetActionStatement());
    handleClose();
  };

  const addCondition = () => {
    dispatch(addActionStatementCondition({ ...defaultActionCondition }));
  };

  useEffect(() => {
    updateForm(FORM_ID, statement);
}, [statement]);


  const onShow = () =>{
    //:TODO
  }

  return (
    <Modal show={visible} size='lg' onHide={handleClose} onShow={onShow}>
      <Modal.Header closeButton>
        <Modal.Title as='h6'>{t('modal.actionCondition.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='text-muted'>{t('modal.actionCondition.info')}</p>
        <h4 className='text-center mb-3'>IF</h4>
        <Table role='table' className='mb-0'>
          <thead>
            <tr>
              <th>OPR</th>
              <th>Action</th>
              <th>Status</th>
              <th>
                <Button type='button' variant='link' className='mt-2 p-0' aria-label='Add' onClick={() => addCondition()}>
                  <Plus width='30' height='30' />
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {statement?.conditions.map((condition, index) => (
              <ActionStatementCondition key={index} conditionIndex={index} condition={condition} />
            ))}
          </tbody>
        </Table>
        <h4 className='text-center mt-3'>THEN</h4>
        <Form id={FORM_ID}>
          <Row className='mt-3'>
            <Col>
              <Form.Check
                type='radio'
                checked={statement?.then === ACTION_RUNNING.SKIP}
                value={ACTION_RUNNING.SKIP}
                onChange={() => onUpdateThen(ACTION_RUNNING.SKIP)}
                name='then'
                label={t('modal.actionCondition.skip')}
              />
            </Col>
            <Col>
              <Form.Check
                type='radio'
                checked={statement?.then === ACTION_RUNNING.PROCEED}
                value={ACTION_RUNNING.PROCEED}
                onChange={() => onUpdateThen(ACTION_RUNNING.PROCEED)}
                name='then'
                label={t('modal.actionCondition.proceed')}
              />
            </Col>
            <Col>
              <Form.Check
                type='radio'
                checked={statement?.then === ACTION_RUNNING.GOTO}
                value={ACTION_RUNNING.GOTO}
                onChange={() => onUpdateThen(ACTION_RUNNING.GOTO)}
                name='then'
                label={t('modal.actionCondition.goto')}
              />
            </Col>
          </Row>
        </Form>
        {statement?.then === ACTION_RUNNING.GOTO && (
          <Row>
            <Col xs={{ span: 4, offset: 8 }}>
              <Form.Select value={statement.goto} onChange={onUpdateGoto} name='goto' required>
                {actions.map((_action, index) => (
                  <option key={index} value={index} disabled={index === Number(selectedActionIndex)}>
                    {index + 1} . {_action.name || _action.elementFinder}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        )}
      </Modal.Body>
      <Modal.Footer className='justify-content-between'>
        <Button variant='outline-primary px-5' onClick={onReset}>
          {t('common.clear')}
        </Button>
        <span className='text-success'>{message}</span>
      </Modal.Footer>
    </Modal>
  );
};

export { ActionStatementModal };
