import { useEffect, useRef } from 'react';
import { useLanguage } from '../../i18n/languageContext';
import type { Project } from '../../types/project';
import './ProjectModal.scss';

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

// Detail view of one project, opened by clicking a card.
// Native <dialog>: Escape closes it and focus stays inside while it is open.
function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { translate } = useLanguage();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby="modal-title"
      onClose={onClose}
      // A click on the dialog itself (not its content) is a click on the backdrop.
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      {project && (
        <div className="modal-content">
          <button type="button" className="modal-close" onClick={close} aria-label={translate('MODAL_CLOSE')}>
            ×
          </button>

          <div className="modal-media">
            {project.video ? (
              <video
                src={project.video}
                poster={project.cover.src}
                muted
                loop
                autoPlay
                playsInline
                controls
              />
            ) : (
              <img src={project.cover.src} alt={translate(project.cover.alt)} />
            )}
          </div>

          <div className="modal-body">
            <h3 id="modal-title" className="modal-title">
              {translate(project.title)}
            </h3>
            <p className="modal-summary">{translate(project.summary)}</p>

            <h4 className="modal-subtitle">{translate('PROJECT_MY_ROLE')}</h4>
            <ul className="modal-role">
              {project.role.map((key) => (
                <li key={key}>{translate(key)}</li>
              ))}
            </ul>

            <ul className="modal-stack" aria-label={translate('PROJECT_STACK')}>
              {project.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>

            <div className="modal-actions">
              {project.repoUrl && (
                <a className="button" href={project.repoUrl} target="_blank" rel="noreferrer">
                  {translate('PROJECT_VIEW_ON_GITHUB')}
                </a>
              )}
              {project.liveUrl && (
                <a
                  className="button button--ghost"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {translate('PROJECT_LIVE_DEMO')}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

export default ProjectModal;
