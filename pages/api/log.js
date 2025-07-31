import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { path, query, userAgent } = req.body;

  // Get IP address from headers or socket
  const ip =
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.socket?.remoteAddress ||
    null;

  try {
    const result = await pool.query(
      `INSERT INTO therapy_appointments (path, query, user_agent, ip_address)
       VALUES ($1, $2, $3, $4)
       RETURNING id, timestamp`,
      [path, query, userAgent, ip]
    );

    const { id, timestamp } = result.rows[0];

    res.status(200).json({ success: true, id, timestamp });
  } catch (err) {
    console.error('Logging failed:', err);
    res.status(500).json({ error: 'Logging failed' });
  }
}