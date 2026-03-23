

  export const up = async  (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('Categories', 'name',{
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });

    await queryInterface.changeColumn('Categories', 'slug', {
      type:Sequelize.STRING,
      allowNull: false,
      unique: true
    });
  }

  export const down = async  (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('Categories', 'name');
    await queryInterface.changeColumn('Categories', 'slug');
  }

