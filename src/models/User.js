const { BaseEntity } = require('typeorm');

class User extends BaseEntity {
  static fields = {
    id: { primary: true, generated: true },
    firstName: { type: 'varchar' },
    lastName: { type: 'varchar' },
    email: { type: 'varchar', unique: true },
    password: { type: 'varchar' },
    role: { type: 'enum', enum: ['admin', 'investor', 'innovator'] },
    isVerified: { type: 'boolean', default: false }
  };

  static relations = {
    projects: { type: 'one-to-many', target: 'Project', inverseSide: 'innovator' },
    investments: { type: 'one-to-many', target: 'Investment', inverseSide: 'investor' }
  };
}

module.exports = User;