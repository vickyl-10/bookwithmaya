import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

// Create the therapy_appointments table with all required columns
async function ensureTableExists() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS therapy_appointments (
        id SERIAL PRIMARY KEY,
        path VARCHAR(255) NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_agent TEXT,
        ip_address TEXT,
        request_method VARCHAR(10)
      )
    `;
    console.log('Therapy appointments table ready');
  } catch (error) {
    console.error('Error ensuring table exists:', error);
  }
}

// Log a path visit
async function logPathVisit(path, userAgent, ipAddress, requestMethod) {
  try {
    await ensureTableExists();
    
    const result = await sql`
      INSERT INTO therapy_appointments (path, user_agent, ip_address, request_method)
      VALUES (${path}, ${userAgent}, ${ipAddress}, ${requestMethod})
      RETURNING id, timestamp
    `;
    return result[0];
  } catch (error) {
    console.error('Error logging path visit:', error);
    return null;
  }
}

// Default export function required by Next.js API routes
export default async function handler(req, res) {
  const { method } = req;
  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = req.headers['user-agent'] || 'Unknown';

  // Handle both GET and POST requests
  if (method === 'GET') {
    const path = req.url || '/';
    const result = await logPathVisit(path, userAgent, ipAddress, method);
    
    if (result) {
      console.log('Successfully logged GET visit:', result);
      res.status(200).json({ success: true, id: result.id });
    } else {
      res.status(500).json({ error: 'Failed to log visit' });
    }
  } else if (method === 'POST') {
    const { path, userAgent: bodyUserAgent } = req.body;
    const finalUserAgent = bodyUserAgent || userAgent;
    const result = await logPathVisit(path, finalUserAgent, ipAddress, method);
    
    if (result) {
      console.log('Successfully logged POST visit:', result);
      res.status(200).json({ success: true, id: result.id });
    } else {
      res.status(500).json({ error: 'Failed to log visit' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}