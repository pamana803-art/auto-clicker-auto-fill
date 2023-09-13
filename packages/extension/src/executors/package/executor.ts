import { PackageExecutorSchema } from './schema';
import * as webExt from 'web-ext';

export default async function runExecutor(options: PackageExecutorSchema, context) {
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
