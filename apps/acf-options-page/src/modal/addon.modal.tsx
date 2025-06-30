import { useTimeout } from '@acf-options-page/hooks';
import { ADDON_CONDITIONS } from '@dhruv-techapps/acf-common';
import { FormEvent, useEffect } from 'react';
import { Alert, Button, Card, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ValueExtractorPopover } from '../popover';
import { actionAddonSelector, setActionAddonMessage, switchActionAddonModal, syncActionAddon, updateActionAddon } from '../store/config';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getFieldNameValue, updateForm } from '../utils/element';
import { AddonRecheck } from './addon/recheck';
import { AddonValueExtractorFlags } from './addon/value-extractor-flags';

const FORM_ID = 'addon';

const AddonModal = () => {
  const { t } = useTranslation();
  const { visible, message, error, addon } = useAppSelector(actionAddonSelector);

  const dispatch = useAppDispatch();

  useTimeout(() => {
    dispatch(setActionAddonMessage());
  }, message);

  const onUpdate = (e) => {
    const update = getFieldNameValue(e, addon);
    if (update) {
      dispatch(updateActionAddon(update));
    }
  };

  useEffect(() => {
    updateForm(FORM_ID, addon);
  }, [addon]);

  const onReset = () => {
    dispatch(syncActionAddon());
    onHide();
  };

  const onHide = () => {
    dispatch(switchActionAddonModal());
  };

  const onShow = () => {
    //:TODO
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    form.checkValidity();
    dispatch(syncActionAddon(addon));
  };

  return (
    <Modal show={visible} size='lg' onHide={onHide} onShow={onShow} data-testid='addon-modal'>
      <form id={FORM_ID} onSubmit={onSubmit} onReset={onReset}>
        <Modal.Header closeButton>
          <Modal.Title as='h6'>{t('modal.addon.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='text-muted'>{t('modal.addon.info')}</p>
          <Card>
            <div className='card-body'>
              <Row className='mb-3'>
                <Col md={6} sm={12}>
                  <Form.Group controlId='addon-element'>
                    <Form.Label>
                      {t('modal.addon.elementFinder')} <small className='text-danger'>*</small>
                    </Form.Label>
                    <Form.Control type='text' placeholder='Element Finder' defaultValue={addon.elementFinder} onBlur={onUpdate} list='elementFinder' name='elementFinder' required />
                    <div class="invalid-feedback">{t('error.elementFinder')} </div>
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group controlId='addon-condition'>
                    <Form.Label>
                      {t('modal.addon.condition')} <small className='text-danger'>*</small>
                    </Form.Label>
                    <Form.Select value={addon.condition} onChange={onUpdate} name='condition' required>
                      {Object.entries(ADDON_CONDITIONS).map((condition) => (
                        <option key={condition[1]} value={condition[1]}>
                          {condition[0]}
                        </option>
                      ))}
                    </Form.Select>
                    <div class="invalid-feedback">{t('error.condition')} </div>
                  </Form.Group>
                </Col>
              </Row>
              <div className="row">
                <Col md sm={12}>
                  <Form.Group controlId='addon-value'>
                    <Form.Label>
                      {t('modal.addon.value')} <small className='text-danger'>*</small>
                    </Form.Label>
                    <Form.Control type='text' placeholder='Value' defaultValue={addon.value} onBlur={onUpdate} name='value' required list='value' />
                    <div class="invalid-feedback">{t('error.value')} </div>
                  </Form.Group>
                </Col>
                <Col md sm={12}>
                  <Form.Group controlId='addon-value-extractor' className='addon-value-extractor'>
                    <Form.Label>{t('modal.addon.valueExtractor')}</Form.Label>
                    <div className="input-group">
                      <Form.Control type='text' placeholder='Value Extractor' defaultValue={addon.valueExtractor} name='valueExtractor' list='valueExtractor' onBlur={onUpdate} />
                      {addon?.valueExtractor ? (
                        <AddonValueExtractorFlags />
                      ) : (
                        <span className="input-group-text">
                          <ValueExtractorPopover />
                        </span>
                      )}
                    </div>
                    <div class="invalid-feedback">{t('error.valueExtractor')} </div>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
          <div hidden={!(addon.elementFinder && addon.condition && addon.value)} data-testid='addon-recheck'>
            <AddonRecheck />
          </div>
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
          <button className="btn" type='reset' variant='outline-primary' className='px-5' data-testid='action-addon-reset'>
            {t('common.clear')}
          </button>
          <button className="btn" type='submit' variant='primary' className='px-5' data-testid='action-addon-save'>
            {t('common.save')}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export { AddonModal };
