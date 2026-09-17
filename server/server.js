require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { connectDB, isMongoConnected, inMemoryStore, CertificateModel, DisbursementModel } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// Helper: Real-time sensor simulation
function generateSensorData() {
  const moisture = Number((Math.random() * 4 + 10).toFixed(1)); // 10.0 - 14.0%
  const protein = Number((Math.random() * 4 + 11).toFixed(1)); // 11.0 - 15.0%
  const infestation = Number((Math.random() * 1.5).toFixed(2)); // 0.0 - 1.5%
  const spectralSignature = `NIR-${Math.floor(1000 + Math.random() * 9000)}`;
  const macroOptics = `OPT-MO-${Math.floor(1000 + Math.random() * 9000)}`;

  return {
    moisture,
    protein,
    infestation,
    spectral_signature: spectralSignature,
    macro_optics: macroOptics
  };
}

// Helper: Calculate grade and trust score
function calculateGrade(sensorData) {
  let score = 100;

  // Moisture penalty if above 12.5%
  if (sensorData.moisture > 12.5) {
    score -= (sensorData.moisture - 12.5) * 6;
  }

  // Protein bonus if above 12.5%
  if (sensorData.protein > 12.5) {
    score += (sensorData.protein - 12.5) * 2.5;
  }

  // Infestation heavy penalty
  score -= sensorData.infestation * 18;

  score = Math.max(50, Math.min(99.5, Number(score.toFixed(1))));

  let grade = 'C';
  if (score >= 93) grade = 'A+';
  else if (score >= 85) grade = 'A';
  else if (score >= 75) grade = 'B+';
  else if (score >= 65) grade = 'B';

  return { grade, trustScore: score };
}

// --- API ROUTES ---

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'TrueGrade API Engine',
    database: isMongoConnected() ? 'MongoDB' : 'In-Memory Datastore',
    uptime: process.uptime()
  });
});

// Live sensor stream endpoint
app.get('/api/sensor-data/live', (req, res) => {
  res.json(generateSensorData());
});

// Market prices (simulated live AGMARKNET / Mandi data)
app.get('/api/market-prices', (req, res) => {
  const basePrices = {
    Rice: 2680,
    Wheat: 2275,
    Maize: 1940
  };

  const mandis = [
    { name: 'Khanna Mandi', state: 'Punjab' },
    { name: 'Karnal Mandi', state: 'Haryana' },
    { name: 'Azadpur Mandi', state: 'Delhi' },
    { name: 'Hapur Mandi', state: 'UP' },
    { name: 'Chhindwara Mandi', state: 'MP' }
  ];

  const results = [];
  const grains = ['Wheat', 'Rice', 'Maize'];

  grains.forEach(grain => {
    mandis.slice(0, 3).forEach(mandi => {
      const delta = (Math.random() * 80 - 40);
      const price = Math.round(basePrices[grain] + delta);
      const changePercent = Number((((price - basePrices[grain]) / basePrices[grain]) * 100).toFixed(2));

      results.push({
        grain_type: grain,
        mandi: `${mandi.name}, ${mandi.state}`,
        price,
        change_percent: changePercent,
        timestamp: new Date().toISOString()
      });
    });
  });

  res.json(results);
});

// Market trends & Hold/Sell recommendation
app.get('/api/market-trends/:grain_type', (req, res) => {
  const grainType = req.params.grain_type || 'Wheat';
  const volatility = Number((Math.random() * 0.25 + 0.1).toFixed(2));
  const predictedChange = Number((Math.random() * 8 - 3).toFixed(1)); // -3% to +5%

  // Hold / Sell decision matrix
  let recommendation = 'HOLD';
  if (predictedChange > 2.5 && volatility < 0.22) {
    recommendation = 'SELL';
  } else if (predictedChange < -1) {
    recommendation = 'HOLD';
  }

  res.json({
    grain_type: grainType,
    recommendation,
    volatility,
    predicted_change: predictedChange,
    confidence: Number((Math.random() * 0.2 + 0.78).toFixed(2))
  });
});

// Get Digital Quality Certificates
app.get('/api/certificates', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const certs = await CertificateModel.find({}).sort({ timestamp: -1 }).lean();
      return res.json(certs);
    }
    return res.json(inMemoryStore.certificates);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve certificates', details: err.message });
  }
});

