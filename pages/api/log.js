// import { Pool } from 'pg';

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// export default async function handler(req, res) {
//   if (req.method !== 'POST') return res.status(405).end();

//   const { path, query, userAgent } = req.body;

//   try {
//     await pool.query(
//       'INSERT INTO therapy_appointments (path, query, user_agent) VALUES ($1, $2, $3)',
//       [path, query, userAgent]
//     );
//     res.status(200).json({ success: true });
//   } catch (err) {
//     console.error('Logging failed:', err);
//     res.status(500).json({ error: 'Logging failed' });
//   }
// }

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

// Create the name_gen_logs table if it doesn't exist in your existing database
export async function ensureTableExists() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS therapy_appointments (
        id SERIAL PRIMARY KEY,
        path VARCHAR(255) NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_agent TEXT,
        ip_address TEXT
      )
    `;
    console.log('Therapy app generator logs table ready');
  } catch (error) {
    console.error('Error ensuring table exists:', error);
  }
}
// Log a path visit
export async function logPathVisit(path, userAgent, ipAddress) {
  try {
    // Ensure table exists before inserting
    await ensureTableExists();
    
    const result = await sql`
      INSERT INTO therapy_appointments (path, query, user_agent, ip_address)
      VALUES (${path}, ${query}, ${userAgent}, ${ipAddress})
      RETURNING id, timestamp
    `;

    return result[0];
  } catch (error) {
    console.error('Error logging path visit:', error);
    // Don't throw to avoid breaking the page load
    return null;
  }
}