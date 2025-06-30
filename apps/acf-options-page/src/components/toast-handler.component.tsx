import { useAppDispatch, useAppSelector } from '../store/hooks';
import { hideToast, toastSelector } from '../store/toast.slice';

export const ToastHandler = () => {
  const toasts = useAppSelector(toastSelector);
  const dispatch = useAppDispatch();
  const close = (selected: number) => dispatch(hideToast(selected));

  const darkColors: Array<string> = ['primary', 'secondary', 'success', 'danger', 'dark'];
  return (
    <div className='toast-container position-fixed bottom-0 start-0 p-3'>
      {toasts.map(({ body, header, variant = 'success', delay = 5000, autohide = true, onClose }, index) => (
        <div
          role='alert'
          aria-live='assertive'
          aria-atomic='true'
          key={`toast-${index}`}
          data-bs-delay={delay}
          className={`toast text-bg-${variant} ${darkColors.includes(variant) && 'text-white'}`}
          data-bs-autohide={variant === 'danger' ? false : autohide}
        >
          <div className='toast-header'>
            <strong className='me-auto'>{header}</strong>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='toast'
              aria-label='Close'
              onClick={() => {
                close(index);
                if (onClose) onClose();
              }}
            ></button>
          </div>
          {body && <div className='toast-body'>{body}</div>}
        </div>
      ))}
    </div>
  );
};
ToastHandler.displayName = 'ToastHandler';
