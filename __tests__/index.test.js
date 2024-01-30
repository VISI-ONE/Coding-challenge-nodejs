const request = require('supertest');
const express = require('express');
const knex = require('knex')({
  client: 'sqlite3',
  useNullAsDefault: true
});