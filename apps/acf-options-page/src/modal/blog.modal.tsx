import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { dataLayerModel } from '../util/data-layer';

export type BlogModelRef = {
  showBlog: (v: string) => void;
};

const BlogModal = forwardRef<BlogModelRef>((_, ref) => {
  const { t } = useTranslation();
  const [show, setShow] = useState<boolean>(false);
  const [data, setData] = useState<string | undefined>();
  const [version, setVersion] = useState<string>();

  useImperativeHandle(ref, () => ({
    async showBlog(v: string) {
      setVersion(v);
      const response = await fetch(`https://blog.getautoclicker.com/${v}/`);
      if (response.status === 200) {
        const html = await response.text();
        const div = document.createElement('div');
        div.innerHTML = html;
        setData(div.querySelector('main.content')?.innerHTML);
        setShow(true);
      }
    },
  }));

  const handleClose = () => {
    dataLayerModel('blog', 'close');
    setShow(false);
  };

  return (
    <Modal show={show} size="lg" onHide={handleClose} scrollable onShow={() => dataLayerModel('blog', 'open')}>
      <Modal.Header>
        <Modal.Title as="h6">Version {version}</Modal.Title>
      </Modal.Header>
      {data ? <Modal.Body style={{ overflow: 'auto', height: 'calc(100vh - 200px)' }} dangerouslySetInnerHTML={{ __html: data }} /> : <Alert>Blog content not found</Alert>}
      <Modal.Footer className="justify-content-end">
        <Button type="button" variant="outline-primary px-5" onClick={handleClose}>
          {t('common.close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

BlogModal.displayName = 'BlogModal';
const memo = React.memo(BlogModal);
export { memo as BlogModal };
