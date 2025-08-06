const db = require('./db');
const features = require('../data/features');

async function setData() {
    const hasUsers = await db.schema.hasTable('users');
    if (!hasUsers) {
        await db.schema.createTable('users', (table) => {
            table.increments('id').primary();
            table.string('username').notNullable().unique();
            table.string('password').notNullable();
            table.string('first_name').notNullable();
            table.string('last_name').notNullable();
            table.integer('age').notNullable();
        });

        await db('users').insert({
            username: 'admin',
            password: '1234',
            first_name: 'Admin',
            last_name: 'Admin',
            age: 30
        });

    }

    const hasProjects = await db.schema.hasTable('projects');
    if (!hasProjects) {
        await db.schema.createTable('projects', (table) => {
            table.increments('id').primary();
            table.string('name');
            table.text('description');
            table.string('version');
            table.string('extraVersions');
            table.string('icon');
        });
        await db('projects').insert(features);
    }

    console.log('Setup complete');
    process.exit();
}

setData();
