/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('contacts').del()
  await knex('contacts').insert([
    {name: 'a', email: 'b@g135.com'},
    {name: 'b', email: 'b@g45.com'},
    {name: 'c', email: 'b@g12.com'}
  ]);
};
