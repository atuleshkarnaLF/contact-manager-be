import knexJs from 'knex';

import knexConfig from './knexFile';

/**
 * Database connection.
 */
const knex = knexJs(knexConfig);

export default knex;
