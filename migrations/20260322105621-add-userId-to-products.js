
  export const up = async (queryInterface, Sequelize) =>{
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Products', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }, 
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  }

  export const down = async (queryInterface, Sequelize) =>{
    await queryInterface.removeColumn('Products', 'userId');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }

