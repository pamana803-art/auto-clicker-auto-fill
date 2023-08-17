import React from 'react';
import PropTypes from 'prop-types';
import { Col, Form, FormControl, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { RECHECK_OPTIONS } from '@dhruv-techapps/acf-common';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectedActionAddonSelector } from '../../store/config/action';
import { getFieldNameValue } from '../../util/element';
import { updateActionAddon } from '../../store/config';


function AddonRecheck() {
  const { t } = useTranslation();
  const addon = useAppSelector(selectedActionAddonSelector);
  const dispatch = useAppDispatch();

  const onUpdate = (e) => {
    const update = getFieldNameValue(e);
    dispatch(updateActionAddon(update))
  }

  return (
    <Row>
      <Col md={6} sm={12}>
        <Form.Group controlId="addon-recheck">
          <FormControl placeholder="0" onBlur={onUpdate} defaultValue={addon?.recheck} type="number" pattern="NUMBER" list="recheck" name="recheck" />
          <Form.Label>{t('modal.addon.recheck.title')}</Form.Label>
          <Form.Control.Feedback type="invalid">{t('error.number')}</Form.Control.Feedback>
        </Form.Group>
      </Col>
      <Col md={6} sm={12}>
        <Form.Group controlId="addon-recheck-interval">
          <FormControl placeholder="0" onBlur={onUpdate} defaultValue={addon?.recheckInterval} list="interval" pattern="INTERVAL" name="recheckInterval" />
          <Form.Label>
            {t('modal.addon.recheck.interval')}&nbsp;<small>({t('common.sec')})</small>
          </Form.Label>
          <Form.Control.Feedback type="invalid">{t('error.number')}</Form.Control.Feedback>
        </Form.Group>
      </Col>
      <Col xs={12} className="mb-2">
        <Form.Text className="text-muted">{t('modal.addon.recheck.hint')}</Form.Text>
      </Col>
      <Col xs={12} className="d-flex justify-content-between">
        <Form.Check type="radio" defaultChecked={addon?.recheckOption === RECHECK_OPTIONS.STOP} onChange={onUpdate} value={RECHECK_OPTIONS.STOP} name="recheckOption" label={t('modal.addon.recheck.stop')} />
        <Form.Check type="radio" defaultChecked={addon?.recheckOption === RECHECK_OPTIONS.SKIP} onChange={onUpdate} value={RECHECK_OPTIONS.SKIP} name="recheckOption" label={t('modal.addon.recheck.skip')} />
        <Form.Check
          type="radio"
          defaultChecked={addon?.recheckOption === RECHECK_OPTIONS.RELOAD}
          onChange={onUpdate}
          value={RECHECK_OPTIONS.RELOAD}
          name="recheckOption"
          label={t('modal.addon.recheck.refresh')}
        />
      </Col>
    </Row>
  );
}
export { AddonRecheck };
