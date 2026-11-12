import { useLanguage } from '../../translation/languageContext';
import type { Project } from '../../types/project';
import Dialog from '../Dialog/Dialog';
import { ProjectLinks, RoleList, StackList } from '../ProjectParts/ProjectParts';
import './ProjectModal.scss';

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

// Detail view of one project, opened by clicking a card.
function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { translate } = useLanguage();

  if (!project) return null;

  return (
    <Dialog className="modal" aria-labelledby="modal-title" onClose={onClose}>
      <div className="modal-content">
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label={translate('MODAL_CLOSE')}
        >
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
          <RoleList role={project.role} />
          <StackList stack={project.stack} />
          <ProjectLinks project={project} />
        </div>
      </div>
    </Dialog>
  );
}

export default ProjectModal;
