/* eslint no-void: 0 */



export const disableContextMenu = () => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'J')) {
      e.preventDefault();
      return false;
    }
    return true;
  });
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
};
