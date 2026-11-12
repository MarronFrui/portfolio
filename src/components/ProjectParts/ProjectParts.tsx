import { useLanguage } from '../../translation/languageContext';
import type { Project } from '../../types/project';

// Pieces shared by the card, the modal and the showcase.

export function StackList({ stack, className = '' }: { stack: string[]; className?: string }) {
  const { translate } = useLanguage();
  return (
    <ul className={`chip-list ${className}`} aria-label={translate('PROJECT_STACK')}>
      {stack.map((tech) => (
        <li key={tech} className="chip">
          {tech}
        </li>
      ))}
    </ul>
  );
}

export function RoleList({ role }: { role: Project['role'] }) {
  const { translate } = useLanguage();
  return (
    <>
      <h4 className="role-title">{translate('PROJECT_MY_ROLE')}</h4>
      <ul className="role-list">
        {role.map((key) => (
          <li key={key}>{translate(key)}</li>
        ))}
      </ul>
    </>
  );
}

export function ProjectLinks({ project, className = '' }: { project: Project; className?: string }) {
  const { translate } = useLanguage();
  return (
    <div className={`project-links ${className}`}>
      {project.repoUrl && (
        <a className="button" href={project.repoUrl} target="_blank" rel="noreferrer">
          {translate('PROJECT_VIEW_ON_GITHUB')}
        </a>
      )}
      {project.liveUrl && (
        <a className="button button--ghost" href={project.liveUrl} target="_blank" rel="noreferrer">
          {translate('PROJECT_LIVE_DEMO')}
        </a>
      )}
    </div>
  );
}
