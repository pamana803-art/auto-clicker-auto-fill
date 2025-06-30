import { RECHECK_OPTIONS } from '@dhruv-techapps/acf-common';
import { RANDOM_UUID } from '@dhruv-techapps/core-common';
import { ChangeEvent } from 'react';
import { Card, Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actionAddonSelector, selectedConfigSelector, updateActionAddon, updateActionAddonGoto } from '../../store/config';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { REGEX } from '../../utils';
import { getFieldNameValue } from '../../utils/element';

function AddonRecheck() {
  const { t } = useTranslation();
  const { addon } = useAppSelector(actionAddonSelector);
  const config = useAppSelector(selectedConfigSelector);
  const dispatch = useAppDispatch();

  const onUpdate = (e) => {
    const update = getFieldNameValue(e, addon);
    if (update) {
      dispatch(updateActionAddon(update));
      if (update.name === 'recheckOption' && update.value === RECHECK_OPTIONS.GOTO) {
        const actionId = config?.actions[0].id;
        if (actionId) {
          dispatch(updateActionAddonGoto(actionId));
        }
      }
    }
  };

  const onUpdateGoto = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateActionAddonGoto(e.currentTarget.value as RANDOM_UUID));
  };

  if (!config || !addon) {
    return null;
  }

  const actions = config.actions;

  return (
    <>
      <Card bg='warning-subtle' text='warning-emphasis' className='mt-3'>
        <div className='card-body'>
          <div className="row">
            <Col md={6} sm={12}>
              <div className="input-group">
                <span className="input-group-text">{t('modal.addon.recheck.title')}</span>
                <input className="form-control" placeholder='0' onBlur={onUpdate} defaultValue={addon.recheck} type='number' pattern={REGEX.NUMBER} list='recheck' name='recheck' />
                <div class="invalid-feedback">{t('error.number')} </div>
              </div>
            </Col>
            <Col md={6} sm={12}>
              <div className="input-group">
                <span className="input-group-text">
                  {t('modal.addon.recheck.interval')}&nbsp;<small>({t('common.sec')})</small>
                </span>
                <input className="form-control" placeholder='0' onBlur={onUpdate} defaultValue={addon.recheckInterval} list='interval' pattern={REGEX.INTERVAL} name='recheckInterval' />
                <div class="invalid-feedback">{t('error.number')} </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Card bg='danger-subtle' text='danger-emphasis' className='mt-3'>
        <div className='card-body'>
          <div className="row">
            <Col xs={12} className='mb-2'>
              {t('modal.addon.recheck.hint')}
            </Col>
            <div className="col">
              <input className="form-check-input"
                type='radio'
                defaultChecked={addon.recheckOption === RECHECK_OPTIONS.STOP}
                onChange={onUpdate}
                value={RECHECK_OPTIONS.STOP}
                name='recheckOption'
                label={t('modal.addon.recheck.stop')}
              />
            </Col>
            <div className="col">
              <input className="form-check-input"
                type='radio'
                defaultChecked={addon.recheckOption === RECHECK_OPTIONS.SKIP}
                onChange={onUpdate}
                value={RECHECK_OPTIONS.SKIP}
                name='recheckOption'
                label={t('modal.addon.recheck.skip')}
              />
            </Col>
            <div className="col">
              <input className="form-check-input"
                type='radio'
                defaultChecked={addon.recheckOption === RECHECK_OPTIONS.RELOAD}
                onChange={onUpdate}
                value={RECHECK_OPTIONS.RELOAD}
                name='recheckOption'
                label={t('modal.addon.recheck.refresh')}
              />{' '}
            </Col>
            <div className="col">
              <input className="form-check-input"
                type='radio'
                defaultChecked={addon.recheckOption === RECHECK_OPTIONS.GOTO}
                onChange={onUpdate}
                value={RECHECK_OPTIONS.GOTO}
                name='recheckOption'
                label={t('modal.addon.recheck.goto')}
              />
            </Col>
            {addon.recheckOption === RECHECK_OPTIONS.GOTO && (
              <Col xs={{ span: 3, offset: 9 }}>
                <Form.Select value={addon.recheckGoto} onChange={onUpdateGoto} name='goto' required>
                  {actions.map((_action, index) => (
                    <option key={_action.id} value={_action.id}>
                      {index + 1} . {_action.name ?? _action.elementFinder}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            )}
          </Row>
        </div>
      </div>
    </>
  );
}
export { AddonRecheck };
