import type { Skill } from '../../types/skill';
import './SkillBar.scss';

type SkillBarProps = {
  skill: Skill;
};

function SkillBar({ skill }: SkillBarProps) {
  return (
    <div className="skill-bar">
      <span className="skill-name">{skill.name}</span>
      <div className="skill-track">
        <div className="skill-fill" style={{ width: `${skill.level}%`, background: skill.color }} />
      </div>
      <span className="skill-percent">{skill.level}%</span>
    </div>
  );
}

export default SkillBar;
