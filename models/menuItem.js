'use strict';
module.exports = function(sequelize, DataTypes) {
  var MenuItems = sequelize.define("MenuItems", {
      itemDesc: {
        type: DataTypes.STRING,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });

    MenuItems.associate = function (models) {
      MenuItems.belongsTo(models.Orders, {
          foreignKey: {
          allowNull: false
        }
      });
    };  

  // Add a belongsTo association to Authors here
  // Example: https://github.com/sequelize/express-example/blob/master/models/task.js
  return MenuItems;
};
