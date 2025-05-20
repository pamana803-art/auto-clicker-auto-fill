import { CoverLayout } from '@acf-options-page/app/cover-layout';

export function Loading({ message = 'Loading...' }) {
  return (
    <CoverLayout>
      <strong className='me-5'>{message}</strong>
      <div className='spinner-border' aria-hidden='true'></div>
    </CoverLayout>
  );
}
