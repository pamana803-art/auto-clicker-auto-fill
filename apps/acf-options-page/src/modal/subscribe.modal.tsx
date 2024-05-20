/* eslint-disable @typescript-eslint/no-namespace */
import { Button, ButtonGroup, Card, CardBody, Col, Form, Modal, Row, ToggleButton } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../hooks';

import { subscribe, subscribeSelector, switchSubscribeModal } from '../store/subscribe';

import * as React from 'react';
import { AwardFill, Discord, Fire, Star } from '../util';

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
    <Modal show={visible} size='lg' onHide={handleClose} data-testid='subscription-modal' id='subscription-modal'>
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
            <Col className='d-flex justify-content-center mb-3 text-danger'>
              {yearly === 'month' && (
                <div>
                  <Fire /> Save 2 months on yearly subscription
                </div>
              )}
            </Col>
          </Row>
          <Row>
            {products?.map((product) => (
              <React.Fragment key={product.id}>
                {product.prices
                  ?.filter((price) => price.recurring.interval === yearly)
                  .map((price) => (
                    <Col key={price.id}>
                      <Card style={{ height: '100%' }}>
                        <CardBody className='d-flex row-gap-3 flex-column '>
                          <img src={product.images[0]} width='100px' alt='product' />
                          <h5>{product.name}</h5>
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
                              {isSubscribing && <span className='spinner-border spinner-border-sm me-3' aria-hidden='true'></span>}
                              Upgrade to {product.name.replace('Auto Clicker AutoFill', '')}
                            </Button>
                          </div>
                          <div>
                            <p className='p-0 m-0'>This includes:</p>
                            <ul style={{ listStyle: 'none' }}>
                              {product.name.includes('Pro') && (
                                <>
                                  <li className='text-primary fw-bold'> Plus+</li>
                                  <li>Google Sheets</li>
                                  <li>Google Backup</li>
                                  <li>Discord Messaging</li>
                                  <li>Captcha resolver</li>
                                  <li>
                                    <Discord /> Assistance over Discord
                                  </li>
                                  <li>
                                    <Star /> Early access to new Features
                                  </li>
                                  <li>
                                    <AwardFill /> Pride and Joy
                                  </li>
                                </>
                              )}
                              {product.name.includes('Plus') && (
                                <>
                                  <li>No Ads</li>
                                  <li>Action Addon</li>
                                  <li>Action Settings</li>
                                  <li>Action Condition</li>
                                  <li>
                                    <Discord /> Assistance over Discord
                                  </li>
                                  <li>
                                    <Star /> Early access to new Features
                                  </li>
                                </>
                              )}
                            </ul>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
              </React.Fragment>
            ))}
          </Row>
        </Modal.Body>
      </Form>
    </Modal>
  );
};
export { SubscribeModal };
