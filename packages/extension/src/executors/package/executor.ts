import { PackageExecutorSchema } from './schema';
import * as webExt from 'web-ext';
import { ExecutorContext } from '@nx/devkit';

export default async function runExecutor(options: PackageExecutorSchema, context: ExecutorContext) {
  console.log('Executor ran for Package', options, context);
  console.log('test', Object.keys(context));
  console.log(context.workspace, context.cwd, context.projectName, context.targetName);

  options.artifactsDir = options.artifactsDir.replace('{workspaceRoot}', context.cwd);
  const webExtOptions = {
    ...options,
    overwriteDest: true,
  };

  await webExt.cmd.build(webExtOptions);
  return {
    success: true,
  };
}
