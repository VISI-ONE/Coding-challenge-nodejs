exports.seed = async function (knex) {
  // Check if data already exists in the priceboard table
  const existingPriceboards = await knex('priceboard').select();
  
  // If there's no existing data, insert the sample data
  if (existingPriceboards.length === 0) {
    return knex('priceboard').insert([
      { product_name: 'Product 1', price: 10.99, tenant_id: 1 },
      { product_name: 'Product 2', price: 15.99, tenant_id: 1 },
      { product_name: 'Product 3', price: 8.49, tenant_id: 2 },
      { product_name: 'Product 4', price: 12.99, tenant_id: 2 },
    ]);
  }
};