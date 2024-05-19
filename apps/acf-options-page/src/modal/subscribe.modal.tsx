/* eslint-disable @typescript-eslint/no-namespace */
import { Form, Modal } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../hooks';

import { subscribeSelector, switchSubscribeModal } from '../store/subscribe';

import * as React from 'react';
import { appSelector } from '../store/app.slice';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
const SubscribeModal = () => {
  const { visible } = useAppSelector(subscribeSelector);
  const { user } = useAppSelector(appSelector);
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
          <stripe-pricing-table
            pricing-table-id='prctbl_1PHhsTSDC0Xv2JcPZpltx3nc'
            publishable-key='pk_test_51PHeEUSDC0Xv2JcPrxLFKGLgJONW58FU3tgXTpuNR5rkmsBr4hUD40vhF3u5rtGDvGfnGVud5JMUeyoj8TxczeJB00Yv5hzsIw'
            client-reference-id={user?.uid}
            customer-email={user?.email}
          ></stripe-pricing-table>
        </Modal.Body>
      </Form>
    </Modal>
  );
};
export { SubscribeModal };
