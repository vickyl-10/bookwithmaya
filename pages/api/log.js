import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

// Create the therapy_appointments table if it doesn't exist in your existing database
export async function ensureTableExists() {
  try {
    // First, try to create the table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS therapy_appointments (
        id SERIAL PRIMARY KEY,
        path VARCHAR(255) NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_agent TEXT,
        ip_address TEXT
      )
    `;
    
    // Check if ip_address column exists, if not add it
    try {
      await sql`SELECT ip_address FROM therapy_appointments LIMIT 1`;
    } catch (error) {
      // Column doesn't exist, add it
      await sql`ALTER TABLE therapy_appointments ADD COLUMN ip_address TEXT`;
      console.log('Added ip_address column to existing table');
    }
    
    console.log('Therapy appointments table ready');
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
      INSERT INTO therapy_appointments (path, user_agent, ip_address)
      VALUES (${path}, ${userAgent}, ${ipAddress})
      RETURNING id, timestamp
    `;
    return result[0];
  } catch (error) {
    console.error('Error logging path visit:', error);
    // Don't throw to avoid breaking the page load
    return null;
  }
}

// Default export function required by Next.js API routes
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { path, query, userAgent } = req.body;
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const result = await logPathVisit(path, userAgent, ipAddress);
    
    if (result) {
      console.log('Successfully logged visit:', result);
      res.status(200).json({ success: true, id: result.id });
    } else {
      res.status(500).json({ error: 'Failed to log visit' });
    }
  } catch (error) {
    console.error('API handler error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}