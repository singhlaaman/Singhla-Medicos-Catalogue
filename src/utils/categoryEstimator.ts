import { Medicine, Category } from '../types';

export interface CategoryEstimateResult {
  categoryId: string;
  categoryName: string;
  confidence: 'High' | 'Medium' | 'Low';
  matchReason: string;
  score: number;
}

// Canonical category names expected in the system
export const KNOWN_CATEGORIES = [
  'Cancer Medicines',
  'Heart Medicines',
  'Diabetes Medicines',
  'Kidney Medicines',
  'Liver Medicines',
  'Neurology Medicines',
  'Gastro Medicines',
  'Respiratory Medicines',
  'Dermatology Medicines',
  'Antibiotics',
  'Pain Relief',
  'Hormonal Medicines',
  'Eye & Ear Care',
  'Urology Medicines',
  'Critical Care & Injections',
  'Vaccines',
  'Vitamins & Supplements',
  'Surgical Products',
  'Medical Devices',
  'All Medicines'
] as const;

interface CategoryRule {
  name: string;
  keywords: string[];
  exactSalts: string[];
  usesKeywords: string[];
}

const CATEGORY_RULES: CategoryRule[] = [
  {
    name: 'Cancer Medicines',
    keywords: [
      'cancer', 'oncology', 'chemotherapy', 'antineoplastic', 'cytotoxic', 'tumour', 'tumor',
      'carcinoma', 'leukemia', 'leukaemia', 'lymphoma', 'myeloma', 'melanoma', 'sarcoma',
      'glioblastoma', 'metastasis', 'metastatic', 'nsclc', 'antineoplastic agent', 'targeted therapy',
      'egfr inhibitor', 'tyrosine kinase inhibitor', 'checkpoint inhibitor', 'parp inhibitor',
      'monoclonal antibody'
    ],
    exactSalts: [
      'gefitinib', 'erlotinib', 'osimertinib', 'afatinib', 'imatinib', 'nilotinib', 'dasatinib',
      'ponatinib', 'bosutinib', 'ibrutinib', 'acalabrutinib', 'zanubrutinib', 'sunitinib',
      'sorafenib', 'pazopanib', 'axitinib', 'cabozantinib', 'lenvatinib', 'regorafenib',
      'vandetanib', 'ruxolitinib', 'fedratinib', 'brigatinib', 'alectinib', 'ceritinib',
      'crizotinib', 'lorlatinib', 'palbociclib', 'ribociclib', 'abemaciclib', 'abiraterone',
      'enzalutamide', 'apalutamide', 'darolutamide', 'bicalutamide', 'flutamide', 'letrozole',
      'anastrozole', 'exemestane', 'tamoxifen', 'fulvestrant', 'goserelin', 'leuprolide',
      'triptorelin', 'degarelix', 'capecitabine', 'gemcitabine', 'pemetrexed', 'methotrexate',
      '5-fluorouracil', 'fluorouracil', 'tegafur', 'decitabine', 'azacitidine', 'hydroxyurea',
      'cyclophosphamide', 'ifosfamide', 'chlorambucil', 'melphalan', 'busulfan', 'temozolomide',
      'dacarbazine', 'cisplatin', 'carboplatin', 'oxaliplatin', 'doxorubicin', 'epirubicin',
      'daunorubicin', 'idarubicin', 'mitoxantrone', 'bleomycin', 'dactinomycin', 'irinotecan',
      'topotecan', 'etoposide', 'paclitaxel', 'docetaxel', 'cabazitaxel', 'vinblastine',
      'vincristine', 'vinorelbine', 'trabectedin', 'eribulin', 'lenalidomide', 'thalidomide',
      'pomalidomide', 'bortezomib', 'carfilzomib', 'ixazomib', 'rituximab', 'trastuzumab',
      'pertuzumab', 'bevacizumab', 'cetuximab', 'panitumumab', 'nivolumab', 'pembrolizumab',
      'atezolizumab', 'durvalumab', 'ipilimumab', 'daratumumab', 'brentuximab', 'olaparib',
      'niraparib', 'rucaparib', 'talazoparib', 'encorafenib', 'binimetinib', 'trametinib',
      'dabrafenib', 'venetoclax', 'ivosidenib', 'enasidenib'
    ],
    usesKeywords: [
      'cancer', 'carcinoma', 'chemotherapy', 'metastatic', 'tumour', 'tumor', 'leukemia',
      'lymphoma', 'myeloma', 'sarcoma', 'malignancy', 'nsclc', 'breast cancer', 'prostate cancer',
      'lung cancer', 'colon cancer', 'colorectal cancer', 'ovarian cancer', 'cervical cancer',
      'pancreatic cancer', 'renal cell carcinoma', 'hepatocellular carcinoma', 'melanoma'
    ]
  },
  {
    name: 'Diabetes Medicines',
    keywords: [
      'diabetes', 'diabetic', 'blood sugar', 'glucose control', 'glycemic', 'hyperglycemia',
      'antidiabetic', 'hba1c', 'hypoglycemic', 'insulin'
    ],
    exactSalts: [
      'metformin', 'glimepiride', 'gliclazide', 'glipizide', 'glibenclamide', 'sitagliptin',
      'vildagliptin', 'teneligliptin', 'linagliptin', 'saxagliptin', 'alogliptin', 'dapagliflozin',
      'empagliflozin', 'canagliflozin', 'remogliflozin', 'semaglutide', 'liraglutide',
      'dulaglutide', 'insulin glargine', 'insulin degludec', 'insulin lispro', 'insulin aspart',
      'human insulin', 'isophane insulin', 'pioglitazone', 'voglibose', 'acarbose', 'miglitol',
      'repaglinide', 'nateglinide'
    ],
    usesKeywords: [
      'type 2 diabetes', 'type 1 diabetes', 'diabetes mellitus', 'high blood sugar',
      'glycemic control', 'glucose regulation', 'diabetic patients'
    ]
  },
  {
    name: 'Heart Medicines',
    keywords: [
      'heart', 'hypertension', 'high blood pressure', 'bp', 'cardiac', 'myocardial', 'angina',
      'chest pain', 'arrhythmia', 'heart failure', 'cardiovascular', 'cholesterol', 'lipid',
      'statin', 'triglyceride', 'blood thinner', 'anticoagulant', 'antiplatelet', 'atherosclerosis'
    ],
    exactSalts: [
      'atorvastatin', 'rosuvastatin', 'simvastatin', 'pravastatin', 'pitavastatin', 'fenofibrate',
      'gemfibrozil', 'ezetimibe', 'saroglitazar', 'telmisartan', 'losartan', 'olmesartan',
      'valsartan', 'candesartan', 'irbesartan', 'ramipril', 'enalapril', 'lisinopril',
      'perindopril', 'benazepril', 'metoprolol', 'atenolol', 'bisoprolol', 'nebivolol',
      'carvedilol', 'propranolol', 'labetalol', 'sotalol', 'amlodipine', 'cilnidipine',
      'nifedipine', 'felodipine', 'diltiazem', 'verapamil', 'benidipine', 'lercanidipine',
      'furosemide', 'torsemide', 'hydrochlorothiazide', 'chlorthalidone', 'spironolactone',
      'eplerenone', 'indapamide', 'clopidogrel', 'aspirin', 'ticagrelor', 'prasugrel',
      'warfarin', 'dabigatran', 'rivaroxaban', 'apixaban', 'edoxaban', 'heparin', 'enoxaparin',
      'nitroglycerin', 'isosorbide', 'glyceryl trinitrate', 'ranolazine', 'trimetazidine',
      'ivabradine', 'digoxin', 'sacubitril', 'hydralazine', 'nicorandil'
    ],
    usesKeywords: [
      'hypertension', 'high blood pressure', 'heart attack', 'angina pectoris', 'heart failure',
      'coronary artery disease', 'high cholesterol', 'hyperlipidemia', 'dyslipidemia',
      'atrial fibrillation', 'stroke prevention', 'blood clot prevention'
    ]
  },
  {
    name: 'Kidney Medicines',
    keywords: [
      'kidney', 'renal', 'nephrology', 'dialysis', 'ckd', 'chronic kidney disease', 'proteinuria',
      'nephrotic', 'glomerulonephritis', 'hyperphosphatemia', 'hyperkalemia', 'kidney transplant'
    ],
    exactSalts: [
      'ketoanalogues', 'alpha ketoacids', 'sevelamer', 'lanthanum carbonate', 'calcium acetate',
      'calcium polystyrene sulfonate', 'patiromer', 'sodium zirconium cyclosilicate', 'febuxostat',
      'allopurinol', 'benzbromarone', 'erythropoietin', 'darbepoetin', 'darbepoetin alfa',
      'tolvaptan', 'tacrolimus', 'cyclosporine', 'mycophenolate mofetil', 'mycophenolic acid',
      'azathioprine'
    ],
    usesKeywords: [
      'chronic kidney disease', 'renal failure', 'dialysis', 'kidney dysfunction',
      'hyperphosphatemia in ckd', 'nephropathy', 'kidney transplant rejection',
      'gout associated with renal', 'high uric acid in kidney'
    ]
  },
  {
    name: 'Liver Medicines',
    keywords: [
      'liver', 'hepatic', 'hepatitis', 'cirrhosis', 'fatty liver', 'nafld', 'nash',
      'hepatoprotective', 'jaundice', 'cholestasis', 'portal hypertension', 'hepatic encephalopathy'
    ],
    exactSalts: [
      'ursodeoxycholic acid', 'udca', 'silymarin', 'l-ornithine l-aspartate', 'lola',
      'metadoxine', 'glutathione', 'ademetionine', 's-adenosylmethionine', 'same',
      'lactulose', 'rifaximin', 'tenofovir disoproxil', 'tenofovir alafenamide',
      'entecavir', 'sofosbuvir', 'velpatasvir', 'daclatasvir', 'ledipasvir'
    ],
    usesKeywords: [
      'liver disease', 'hepatitis b', 'hepatitis c', 'liver cirrhosis', 'fatty liver disease',
      'chronic liver disease', 'jaundice', 'alcoholic liver disease', 'hepatic encephalopathy',
      'gallstone dissolution', 'primary biliary cholangitis'
    ]
  },
  {
    name: 'Neurology Medicines',
    keywords: [
      'neurology', 'neurological', 'nerve', 'neuropathy', 'neuropathic pain', 'brain',
      'epilepsy', 'seizure', 'convulsions', 'parkinson', 'alzheimer', 'dementia',
      'migraine', 'vertigo', 'dizziness', 'tremors', 'nootropic', 'cns', 'anticonvulsant'
    ],
    exactSalts: [
      'pregabalin', 'gabapentin', 'levetiracetam', 'sodium valproate', 'valproic acid',
      'divalproex', 'carbamazepine', 'oxcarbazepine', 'phenytoin', 'lamotrigine',
      'topiramate', 'lacosamide', 'zonisamide', 'clobazam', 'clonazepam', 'brivaracetam',
      'levodopa', 'carbidopa', 'entacapone', 'pramipexole', 'ropinirole', 'rasagiline',
      'trihexyphenidyl', 'donepezil', 'memantine', 'rivastigmine', 'galantamine',
      'sumatriptan', 'rizatriptan', 'zolmitriptan', 'flunarizine', 'cinnarizine',
      'betahistine', 'citicoline', 'piracetam', 'baclofen', 'tizanidine', 'tolperisone',
      'amitriptyline', 'duloxetine'
    ],
    usesKeywords: [
      'epilepsy', 'seizures', 'neuropathic pain', 'nerve pain', 'diabetic neuropathy',
      'parkinson\'s disease', 'alzheimer\'s disease', 'dementia', 'migraine prevention',
      'vertigo and dizziness', 'post-herpetic neuralgia', 'fibromyalgia', 'stroke rehabilitation'
    ]
  },
  {
    name: 'Gastro Medicines',
    keywords: [
      'gastro', 'stomach', 'acid', 'acidity', 'acid reflux', 'gerd', 'heartburn', 'gastric',
      'gastritis', 'ulcer', 'peptic ulcer', 'antacid', 'proton pump inhibitor', 'ppi',
      'indigestion', 'nausea', 'vomiting', 'antiemetic', 'constipation', 'laxative',
      'diarrhea', 'diarrhoea', 'ibs', 'irritable bowel', 'gut health', 'colic'
    ],
    exactSalts: [
      'pantoprazole', 'rabeprazole', 'omeprazole', 'esomeprazole', 'lansoprazole',
      'dexlansoprazole', 'ilaprazole', 'ranitidine', 'famotidine', 'sucralfate',
      'magaldrate', 'domperidone', 'itopride', 'levosulpiride', 'cinitapride',
      'ondansetron', 'granisetron', 'palonosetron', 'metoclopramide', 'aprepitant',
      'dicyclomine', 'drotaverine', 'mebeverine', 'lactulose', 'polyethylene glycol',
      'sodium picosulfate', 'bisacodyl', 'ispaghula', 'loperamide', 'racecadotril',
      'mesalamine', 'sulfasalazine', 'probiotics', 'lactobacillus'
    ],
    usesKeywords: [
      'gastroesophageal reflux disease', 'gerd', 'acidity and heartburn', 'gastric ulcer',
      'peptic ulcer disease', 'gastritis', 'indigestion and dyspepsia', 'nausea and vomiting',
      'constipation', 'diarrhea', 'irritable bowel syndrome', 'ulcerative colitis', 'stomach spasms'
    ]
  },
  {
    name: 'Respiratory Medicines',
    keywords: [
      'respiratory', 'asthma', 'copd', 'bronchitis', 'wheezing', 'cough', 'dry cough',
      'productive cough', 'breathlessness', 'dyspnea', 'inhaler', 'rotacap', 'respules',
      'bronchodilator', 'pulmonology', 'allergy', 'allergic rhinitis', 'antihistamine',
      'decongestant', 'mucolytic'
    ],
    exactSalts: [
      'salbutamol', 'albuterol', 'levosalbutamol', 'formoterol', 'salmeterol',
      'indacaterol', 'vilanterol', 'ipratropium', 'tiotropium', 'glycopyrronium',
      'budesonide', 'fluticasone', 'beclomethasone', 'ciclesonide', 'mometasone',
      'montelukast', 'zafirlukast', 'acebrophylline', 'doxofylline', 'theophylline',
      'bambuterol', 'ambroxol', 'bromhexine', 'guaiphenesin', 'acetylcysteine',
      'dextromethorphan', 'levocetirizine', 'cetirizine', 'fexofenadine', 'bilastine',
      'desloratadine', 'loratadine', 'rupatadine', 'olopatadine', 'azelastine'
    ],
    usesKeywords: [
      'asthma', 'chronic obstructive pulmonary disease', 'copd', 'bronchitis',
      'allergic rhinitis', 'cough with mucus', 'dry cough', 'wheezing and chest tightness',
      'sneezing and runny nose', 'respiratory tract allergy'
    ]
  },
  {
    name: 'Dermatology Medicines',
    keywords: [
      'dermatology', 'skin', 'rash', 'eczema', 'psoriasis', 'acne', 'pimples',
      'dermatitis', 'fungal skin', 'ringworm', 'tinea', 'scabies', 'pruritus',
      'itching', 'scalp', 'hair loss', 'alopecia', 'dandruff', 'topical',
      'ointment', 'cream', 'lotion', 'gel'
    ],
    exactSalts: [
      'ketoconazole', 'clotrimazole', 'miconazole', 'luliconazole', 'terbinafine',
      'sertaconazole', 'eberconazole', 'amorolfine', 'ciclopirox', 'clobetasol',
      'betamethasone', 'mometasone', 'halobetasol', 'fluticasone', 'hydrocortisone',
      'adapalene', 'tretinoin', 'benzoyl peroxide', 'clindamycin', 'azelaic acid',
      'salicylic acid', 'tacrolimus', 'pimecrolimus', 'permethrin', 'ivermectin',
      'minoxidil', 'calamine', 'fusidic acid', 'mupirocin'
    ],
    usesKeywords: [
      'skin infections', 'fungal skin infection', 'tinea cruris', 'ringworm',
      'eczema', 'psoriasis', 'acne vulgaris', 'atopic dermatitis', 'contact dermatitis',
      'skin itching and rash', 'hair loss and male pattern baldness', 'dandruff', 'scabies'
    ]
  },
  {
    name: 'Antibiotics',
    keywords: [
      'antibiotic', 'antibacterial', 'infection', 'bacterial infection', 'antimicrobial',
      'broad spectrum', 'antifungal systemic', 'antiviral'
    ],
    exactSalts: [
      'amoxicillin', 'clavulanic acid', 'ampicillin', 'piperacillin', 'tazobactam',
      'cefixime', 'cefuroxime', 'ceftriaxone', 'cefotaxime', 'cefpodoxime',
      'cefepime', 'cefadroxil', 'cephalexin', 'cefoperazone', 'sulbactam',
      'azithromycin', 'clarithromycin', 'erythromycin', 'roxithromycin',
      'ciprofloxacin', 'levofloxacin', 'ofloxacin', 'moxifloxacin', 'norfloxacin',
      'meropenem', 'imipenem', 'faropenem', 'vancomycin', 'teicoplanin', 'linezolid',
      'colistin', 'polymyxin b', 'doxycycline', 'minocycline', 'tigecycline',
      'metronidazole', 'tinidazole', 'ornidazole', 'nitrofurantoin', 'fosfomycin',
      'fluconazole', 'itraconazole', 'voriconazole', 'posaconazole', 'caspofungin',
      'amphotericin b', 'acyclovir', 'valacyclovir', 'oseltamivir', 'favipiravir'
    ],
    usesKeywords: [
      'bacterial infections', 'urinary tract infection', 'uti', 'pneumonia',
      'typhoid fever', 'septicemia', 'respiratory tract infection', 'skin and soft tissue infection',
      'intra-abdominal infection', 'systemic fungal infection', 'viral infection'
    ]
  },
  {
    name: 'Pain Relief',
    keywords: [
      'pain', 'pain relief', 'analgesic', 'anti-inflammatory', 'nsaid', 'fever',
      'antipyretic', 'joint pain', 'muscle pain', 'arthritis', 'osteoarthritis',
      'rheumatoid arthritis', 'body ache', 'toothache', 'sprain', 'inflammation'
    ],
    exactSalts: [
      'paracetamol', 'acetaminophen', 'ibuprofen', 'diclofenac', 'aceclofenac',
      'naproxen', 'mefenamic acid', 'ketorolac', 'indomethacin', 'piroxicam',
      'lornoxicam', 'etoricoxib', 'celecoxib', 'tramadol', 'tapentadol',
      'serratiopeptidase', 'trypsin', 'chymotrypsin', 'thiocolchicoside',
      'chlorzoxazone', 'metaxalone'
    ],
    usesKeywords: [
      'pain relief', 'fever reduction', 'osteoarthritis', 'rheumatoid arthritis',
      'ankylosing spondylitis', 'muscle pain and spasm', 'postoperative pain',
      'joint inflammation', 'dental pain', 'acute pain'
    ]
  },
  {
    name: 'Hormonal Medicines',
    keywords: [
      'hormone', 'hormonal', 'thyroid', 'hypothyroidism', 'hyperthyroidism', 'steroid',
      'corticosteroid', 'endocrine', 'estrogen', 'progesterone', 'testosterone', 'gynaecology',
      'fertility', 'menopause', 'pcos'
    ],
    exactSalts: [
      'levothyroxine', 'thyroxine', 'carbimazole', 'methimazole', 'dexamethasone',
      'prednisolone', 'methylprednisolone', 'deflazacort', 'betamethasone', 'hydrocortisone',
      'dydrogesterone', 'progesterone', 'medroxyprogesterone', 'norethisterone',
      'hydroxyprogesterone', 'estradiol', 'ethinylestradiol', 'cabergoline',
      'clomiphene', 'menotropin', 'human chorionic gonadotropin'
    ],
    usesKeywords: [
      'hypothyroidism', 'hyperthyroidism', 'severe inflammatory conditions',
      'autoimmune disorders', 'hormone replacement therapy', 'abnormal uterine bleeding',
      'endometriosis', 'threatened miscarriage', 'female infertility'
    ]
  },
  {
    name: 'Eye & Ear Care',
    keywords: [
      'eye', 'ophthalmic', 'ophthalmology', 'glaucoma', 'cataract', 'conjunctivitis', 'ear drops',
      'eye drops', 'vision', 'cornea', 'retina', 'dry eye', 'lubricant eye', 'otic', 'ear infection'
    ],
    exactSalts: [
      'bimatoprost', 'latanoprost', 'travoprost', 'timolol', 'brimonidine', 'dorzolamide',
      'brinzolamide', 'carboxymethylcellulose', 'sodium hyaluronate', 'tobramycin',
      'nepafenac', 'ketorolac eye', 'loteprednol', 'difluprednate', 'fluorometholone',
      'cyclosporine eye', 'tropicamide', 'cyclopentolate', 'atropine eye', 'ofloxacin otic',
      'clotrimazole ear', 'paradichlorobenzene', 'chlorbutol', 'turpentine oil'
    ],
    usesKeywords: [
      'glaucoma', 'ocular hypertension', 'dry eyes', 'eye infection', 'bacterial conjunctivitis',
      'post cataract surgery', 'eye inflammation', 'ear infection', 'ear wax removal',
      'otitis media', 'otitis externa'
    ]
  },
  {
    name: 'Urology Medicines',
    keywords: [
      'urology', 'urological', 'prostate', 'bph', 'benign prostatic hyperplasia', 'urinary retention',
      'erectile dysfunction', 'overactive bladder', 'incontinence', 'kidney stone', 'urinary flow'
    ],
    exactSalts: [
      'tamsulosin', 'silodosin', 'alfuzosin', 'doxazosin', 'dutasteride', 'finasteride',
      'sildenafil', 'tadalafil', 'vardenafil', 'avanafil', 'solifenacin', 'tolterodine',
      'darifenacin', 'mirabegron', 'oxybutynin', 'flavoxate', 'potassium citrate', 'magnesium citrate'
    ],
    usesKeywords: [
      'benign prostatic hyperplasia', 'bph', 'difficulty in urination', 'enlarged prostate',
      'erectile dysfunction', 'overactive bladder', 'urinary incontinence', 'urinary frequency',
      'kidney stones dissolution', 'urinary tract spasm'
    ]
  },
  {
    name: 'Critical Care & Injections',
    keywords: [
      'critical care', 'icu', 'injection', 'infusion', 'emergency', 'albumin', 'immunoglobulin',
      'plasma', 'vasopressor', 'inotropic', 'anesthesia', 'resuscitation'
    ],
    exactSalts: [
      'human albumin', 'immunoglobulin', 'ivig', 'noradrenaline', 'norepinephrine',
      'adrenaline', 'epinephrine', 'dopamine', 'dobutamine', 'vasopressin', 'propofol',
      'etomidate', 'midazolam', 'fentanyl', 'atracurium', 'rocuronium', 'vecuronium',
      'sodium bicarbonate', 'potassium chloride injection', 'human rabies immunoglobulin',
      'tetanus immunoglobulin', 'snake venom antiserum', 'antivenom'
    ],
    usesKeywords: [
      'hypovolemic shock', 'hypoalbuminemia', 'septic shock', 'icu sedation', 'resuscitation',
      'emergency inotropic support', 'severe immune thrombocytopenia', 'general anesthesia',
      'snake bite envenomation'
    ]
  },
  {
    name: 'Vaccines',
    keywords: [
      'vaccine', 'vaccination', 'immunization', 'immunisation', 'toxoid', 'prophylaxis'
    ],
    exactSalts: [
      'rabies vaccine', 'tetanus toxoid', 'influenza vaccine', 'typhoid vaccine',
      'pneumococcal vaccine', 'hepatitis b vaccine', 'hepatitis a vaccine',
      'meningococcal vaccine', 'varicella vaccine', 'mmr vaccine', 'hpv vaccine',
      'rotavirus vaccine'
    ],
    usesKeywords: [
      'immunization', 'prevention of rabies', 'tetanus prophylaxis', 'flu prevention',
      'vaccination against', 'active immunization'
    ]
  },
  {
    name: 'Vitamins & Supplements',
    keywords: [
      'vitamin', 'supplement', 'multivitamin', 'nutritional', 'minerals', 'dietary',
      'antioxidant', 'deficiency', 'calcium', 'iron', 'immunity booster', 'protein'
    ],
    exactSalts: [
      'multivitamin', 'multimineral', 'cholecalciferol', 'vitamin d3', 'calcitriol',
      'cyanocobalamin', 'methylcobalamin', 'vitamin b12', 'folic acid', 'l-methylfolate',
      'ferrous ascorbate', 'ferrous sulfate', 'ferric carboxymaltose', 'iron sucrose',
      'calcium carbonate', 'calcium citrate', 'zinc sulfate', 'ascorbic acid', 'vitamin c',
      'vitamin e', 'tocopherol', 'biotin', 'coenzyme q10', 'omega-3', 'fish oil',
      'alpha lipoic acid', 'glutathione', 'amino acids'
    ],
    usesKeywords: [
      'nutritional deficiency', 'vitamin d deficiency', 'vitamin b12 deficiency',
      'iron deficiency anemia', 'calcium supplement for bone health', 'general weakness and fatigue',
      'antioxidant support', 'immunity support'
    ]
  },
  {
    name: 'Surgical Products',
    keywords: [
      'surgical', 'suture', 'wound dressing', 'sterile', 'gauze', 'bandage',
      'antiseptic', 'catheter', 'cannula', 'scalpel', 'adhesive tape', 'iodine'
    ],
    exactSalts: [
      'povidone iodine', 'betadine', 'chlorhexidine', 'surgical spirit', 'hydrogen peroxide',
      'suture', 'vicryl', 'prolene', 'catgut', 'silk suture', 'iv cannula', 'foley catheter'
    ],
    usesKeywords: [
      'wound care and dressing', 'antiseptic wound cleaning', 'surgical closure',
      'intravenous access', 'catheterization'
    ]
  },
  {
    name: 'Medical Devices',
    keywords: [
      'device', 'monitor', 'thermometer', 'glucometer', 'oximeter', 'nebulizer',
      'bp monitor', 'strips', 'lancet', 'syringe', 'needle', 'apparatus'
    ],
    exactSalts: [
      'blood pressure monitor', 'digital thermometer', 'pulse oximeter', 'glucometer',
      'glucose test strips', 'nebulizer machine', 'insulin syringe', 'pen needles'
    ],
    usesKeywords: [
      'monitoring blood pressure', 'monitoring blood glucose', 'measuring body temperature',
      'measuring blood oxygen', 'respiratory nebulization'
    ]
  }
];

