import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    ),
  });
}

const HF_URL =
  'https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization || '';
  const idToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!idToken) {
    return res.status(401).json({ error: 'Missing auth token' });
  }

  try {
    await admin.auth().verifyIdToken(idToken);
  } catch (err) {
    return res.status(401).json({ error: 'Invalid auth token' });
  }

  const { inputs } = req.body || {};
  if (!inputs || typeof inputs !== 'string') {
    return res.status(400).json({ error: 'Missing inputs' });
  }

  const hfResponse = await fetch(HF_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
    },
    body: JSON.stringify({ inputs }),
  });

  if (!hfResponse.ok) {
    const errorBody = await hfResponse.text();
    return res.status(hfResponse.status).json({ error: errorBody });
  }

  const arrayBuffer = await hfResponse.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  res.setHeader(
    'Content-Type',
    hfResponse.headers.get('content-type') || 'image/jpeg'
  );
  return res.status(200).send(buffer);
}
