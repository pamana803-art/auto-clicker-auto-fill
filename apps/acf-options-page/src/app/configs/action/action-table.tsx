import {  useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import { Dropdown, Form, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { EditableCell } from './editable-cell';
import { CaretDown, CaretUp, REGEX_INTERVAL, REGEX_NUM, ThreeDots } from '../../../util';
import { ElementFinderPopover, ValuePopover } from '../../../popover';
import { DropdownToggle } from '../../../components';
import { useAppDispatch, useAppSelector } from '@apps/acf-options-page/src/hooks';
import { removeAction, reorderActions, selectedConfigSelector, updateAction } from '@apps/acf-options-page/src/store/config';
import { useConfirmationModalContext } from '@apps/acf-options-page/src/_providers/confirm.provider';
import { switchActionAddonModal } from '@apps/acf-options-page/src/store/config/action/addon';
import { switchActionStatementModal } from '@apps/acf-options-page/src/store/config/action/statement';
import { switchActionSettingsModal } from '@apps/acf-options-page/src/store/config/action/settings';

const ActionTable = ({ hiddenColumns }) => {
  const { t } = useTranslation();
  const { actions } = useAppSelector(selectedConfigSelector);
  const dispatch = useAppDispatch();
  const modalContext = useConfirmationModalContext();
  const defaultColumn = { Cell: EditableCell };
  const initialState = { hiddenColumns };

  /*const validateActions = () => {
    let isValid = true;
    data.forEach((action, index) => {
      document.querySelector(`#actions tbody tr:nth-child(${index + 1}) input[name=elementFinder]`)?.classList.remove('is-invalid');
      if (!action.elementFinder) {
        document.querySelector(`#actions tbody tr:nth-child(${index + 1}) input[name=elementFinder]`)?.classList.add('is-invalid');
        isValid = false;
      }
    });
    return isValid;
  };*/

  const removeActionConfirm = async (rowIndex) => {
    const name = `#${+rowIndex + 1} - ${actions[rowIndex].name || actions[rowIndex].elementFinder || 'row'}`;
    const result = await modalContext.showConfirmation({
      title: t('confirm.action.remove.title'),
      message: t('confirm.action.remove.message', name),
      headerClass: 'text-danger',
    });
    result && dispatch(removeAction(Number(rowIndex)));
  };

  const columns = useMemo(
    () => [
      {
        Header: t('action.initWait'),
        style: { width: '100px' },
        accessor: 'initWait',
        ariaLabel: 'initWait',
        dataType: 'number',
        list: 'interval',
        pattern: REGEX_INTERVAL,
      },
      {
        Header: t('action.name'),
        style: { width: '10%' },
        accessor: 'name',
        ariaLabel: 'name',
        autoComplete: 'off',
      },
      {
        Header: t('action.elementFinder'),
        accessor: 'elementFinder',
        ariaLabel: 'elementFinder',
        list: 'elementFinder',
        required: true,
      },
      {
        Header: t('action.value'),
        list: 'value',
        accessor: 'value',
        ariaLabel: 'value',
      },
      {
        Header: t('action.repeat'),
        style: { width: '100px' },
        accessor: 'repeat',
        ariaLabel: 'repeat',
        dataType: 'number',
        list: 'repeat',
        pattern: REGEX_NUM,
      },
      {
        Header: t('action.repeatInterval'),
        style: { width: '100px' },
        accessor: 'repeatInterval',
        ariaLabel: 'repeatInterval',
        dataType: 'number',
        list: 'interval',
        pattern: REGEX_INTERVAL,
      },
    ],
    [t]
  );
  const tableInstance = useTable({ columns: columns, data: actions, defaultColumn, initialState, updateAction });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setHiddenColumns } = tableInstance;

  useEffect(() => {
    setHiddenColumns(hiddenColumns);
  }, [hiddenColumns, setHiddenColumns]);

  const showAddon = (row) => {
    dispatch(switchActionAddonModal(row.id));
  };

  const showCondition = (row) => {
    dispatch(switchActionStatementModal(row.id));
  };

  const showSettings = (row) => {
    dispatch(switchActionSettingsModal(row.id));
  };

  const moveUp = (e, rowId) => {
    if (e.currentTarget.getAttribute('disabled') === null) {
      dispatch(reorderActions({ oldIndex: +rowId, newIndex: rowId - 1 }));
    }
  };

  const moveDown = (e, rowId) => {
    if (e.currentTarget.getAttribute('disabled') === null) {
      dispatch(reorderActions({ oldIndex: +rowId, newIndex: +rowId + 1 }));
    }
  };

  return (
    <Form>
      <Table {...getTableProps()} id='actions' bordered hover className='mb-0'>
        <thead>
          {headerGroups.map((headerGroup, headerGroupIndex) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
              <th style={{ width: '30px' }}>&nbsp;</th>
              {headerGroup.headers.map((column, headerIndex) => (
                <th {...column.getHeaderProps([{ style: column.style }])} key={headerIndex}>
                  {column.render('Header')} {column.required && <small className='text-danger'>*</small>}
                  {column.Header === t('action.elementFinder') && <ElementFinderPopover />}
                  {column.Header === t('action.value') && <ValuePopover />}
                </th>
              ))}
              <th style={{ width: '54px' }}>&nbsp;</th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={index} className={actions[index] ? '' : 'edited'}>
                <td align='center'>
                  <div className='d-flex flex-column align-items-center text-secondary'>
                    <CaretUp
                      width='20'
                      height='20'
                      onClick={(e) => moveUp(e, row.id)} //disabled={index === 0}
                    />
                    <CaretDown
                      width='20'
                      height='20'
                      onClick={(e) => moveDown(e, row.id)} //disabled={index === rows.length - 1}
                    />
                  </div>
                </td>
                {row.cells.map((cell, cellIndex) => (
                  <td {...cell.getCellProps()} key={cellIndex}>
                    {cell.render('Cell')}
                  </td>
                ))}
                <td align='center'>
                  {actions[row.id] && (
                    <Dropdown id='acton-dropdown-wrapper'>
                      <Dropdown.Toggle as={DropdownToggle} id='action-dropdown' aria-label='Action more option'>
                        <ThreeDots width='24' height='24' />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => showAddon(row)}>{t('action.addon')}</Dropdown.Item>
                        {index !== 0 && <Dropdown.Item onClick={() => showCondition(row)}>{t('modal.actionCondition.title')}</Dropdown.Item>}
                        <Dropdown.Item onClick={() => showSettings(row)}>{t('action.settings')}</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          onClick={() => {
                            removeActionConfirm(row.id);
                          }}
                          className={actions.length === 1 ? '' : 'text-danger'}
                          disabled={actions.length === 1}
                        >
                          {t('action.remove')}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Form>
  );
};

export default ActionTable;
