import express from 'express';
import cors from 'cors';
import rutasGestion from './rutas_gestion.js';
import { sequelize } from './database/index.js';

const app = express();

sequelize.authenticate()
    .then(async () => {
        console.log('Connected to PostgreSQL with Sequelize');
        try {
            // Fetch schemas
            const [schemas] = await sequelize.query(`
                SELECT schema_name
                FROM information_schema.schemata
            `);
            console.log('Schemas in the database:', schemas.map(schema => schema.schema_name));

            // Fetch tables
            const [tables] = await sequelize.query(`
                SELECT table_schema, table_name
                FROM information_schema.tables
                WHERE table_type = 'BASE TABLE'
                AND table_schema NOT IN ('pg_catalog', 'information_schema')
            `);
            console.log('Tables in the database:');
            tables.forEach(table => {
                console.log(`Schema: ${table.table_schema}, Table: ${table.table_name}`);
            });
        } catch (error) {
            console.error('Error fetching schemas or tables:', error);
        }
    })
    .catch(err => console.error('Sequelize connection error:', err));

app.use(cors());
app.use(express.json());
app.use('/', rutasGestion);

app.get('/test-db', async (req, res) => {
    try {
        const [result] = await sequelize.query('SELECT NOW()');
        res.json({ success: true, time: result[0].now });
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).json({ success: false, error: 'Database query failed' });
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
