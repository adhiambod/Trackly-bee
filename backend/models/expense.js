// models/expense.js

import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Expense extends Model {
    static associate(models) {
      Expense.belongsTo(models.User, { foreignKey: 'userId' }); // Define association with User model
    }
  }

  Expense.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Name of the referenced model
          key: 'id',
        },
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Expense',
      timestamps: true,
    }
  );

  return Expense;
};
