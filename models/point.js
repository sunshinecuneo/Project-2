
  module.exports = function(sequelize, DataTypes) {
    var Points = sequelize.define("Points", {
        wl: DataTypes.STRING,
        match_id: DataTypes.STRING,
        tote: DataTypes.INTEGER,
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

    Points.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Points.belongsTo(models.Match, {
          foreignKey: {
            allowNull: false
          }
        });
      };


    return Points;
};