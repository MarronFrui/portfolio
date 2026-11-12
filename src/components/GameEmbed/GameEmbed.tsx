import { useRef, type MouseEvent } from 'react';
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
  const frameRef = useRef<HTMLIFrameElement>(null);
  const { translate } = useLanguage();

  // The dialog only exists while `open` is true, so mounting it is what opens
  // it and unmounting is what closes it — no effect needed to mirror the prop.
  if (!open) return null;

  return (
    <dialog
      ref={(dialog) => {
        if (dialog && !dialog.open) {
          dialog.showModal();
          // showModal() would focus the first focusable element — the close
          // button — so keyboard input would never reach the game. Focus the
          // iframe instead; refocusing on load covers the game document
          // finishing after this call.
          frameRef.current?.focus();
        }
      }}
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
          ref={frameRef}
          className="game-embed-frame"
          src={src}
          title={title}
          allow="fullscreen; pointer-lock"
          // The game document may finish loading after the dialog opens;
          // give it the focus again so keys land in the game, not the UI.
          onLoad={() => frameRef.current?.focus()}
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
