'use strict';
module.exports = function(sequelize, DataTypes) {
  var Orders = sequelize.define("Orders", {
    OrderName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Orders.associate = function (models) {
    Orders.belongsTo(models.Waitress, {
        foreignKey: {
        allowNull: false
      }
    });
  };  


  // Add a belongsTo association to Authors here
  // Example: https://github.com/sequelize/express-example/blob/master/models/task.js
  return Orders;
};
