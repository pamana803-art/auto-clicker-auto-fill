import { Toast } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../hooks';
import { hideToast, toastSelector } from '../store/toast.slice';

export const ToastHandler = () => {
  const toasts = useAppSelector(toastSelector);
  const dispatch = useAppDispatch();
  const close = (selected: number) => dispatch(hideToast(selected));

  return (
    <div className='toast-container position-fixed bottom-0 start-0 p-3'>
      {toasts.map(({ body, header, headerClass, toastClass, bodyClass, delay = 5000, autohide = true, show = true, onClose }, index) => (
        <Toast
          key={index}
          onClose={() => {
            close(index);
            if (onClose) onClose();
          }}
          show={show}
          delay={delay}
          className={toastClass}
          autohide={autohide}
        >
          <Toast.Header className={headerClass}><strong className="me-auto">{header}</strong></Toast.Header>
          {body && <Toast.Body className={bodyClass}>{body}</Toast.Body>}
        </Toast>
      ))}
    </div>
  );
};
ToastHandler.displayName = 'ToastHandler';
