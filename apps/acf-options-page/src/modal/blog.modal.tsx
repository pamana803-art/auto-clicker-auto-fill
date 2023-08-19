import { Alert, Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../hooks';
import { blogSelector, hideBlog } from '../store/blog/blog.slice';

const BlogModal = () => {
  const { t } = useTranslation();

  const { visible, version, data } = useAppSelector(blogSelector);
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(hideBlog());
  const onShow = () => {
    //:TODO
  }

  return (
    <Modal show={visible} size='lg' onHide={handleClose} scrollable onShow={onShow}>
      <Modal.Header>
        <Modal.Title as='h6'>Version {version}</Modal.Title>
      </Modal.Header>
      {data ? <Modal.Body style={{ overflow: 'auto', height: 'calc(100vh - 200px)' }} dangerouslySetInnerHTML={{ __html: data }} /> : <Alert>Blog content not found</Alert>}
      <Modal.Footer className='justify-content-end'>
        <Button type='button' variant='outline-primary px-5' onClick={handleClose}>
          {t('common.close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { BlogModal };
