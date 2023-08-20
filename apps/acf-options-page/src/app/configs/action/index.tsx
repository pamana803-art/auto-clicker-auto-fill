import { useEffect, useState } from 'react';
import { Button, Card, Col, Dropdown, Row } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';
import ActionTable from './action-table';
import { DropdownToggle } from '../../../components';
import { Filter } from '../../../util';
import { ActionSettingsModal, ActionStatementModal, AddonModal } from '../../../modal';
import { useAppDispatch, useAppSelector } from '@apps/acf-options-page/src/hooks';
import { addAction } from '@apps/acf-options-page/src/store/config';
import { actionSelector, setColumnVisibility } from '@apps/acf-options-page/src/store/config/action/action.slice';

function Action() {
  const { t } = useTranslation();
  const { message, error, columnVisibility } = useAppSelector(actionSelector);
  const dispatch = useAppDispatch();

  const onColumnChange = (e) => {
    const column = e.currentTarget.getAttribute('data-column');
    dispatch(setColumnVisibility(column));
  };

  const onAddAction = () => {
    dispatch(addAction());
  };

  return (
    <>
      <Card className='mt-3'>
        <Card.Header as='h6'>
          <Row>
            <Col className='d-flex align-items-center'>
              {t('action.title')}
              <small className='text-success ms-3'>{message}</small>
              <small className='text-danger ms-3'>{error}</small>
            </Col>
            <Col xs='auto' className='d-flex align-items-center'>
              <Button variant='outline-primary px-4' onClick={onAddAction} id='add-action'>
                {t('action.add')}
              </Button>
              <Dropdown className='ml-2' id='acton-column-filter'>
                <Dropdown.Toggle as={DropdownToggle} id='action-dropdown' className='pe-0' aria-label='Filter Action Column'>
                  <Filter width='28' height='28' />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={onColumnChange} data-column='name' active={columnVisibility.name}>
                    {t('action.name')}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={onColumnChange} data-column='initWait' active={columnVisibility.initWait}>
                    {t('action.initWait')}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={onColumnChange} data-column='repeat' active={columnVisibility.repeat}>
                    {t('action.repeat')}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={onColumnChange} data-column='repeatInterval' active={columnVisibility.repeatInterval}>
                    {t('action.repeatInterval')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className='p-0'>
          <ActionTable />
        </Card.Body>
      </Card>
      <AddonModal />
      <ActionSettingsModal />
      <ActionStatementModal />
    </>
  );
}
export default Action;
