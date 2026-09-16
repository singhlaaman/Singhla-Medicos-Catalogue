import { Medicine, Category, Testimonial, FAQItem, AppSettings } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'Cancer Medicines', iconName: 'Ribbon', featured: true },
  { id: '2', name: 'Heart Medicines', iconName: 'Heart', featured: true },
  { id: '3', name: 'Diabetes Medicines', iconName: 'Activity', featured: true },
  { id: '4', name: 'Kidney Medicines', iconName: 'Activity', featured: false },
  { id: '5', name: 'Liver Medicines', iconName: 'Activity', featured: true },
  { id: '6', name: 'Neurology Medicines', iconName: 'Brain', featured: true },
  { id: '7', name: 'Gastro Medicines', iconName: 'Sparkles', featured: false },
  { id: '8', name: 'Respiratory Medicines', iconName: 'Wind', featured: false },
  { id: '9', name: 'Dermatology Medicines', iconName: 'Smile', featured: false },
  { id: '10', name: 'Antibiotics', iconName: 'ShieldAlert', featured: false },
  { id: '11', name: 'Pain Relief', iconName: 'Zap', featured: false },
  { id: '12', name: 'Hormonal Medicines', iconName: 'Layers', featured: false },
  { id: '13', name: 'Eye & Ear Care', iconName: 'Eye', featured: false },
  { id: '14', name: 'Urology Medicines', iconName: 'Activity', featured: false },
  { id: '15', name: 'Critical Care & Injections', iconName: 'Syringe', featured: false },
  { id: '16', name: 'Vaccines', iconName: 'Syringe', featured: false },
  { id: '17', name: 'Vitamins & Supplements', iconName: 'Apple', featured: false },
  { id: '18', name: 'Surgical Products', iconName: 'Scissors', featured: false },
  { id: '19', name: 'Medical Devices', iconName: 'Thermometer', featured: false },
  { id: '20', name: 'All Medicines', iconName: 'Database', featured: true }
];

