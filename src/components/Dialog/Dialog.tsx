import type { DialogHTMLAttributes } from 'react';

type DialogProps = Omit<DialogHTMLAttributes<HTMLDialogElement>, 'onClose'> & {
  onClose: () => void;
  // Called right after the dialog opens, e.g. to move the focus.
  onOpen?: () => void;
};

// Native <dialog> that is open while mounted: Escape or a backdrop click
// calls onClose, and the parent unmounts it. No effect mirrors a prop.
function Dialog({ onClose, onOpen, children, ...rest }: DialogProps) {
  return (
    <dialog
      {...rest}
      ref={(dialog) => {
        if (dialog && !dialog.open) {
          dialog.showModal();
          onOpen?.();
        }
      }}
      onClose={onClose}
      // A click on the dialog itself (not its content) is a click on the backdrop.
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {children}
    </dialog>
  );
}

export default Dialog;
