const Sequelize = require('sequelize');

class Dept extends Sequelize.Model {
  static initiate(sequelize) {
    Dept.init({
      dname: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false,        
      },
      admit: {
        type: Sequelize.INTEGER,
        allowNull: false,        
      },
      due: {
        type: Sequelize.DATEONLY,
        allowNull: false,        
      },
      enable: {
        type: Sequelize.INTEGER,
        allowNull: false,        
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Dept',
      tableName: 'depts',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Dept.hasMany(db.Application, { foreignKey: 'deptId', sourceKey: 'id' });
  }
};

module.exports = Dept;
