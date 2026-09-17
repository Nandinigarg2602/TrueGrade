import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    forFarmers: 'For Farmers',
    forLenders: 'For Lenders',
    farmerDashboard: 'Farmer Dashboard',
    lenderDashboard: 'Lender Dashboard',
    backToHome: 'Back to Home',
    heroTitle: 'TrueGrade',
    heroSubtitle: 'Trust is not claimed. It is measured.',
    gradeHarvest: 'Grade Your Harvest',
    gradeSubtitle: 'Get instant quality certification and market intelligence',
    createCertificate: 'Create New Certificate',
    marketIntelligence: 'Market Intelligence',
    myCertificates: 'My Certificates',
    live: 'LIVE',
    hold: 'HOLD',
    sell: 'SELL',
    predictedChange: 'Predicted Change',
    volatility: 'Volatility',
    confidence: 'Confidence'
  },
  hi: {
    forFarmers: 'किसानों के लिए',
    forLenders: 'बैंक व ऋणदाताओं के लिए',
    farmerDashboard: 'किसान डैशबोर्ड',
    lenderDashboard: 'बैंक डैशबोर्ड',
    backToHome: 'होम पर वापस जाएं',
    heroTitle: 'TrueGrade',
    heroSubtitle: 'विश्वास का दावा नहीं किया जाता। इसे मापा जाता है।',
    gradeHarvest: 'अपनी फसल का ग्रेड जांचें',
    gradeSubtitle: 'तत्काल गुणवत्ता प्रमाणन और सटीक मंडी भाव प्राप्त करें',
    createCertificate: 'नया गुणवत्ता प्रमाणपत्र बनाएं',
    marketIntelligence: 'मंडी भाव व बाजार संकेत',
    myCertificates: 'मेरे प्रमाणित लॉट',
    live: 'लाइव',
    hold: 'होल्ड रखें',
    sell: 'बेचें',
    predictedChange: 'अनुमानित बदलाव',
    volatility: 'उतार-चढ़ाव',
    confidence: 'सटीकता'
  },
  pa: {
    forFarmers: 'ਕਿਸਾਨਾਂ ਲਈ',
    forLenders: 'ਬੈਂਕਾਂ ਲਈ',
    farmerDashboard: 'ਕਿਸਾਨ ਡੈਸ਼ਬੋਰਡ',
    lenderDashboard: 'ਬੈਂਕਰ ਡੈਸ਼ਬੋਰਡ',
    backToHome: 'ਮੁੱਖ ਪੰਨੇ ਤੇ ਵਾਪਸ ਜਾਓ',
    heroTitle: 'TrueGrade',
    heroSubtitle: 'ਭਰੋਸਾ ਦਾਅਵੇ ਨਾਲ ਨਹੀਂ, ਨਾਪ ਨਾਲ ਬਣਦਾ ਹੈ।',
    gradeHarvest: 'ਆਪਣੀ ਫਸਲ ਦਾ ਗਰੇਡ ਪਰਖੋ',
    gradeSubtitle: 'ਤੁਰੰਤ ਗੁਣਵੱਤਾ ਪ੍ਰਮਾਣੀਕਰਨ ਅਤੇ ਲਾਈਵ ਮੰਡੀ ਭਾਅ ਪ੍ਰਾਪਤ ਕਰੋ',
    createCertificate: 'ਨਵਾਂ ਸਰਟੀਫਿਕੇਟ ਬਣਾਓ',
    marketIntelligence: 'ਮੰਡੀ ਸੂਝ-ਬੂਝ',
    myCertificates: 'ਮੇਰੇ ਸਰਟੀਫਿਕੇਟ',
    live: 'ਲਾਈਵ',
    hold: 'ਰੋਕੋ (ਹੋਲਡ)',
    sell: 'ਵੇਚੋ',
    predictedChange: 'ਅਨੁਮਾਨਿਤ ਬਦਲਾਅ',
    volatility: 'ਉਤਰਾਅ-ਚੜ੍ਹਾਅ',
    confidence: 'ਭਰੋਸੇਯੋਗਤਾ'
  },
  mr: {
    forFarmers: 'शेतकऱ्यांसाठी',
    forLenders: 'बँकांसाठी',
    farmerDashboard: 'शेतकरी डॅशबोर्ड',
    lenderDashboard: 'बँकर डॅशबोर्ड',
    backToHome: 'मुख्य पृष्ठावर जा',
    heroTitle: 'TrueGrade',
    heroSubtitle: 'विश्वास दावा केला जात नाही. तो मोजला जातो.',
    gradeHarvest: 'तुमच्या पिकाचे ग्रेडिंग करा',
    gradeSubtitle: 'त्वरित गुणवत्ता प्रमाणपत्र आणि थेट बाजार भाव मिळवा',
    createCertificate: 'नवीन प्रमाणपत्र तयार करा',
    marketIntelligence: 'बाजार बुद्धिमत्ता',
    myCertificates: 'माझी प्रमाणपत्रे',
    live: 'थेट',
    hold: 'थांबवा',
    sell: 'विक्री करा',
    predictedChange: 'अपेक्षित बदल',
    volatility: 'चढ-उतार',
    confidence: 'अचूकता'
  },
  te: {
    forFarmers: 'రైతుల కోసం',
    forLenders: 'బ్యాంకుల కోసం',
    farmerDashboard: 'రైతు డాష్‌బోర్డ్',
    lenderDashboard: 'బ్యాంకర్ డాష్‌బోర్డ్',
    backToHome: 'హోమ్‌కి తిరిగి వెళ్ళండి',
    heroTitle: 'TrueGrade',
    heroSubtitle: 'నమ్మకం చెప్పుకునేది కాదు. కొలిచేది.',
    gradeHarvest: 'మీ పంట నాణ్యతను పరీక్షించండి',
    gradeSubtitle: 'తక్షణ నాణ్యతా ధృవీకరణ మరియు మార్కెట్ ధరలు పొందండి',
    createCertificate: 'కొత్త సర్టిఫికెట్ సృష్టించండి',
    marketIntelligence: 'మార్కెట్ విశ్లేషణ',
    myCertificates: 'నా సర్టిఫికెట్లు',
    live: 'లైవ్',
    hold: 'హోల్డ్',
    sell: 'అమ్మండి',
    predictedChange: 'అంచనా వేసిన మార్పు',
    volatility: 'అస్థిరత',
    confidence: 'ఖచ్చితత్వం'
  }
};

export const languages = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' }
];

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'en',
      setLanguage: () => {},
      t: (k) => k,
      languages: []
    };
  }
  return context;
}
