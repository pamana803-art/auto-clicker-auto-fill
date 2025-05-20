import { ThemeButtonDropdown } from '@dhruv-techapps/ui-components';
import { PropsWithChildren } from 'react';

import Footer from './footer';

export const CoverLayout = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <>
      <div className='cover-container d-flex w-100 h-100 p-3 text-center mx-auto flex-column'>
        <div className='mb-auto'></div>
        <div className='fx-3'>{children}</div>
        <div className='mt-auto text-start'>
          <Footer />
        </div>
      </div>
      <div className='position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle'>
        <ThemeButtonDropdown drop='up' />
      </div>
    </>
  );
};
