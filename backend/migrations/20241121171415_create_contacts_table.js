// migrations/<timestamp>_create_contacts_table.js
exports.up = function(knex) {
    return knex.schema.createTable('contacts', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('contacts');
  };
  
