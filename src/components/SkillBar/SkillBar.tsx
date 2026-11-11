import type { Skill } from '../../types/skill';
import './SkillBar.scss';

const BLOCK_COUNT = 20;

type SkillBarProps = {
  skill: Skill;
};

function SkillBar({ skill }: SkillBarProps) {
  const filled = Math.round((skill.level / 100) * BLOCK_COUNT);

  return (
    <div className="skill-bar">
      <span className="skill-name">{skill.name}</span>
      <div
        className="skill-track"
        role="meter"
        aria-label={skill.name}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={skill.level}
      >
        {Array.from({ length: BLOCK_COUNT }, (_, i) => (
          <span key={i} className={`skill-block${i < filled ? ' is-filled' : ''}`} />
        ))}
      </div>
      <span className="skill-percent">{skill.level}%</span>
    </div>
  );
}

export default SkillBar;
