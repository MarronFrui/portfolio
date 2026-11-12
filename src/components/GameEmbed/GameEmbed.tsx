import { useRef } from 'react';
import { useLanguage } from '../../translation/languageContext';
import Dialog from '../Dialog/Dialog';
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

  // The dialog only exists while `open` is true: mounting opens it.
  if (!open) return null;

  return (
    // showModal() focuses the close button, so keyboard input would never
    // reach the game: focus the iframe instead (again on load, since the game
    // document may finish loading after the dialog opens).
    <Dialog
      className="game-embed"
      aria-label={title}
      onClose={onClose}
      onOpen={() => frameRef.current?.focus()}
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
          onLoad={() => frameRef.current?.focus()}
        />

        <p className="game-embed-hint">
          {translate('GAME_EMBED_HINT')}{' '}
          <a href={src} target="_blank" rel="noreferrer">
            {translate('PROJECT_LIVE_DEMO')} ↗
          </a>
        </p>
      </div>
    </Dialog>
  );
}

export default GameEmbed;
