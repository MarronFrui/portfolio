import { useEffect, useRef, type MouseEvent } from 'react';
import { useLanguage } from '../../translation/languageContext';
import './GameEmbed.scss';

type GameEmbedProps = {
  open: boolean;
  title: string;
  src: string;
  onClose: () => void;
};

// Plays a project's real deployed build in an iframe, inside a native
// <dialog>: Escape closes it, focus stays inside while it is open, and the
// page behind does not scroll. The iframe only loads while the dialog is
// open, so nothing runs in the background and every session starts fresh.
function GameEmbed({ open, title, src, onClose }: GameEmbedProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { translate } = useLanguage();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="game-embed"
      aria-label={title}
      onClose={onClose}
      onClick={(event: MouseEvent<HTMLDialogElement>) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="game-embed-panel">
        <button
          type="button"
          className="game-embed-close"
          onClick={onClose}
          aria-label={translate('MODAL_CLOSE')}
        >
          ×
        </button>

        <iframe
          className="game-embed-frame"
          src={open ? src : undefined}
          title={title}
          allow="fullscreen; pointer-lock"
        />

        <p className="game-embed-hint">
          {translate('GAME_EMBED_HINT')}{' '}
          <a href={src} target="_blank" rel="noreferrer">
            {translate('PROJECT_LIVE_DEMO')} ↗
          </a>
        </p>
      </div>
    </dialog>
  );
}

export default GameEmbed;
