
  export const up = async (queryInterface, Sequelize) =>{
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('OrderItems', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE
    });

     await queryInterface.addColumn('OrderItems', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE
    });


  }

  export const down = async (queryInterface, Sequelize)=> {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('OrderItems', 'createdAt');
    await queryInterface.removeColumn('OrderItems', 'updatedAt');
  }