// Get single certificate by ID
app.get('/api/certificates/:id', async (req, res) => {
  try {
    const certId = req.params.id;
    if (isMongoConnected()) {
      const cert = await CertificateModel.findOne({ id: certId }).lean();
      if (!cert) return res.status(404).json({ error: 'Certificate not found' });
      return res.json(cert);
    }
    const cert = inMemoryStore.certificates.find(c => c.id === certId);
    if (!cert) return res.status(404).json({ error: 'Certificate not found' });
    return res.json(cert);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve certificate', details: err.message });
  }
});

// Create new certificate (Grade Your Harvest)
app.post('/api/certificates', async (req, res) => {
  try {
    const { grain_type, batch_id, farmer_name, location } = req.body;

    if (!grain_type || !batch_id || !farmer_name || !location) {
      return res.status(400).json({ error: 'All fields are required: grain_type, batch_id, farmer_name, location' });
    }

    const sensorData = generateSensorData();
    const { grade, trustScore } = calculateGrade(sensorData);
    const shortCode = uuidv4().substring(0, 6).toUpperCase();

    const newCert = {
      id: `CERT-TG-${Date.now().toString().slice(-4)}-${shortCode}`,
      grain_type,
      batch_id,
      farmer_name,
      location,
      grade,
      trust_score: trustScore,
      sensor_data: sensorData,
      qr_code: `QR-TG-${shortCode}`,
      timestamp: new Date().toISOString()
    };

    if (isMongoConnected()) {
      const created = await CertificateModel.create(newCert);
      return res.status(201).json(created);
    }

    inMemoryStore.certificates.unshift(newCert);
    return res.status(201).json(newCert);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create certificate', details: err.message });
  }
});

// Get Credit Disbursements
app.get('/api/credit-disbursement', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const disbursements = await DisbursementModel.find({}).sort({ timestamp: -1 }).lean();
      return res.json(disbursements);
    }
    return res.json(inMemoryStore.disbursements);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch disbursements', details: err.message });
  }
});

// Create Credit Disbursement (Lend-Link API bridge)
app.post('/api/credit-disbursement', async (req, res) => {
  try {
    const { bank_name, collateral_id, amount } = req.body;

    if (!bank_name || !collateral_id || !amount) {
      return res.status(400).json({ error: 'bank_name, collateral_id, and amount are required' });
    }

    const shortId = uuidv4().substring(0, 6).toUpperCase();
    const newDisbursement = {
      id: `DISB-${Date.now().toString().slice(-4)}-${shortId}`,
      bank_name,
      loan_id: `LN-TG-${shortId}`,
      collateral_id,
      amount: Number(amount),
      status: 'Approved',
      approval_time: Math.floor(Math.random() * 25 + 25), // 25 to 50 seconds
      timestamp: new Date().toISOString()
    };

    if (isMongoConnected()) {
      const created = await DisbursementModel.create(newDisbursement);
      return res.status(201).json(created);
    }

    inMemoryStore.disbursements.unshift(newDisbursement);
    return res.status(201).json(newDisbursement);
  } catch (err) {
    res.status(500).json({ error: 'Failed to record disbursement', details: err.message });
  }
});

// Transparency Stats
app.get('/api/transparency-stats', async (req, res) => {
  try {
    let totalCerts = inMemoryStore.certificates.length;
    let avgTrust = 92.4;

    if (isMongoConnected()) {
      totalCerts = await CertificateModel.countDocuments();
      const avg = await CertificateModel.aggregate([
        { $group: { _id: null, avgScore: { $avg: '$trust_score' } } }
      ]);
      if (avg.length > 0 && avg[0].avgScore) {
        avgTrust = Number(avg[0].avgScore.toFixed(1));
      }
    }

    res.json({
      total_value_facilitated: 84750000, // ₹8.47 Cr
      collateral_velocity: 0.91, // 91%
      active_certificates: totalCerts,
      total_farmers: 7420,
      total_lenders: 128,
      avg_trust_score: avgTrust
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transparency stats', details: err.message });
  }
});

// Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`[TrueGrade Server] API engine listening on port ${PORT}`);
    console.log(`[TrueGrade Server] Health: http://localhost:${PORT}/api/health`);
    console.log(`[TrueGrade Server] Market Prices: http://localhost:${PORT}/api/market-prices`);
    console.log(`[TrueGrade Server] Certificates: http://localhost:${PORT}/api/certificates`);
  });
});
