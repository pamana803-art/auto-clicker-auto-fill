/* eslint-disable @typescript-eslint/no-namespace */
import { Button, Card, CardBody, CardHeader, Col, Form, Modal, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../hooks';

import { subscribe, subscribeSelector, switchSubscribeModal } from '../store/subscribe';

import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
const SubscribeModal = () => {
  const { visible, products, isSubscribing } = useAppSelector(subscribeSelector);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(switchSubscribeModal());
  };

  console.log(products);

  return (
    <Modal show={visible} size='lg' onHide={handleClose} data-testid='subscription-modal'>
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>Subscribe to Advance Features</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {products?.map((product) => (
              <React.Fragment key='products'>
                {product.prices.map((price) => (
                  <Col key={price.id}>
                    <Card>
                      <CardHeader as='h4'>{price.description}</CardHeader>
                      <CardBody>
                        <div className='d-flex align-items-center'>
                          <h1 className='m-0 me-2'>${price.unit_amount ? price.unit_amount / 100 : null}</h1>
                          <small className='text-secondary'>
                            per
                            <br />
                            {price.recurring.interval}
                          </small>
                        </div>
                        <Button variant='primary' disabled={isSubscribing} className='px-5 py-2 my-3' onClick={() => dispatch(subscribe(price.id))}>
                          Subscribe
                        </Button>
                        <p className='p-0 m-0'>This includes:</p>
                        <ul>
                          <li>Google Sheets</li>
                          <li>Google Drive</li>
                          <li>Discord Messaging</li>
                          <li>Action Addon</li>
                          <li>Action Settings</li>
                          <li>Action Condition</li>
                        </ul>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </React.Fragment>
            ))}
          </Row>
          <stripe-pricing-table pricing-table-id='prctbl_1OuETWC1JFcFykK8FJGEsVbi' publishable-key='pk_test_Z6nlTiNdIFF8Sn7YTiczPahY'></stripe-pricing-table>
        </Modal.Body>
      </Form>
    </Modal>
  );
};
export { SubscribeModal };