/**
 * Estimates the best category for a medicine based on its uses, salt formulation, name, and descriptions.
 */
export function estimateMedicineCategory(
  medicine: Partial<Medicine>,
  availableCategories: Category[]
): CategoryEstimateResult {
  const medicineUsesText = Array.isArray(medicine.uses) 
    ? medicine.uses.join(' ').toLowerCase() 
    : String(medicine.uses || '').toLowerCase();

  const saltText = String(medicine.saltName || medicine.genericName || '').toLowerCase();
  const nameText = String(medicine.name || medicine.brandName || '').toLowerCase();
  const descText = `${medicine.descriptionShort || ''} ${medicine.descriptionLong || ''}`.toLowerCase();

  const combinedSearchText = `${saltText} ${medicineUsesText} ${nameText} ${descText}`;

  let bestMatch: CategoryRule | null = null;
  let highestScore = 0;
  let matchReason = '';

  for (const rule of CATEGORY_RULES) {
    let score = 0;
    let matchedTerms: string[] = [];

    // 1. Check exact salt matches (Strongest signal - +40 points)
    for (const salt of rule.exactSalts) {
      if (saltText.includes(salt)) {
        score += 45;
        matchedTerms.push(`Salt match (${salt})`);
        break;
      }
    }

    // 2. Check therapeutic uses matches (Very strong signal - +30 points)
    for (const useKw of rule.usesKeywords) {
      if (medicineUsesText.includes(useKw)) {
        score += 25;
        matchedTerms.push(`Use indication (${useKw})`);
        break;
      }
    }

    // 3. Check general category keywords in uses & salt (+15 points)
    for (const kw of rule.keywords) {
      if (combinedSearchText.includes(kw)) {
        score += 10;
        if (matchedTerms.length < 3) {
          matchedTerms.push(`Keyword (${kw})`);
        }
      }
    }

    // 4. Check name text match (+10 points)
    for (const salt of rule.exactSalts) {
      if (nameText.includes(salt)) {
        score += 15;
        if (matchedTerms.length < 3) matchedTerms.push(`Brand naming`);
        break;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = rule;
      matchReason = matchedTerms.join('; ');
    }
  }

  // Find corresponding category object from availableCategories (or closest by name)
  let targetCategory = availableCategories.find(c => 
    bestMatch && c.name.toLowerCase() === bestMatch.name.toLowerCase()
  );

  // Fallback match if category named slightly differently (e.g., 'Oncology' vs 'Cancer Medicines')
  if (!targetCategory && bestMatch) {
    if (bestMatch.name === 'Cancer Medicines') {
      targetCategory = availableCategories.find(c => 
        c.name.toLowerCase().includes('cancer') || c.name.toLowerCase().includes('oncol')
      );
    } else if (bestMatch.name === 'Heart Medicines') {
      targetCategory = availableCategories.find(c => 
        c.name.toLowerCase().includes('heart') || c.name.toLowerCase().includes('cardio')
      );
    } else if (bestMatch.name === 'Diabetes Medicines') {
      targetCategory = availableCategories.find(c => c.name.toLowerCase().includes('diabet'));
    } else if (bestMatch.name === 'Kidney Medicines') {
      targetCategory = availableCategories.find(c => c.name.toLowerCase().includes('kidney') || c.name.toLowerCase().includes('renal'));
    } else if (bestMatch.name === 'Liver Medicines') {
      targetCategory = availableCategories.find(c => c.name.toLowerCase().includes('liver') || c.name.toLowerCase().includes('hepat'));
    } else if (bestMatch.name === 'Neurology Medicines') {
      targetCategory = availableCategories.find(c => c.name.toLowerCase().includes('neuro'));
    } else if (bestMatch.name === 'Gastro Medicines') {
      targetCategory = availableCategories.find(c => c.name.toLowerCase().includes('gastro') || c.name.toLowerCase().includes('stomach'));
    } else if (bestMatch.name === 'Respiratory Medicines') {
      targetCategory = availableCategories.find(c => c.name.toLowerCase().includes('resp') || c.name.toLowerCase().includes('asthma') || c.name.toLowerCase().includes('lung'));
    } else if (bestMatch.name === 'Dermatology Medicines') {
      targetCategory = availableCategories.find(c => c.name.toLowerCase().includes('derma') || c.name.toLowerCase().includes('skin'));
    } else if (bestMatch.name === 'Eye & Ear Care') {
      targetCategory = availableCategories.find(c => c.name.toLowerCase().includes('eye') || c.name.toLowerCase().includes('ear') || c.name.toLowerCase().includes('ophthal'));
    } else if (bestMatch.name === 'Urology Medicines') {
      targetCategory = availableCategories.find(c => c.name.toLowerCase().includes('uro') || c.name.toLowerCase().includes('prostate'));
    } else if (bestMatch.name === 'Critical Care & Injections') {
      targetCategory = availableCategories.find(c => c.name.toLowerCase().includes('critical') || c.name.toLowerCase().includes('icu') || c.name.toLowerCase().includes('inject'));
    }
  }

  // Final fallback category
  const defaultCategory = availableCategories.find(c => c.name === 'All Medicines') 
    || availableCategories[0] 
    || { id: 'default', name: 'All Medicines', iconName: 'Database' };

  const finalCategoryName = targetCategory ? targetCategory.name : (bestMatch ? bestMatch.name : defaultCategory.name);
  const finalCategoryId = targetCategory ? targetCategory.id : (defaultCategory.id || 'cat-gen');

  let confidence: 'High' | 'Medium' | 'Low' = 'Low';
  if (highestScore >= 35) confidence = 'High';
  else if (highestScore >= 15) confidence = 'Medium';

  return {
    categoryId: finalCategoryId,
    categoryName: finalCategoryName,
    confidence,
    matchReason: matchReason || 'General therapeutic fallback',
    score: highestScore
  };
}

/**
 * Batch estimates categories for a list of medicines.
 */
export function batchEstimateCategories(
  medicines: Medicine[],
  availableCategories: Category[],
  options: { onlyUncategorized?: boolean; overrideExisting?: boolean } = {}
): {
  updatedMedicines: Medicine[];
  changedCount: number;
  categoryStats: Record<string, number>;
  previewList: Array<{
    medicine: Medicine;
    oldCategory: string;
    newCategory: string;
    confidence: 'High' | 'Medium' | 'Low';
    reason: string;
    changed: boolean;
  }>;
} {
  let changedCount = 0;
  const categoryStats: Record<string, number> = {};
  const previewList: Array<{
    medicine: Medicine;
    oldCategory: string;
    newCategory: string;
    confidence: 'High' | 'Medium' | 'Low';
    reason: string;
    changed: boolean;
  }> = [];

  const updatedMedicines = medicines.map((med) => {
    const isUnassigned = !med.category || med.category === 'All Medicines' || med.category === 'Uncategorized' || med.category === 'General';
    
    // Check if we should process this item
    const shouldProcess = options.overrideExisting || (options.onlyUncategorized ? isUnassigned : true);

    if (!shouldProcess && med.category) {
      categoryStats[med.category] = (categoryStats[med.category] || 0) + 1;
      previewList.push({
        medicine: med,
        oldCategory: med.category,
        newCategory: med.category,
        confidence: 'High',
        reason: 'Existing category preserved',
        changed: false
      });
      return med;
    }

    const estimate = estimateMedicineCategory(med, availableCategories);
    const hasChanged = med.category !== estimate.categoryName;

    if (hasChanged) {
      changedCount++;
    }

    categoryStats[estimate.categoryName] = (categoryStats[estimate.categoryName] || 0) + 1;

    const updatedMed: Medicine = {
      ...med,
      category: estimate.categoryName,
      updatedAt: new Date().toISOString(),
      lastEditedBy: 'Smart Auto-Categorizer'
    };

    previewList.push({
      medicine: med,
      oldCategory: med.category || 'None',
      newCategory: estimate.categoryName,
      confidence: estimate.confidence,
      reason: estimate.matchReason,
      changed: hasChanged
    });

    return updatedMed;
  });

  return {
    updatedMedicines,
    changedCount,
    categoryStats,
    previewList
  };
}
