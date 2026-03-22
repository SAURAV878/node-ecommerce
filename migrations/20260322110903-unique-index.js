
  export const up = async  (queryInterface, Sequelize) =>{
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addIndex('Products', ['name', 'userId'], {
      unique: true,
      name:'unique'
    });
  }

  export const down = async  (queryInterface, Sequelize) =>{
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeIndex('Products', 'unique');
  }

