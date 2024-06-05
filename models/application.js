const Sequelize = require('sequelize');

class Application extends Sequelize.Model {
  static initiate(sequelize) {
    Application.init({
      uid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,    
        foreignKey: true,
      },      
      deptId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
      },      
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      engName: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      phoneNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      phoneNumber2: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      licenseName1: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      licenseGet1: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      licenseAgency1: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      licenseName2: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      licenseGet2: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      licenseAgency2: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      licenseName3: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      licenseGet3: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      licenseAgency3: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      licenseName4: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      licenseGet4: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      licenseAgency4: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      companyName1: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      companyPeriod1: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      companyJob1: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      companyName2: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      companyPeriod2: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      companyJob2: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      companyName3: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      companyPeriod3: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      companyJob3: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      companyName4: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      companyPeriod4: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      companyJob4: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      introduction1: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      introduction2: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      introduction3: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      introduction4: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      }
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Application',
      tableName: 'applications',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Application.belongsTo(db.User, { foreignKey: 'uid', targetKey: 'id', onDelete: "CASCADE", hooks: true });
    db.Application.belongsTo(db.Dept, { foreignKey: 'deptId', targetKey: 'id', onDelete: "CASCADE", hooks: true });
  } 

};

module.exports = Application;
