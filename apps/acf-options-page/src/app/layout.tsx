import { firebaseSelector } from '@acf-options-page/store/firebase';
import { useAppDispatch, useAppSelector } from '@acf-options-page/store/hooks';
import * as Sentry from '@sentry/react';
import { useEffect } from 'react';
import { Outlet } from 'react-router';

export const Layout = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(firebaseSelector);
  useEffect(() => {
    Sentry.setContext('screen_resolution', {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='loader'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex-1 overflow-auto'>
        <Outlet />
      </div>
    </div>
  );
};
