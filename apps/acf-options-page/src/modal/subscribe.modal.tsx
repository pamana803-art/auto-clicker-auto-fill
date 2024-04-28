/* eslint-disable @typescript-eslint/no-namespace */
import { Badge, Button, ButtonGroup, Card, CardBody, CardHeader, Col, Form, Modal, Row, ToggleButton } from 'react-bootstrap';
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

  const [yearly, setYearly] = React.useState('year');

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(switchSubscribeModal());
  };

  return (
    <Modal show={visible} size='lg' onHide={handleClose} data-testid='subscription-modal'>
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>Subscribe to Advance Features</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} className='d-flex justify-content-center mb-3'>
              <ButtonGroup>
                <ToggleButton variant='outline-secondary' id='month' type='radio' value='month' checked={yearly === 'month'} className='px-5 py-2' onChange={() => setYearly('month')}>
                  Monthly
                </ToggleButton>
                <ToggleButton variant='outline-primary' id='yearly' type='radio' value='yearly' checked={yearly === 'year'} className='px-5 py-2' onChange={() => setYearly('year')}>
                  Yearly
                </ToggleButton>
              </ButtonGroup>
            </Col>
            <Col className='d-flex justify-content-center mb-3 text-primary'>{yearly === 'month' && <Badge>Save 2 months on yearly subscription</Badge>}</Col>
          </Row>
          <Row>
            <Col>
              <Card style={{ height: '100%' }}>
                <CardHeader as='h4' className='text-success'>
                  Auto Clicker Free
                </CardHeader>
                <CardBody>
                  <p className='p-0 m-0'>This includes:</p>
                  <ul>
                    <li>∞ Configuration</li>
                    <li>∞ Action</li>
                    <li>Batch</li>
                    <li>Click & Fill</li>
                    <li>Notification</li>
                    <li>Settings</li>
                  </ul>
                </CardBody>
              </Card>
            </Col>
            {products?.map((product) => (
              <React.Fragment key={product.id}>
                {product.prices
                  .filter((price) => price.recurring.interval === yearly)
                  .map((price) => (
                    <Col key={price.id}>
                      <Card style={{ height: '100%' }}>
                        <CardHeader as='h4' className={product.name === 'Auto Clicker PRO' ? 'text-danger' : 'text-primary'}>
                          {product.name}
                        </CardHeader>
                        <CardBody className='d-flex justify-content-between flex-column'>
                          <div>
                            <p className='p-0 m-0'>This includes:</p>
                            <ul>
                              {product.name === 'Auto Clicker PRO' && (
                                <>
                                  <li className='text-primary fw-bold'>Auto Clicker Plus+</li>
                                  <li>Google Sheets</li>
                                  <li>Google Drive</li>
                                  <li>Discord Messaging</li>
                                  <li>Assistance over Discord</li>
                                  <li>New Features</li>
                                </>
                              )}
                              {product.name === 'Auto Clicker Plus' && (
                                <>
                                  <li className='text-success fw-bold'>Auto Clicker Free+</li>
                                  <li>No Ads</li>
                                  <li>Action Addon</li>
                                  <li>Action Settings</li>
                                  <li>Action Condition</li>
                                </>
                              )}
                            </ul>
                          </div>
                          <div>
                            <div className='d-flex align-items-center'>
                              <h1 className='m-0 me-2'>${price.unit_amount ? price.unit_amount / 100 : null}</h1>
                              <small className='text-grey'>
                                per
                                <br />
                                {price.recurring.interval}
                              </small>
                            </div>
                            <Button variant='primary' disabled={isSubscribing} className='px-5 py-2 mt-3 w-100' onClick={() => dispatch(subscribe(price.id))}>
                              Subscribe
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
              </React.Fragment>
            ))}
          </Row>
          <stripe-pricing-table pricing-table-id='prctbl_1P8PSvC1JFcFykK8qSih75uB' publishable-key='pk_test_Z6nlTiNdIFF8Sn7YTiczPahY'></stripe-pricing-table>
          {/*<stripe-pricing-table pricing-table-id='prctbl_1OuETWC1JFcFykK8FJGEsVbi' publishable-key='pk_test_Z6nlTiNdIFF8Sn7YTiczPahY'></stripe-pricing-table>*/}
        </Modal.Body>
      </Form>
    </Modal>
  );
};
export { SubscribeModal };
