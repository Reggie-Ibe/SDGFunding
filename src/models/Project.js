const { BaseEntity } = require('typeorm');

class Project extends BaseEntity {
  static fields = {
    id: { primary: true, generated: true },
    title: { type: 'varchar' },
    description: { type: 'text' },
    category: { type: 'enum', enum: ['health', 'education', 'energy', 'environment', 'infrastructure'] },
    fundingGoal: { type: 'decimal' },
    fundedAmount: { type: 'decimal', default: 0 },
    startDate: { type: 'date' },
    endDate: { type: 'date' }
  };

  static relations = {
    innovator: { type: 'many-to-one', target: 'User', inverseSide: 'projects' },
    milestones: { type: 'one-to-many', target: 'Milestone', inverseSide: 'project' },
    investments: { type: 'one-to-many', target: 'Investment', inverseSide: 'project' }
  };
}

module.exports = Project;