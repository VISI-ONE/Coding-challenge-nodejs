const request = require('supertest');
const express = require('express');
const knex = require('knex')({
  client: 'sqlite3',
  useNullAsDefault: true
});

jest.mock('knex', () => {
  return jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockImplementation(() => Promise.resolve([
      // Mocked response data
      { id: 1, product_name: 'Product A', price: 10.00, tenant_id: 1 },
      { id: 2, product_name: 'Product B', price: 15.00, tenant_id: 1 }
    ]))
  }));
});