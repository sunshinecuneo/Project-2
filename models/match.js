module.exports = function (sequelize, DataTypes) {
  var Match = sequelize.define("Match", {
    date: DataTypes.DATE,
    opponent: DataTypes.STRING,
    wl: DataTypes.STRING,
    tote: DataTypes.INTEGER,
    //add epp
    e1: DataTypes.INTEGER,
    e2: DataTypes.INTEGER,
    e3: DataTypes.INTEGER,
    e4: DataTypes.INTEGER,
    e5: DataTypes.INTEGER,
    eob: DataTypes.INTEGER,
    eib: DataTypes.INTEGER,
    eom: DataTypes.INTEGER,
    ebkr: DataTypes.INTEGER,
    toth: DataTypes.INTEGER,
    h1: DataTypes.INTEGER,
    h2: DataTypes.INTEGER,
    h3: DataTypes.INTEGER,
    h4: DataTypes.INTEGER,
    h5: DataTypes.INTEGER,
    hob: DataTypes.INTEGER,
    hib: DataTypes.INTEGER,
    hom: DataTypes.INTEGER,
    hbkr: DataTypes.INTEGER
    
  });


  //user association
  Match.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Match.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

    Match.hasMany(models.Points, {
      onDelete: "cascade"
    });

  };
  //point association
  // Match.associate = function (models) {
  //   // Associating Author with Posts
  //   // When an Author is deleted, also delete any associated Posts
  //   Match.hasMany(models.Points, {
  //     onDelete: "cascade"
  //   });
  // };


  return Match;
};