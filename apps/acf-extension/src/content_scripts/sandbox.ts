import { SANDBOX_INITIALIZED } from '../common/constant';

type SandboxReqType = {
  command: string;
  name: string;
  context: string;
};
const Sandbox = (() => {
  let sandbox: HTMLIFrameElement;

  const add = () => {
    sandbox = document.createElement('iframe');
    sandbox.id = 'sandbox-iframe';
    sandbox.src = chrome.runtime.getURL('html/sandbox.html');
    sandbox.style.display = 'none';
    document.body.appendChild(sandbox);
  };

  const remove = () => {
    document.body.removeChild(sandbox);
  };

  const sendMessage = async (message: SandboxReqType): Promise<string> => {
    add();
    return new Promise((resolve, reject) => {
      const listener = (event: MessageEvent) => {
        const { result, error, name, type } = event.data;
        if (event.isTrusted === false) {
          return;
        }
        if (type === SANDBOX_INITIALIZED) {
          sandbox.contentWindow?.postMessage(message, '*');
          return;
        }
        if (name === message.name) {
          remove();
          window.removeEventListener('message', listener);
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      };
      window.addEventListener('message', listener);
    });
  };

  return { sendMessage };
})();

export default Sandbox;
