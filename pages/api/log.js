import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { path, query, userAgent } = req.body;

  try {
    await pool.query(
      'INSERT INTO therapy_appointments (path, query, user_agent) VALUES ($1, $2, $3)',
      [path, query, userAgent]
    );
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Logging failed:', err);
    res.status(500).json({ error: 'Logging failed' });
  }
}
