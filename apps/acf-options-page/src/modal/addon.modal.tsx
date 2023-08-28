import { Button, Card, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import { ADDON_CONDITIONS } from '@dhruv-techapps/acf-common';
import { useTranslation } from 'react-i18next';

import { ValueExtractorPopover } from '../popover';
import { AddonRecheck } from './addon/recheck';
import { getFieldNameValue } from '../util/element';
import { AddonValueExtractorFlags } from './addon/value-extractor-flags';
import { useAppDispatch, useAppSelector } from '../hooks';
import { actionAddonSelector, setActionAddonMessage, switchActionAddonModal } from '../store/config/action/addon/addon.slice';
import { resetActionAddon, updateActionAddon } from '../store/config';
import { selectedActionAddonSelector } from '../store/config';
import { ErrorAlert } from '../components';
import { useTimeout } from '../_hooks/message.hooks';

const FORM_ID = 'addon';

const AddonModal = () => {
  const { t } = useTranslation();
  const addon = useAppSelector(selectedActionAddonSelector);
  const { visible, message, error } = useAppSelector(actionAddonSelector);
  const dispatch = useAppDispatch();

  const onUpdate = (e) => {
    const update = getFieldNameValue(e, addon);
    if (update) {
      dispatch(updateActionAddon(update));
    }
  };

  useTimeout(() => {
    dispatch(setActionAddonMessage());
  }, message);

  const handleClose = () => {
    dispatch(switchActionAddonModal());
  };

  const onReset = () => {
    dispatch(resetActionAddon());
    handleClose();
  };

  const onShow = () => {
    //:TODO
  };

  return (
    <Modal show={visible} size='lg' onHide={handleClose} onShow={onShow}>
      <Form id={FORM_ID}>
        <Modal.Header closeButton>
          <Modal.Title as='h6'>{t('modal.addon.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='text-muted'>{t('modal.addon.info')}</p>
          <Card>
            <Card.Body>
              <ErrorAlert error={error} />
              <Row className='mb-3'>
                <Col md={6} sm={12}>
                  <Form.Group controlId='addon-element'>
                    <Form.Control type='text' placeholder='Element Finder' defaultValue={addon?.elementFinder} onBlur={onUpdate} list='elementFinder' name='elementFinder' required />
                    <Form.Label>
                      {t('modal.addon.elementFinder')} <small className='text-danger'>*</small>
                    </Form.Label>
                    <Form.Control.Feedback type='invalid'>{t('error.elementFinder')}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group controlId='addon-condition'>
                    <Form.Select value={addon?.condition} onChange={onUpdate} name='condition' required>
                      {Object.entries(ADDON_CONDITIONS).map((condition, index) => (
                        <option key={index} value={condition[1]}>
                          {condition[0]}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Label>
                      {t('modal.addon.condition')} <small className='text-danger'>*</small>
                    </Form.Label>
                    <Form.Control.Feedback type='invalid'>{t('error.condition')}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md sm={12}>
                  <Form.Group controlId='addon-value'>
                    <Form.Control type='text' placeholder='Value' defaultValue={addon?.value} onBlur={onUpdate} name='value' required list='value' />
                    <Form.Label>
                      {t('modal.addon.value')} <small className='text-danger'>*</small>
                    </Form.Label>
                    <Form.Control.Feedback type='invalid'>{t('error.value')}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md sm={12}>
                  <Form.Group controlId='addon-value-extractor' className='addon-value-extractor'>
                    <InputGroup>
                      <Form.Control type='text' placeholder='Value Extractor' defaultValue={addon?.valueExtractor} name='valueExtractor' list='valueExtractor' onBlur={onUpdate} />
                      <AddonValueExtractorFlags />
                    </InputGroup>
                    <Form.Label>{t('modal.addon.valueExtractor')}</Form.Label>
                    {!addon?.valueExtractor && <ValueExtractorPopover />}
                    <Form.Control.Feedback type='invalid'>{t('error.valueExtractor')}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <div hidden={!(addon?.elementFinder && addon?.condition && addon?.value)}>
                <hr />
                <AddonRecheck />
              </div>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer className='justify-content-between'>
          <Button variant='outline-primary px-5' onClick={onReset}>
            {t('common.clear')}
          </Button>
          <span className='text-success'>{message}</span>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export { AddonModal };
