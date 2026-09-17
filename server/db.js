const mongoose = require('mongoose');

// In-memory persistent data store fallback for when MongoDB server is not locally running
const inMemoryStore = {
  certificates: [
    {
      id: 'CERT-TG-2025-001',
      grain_type: 'Wheat',
      batch_id: 'WHT-PB-904',
      farmer_name: 'Gurpreet Singh',
      location: 'Khanna Mandi, Punjab',
      grade: 'A+',
      trust_score: 96.8,
      sensor_data: {
        moisture: 11.4,
        protein: 14.2,
        infestation: 0.05,
        spectral_signature: 'NIR-SPEC-9942',
        macro_optics: 'OPT-MACRO-8821'
      },
      qr_code: 'QR-TG-PB904',
      timestamp: new Date().toISOString()
    },
    {
      id: 'CERT-TG-2025-002',
      grain_type: 'Rice',
      batch_id: 'RCE-HR-318',
      farmer_name: 'Rajesh Kumar',
      location: 'Karnal Mandi, Haryana',
      grade: 'A',
      trust_score: 91.2,
      sensor_data: {
        moisture: 12.1,
        protein: 12.8,
        infestation: 0.18,
        spectral_signature: 'NIR-SPEC-4431',
        macro_optics: 'OPT-MACRO-1129'
      },
      qr_code: 'QR-TG-HR318',
      timestamp: new Date().toISOString()
    },
    {
      id: 'CERT-TG-2025-003',
      grain_type: 'Maize',
      batch_id: 'MZE-MP-512',
      farmer_name: 'Dinesh Patel',
      location: 'Chhindwara Mandi, MP',
      grade: 'A',
      trust_score: 88.5,
      sensor_data: {
        moisture: 12.6,
        protein: 11.5,
        infestation: 0.32,
        spectral_signature: 'NIR-SPEC-7712',
        macro_optics: 'OPT-MACRO-3349'
      },
      qr_code: 'QR-TG-MP512',
      timestamp: new Date().toISOString()
    }
  ],
  disbursements: [
    {
      id: 'DISB-2025-081',
      bank_name: 'State Bank of India (Agri Division)',
      loan_id: 'LN-TG-88194',
      collateral_id: 'CERT-TG-2025-001',
      amount: 450000,
      status: 'Approved',
      approval_time: 42,
      timestamp: new Date().toISOString()
    },
    {
      id: 'DISB-2025-082',
      bank_name: 'NABARD Rural Credit',
      loan_id: 'LN-TG-77312',
      collateral_id: 'CERT-TG-2025-002',
      amount: 320000,
      status: 'Approved',
      approval_time: 38,
      timestamp: new Date().toISOString()
    }
  ]
};

let isMongoConnected = false;

// Mongoose Schemas for when MongoDB is connected
const CertificateSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  grain_type: { type: String, required: true },
  batch_id: { type: String, required: true },
  farmer_name: { type: String, required: true },
  location: { type: String, required: true },
  grade: { type: String, required: true },
  trust_score: { type: Number, required: true },
  sensor_data: {
    moisture: Number,
    protein: Number,
    infestation: Number,
    spectral_signature: String,
    macro_optics: String
  },
  qr_code: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const DisbursementSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  bank_name: { type: String, required: true },
  loan_id: { type: String, required: true },
  collateral_id: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'Approved' },
  approval_time: { type: Number, default: 45 },
  timestamp: { type: Date, default: Date.now }
});

const CertificateModel = mongoose.model('Certificate', CertificateSchema);
const DisbursementModel = mongoose.model('Disbursement', DisbursementSchema);

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/truegrade';
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
    isMongoConnected = true;
    console.log('[TrueGrade DB] Successfully connected to MongoDB at', uri);
    
    // Seed initial certificates if collection is empty
    const count = await CertificateModel.countDocuments();
    if (count === 0) {
      await CertificateModel.insertMany(inMemoryStore.certificates);
      await DisbursementModel.insertMany(inMemoryStore.disbursements);
      console.log('[TrueGrade DB] Seeded initial certificates and disbursements into MongoDB');
    }
  } catch (err) {
    isMongoConnected = false;
    console.log('[TrueGrade DB] MongoDB not reachable at', uri, '- operating in high-performance memory store mode.');
  }
};

module.exports = {
  connectDB,
  isMongoConnected: () => isMongoConnected,
  inMemoryStore,
  CertificateModel,
  DisbursementModel
};
