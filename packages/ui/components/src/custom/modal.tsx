import { JSX } from 'react';

type ModalProps = {
  title: string;
  children?: JSX.Element | string;
  footer?: JSX.Element | string;
} & React.HTMLAttributes<HTMLDivElement>;

export const Modal = (props: ModalProps) => {
  const { title, children, footer, id } = props;
  const label = props['aria-labelledby'] || `${id}label`;
  return (
    <div className='modal fade' id={id} data-testid={id} aria-hidden='true' aria-labelledby={label} tabIndex={-1}>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id={label}>
              {title}
            </h1>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div className='modal-body'>{children}</div>
          <div className='modal-footer'>{footer}</div>
        </div>
      </div>
    </div>
  );
};
