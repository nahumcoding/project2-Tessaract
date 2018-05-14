module.exports = function(sequelize, DataTypes) {
  var Waitress = sequelize.define("Waitress", {
    // Giving the Author model a name of type STRING
    waitressID: DataTypes.STRING
  });

  Waitress.associate = function(models){
  	Waitress.hasMany(models.Orders, {
      foreignKey: 'waitress',
  		onDelete: 'cascade'
  	});
  };

  return Waitress;
};
