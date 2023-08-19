import { FormEvent} from 'react';
import { Badge, Button, Form, ListGroup, Modal } from 'react-bootstrap';
import Reorder, { reorder } from 'react-reorder';
import { useTranslation } from 'react-i18next';
import { ErrorAlert } from '../components';
import { configReorderSelector, configReorderUpdateAPI, switchConfigReorderModal, updateConfigReorder } from '../store/config';
import { useAppDispatch, useAppSelector } from '../hooks';


const ReorderConfigsModal = () => {
  const {visible, configs, error } = useAppSelector(configReorderSelector)
  const dispatch = useAppDispatch()
  const { t } = useTranslation();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(configReorderUpdateAPI())
  };

  const handleClose = () => {
    dispatch(switchConfigReorderModal())
  };

  const onReorder = (event: any, previousIndex: any, nextIndex: any) => {
    dispatch(updateConfigReorder(reorder(configs, previousIndex, nextIndex)));
  };

  const onShow = () =>{
    //:TODO
  }
  return (
    <Modal show={visible} size="lg" onHide={handleClose} scrollable onShow={onShow}>
      <Form onSubmit={onSubmit} id="reorder-configs">
        <Modal.Header>
          <Modal.Title as="h6">{t('modal.reorder.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflow: 'auto', height: 'calc(100vh - 200px)' }}>
          <ErrorAlert error={error} />
          <p className="text-muted">{t('modal.reorder.hint')}</p>
          <div className="list-group">
            <Reorder reorderId="configurations" draggedClassName="active" placeholderClassName="list-group" onReorder={onReorder}>
              {configs.map((config, index) => (
                <ListGroup.Item key={index}>
                  {config.name}
                  {!config.enable && (
                    <Badge pill bg="secondary" className="ms-2">
                      {t('common.disabled')}
                    </Badge>
                  )}
                </ListGroup.Item>
              ))}
            </Reorder>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button type="button" variant="outline-primary px-5" onClick={handleClose}>
            {t('common.close')}
          </Button>
          <Button type="submit" variant="primary px-5" className="ml-3" id="reorder-configs-button">
            {t('common.save')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export { ReorderConfigsModal };
