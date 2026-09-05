export interface DomainKnowledge {
  domain: string;
  technologies: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  projectPatterns: string[];
  potentialDatasets: string[];
  featureIdeas: string[];
  advancedExtensions: string[];
  commonChallenges: string[];
}

export const DOMAIN_KNOWLEDGE_BASE: Record<string, DomainKnowledge> = {
  'AI/ML': {
    domain: 'AI & Machine Learning',
    technologies: ['Python', 'FastAPI', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'HuggingFace', 'LangChain', 'OpenCV'],
    difficulty: 'Intermediate',
    projectPatterns: ['Predictive Analytics Dashboard', 'Computer Vision Quality Inspector', 'RAG Document Assistant', 'Anomaly Detector'],
    potentialDatasets: ['Kaggle Healthcare/Finance records', 'MIMIC-III clinical dataset', 'Common Voice audio', 'COCO object detection'],
    featureIdeas: ['Model confidence scoring', 'Feature importance radar', 'Explainable AI SHAP values', 'Real-time inference API'],
    advancedExtensions: ['Federated learning edge deployment', 'Active feedback retraining loop', 'ONNX runtime browser inference'],
    commonChallenges: ['Data sparsity and imbalance', 'Inference latency under load', 'Model hallucination or calibration drift']
  },
  'Healthcare': {
    domain: 'Healthcare & MedTech',
    technologies: ['FastAPI', 'Python', 'React', 'PostgreSQL', 'Scikit-learn', 'FHIR API', 'Tailwind CSS'],
    difficulty: 'Intermediate',
    projectPatterns: ['Patient Risk Stratification', 'Early Disease Onset Screening', 'Medical Image Segmentation', 'Telehealth Triage Assistant'],
    potentialDatasets: ['PhysioNet Cardiology data', 'Kaggle Diabetes/Cardio indicators', 'NIH Chest X-Ray 14', 'CDC NHANES'],
    featureIdeas: ['Risk probability calculator', 'Interactive symptom timeline', 'Doctor summary report generator (PDF)', 'Patient privacy consent logs'],
    advancedExtensions: ['HIPAA-compliant tokenized audit trail', 'Multimodal analysis (vitals + lab notes)', 'Explainability heatmaps for clinicians'],
    commonChallenges: ['Strict privacy regulations', 'High consequence of false negatives', 'Handling noisy unstructured clinical notes']
  },
  'Web Development': {
    domain: 'Modern Web Development',
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Prisma', 'Redis'],
    difficulty: 'Beginner',
    projectPatterns: ['Collaborative Workflow Hub', 'Real-Time Developer Workspace', 'Micro-SaaS Analytics Platform', 'B2B Resource Marketplace'],
    potentialDatasets: ['GitHub REST APIs', 'OpenWeatherMap data', 'Stripe mock events', 'Public civic transit feeds'],
    featureIdeas: ['Role-based access matrix', 'Live collaborative editing', 'Dynamic report export (CSV/PDF)', 'Optimistic UI updates'],
    advancedExtensions: ['WebSockets with presence tracking', 'Serverless background cron jobs', 'Custom plugin marketplace architecture'],
    commonChallenges: ['State synchronization across clients', 'Database connection pooling in serverless', 'Responsive layout density']
  },
  'Cybersecurity': {
    domain: 'Cybersecurity & Infosec',
    technologies: ['Python', 'Go', 'Elasticsearch', 'Zeek/Suricata', 'React', 'Wireshark pcap', 'Docker'],
    difficulty: 'Advanced',
    projectPatterns: ['Zero-Trust API Gateway Auditor', 'Automated Threat Intelligence Correlator', 'Phishing URL Analyzer', 'Network Anomaly Detection Engine'],
    potentialDatasets: ['CICIDS 2017 Intrusion Dataset', 'PhishTank verified blacklist', 'MITRE ATT&CK enterprise matrices', 'VirusTotal sample hashes'],
    featureIdeas: ['Attack surface risk meter', 'MITRE technique mapping', 'Automated incident triage report', 'Honeypot log visualizer'],
    advancedExtensions: ['Behavioral baseline drift detection', 'Encrypted traffic classification without decryption', 'Automated firewall rule synthesis'],
    commonChallenges: ['High volume of benign log noise', 'Keeping detection signatures updated', 'Safe sandboxing of untrusted payloads']
  },
  'IoT': {
    domain: 'Internet of Things & Embedded',
    technologies: ['ESP32', 'Raspberry Pi', 'MQTT', 'C++', 'Python', 'InfluxDB', 'Node.js', 'Grafana'],
    difficulty: 'Intermediate',
    projectPatterns: ['Smart Campus Energy Optimizer', 'Agricultural Soil & Microclimate Node', 'Cold-Chain Logistics Tracker', 'Predictive Industrial Motor Monitor'],
    potentialDatasets: ['Sensor time-series telemetries', 'NOAA micro-weather telemetry', 'UCI Air Quality readings'],
    featureIdeas: ['Live gauge dashboard', 'Threshold alert triggers (SMS/Email)', 'Offline sensor caching buffer', 'Hardware telemetry diagnostics'],
    advancedExtensions: ['Edge TinyML vibration anomaly classifier', 'LoRaWAN long-range mesh relay', 'Over-The-Air (OTA) firmware update manager'],
    commonChallenges: ['Unreliable field connectivity', 'Strict power/battery life limits', 'Sensor calibration drift']
  },
  'Cloud': {
    domain: 'Cloud & DevOps Engineering',
    technologies: ['Docker', 'Kubernetes', 'Terraform', 'Prometheus', 'Go', 'Node.js', 'AWS/GCP APIs'],
    difficulty: 'Intermediate',
    projectPatterns: ['Multi-Cloud Cost Anomaly Sentinel', 'GitOps Ephemeral Environment Provisioner', 'Container Vulnerability Policy Engine', 'Serverless Cold-Start Optimizer'],
    potentialDatasets: ['CloudWatch/GCP Cloud Monitoring logs', 'Kubernetes audit event streams', 'CVE National Vulnerability Database'],
    featureIdeas: ['Cost burn-rate projection', 'Cluster health heatmaps', 'One-click policy rollback', 'Resource utilization recommendations'],
    advancedExtensions: ['Predictive auto-scaling with ML', 'Automated drift remediation', 'Multi-region disaster recovery coordinator'],
    commonChallenges: ['Cloud API rate-limiting', 'Complex IAM permission boundaries', 'Cost accumulation during testing']
  },
  'FinTech': {
    domain: 'Financial Technology',
    technologies: ['TypeScript', 'Node.js', 'PostgreSQL', 'Python', 'Chart.js', 'Plaid API', 'Docker'],
    difficulty: 'Intermediate',
    projectPatterns: ['Algorithmic Expense Optimizer & Budget Predictor', 'Credit Risk Scoring Engine', 'Micro-Investment Round-Up Simulator', 'Automated Invoice Factoring Platform'],
    potentialDatasets: ['Kaggle Credit Card Fraud dataset', 'SEC EDGAR financial filings', 'FRED Federal Reserve economic series'],
    featureIdeas: ['Double-entry bookkeeping ledger', 'Fraud risk scoring badge', 'Category cashflow breakdown', 'What-if investment scenario simulator'],
    advancedExtensions: ['Audit-proof immutable event sourcing', 'Monte Carlo portfolio stress simulation', 'Synthetic test transaction generator'],
    commonChallenges: ['Floating point precision in currency calculation', 'Stringent regulatory compliance standards', 'Sensitive PII storage']
  },
  'EdTech': {
    domain: 'Educational Technology',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'WebRTC', 'Tailwind CSS', 'Gemini API'],
    difficulty: 'Beginner',
    projectPatterns: ['Adaptive Coding Challenge Tutor', 'AI Socratic Concept Explainer', 'Peer-Review Grading Harmonizer', 'Interactive STEM Lab Sandbox'],
    potentialDatasets: ['StackOverflow Q&A archives', 'OpenStax textbook corpora', 'Standard curriculum competency trees'],
    featureIdeas: ['Personalized mastery progress rings', 'Step-by-step hint generator', 'Automated code review lint checks', 'Spaced repetition flashcards'],
    advancedExtensions: ['Real-time student confusion detection from question patterns', 'Knowledge graph prerequisite visualizer', 'Voice-driven pronunciation evaluator'],
    commonChallenges: ['Maintaining student engagement without distraction', 'Evaluating subjective open-ended submissions', 'Scalable live grading']
  },
  'Agriculture': {
    domain: 'AgriTech & Smart Farming',
    technologies: ['Python', 'OpenCV', 'FastAPI', 'React', 'MQTT', 'PostgreSQL', 'Leaflet.js'],
    difficulty: 'Intermediate',
    projectPatterns: ['Crop Disease Leaf Classifier & Treatment Advisor', 'Precision Irrigation Scheduler', 'Yield Forecast Satellite Analyzer', 'Farm-to-Consumer Traceability System'],
    potentialDatasets: ['PlantVillage crop disease images', 'Landsat/Sentinel-2 vegetation indices', 'FAO Global Crop Calendars'],
    featureIdeas: ['Interactive drone/field satellite map', 'Pest alert push notifications', 'Water savings meter', 'Market mandi price comparator'],
    advancedExtensions: ['Edge mobile phone inference without internet', 'Multispectral NDVI calculation pipeline', 'Supply chain harvest batch verification'],
    commonChallenges: ['Low internet bandwidth in rural farms', 'Varying natural sunlight in photo capture', 'Seasonal dataset constraints']
  },
  'Environment': {
    domain: 'CleanTech & Environmental Sciences',
    technologies: ['Python', 'PostgreSQL', 'FastAPI', 'React', 'D3.js', 'GeoJSON', 'Docker'],
    difficulty: 'Intermediate',
    projectPatterns: ['Hyperlocal Air Quality Index Predictor', 'Urban Heat Island Microclimate Mapper', 'Corporate Carbon Footprint Ledger', 'Illegal Deforestation Sentinel'],
    potentialDatasets: ['OpenAQ global air quality archive', 'Copernicus Climate Change Service', 'NASA FIRMS active fire hotspots'],
    featureIdeas: ['Isochrone pollution exposure route finder', 'Carbon offset equivalence calculator', 'Historical trend forecasting graph', 'Automated civic compliance warning generator'],
    advancedExtensions: ['Spatial Kriging interpolation for sparse sensor meshes', 'Satellite infrared thermal anomaly detector', 'Predictive wind-vector smoke dispersion'],
    commonChallenges: ['Massive geospatial raster datasets', 'Lag in satellite imagery updates', 'Translating scientific indices for lay audiences']
  },
  'Social Impact': {
    domain: 'Civic & Social Impact',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Mapbox/Leaflet', 'Tailwind CSS', 'PWA'],
    difficulty: 'Beginner',
    projectPatterns: ['Disaster Relief Resource Coordinator', 'Surplus Food Redistribution Exchange', 'Accessible Transit Route Navigator', 'Community Mutual Aid Board'],
    potentialDatasets: ['UN OCHA Humanitarian Data Exchange', 'Census socio-economic indices', 'OpenStreetMap accessibility tags'],
    featureIdeas: ['Real-time shelter bed capacity counter', 'Volunteer route assignment dispatcher', 'Offline-first PWA caching', 'Multilingual emergency broadcast system'],
    advancedExtensions: ['SMS/USSD fallback bridge for non-smartphone users', 'Priority matching algorithm for perishable surplus goods', 'Crowdsourced hazard verification quorum'],
    commonChallenges: ['High spikes in traffic during emergencies', 'Verification of crowdsourced disaster reports', 'Serving low-end mobile devices on 2G/3G']
  },
  'Data Science': {
    domain: 'Data Science & Big Data Analytics',
    technologies: ['Python', 'Pandas', 'Polars', 'DuckDB', 'FastAPI', 'React', 'Recharts', 'Streamlit'],
    difficulty: 'Intermediate',
    projectPatterns: ['Customer Churn Early Warning System', 'Urban Mobility & Traffic Flow Simulator', 'E-Commerce Recommendation & Basket Analyzer', 'Clinical Trial Survival Analysis Tool'],
    potentialDatasets: ['NYC Taxi & Limousine trips', 'Telco Customer Churn dataset', 'Kaggle Instacart orders', 'US Bureau of Labor Statistics'],
    featureIdeas: ['Interactive cohort retention grid', 'Dynamic multi-filter drill-down cube', 'Automated anomaly highlighting', 'Statistical hypothesis test report (p-values)'],
    advancedExtensions: ['In-browser WebAssembly SQL querying via DuckDB-Wasm', 'Automated feature engineering pipeline', 'Differential privacy noise injection'],
    commonChallenges: ['Memory limits with large dataframes', 'Overfitting on historical sample biases', 'Explaining statistical confidence to non-statisticians']
  }
};
