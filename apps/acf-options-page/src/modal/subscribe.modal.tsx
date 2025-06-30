/* eslint-disable @typescript-eslint/no-namespace */
import { Card, Modal } from '@dhruv-techapps/ui-components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { subscribeSelector, switchSubscribeModal } from '../store/subscribe';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
const SubscribeModal = () => {
  const { visible, isSubscribing } = useAppSelector(subscribeSelector);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(switchSubscribeModal());
  };

  return (
    <Modal tabIndex={-1} id='subscription-modal' title='Subscribe to Advance Features'>
      <form>
        <div className='row'>
          <div className='col'>
            <Card style={{ height: '100%' }}>
              <Card.Body className='d-flex row-gap-3 flex-column'>
                <h5>Pro subscription</h5>
                <div>
                  <div className='d-flex align-items-center'>
                    <h1 className='m-0 me-2'>10$</h1>
                    <small className='text-grey'>
                      per
                      <br />
                      month
                    </small>
                  </div>
                  <a target='_blank' href='https://github.com/sponsors/Dhruv-Techapps' rel='noreferrer' className='btn btn-primary px-5 py-2 mt-3 w-100'>
                    {isSubscribing && <span className='spinner-border spinner-border-sm me-3' aria-hidden='true'></span>}
                    Upgrade to Pro
                  </a>
                </div>
                <div>
                  <p className='p-0 m-0'>This includes:</p>
                  <ul style={{ listStyle: 'none' }}>
                    <li>Unlimited Google Sheets</li>
                    <li>Unlimited Discord Messaging</li>
                    <li>Captcha resolver (Coming Soon)</li>
                    <li>No Ads</li>
                    <li>
                      <i className='bi bi-discord'></i> VIP Assistance over Discord
                    </li>
                    <li>
                      <i className='bi bi-star'></i> Early access to new Features
                    </li>
                    <li>
                      <i className='bi bi-award-fill'></i>Pride and Joy
                    </li>
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </form>
    </Modal>
  );
};
export { SubscribeModal };
