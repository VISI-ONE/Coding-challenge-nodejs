
const { getKnexClient } = require('../src/database');
const fs = require('fs');
const knexfile = require('../knexfile');
const cmd = require('child_process').execSync;

process.env.NODE_ENV = 'test';


async function loadMigrations() {
    const db = await getKnexClient();

    try {
        cmd('rm ' + knexfile.test.connection.filename);
    } catch (e) {
        // do nothing
    }

    const listFiles = fs.readdirSync(__dirname + '/../migrations').filter(fileName => fileName.endsWith('.js'));
    for (let fileName of listFiles) {
        const { up } = require(__dirname + '/../migrations/' + fileName);
        await up(db);
    }
}


beforeAll(async () => {
    await loadMigrations();
});

afterAll(async () => {
    const db = await getKnexClient();
    await db.destroy();
});
