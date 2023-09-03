import { Logger } from '@dhruv-techapps/core-common';
import { CustomError } from './custom-error';

export * from './config-error';
export * from './custom-error';
export * from './system-error';
export const onError = (error: any) => {
  if (error instanceof CustomError) {
    Logger.colorError(error.title, error.message);
  } else if (error instanceof Error) {
    Logger.colorError(error.message);
  } else {
    Logger.colorError(JSON.stringify(error));
  }
};
