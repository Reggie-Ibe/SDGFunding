const { BaseEntity } = require('typeorm');

class Investment extends BaseEntity {
  static fields = {
    id: { primary: true, generated: true },
    amount: { type: 'decimal' },
    date: { type: 'date' }
  };

  static relations = {
    investor: { type: 'many-to-one', target: 'User', inverseSide: 'investments' },
    project: { type: 'many-to-one', target: 'Project', inverseSide: 'investments' }
  };
}

module.exports = Investment;