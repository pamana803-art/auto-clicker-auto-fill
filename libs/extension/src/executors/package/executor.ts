import { PackageExecutorSchema } from './schema';
import * as webExt from 'web-ext';

export default async function runExecutor(options: PackageExecutorSchema) {
  console.log('Executor ran for Package', options);

  const webExtOptions = {
    ...options,
    overwriteDest: true,
  };

  await webExt.cmd.build(webExtOptions);
  return {
    success: true,
  };
}