export const INITIAL_MEDICINES: Medicine[] = [
  {
    id: 'med-1',
    name: 'Gefitinib 250mg Tablets',
    brandName: 'Gefitrust',
    genericName: 'Gefitinib',
    saltName: 'Gefitinib IP 250mg',
    strength: '250mg',
    category: 'Cancer Medicines',
    manufacturer: 'AstraZeneca / Natco Pharma Ltd.',
    descriptionShort: 'Gefitinib is an anti-cancer medication used for the treatment of non-small cell lung cancer (NSCLC) that has spread to other parts of the body, specifically in patients with abnormal EGFR genes.',
    descriptionLong: 'Gefitinib is a selective epidermal growth factor receptor (EGFR) tyrosine kinase inhibitor. By binding to the receptor, it prevents the activation of downstream signalling pathways that promote cancer cell proliferation, survival, and metastasis. It is widely prescribed as a first-line treatment for advanced NSCLC harboring specific activating mutations of EGFR tyrosine kinase.',
    uses: [
      'First-line treatment of patients with metastatic non-small cell lung cancer (NSCLC) whose tumors have epidermal growth factor receptor (EGFR) exon 19 deletions or exon 21 (L858R) substitution mutations.',
      'Management of advanced, locally recurrent lung cancers.'
    ],
    sideEffects: [
      'Diarrhea or loose stools',
      'Skin rashes, dryness, or acne-like breakouts',
      'Nausea and loss of appetite',
      'Fatigue or generalized weakness',
      'Elevated liver enzymes (reversible)'
    ],
    dosage: 'The recommended dosage of Gefitinib is one 250 mg tablet once daily, with or without food, or as directed by a registered medical oncologist.',
    storageInstructions: 'Store in a dry place at room temperature. Keep away from direct sunlight, moisture, and reach of children.',
    coldStorage: 'No',
    storageTemperature: '15°C–30°C',
    prescriptionRequired: 'Yes',
    packaging: 'Pack of 30 Tablets',
    images: [], // SVG or fallback dynamic graphics
    faqs: [
      { question: 'Is Gefitinib a chemotherapy drug?', answer: 'No, Gefitinib is a targeted therapy. It selectively attacks cancer cells with EGFR mutations, causing less damage to normal cells compared to traditional chemotherapy.' },
      { question: 'Can I take Gefitinib with antacids?', answer: 'Antacids and medicines that reduce stomach acid can decrease the absorption of Gefitinib. Consult your doctor for appropriate timing or alternatives.' }
    ],
    relatedMedicines: ['erlotinib-150mg', 'imatinib-400mg'],
    seoTitle: 'Gefitinib 250mg Tablets - Cancer Specialty Medicine | Singhla Medicos',
    seoDescription: 'Buy genuine Gefitinib 250mg tablets for NSCLC treatment at Singhla Medicos. Enquire now via Call or WhatsApp for pricing and PAN India supply.',
    slug: 'gefitinib-250mg',
    mrp: 5900,
    discountPrice: 2450,
    availability: 'In Stock',
    countryOfOrigin: 'India',
    dosageForm: 'Tablet'
  },
  {
    id: 'med-2',
    name: 'Imatinib 400mg Tablets',
    brandName: 'Veenat 400',
    genericName: 'Imatinib Mesylate',
    saltName: 'Imatinib Mesylate IP 400mg',
    strength: '400mg',
    category: 'Cancer Medicines',
    manufacturer: 'Natco Pharma Ltd. / Novartis',
    descriptionShort: 'Imatinib is a tyrosine kinase inhibitor (TKI) used to treat various types of cancers including Chronic Myelogenous Leukemia (CML), Gastrointestinal Stromal Tumors (GISTs), and other cancers.',
    descriptionLong: 'Imatinib works by blocking the action of an abnormal protein (tyrosine kinase) that signals cancer cells to multiply. This helps stop or slow down the spread of cancer cells. It is one of the most revolutionary targeted oncology drugs that turned CML from a fatal disease into a manageable chronic condition.',
    uses: [
      'Treatment of Philadelphia chromosome-positive (Ph+) chronic myelogenous leukemia (CML).',
      'Treatment of adult patients with Kit (CD117) positive unresectable or metastatic gastrointestinal stromal tumors (GIST).',
      'Myelodysplastic or myeloproliferative diseases associated with PDGFR gene re-arrangements.'
    ],
    sideEffects: [
      'Fluid retention (puffiness around eyes, swollen ankles)',
      'Muscle cramps or joint pain',
      'Nausea, diarrhea, or abdominal discomfort',
      'Mild skin rash',
      'Low white blood cell or platelet counts'
    ],
    dosage: 'Typically 400 mg or 800 mg daily, taken with a meal and a large glass of water to minimize gastrointestinal irritation.',
    storageInstructions: 'Store below 30°C in a dry place. Protect from moisture and light.',
    coldStorage: 'No',
    storageTemperature: '15°C–30°C',
    prescriptionRequired: 'Yes',
    packaging: 'Pack of 30 Tablets',
    images: [],
    faqs: [
      { question: 'Should Imatinib be taken with food?', answer: 'Yes, it is highly recommended to take Imatinib with a full meal and a large glass of water to prevent stomach upset.' },
      { question: 'What should I do if I experience muscle cramps?', answer: 'Muscle cramps are a common side effect of Imatinib. Keep hydrated, and talk to your oncologist about calcium or magnesium supplements if necessary.' }
    ],
    relatedMedicines: ['gefitinib-250mg', 'lenalidomide-10mg'],
    seoTitle: 'Imatinib 400mg Tablets - Leukemia Medicine | Singhla Medicos',
    seoDescription: 'Find genuine Veenat / Imatinib 400mg tablets at Singhla Medicos. Trusted supplier of super-speciality leukemia drugs. Quick WhatsApp enquiry.',
    slug: 'imatinib-400mg',
    mrp: 8500,
    discountPrice: 1999,
    availability: 'In Stock',
    countryOfOrigin: 'India',
    dosageForm: 'Tablet'
  },
  {
    id: 'med-3',
    name: 'Erlotinib 150mg Tablets',
    brandName: 'Erlocip 150',
    genericName: 'Erlotinib',
    saltName: 'Erlotinib Hydrochloride IP 150mg',
    strength: '150mg',
    category: 'Cancer Medicines',
    manufacturer: 'Cipla Ltd. / Roche',
    descriptionShort: 'Erlotinib is an epidermal growth factor receptor (EGFR) inhibitor used to treat non-small cell lung cancer (NSCLC) and pancreatic cancer in combination with other drugs.',
    descriptionLong: 'Erlotinib specifically targets the epidermal growth factor receptor (EGFR) tyrosine kinase. It prevents cancer cells from growing and dividing. It is widely used for patients with advanced lung cancer whose tumor cells have specific EGFR gene mutations.',
    uses: [
      'Treatment of metastatic non-small cell lung cancer (NSCLC) with EGFR mutations.',
      'First-line treatment of locally advanced or metastatic pancreatic cancer, in combination with gemcitabine.'
    ],
    sideEffects: [
      'Severe acne-like skin rash (often a sign of drug efficacy)',
      'Diarrhea and dehydration',
      'Loss of appetite and weight loss',
      'Cough or shortness of breath',
      'Dry skin and brittle nails'
    ],
    dosage: 'The standard daily dose is 150 mg taken at least one hour before or two hours after ingestion of food.',
    storageInstructions: 'Store in the original package at room temperature, away from moisture and direct heat.',
    coldStorage: 'No',
    storageTemperature: '15°C–30°C',
    prescriptionRequired: 'Yes',
    packaging: 'Pack of 30 Tablets',
    images: [],
    faqs: [
      { question: 'Why does Erlotinib cause a skin rash?', answer: 'The rash occurs because EGFR is present in normal skin cells as well. The drug blocks EGFR there, causing inflammation. It is often a sign that the medicine is working effectively.' },
      { question: 'Can smoking affect Erlotinib treatment?', answer: 'Yes, smoking significantly decreases the blood concentration of Erlotinib. Patients are strongly advised to stop smoking while taking this medication.' }
    ],
    relatedMedicines: ['gefitinib-250mg', 'imatinib-400mg'],
    seoTitle: 'Erlotinib 150mg Tablets - Lung Cancer Medicine | Singhla Medicos',
    seoDescription: 'Enquire for genuine Erlotinib 150mg tablets at Singhla Medicos. Premium oncology pharmacy supplying nationwide with verified cold chains.',
    slug: 'erlotinib-150mg',
    mrp: 9900,
    discountPrice: 3800,
    availability: 'In Stock',
    countryOfOrigin: 'India',
    dosageForm: 'Tablet'
  },
  {
    id: 'med-4',
    name: 'Trastuzumab 440mg Injection',
    brandName: 'Hertraz 440',
    genericName: 'Trastuzumab',
    saltName: 'Trastuzumab IP 440mg Lyophilized Powder',
    strength: '440mg',
    category: 'Cancer Medicines',
    manufacturer: 'Mylan / Biocon / Roche',
    descriptionShort: 'Trastuzumab is a monoclonal antibody targeted therapy used to treat HER2-positive breast cancer and stomach cancer.',
    descriptionLong: 'Trastuzumab is a humanized IgG1 monoclonal antibody that selectively binds with high affinity to the extracellular domain of the human epidermal growth factor receptor 2 (HER2). This blocks cell proliferation signals and flags the cancer cells for destruction by the immune system. Because it is a protein, it requires strict cold chain storage.',
    uses: [
      'Adjuvant and metastatic treatment of HER2-overexpressing breast cancer.',
      'Treatment of HER2-positive metastatic gastric or gastroesophageal junction adenocarcinoma.'
    ],
    sideEffects: [
      'Infusion-related reactions (fever, chills, mild pain)',
      'Cardiotoxicity (requires monitoring of LVEF/heart function)',
      'Fatigue and weakness',
      'Increased risk of infections',
      'Mild cough or shortness of breath'
    ],
    dosage: 'Administered intravenously by a qualified medical oncologist or nurse, starting with an initial loading dose followed by maintenance infusions every 1 or 3 weeks.',
    storageInstructions: 'CRITICAL: Store in a refrigerator between 2°C and 8°C. Do not freeze. Protect from light. Transport in validated cold chain packaging.',
    coldStorage: 'Yes',
    storageTemperature: '2°C–8°C (Cold Chain Required)',
    prescriptionRequired: 'Yes',
    packaging: 'Vial of 440mg with Bacteriostatic Water',
    images: [],
    faqs: [
      { question: 'How is the cold chain maintained for Trastuzumab delivery?', answer: 'At Singhla Medicos, we pack cold-storage medicines in validated polyurethane insulated boxes with specialized gel packs to maintain a steady temperature of 2°C–8°C during transit.' },
      { question: 'Why is heart monitoring required during Trastuzumab therapy?', answer: 'Trastuzumab can sometimes affect the heart muscle, leading to temporary decrease in pumping efficiency. Oncologists routinely perform echocardiograms (ECHO) or MUGA scans to ensure safety.' }
    ],
    relatedMedicines: ['gefitinib-250mg', 'erlotinib-150mg'],
    seoTitle: 'Trastuzumab 440mg Injection - HER2 Breast Cancer | Singhla Medicos',
    seoDescription: 'Enquire for genuine Trastuzumab 440mg Injection (Hertraz/Herceptin) with certified 2°C–8°C cold-chain logistics. Contact Singhla Medicos.',
    slug: 'trastuzumab-440mg',
    mrp: 58000,
    discountPrice: 16500,
    availability: 'Limited Stock',
    countryOfOrigin: 'India',
    dosageForm: 'Injection'
  },
  {
    id: 'med-5',
    name: 'Sofosbuvir 400mg & Velpatasvir 100mg Tablets',
    brandName: 'Sovihep V',
    genericName: 'Sofosbuvir and Velpatasvir',
    saltName: 'Sofosbuvir 400mg + Velpatasvir 100mg',
    strength: '400mg / 100mg',
    category: 'Liver Medicines',
    manufacturer: 'Zydus Heptiza / Gilead',
    descriptionShort: 'A combination of two direct-acting antiviral medicines used for the complete cure of chronic Hepatitis C infection across all genotypes.',
    descriptionLong: 'Sofosbuvir is an inhibitor of the HCV NS5B RNA-dependent RNA polymerase, which is essential for viral replication. Velpatasvir is an inhibitor of the HCV NS5A protein, which is necessary for viral replication and virion assembly. Together, they provide a 95-99% cure rate for Hepatitis C within 12 weeks.',
    uses: [
      'Treatment of chronic Hepatitis C virus (HCV) infection in adults with or without cirrhosis.',
      'Treatment in patients with decompensated cirrhosis in combination with ribavirin.'
    ],
    sideEffects: [
      'Headache or mild dizziness',
      'Fatigue and drowsiness',
      'Nausea or loss of appetite',
      'Insomnia'
    ],
    dosage: 'One tablet daily at the same time, with or without food, consistently for 12 weeks.',
    storageInstructions: 'Store in dry conditions below 30°C. Protect from moisture.',
    coldStorage: 'No',
    storageTemperature: '15°C–30°C',
    prescriptionRequired: 'Yes',
    packaging: 'Pack of 28 Tablets',
    images: [],
    faqs: [
      { question: 'What is the cure rate of Sofosbuvir & Velpatasvir?', answer: 'The therapy provides a high cure rate of over 95% for chronic Hepatitis C after a full 12-week course.' },
      { question: 'Can I drink alcohol while taking this medicine?', answer: 'Alcohol consumption should be strictly avoided as it further damages the liver and reduces the efficacy of Hepatitis C therapy.' }
    ],
    relatedMedicines: ['tenofovir-300mg'],
    seoTitle: 'Sofosbuvir 400mg & Velpatasvir 100mg - Hepatitis C Cure | Singhla Medicos',
    seoDescription: 'Get authentic Sofosbuvir & Velpatasvir combination tablets (Sovihep V / Velpanat) at Singhla Medicos. High-success Hepatitis C specialty medicine supplier.',
    slug: 'sofosbuvir-velpatasvir',
    mrp: 18500,
    discountPrice: 7200,
    availability: 'In Stock',
    countryOfOrigin: 'India',
    dosageForm: 'Tablet'
  },
  {
    id: 'med-6',
    name: 'Tenofovir Alafenamide 25mg Tablets',
    brandName: 'Hepbest 25',
    genericName: 'Tenofovir Alafenamide (TAF)',
    saltName: 'Tenofovir Alafenamide Fumarate IP 25mg',
    strength: '25mg',
    category: 'Liver Medicines',
    manufacturer: 'Mylan / Gilead / Hetero Healthcare',
    descriptionShort: 'A modern, highly effective antiviral drug used to treat chronic Hepatitis B infection with improved bone and kidney safety profile.',
    descriptionLong: 'Tenofovir Alafenamide is a hepatitis B virus (HBV) nucleoside reverse transcriptase inhibitor. It is a prodrug that delivers the active agent to hepatocytes more efficiently than older Tenofovir versions, allowing for a much smaller dose (25mg vs 300mg) and resulting in lower systemic exposure, which significantly reduces side effects on bones and kidneys.',
    uses: [
      'Treatment of chronic hepatitis B virus (HBV) infection in adults with compensated liver disease.'
    ],
    sideEffects: [
      'Headache',
      'Abdominal pain, nausea, or flatulence',
      'Fatigue',
      'Mild increase in liver enzymes during initial treatment weeks'
    ],
    dosage: 'One tablet daily with a meal, taken exactly as directed by your hepatologist.',
    storageInstructions: 'Store in original container at room temperature. Keep bottle tightly closed to protect from moisture.',
    coldStorage: 'No',
    storageTemperature: '15°C–30°C',
    prescriptionRequired: 'Yes',
    packaging: 'Pack of 30 Tablets',
    images: [],
    faqs: [
      { question: 'How is Tenofovir Alafenamide better than older Tenofovir DF?', answer: 'TAF achieves higher active concentrations inside liver cells at a 10-times lower dose, meaning there is far less drug in the blood, leading to much better bone density and kidney safety.' }
    ],
    relatedMedicines: ['sofosbuvir-velpatasvir'],
    seoTitle: 'Tenofovir Alafenamide 25mg - Hepatitis B Treatment | Singhla Medicos',
    seoDescription: 'Purchase authentic Tenofovir Alafenamide (Hepbest 25mg) at Singhla Medicos. Trusted supplier of liver care and speciality hepatology medicines.',
    slug: 'tenofovir-25mg',
    mrp: 1900,
    discountPrice: 850,
    availability: 'In Stock',
    countryOfOrigin: 'India',
    dosageForm: 'Tablet'
  },
  {
    id: 'med-7',
    name: 'Levetiracetam 500mg Tablets',
    brandName: 'Keppra 500 / Levipil 500',
    genericName: 'Levetiracetam',
    saltName: 'Levetiracetam IP 500mg',
    strength: '500mg',
    category: 'Neurology Medicines',
    manufacturer: 'UCB India / Sun Pharmaceutical Industries',
    descriptionShort: 'An anticonvulsant medication used to treat epilepsy and control various types of seizures.',
    descriptionLong: 'Levetiracetam works by binding to synaptic vesicle protein SV2A, which stabilizes hyperactive brain signals and reduces abnormal electrical discharges that cause epileptic seizures. It is highly valued for having fewer drug-to-drug interactions compared to older seizure medications.',
    uses: [
      'Monotherapy and adjunctive therapy in the treatment of partial-onset seizures with or without secondary generalization.',
      'Treatment of myoclonic seizures in patients with Juvenile Myoclonic Epilepsy.',
      'Treatment of primary generalized tonic-clonic seizures.'
    ],
    sideEffects: [
      'Sleepiness or drowsiness',
      'Dizziness or unsteady gait',
      'Mood alterations, irritability, or mood swings ("Kepprage")',
      'Nasal congestion or sore throat'
    ],
    dosage: 'Typically twice daily (morning and evening), swallowed whole with water, as directed by a neurologist.',
    storageInstructions: 'Store below 25°C in dry conditions.',
    coldStorage: 'No',
    storageTemperature: '15°C–25°C',
    prescriptionRequired: 'Yes',
    packaging: 'Strip of 15 Tablets',
    images: [],
    faqs: [
      { question: 'Can I stop taking Levetiracetam suddenly?', answer: 'Never stop taking anti-seizure medicines abruptly as it can trigger severe or continuous seizures (status epilepticus). Any dosage reduction should be supervised by your neurologist.' }
    ],
    relatedMedicines: ['donepezil-10mg'],
    seoTitle: 'Levetiracetam 500mg Tablets - Epilepsy Care | Singhla Medicos',
    seoDescription: 'Enquire for genuine Levetiracetam 500mg (Keppra / Levipil) at Singhla Medicos. Quality neurology supply chain delivering across India.',
    slug: 'levetiracetam-500mg',
    mrp: 110,
    discountPrice: 85,
    availability: 'In Stock',
    countryOfOrigin: 'India',
    dosageForm: 'Tablet'
  },
  {
    id: 'med-8',
    name: 'Atorvastatin 20mg Tablets',
    brandName: 'Lipitor 20 / Atorva 20',
    genericName: 'Atorvastatin Calcium',
    saltName: 'Atorvastatin IP 20mg',
    strength: '20mg',
    category: 'Heart Medicines',
    manufacturer: 'Pfizer / Zydus Cadila',
    descriptionShort: 'A lipid-lowering medication (statin) used to lower cholesterol levels and prevent cardiovascular disease.',
    descriptionLong: 'Atorvastatin is an HMG-CoA reductase inhibitor. It limits the rate-determining enzyme in the cholesterol biosynthesis pathway in the liver. This decreases bad cholesterol (LDL) and triglycerides while raising good cholesterol (HDL), greatly reducing the risk of heart attacks and strokes.',
    uses: [
      'Reduction of elevated total cholesterol, LDL-cholesterol, apolipoprotein B, and triglycerides.',
      'Prevention of cardiovascular disease, myocardial infarction, and stroke in high-risk patients.'
    ],
    sideEffects: [
      'Muscle pain or weakness (myalgia)',
      'Headache',
      'Slight increase in blood sugar levels',
      'Mild digestive issues (constipation, wind)'
    ],
    dosage: 'Standard initial dose is 10mg or 20mg once daily, usually taken in the evening with or without food.',
    storageInstructions: 'Store in dry place below 30°C. Protect from moisture.',
    coldStorage: 'No',
    storageTemperature: '15°C–30°C',
    prescriptionRequired: 'Yes',
    packaging: 'Strip of 15 Tablets',
    images: [],
    faqs: [
      { question: 'When is the best time of day to take Atorvastatin?', answer: 'Statins with a long half-life like Atorvastatin can be taken at any time of day, but it is best to take it at a consistent time daily, with or without food.' }
    ],
    relatedMedicines: ['clopidogrel-75mg'],
    seoTitle: 'Atorvastatin 20mg Tablets - Cholesterol Control | Singhla Medicos',
    seoDescription: 'Enquire for Atorvastatin 20mg (Lipitor / Atorva) at Singhla Medicos. Top-grade cardiac medicines from leading manufacturers.',
    slug: 'atorvastatin-20mg',
    mrp: 240,
    discountPrice: 190,
    availability: 'In Stock',
    countryOfOrigin: 'India',
    dosageForm: 'Tablet'
  },
  {
    id: 'med-9',
    name: 'Clopidogrel 75mg Tablets',
    brandName: 'Plavix 75 / Clopilet 75',
    genericName: 'Clopidogrel Bisulfate',
    saltName: 'Clopidogrel IP 75mg',
    strength: '75mg',
    category: 'Heart Medicines',
    manufacturer: 'Sanofi / Sun Pharma',
    descriptionShort: 'An antiplatelet medication used to reduce the risk of heart disease and stroke in those at high risk.',
    descriptionLong: 'Clopidogrel works by irreversibly inhibiting a receptor called P2Y12 on platelet cell membranes. This blocks platelet aggregation and prevents the formation of blood clots inside narrowed arteries, minimizing risks of heart attack, stroke, or stent thrombosis.',
    uses: [
      'Prevention of atherothrombotic events in patients with a history of recent myocardial infarction, stroke, or established peripheral arterial disease.',
      'Acute Coronary Syndrome management (often paired with Aspirin).'
    ],
    sideEffects: [
      'Easy bruising or bleeding (nosebleeds, cuts bleeding longer)',
      'Stomach pain or indigestion',
      'Diarrhea'
    ],
    dosage: 'One 75mg tablet daily, taken at the same time each day with or without food.',
    storageInstructions: 'Store below 25°C in original dry packaging.',
    coldStorage: 'No',
    storageTemperature: '15°C–25°C',
    prescriptionRequired: 'Yes',
    packaging: 'Strip of 15 Tablets',
    images: [],
    faqs: [
      { question: 'Why am I bruising more easily while taking Clopidogrel?', answer: 'Clopidogrel reduces clotting ability so that clots do not form in your blood vessels. A natural side effect is that minor bruises or bleeding from small cuts will take longer to stop. Consult your doctor if bleeding is excessive.' }
    ],
    relatedMedicines: ['atorvastatin-20mg'],
    seoTitle: 'Clopidogrel 75mg Tablets - Blood Thinner | Singhla Medicos',
    seoDescription: 'Genuine Clopidogrel 75mg (Plavix / Clopilet) supply at Singhla Medicos. Super-speciality cardiology medicines for heart health.',
    slug: 'clopidogrel-75mg',
    mrp: 180,
    discountPrice: 145,
    availability: 'In Stock',
    countryOfOrigin: 'India',
    dosageForm: 'Tablet'
  },
  {
    id: 'med-10',
    name: 'Dapagliflozin 10mg Tablets',
    brandName: 'Forxiga 10 / Oxra 10',
    genericName: 'Dapagliflozin',
    saltName: 'Dapagliflozin Propanediol Monohydrate 10mg',
    strength: '10mg',
    category: 'Diabetes Medicines',
    manufacturer: 'AstraZeneca / Sun Pharma',
    descriptionShort: 'An SGLT2 inhibitor used to lower blood sugar in Type 2 diabetes, with proven kidney and heart protection benefits.',
    descriptionLong: 'Dapagliflozin inhibits Sodium-Glucose Co-Transporter 2 (SGLT2) in the kidneys. By blocking SGLT2, it stops the kidneys from reabsorbing glucose back into the blood, causing excess glucose to be excreted in the urine. It also reduces risks of heart failure hospitalizations.',
    uses: [
      'Treatment of adults with insufficiently controlled Type 2 Diabetes Mellitus as an adjunct to diet and exercise.',
      'Treatment of symptomatic chronic Heart Failure with reduced ejection fraction.',
      'Treatment of Chronic Kidney Disease (CKD) to slow progression.'
    ],
    sideEffects: [
      'Urinary tract infections (UTIs) or genital yeast infections',
      'Increased urination and mild dehydration',
      'Thirst',
      'Hypoglycemia (if combined with insulin or sulfonylureas)'
    ],
    dosage: 'The recommended dose is 10 mg once daily, taken in the morning, with or without food.',
    storageInstructions: 'Store below 30°C in dry conditions.',
    coldStorage: 'No',
    storageTemperature: '15°C–30°C',
    prescriptionRequired: 'Yes',
    packaging: 'Strip of 14 Tablets',
    images: [],
    faqs: [
      { question: 'Why does Dapagliflozin cause frequent urination?', answer: 'Dapagliflozin works by filtering sugar out of your bloodstream and sending it out through your urine. Water follows sugar, which leads to increased urine volume and frequency. Drinking extra water helps avoid dehydration.' }
    ],
    relatedMedicines: ['atorvastatin-20mg'],
    seoTitle: 'Dapagliflozin 10mg Tablets - SGLT2 Diabetes Medicine | Singhla Medicos',
    seoDescription: 'Find authentic Dapagliflozin (Forxiga / Oxra) 10mg tablets at Singhla Medicos. Premium metabolic and kidney care supplier.',
    slug: 'dapagliflozin-10mg',
    mrp: 780,
    discountPrice: 590,
    availability: 'In Stock',
    countryOfOrigin: 'India',
    dosageForm: 'Tablet'
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Do you deliver medicines across India?',
    answer: 'Yes, Singhla Medicos delivers speciality and lifesaving cancer medicines all across India. For critical, temperature-sensitive cold chain medicines, we use special validated thermal packaging with gel packs and express airline cargo to guarantee they reach your doorstep under ideal storage conditions (2°C–8°C).'
  },
  {
    id: 'faq-2',
    question: 'Do you sell genuine cancer medicines?',
    answer: 'Absolutely. Singhla Medicos has been a trusted super-speciality pharmacy for over 25 years. We source our medicines directly from authorized manufacturers (like Natco, Cipla, AstraZeneca, Novartis, Roche) and official distributors. Every single product is 100% genuine and accompanied by a tax invoice.'
  },
  {
    id: 'faq-3',
    question: 'Do I need a prescription to order medicines?',
    answer: 'Yes. For all Schedule H, H1, and oncology drugs, a valid prescription from a registered medical practitioner (e.g., oncologist, cardiologist, hepatologist) is strictly required under Indian law. You can share your prescription through WhatsApp or email to process your order.'
  },
  {
    id: 'faq-4',
    question: 'How can I enquire about price and availability?',
    answer: 'Enquiring is extremely simple! Just click on either the "Call for Enquiry" or "WhatsApp Enquiry" button displayed on our website. You will be instantly connected with our specialized pharmacy desk. If you are on a specific product page, the WhatsApp button will pre-populate the enquiry message with that medicine\'s name for faster response.'
  },
  {
    id: 'faq-5',
    question: 'What is "Cold Chain Management"?',
    answer: 'Many super-speciality medicines, such as oncology injections and biologics, must be kept between 2°C and 8°C from the factory to the patient to remain effective. Our facility is equipped with medical-grade refrigerators, backup power generators, and we use validated insulated shipping containers to protect thermal integrity during delivery.'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Amrit Pal Singh',
    rating: 5,
    text: 'Highly reliable pharmacy for cancer medicines. My father is undergoing lung cancer treatment and we were struggling to find Gefitinib tablets at a reasonable rate. Singhla Medicos provided original medicine at a huge discount and delivered to Punjab within 24 hours with perfect temperature maintenance.',
    date: '2 weeks ago',
    verified: true
  },
  {
    id: 'test-2',
    name: 'Dr. Ramesh Kumar (Oncologist)',
    rating: 5,
    text: 'I have been recommending my patients to Singhla Medicos for over 15 years. Their integrity, speed of service, and mastery over cold chain management for critical injections like Trastuzumab are outstanding. Easily the most reliable specialty chemist in the region.',
    date: '1 month ago',
    verified: true
  },
  {
    id: 'test-3',
    name: 'Priyanka Sharma',
    rating: 5,
    text: 'Outstanding support team! I WhatsApped them my prescription for Hepbest tablets in the morning. They verified it, gave a very clear price quotation, and by evening the medicine was delivered to my address in Delhi. Exceptional service.',
    date: '3 weeks ago',
    verified: true
  }
];

export const DEFAULT_SETTINGS: AppSettings = {
  contactPhone: '+918287443428',
  contactWhatsApp: '918287443428',
  address: 'Singhla Medicos, B-8/61, Sector 5, Rohini, Delhi - 110085',
  email: 'singhlamedicos@gmail.com',
  googleMapsUrl: 'https://maps.google.com/?q=Singhla+Medicos,+B-8/61,+Sector+5,+Rohini,+Delhi+-+110085'
};
