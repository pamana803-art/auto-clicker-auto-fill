import { useMemo } from 'react';
import { Dropdown, Form, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { CaretDown, CaretUp, ThreeDots } from '../../../util';
import { ElementFinderPopover, ValuePopover } from '../../../popover';
import { DropdownToggle } from '../../../components';
import { useAppDispatch, useAppSelector } from '@apps/acf-options-page/src/hooks';
import { removeAction, reorderActions, selectedConfigSelector, updateAction } from '@apps/acf-options-page/src/store/config';
import { useConfirmationModalContext } from '@apps/acf-options-page/src/_providers/confirm.provider';
import { switchActionAddonModal } from '@apps/acf-options-page/src/store/config/action/addon';
import { switchActionStatementModal } from '@apps/acf-options-page/src/store/config/action/statement';
import { switchActionSettingsModal } from '@apps/acf-options-page/src/store/config/action/settings';
import { Action } from '@dhruv-techapps/acf-common';
import { defaultColumn } from './editable-cell';
import { actionSelector } from '@apps/acf-options-page/src/store/config/action/action.slice';
const ActionTable = () => {
  const { t } = useTranslation();
  const { actions } = useAppSelector(selectedConfigSelector);
  const { columnVisibility } = useAppSelector(actionSelector);
  const dispatch = useAppDispatch();
  const modalContext = useConfirmationModalContext();

  const removeActionConfirm = async (rowIndex) => {
    const name = `#${+rowIndex + 1} - ${actions[rowIndex].name || actions[rowIndex].elementFinder || 'row'}`;
    const result = await modalContext.showConfirmation({
      title: t('confirm.action.remove.title'),
      message: t('confirm.action.remove.message', name),
      headerClass: 'text-danger',
    });
    result && dispatch(removeAction(Number(rowIndex)));
  };

  const columns = useMemo<ColumnDef<Action, { dataType: string; list: string; pattern: string; required: boolean }>[]>(
    () => [
      {
        header: t('action.initWait'),
        accessorKey: 'initWait',
        size: 100,
        meta: {
          dataType: 'number',
          list: 'interval',
          pattern: 'INTERVAL',
        },
      },
      {
        header: t('action.name'),
        accessorKey: 'name',
      },
      {
        header: () => (
          <>
            {t('action.elementFinder')} <small className='text-danger'>*</small> <ElementFinderPopover />
          </>
        ),
        accessorKey: 'elementFinder',
        meta: {
          list: 'elementFinder',
          required: true,
        },
      },
      {
        header: () => (
          <>
            {t('action.value')} <ValuePopover />
          </>
        ),
        accessorKey: 'value',
        meta: {
          list: 'value',
        },
      },
      {
        header: t('action.repeat'),
        accessorKey: 'repeat',
        meta: {
          dataType: 'number',
          list: 'repeat',
          type: 'number',
          pattern: 'NUMBER',
        },
      },
      {
        header: t('action.repeatInterval'),
        accessorKey: 'repeatInterval',
        meta: {
          dataType: 'number',
          list: 'interval',
          pattern: 'INTERVAL',
        },
      },
    ],
    [t]
  );

  const table = useReactTable<Action>({
    columns: columns,
    data: actions,
    defaultColumn,
    state: { columnVisibility },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        dispatch(updateAction({ index: rowIndex, name: columnId, value }));
      },
    },
  });

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
      <Table id='actions' bordered hover className='mb-0'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th style={{ width: '30px' }}>&nbsp;</th>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</th>
              ))}
              <th style={{ width: '54px' }}>&nbsp;</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr key={row.id}>
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
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
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
          ))}
        </tbody>
      </Table>
    </Form>
  );
};

export default ActionTable;
