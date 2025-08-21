import { Pool } from "pg";

//create a new pool to manage bd connections
// posgre

//Advantages:
//1. manage multiple client connections efficiently.
//2. reduces the overhead of creating new client for each db connection
//3. manage and scaling connection will be easy

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

//whatever query that we will be passing by main.js or any helper function, we want this pool to execute this query
//

async function query(text, params) {
  const start = Date.now();

  try {
    const result = await pool.query(text, params);

    // query execution time
    const duration = Date.now() - start;

    console.log(`executed query: ${{ text, duration, rows: result.rowCount }}`);
    return result;
  } catch (e) {
    console.log("Error---", e);
    throw e;
  }
}

export default query;
