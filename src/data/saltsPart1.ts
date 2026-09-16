import { SaltInfo } from '../types';

export const SALTS_PART_1: SaltInfo[] = [
  {
    id: 'salt-1',
    sNo: 1,
    name: 'Abiraterone acetate',
    slug: 'abiraterone-acetate',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'CYP17 Inhibitor / Androgen Biosynthesis Inhibitor',
    descriptionShort: 'Abiraterone acetate is an orally active CYP17 inhibitor indicated in combination with prednisone for metastatic castration-resistant and castration-sensitive prostate cancer.',
    descriptionLong: 'Abiraterone acetate is a targeted antiandrogen prodrug converted in vivo to abiraterone. It selectively and irreversibly inhibits 17α-hydroxylase/C17,20-lyase (CYP17), a rate-limiting enzyme required for androgen biosynthesis in testicular, adrenal, and prostatic tumor tissues. By shutting down testosterone production at all anatomical sources, abiraterone significantly halts disease progression in advanced prostate carcinoma when combined with low-dose corticosteroids.',
    mechanismOfAction: 'Inhibits the cytochrome P450 enzyme CYP17 (17α-hydroxylase and C17,20-lyase), preventing the conversion of pregnenolone and progesterone to testosterone and DHEA precursors.',
    indications: [
      'Metastatic Castration-Resistant Prostate Cancer (mCRPC)',
      'Metastatic High-Risk Castration-Sensitive Prostate Cancer (mCSPC)'
    ],
    commonStrengths: ['250 mg', '500 mg'],
    dosageForms: ['Tablet'],
    commonSideEffects: ['Fluid retention / peripheral edema', 'Hypokalemia', 'Hypertension', 'Elevated liver transaminases (ALT/AST)', 'Fatigue'],
    storageAdvice: 'Store below 30°C in a dry place protected from moisture.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why must Abiraterone Acetate be taken on an empty stomach?',
        answer: 'Food dramatically and unpredictably increases systemic exposure to abiraterone, potentially exacerbating toxicities. It must be taken at least 1 hour before or 2 hours after a meal.'
      },
      {
        question: 'Why is Prednisone co-prescribed with Abiraterone?',
        answer: 'CYP17 inhibition leads to adrenocorticotropic hormone (ACTH) surge causing mineralocorticoid excess. Low-dose prednisone suppresses ACTH and prevents hypokalemia and hypertension.'
      }
    ],
    aliases: ['Abiraterone', 'Abirapro', 'Zytiga', 'XBIRA', 'Abiratas']
  },
  {
    id: 'salt-2',
    sNo: 2,
    name: 'Anastrozole',
    slug: 'anastrozole',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Non-Steroidal Aromatase Inhibitor (Third Generation)',
    descriptionShort: 'Anastrozole is a potent third-generation non-steroidal aromatase inhibitor used in postmenopausal women with hormone receptor-positive breast cancer.',
    descriptionLong: 'Anastrozole works by reversibly binding to the aromatase enzyme (CYP19A1), preventing the peripheral conversion of androstenedione and testosterone to estrone and estradiol in postmenopausal adipose tissue. Since estrogen fuels hormone receptor-positive (ER+) breast tumors, lowering circulating estrogen levels with anastrozole inhibits tumor growth in early and advanced breast cancer settings.',
    mechanismOfAction: 'Selectively inhibits aromatase enzyme cytochrome P450 complex, reducing serum estradiol concentrations by up to 85% in postmenopausal females.',
    indications: [
      'Adjuvant treatment of early Hormone Receptor-Positive (HR+) Breast Cancer in postmenopausal women',
      'First-line and second-line therapy in advanced or metastatic HR+ Breast Cancer'
    ],
    commonStrengths: ['1 mg'],
    dosageForms: ['Tablet'],
    commonSideEffects: ['Hot flashes', 'Arthralgia and joint stiffness', 'Decreased bone mineral density (osteopenia/osteoporosis)', 'Fatigue', 'Mild nausea'],
    storageAdvice: 'Store at 20°C to 25°C in original packaging.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'How long is adjuvant Anastrozole therapy typically continued?',
        answer: 'Standard clinical guidelines recommend adjuvant therapy for 5 to 10 years depending on individual recurrence risk and tolerance.'
      },
      {
        question: 'Is bone density monitoring necessary during Anastrozole treatment?',
        answer: 'Yes, baseline and periodic DEXA bone density scans are recommended due to accelerated bone resorption secondary to estrogen suppression.'
      }
    ],
    aliases: ['Arimidex', 'Armotraz', 'Anabrez', 'Altraz']
  },
  {
    id: 'salt-3',
    sNo: 3,
    name: 'Arsenic trioxide',
    slug: 'arsenic-trioxide',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Heavy Metal Antineoplastic / PML-RARA Degrading Agent',
    descriptionShort: 'Arsenic trioxide is an antineoplastic agent that induces degradation of the PML-RARA fusion protein in Acute Promyelocytic Leukemia (APL).',
    descriptionLong: 'Arsenic trioxide (ATO) is a landmark targeted therapy for Acute Promyelocytic Leukemia (APL). It promotes degradation of the oncogenic PML-RARA fusion protein that halts myeloid differentiation, causing apoptosis and direct morphological differentiation of leukemic promyelocytes into mature neutrophils.',
    mechanismOfAction: 'Binds directly to the PML moiety of the PML-RARA fusion oncoprotein, triggering sumoylation and proteasome-mediated degradation while activating caspases.',
    indications: [
      'Newly diagnosed low-to-intermediate risk Acute Promyelocytic Leukemia (in combination with ATRA)',
      'Relapsed or refractory Acute Promyelocytic Leukemia (APL)'
    ],
    commonStrengths: ['1 mg/ml (10 mg/10 ml vial)'],
    dosageForms: ['Injection'],
    commonSideEffects: ['QTc prolongation', 'Differentiation syndrome (fever, dyspnea, weight gain)', 'Electrolyte disturbances (hypokalemia, hypomagnesemia)', 'Hepatotoxicity', 'Leukocytosis'],
    storageAdvice: 'Store below 25°C. Do not freeze.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'What cardiac monitoring is required with Arsenic Trioxide?',
        answer: 'A baseline 12-lead ECG and weekly ECGs are mandatory to monitor QTc intervals. Electrolytes (K+ and Mg2+) must be kept in the high-normal range.'
      }
    ],
    aliases: ['ATO', 'Trisenox', 'Arsenox']
  },
  {
    id: 'salt-4',
    sNo: 4,
    name: 'Axitinib',
    slug: 'axitinib',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Selective VEGF Receptor Tyrosine Kinase Inhibitor (VEGFR-1, 2, 3)',
    descriptionShort: 'Axitinib is a potent and selective second-generation VEGFR tyrosine kinase inhibitor used in advanced renal cell carcinoma (RCC).',
    descriptionLong: 'Axitinib is engineered to inhibit VEGFR-1, VEGFR-2, and VEGFR-3 at sub-nanomolar concentrations with high selectivity over other kinases. By blocking vascular endothelial growth factor signaling, axitinib cuts off tumor angiogenesis, impedes vascular permeability, and delays tumor growth in advanced renal cell carcinoma, both as monotherapy and combined with immune checkpoint inhibitors.',
    mechanismOfAction: 'Potent, selective inhibitor of VEGFR-1, VEGFR-2, and VEGFR-3 intracellular tyrosine kinase domains, blocking endothelial cell proliferation and neo-angiogenesis.',
    indications: [
      'Advanced Renal Cell Carcinoma (RCC) after failure of one prior systemic therapy',
      'First-line advanced RCC in combination with Pembrolizumab or Avelumab'
    ],
    commonStrengths: ['1 mg', '5 mg'],
    dosageForms: ['Tablet'],
    commonSideEffects: ['Hypertension', 'Diarrhea', 'Fatigue', 'Dysphonia (hoarseness)', 'Hand-foot skin reaction (Palmar-plantar erythrodysesthesia)', 'Decreased appetite / weight loss'],
    storageAdvice: 'Store at 20°C to 25°C.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'How is hypertension managed during Axitinib therapy?',
        answer: 'Blood pressure must be monitored frequently. Antihypertensive therapy is initiated or titrated early to maintain blood pressure within normal parameters.'
      }
    ],
    aliases: ['Inlyta', 'Axita', 'Axitik']
  },
  {
    id: 'salt-5',
    sNo: 5,
    name: 'Azacitidine',
    slug: 'azacitidine',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'DNA Methyltransferase (DNMT) Inhibitor / Hypomethylating Agent',
    descriptionShort: 'Azacitidine is a pyrimidine nucleoside analog and hypomethylating agent used in Myelodysplastic Syndromes (MDS) and Acute Myeloid Leukemia (AML).',
    descriptionLong: 'Azacitidine incorporates into RNA and DNA where it irreversibly inhibits DNA methyltransferases (DNMTs). This demethylation of hypermethylated promoter regions reactivates silenced tumor suppressor genes and induces normal cellular differentiation and apoptosis in hematological malignant clones.',
    mechanismOfAction: 'Inhibits DNA methyltransferase at low doses resulting in DNA hypomethylation; incorporates into RNA/DNA at high doses causing direct cytotoxicity.',
    indications: [
      'Myelodysplastic Syndromes (MDS - IPSS intermediate-2 and high-risk)',
      'Chronic Myelomonocytic Leukemia (CMML)',
      'Acute Myeloid Leukemia (AML) in elderly or unfit candidates'
    ],
    commonStrengths: ['100 mg lyophilized powder for injection', '200 mg', '300 mg tablets (oral CC-486)'],
    dosageForms: ['Injection', 'Tablet'],
    commonSideEffects: ['Neutropenia / thrombocytopenia', 'Nausea and vomiting', 'Constipation / diarrhea', 'Injection site erythema / pain', 'Pyrexia'],
    storageAdvice: 'Store unconstituted vials at 25°C. Reconstituted suspension must be used promptly or kept at 2°C to 8°C.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'How many cycles of Azacitidine are typically needed to assess response?',
        answer: 'At least 4 to 6 cycles of 28-day treatment are usually necessary before clinical response can be fully evaluated.'
      }
    ],
    aliases: ['Vidaza', 'Azadine', 'Mylocit', 'Onureg']
  },
  {
    id: 'salt-6',
    sNo: 6,
    name: 'Bendamustine',
    slug: 'bendamustine',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Bifunctional Alkylating Agent / Purine Analog Hybrid',
    descriptionShort: 'Bendamustine is a unique hybrid alkylating agent and purine antimetabolite indicated in Chronic Lymphocytic Leukemia (CLL) and Indolent B-Cell Non-Hodgkin Lymphoma.',
    descriptionLong: 'Bendamustine possesses a unique chemical structure featuring a nitrogen mustard group attached to a benzimidazole purine ring. It forms intra- and inter-strand DNA crosslinks that cause robust, irreversible double-strand DNA breaks and distinct cell death pathways distinct from conventional alkylators.',
    mechanismOfAction: 'Forms covalent bonds with nucleic acids, crosslinking DNA strands and inhibiting DNA repair mechanisms, leading to p53-dependent and independent apoptosis.',
    indications: [
      'Chronic Lymphocytic Leukemia (CLL - Binet Stage B or C)',
      'Indolent Non-Hodgkin Lymphoma (iNHL) progressive during or following Rituximab therapy',
      'Multiple Myeloma in combination with steroids'
    ],
    commonStrengths: ['25 mg/vial', '100 mg/vial'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Myelosuppression (lymphopenia, neutropenia)', 'Nausea and vomiting', 'Fatigue', 'Pyrexia', 'Skin rash / hypersensitivity'],
    storageAdvice: 'Store below 25°C in original carton protected from light.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Is antimicrobial prophylaxis required with Bendamustine?',
        answer: 'Due to prolonged CD4+ T-cell lymphopenia, prophylaxis against Pneumocystis jirovecii pneumonia (PJP) and Herpes zoster is frequently recommended.'
      }
    ],
    aliases: ['Treanda', 'Bendit', 'Ribomustin', 'Puritaz']
  },
  {
    id: 'salt-7',
    sNo: 7,
    name: 'Bevacizumab',
    slug: 'bevacizumab',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Recombinant Humanized Anti-VEGF-A Monoclonal Antibody',
    descriptionShort: 'Bevacizumab is a targeted monoclonal antibody that binds Vascular Endothelial Growth Factor A (VEGF-A), blocking tumor angiogenesis.',
    descriptionLong: 'Bevacizumab is a recombinant humanized IgG1 monoclonal antibody that binds to all active isoforms of circulating VEGF-A. By preventing VEGF from binding to VEGFR-1 and VEGFR-2 on endothelial cells, bevacizumab suppresses new blood vessel formation (neo-angiogenesis), normalizes tumor interstitial fluid pressure, and sensitizes solid tumors to chemotherapy.',
    mechanismOfAction: 'Neutralizes soluble VEGF-A, preventing endothelial cell proliferation, migration, and new vessel sprouting within solid tumors.',
    indications: [
      'Metastatic Colorectal Cancer (mCRC)',
      'Non-Squamous Non-Small Cell Lung Cancer (NSCLC)',
      'Glioblastoma multiforme (recurrent)',
      'Metastatic Renal Cell Carcinoma (mRCC)',
      'Ovarian, Fallopian Tube, and Primary Peritoneal Cancer',
      'Cervical Cancer'
    ],
    commonStrengths: ['100 mg/4 ml', '400 mg/16 ml'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Hypertension', 'Proteinuria', 'Epistaxis / minor mucosal bleeding', 'Impaired wound healing', 'Gastrointestinal perforation (rare but serious)', 'Thromboembolic events'],
    storageAdvice: 'Store refrigerated at 2°C to 8°C (Cold Chain). Do not freeze or shake.',
    coldStorage: 'Yes',
    faqs: [
      {
        question: 'How long should Bevacizumab be held before and after elective surgery?',
        answer: 'Because Bevacizumab inhibits wound healing, it must be withheld for at least 28 to 42 days prior to and following elective surgical procedures.'
      },
      {
        question: 'Is urine protein testing necessary during Bevacizumab infusions?',
        answer: 'Yes, routine dipstick or spot urine protein-to-creatinine ratio is checked before every dose to monitor for proteinuria.'
      }
    ],
    aliases: ['Avastin', 'Bryxta', 'Bevatas', 'Abevmy', 'Versavo']
  },
  {
    id: 'salt-8',
    sNo: 8,
    name: 'Bicalutamide',
    slug: 'bicalutamide',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Non-Steroidal Antiandrogen (First Generation)',
    descriptionShort: 'Bicalutamide is a competitive androgen receptor antagonist used in combination with LHRH agonists for locally advanced or metastatic prostate cancer.',
    descriptionLong: 'Bicalutamide binds directly to androgen receptors on androgen-dependent prostate cancer cells, blocking the binding of dihydrotestosterone (DHT) and testosterone. This stops androgen-driven cellular proliferation and is routinely used to prevent disease flare-up when initiating LHRH agonists.',
    mechanismOfAction: 'Competitively inhibits androgen binding to nuclear androgen receptors, inhibiting target gene expression and inducing prostate tumor regression.',
    indications: [
      'Advanced / Metastatic Prostate Cancer in combination with LHRH analogues or surgical castration',
      'Locally advanced non-metastatic prostate cancer (monotherapy in select protocols)'
    ],
    commonStrengths: ['50 mg', '150 mg'],
    dosageForms: ['Tablet'],
    commonSideEffects: ['Gynecomastia and breast tenderness', 'Hot flashes', 'Elevated liver enzymes (transaminases)', 'Asthenia', 'Pruritus / dry skin'],
    storageAdvice: 'Store below 30°C in a dry place.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Can Bicalutamide prevent the testosterone surge from LHRH analogs?',
        answer: 'Yes, starting Bicalutamide 3 to 7 days before LHRH agonist administration prevents symptoms associated with the initial testosterone surge.'
      }
    ],
    aliases: ['Casodex', 'Bicatero', 'Calutide', 'Biprostat']
  },
  {
    id: 'salt-9',
    sNo: 9,
    name: 'Bleomycin',
    slug: 'bleomycin',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Cytotoxic Glycopeptide Antibiotic',
    descriptionShort: 'Bleomycin is a glycopeptide antineoplastic antibiotic used in Hodgkin lymphoma, germ cell testicular tumors, and malignant pleural effusions.',
    descriptionLong: 'Bleomycin is a complex glycopeptide isolated from Streptomyces verticillus. In the presence of oxygen and ferrous iron (Fe2+), bleomycin creates pseudo-enzyme free radicals that cause single- and double-strand DNA cleavage. Notably, it causes minimal bone marrow suppression, making it a critical component in combination regimens such as ABVD and BEP.',
    mechanismOfAction: 'Binds to DNA and chelates iron (Fe2+), reacting with molecular oxygen to generate reactive oxygen species (ROS) that cleave phosphodiester bonds.',
    indications: [
      'Hodgkin Lymphoma (ABVD regimen)',
      'Testicular Germ Cell Tumors (BEP regimen)',
      'Squamous Cell Carcinomas of head, neck, and cervix',
      'Malignant pleural effusion (pleurodesis)'
    ],
    commonStrengths: ['15 Units (15 mg) vial'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Pulmonary toxicity / pneumonitis / pulmonary fibrosis', 'Skin hyperpigmentation / erythema', 'Alopecia', 'Pyrexia and chills post-infusion'],
    storageAdvice: 'Store refrigerated at 2°C to 8°C (Cold Chain).',
    coldStorage: 'Yes',
    faqs: [
      {
        question: 'What is the most critical toxicity associated with Bleomycin?',
        answer: 'Pulmonary fibrosis is the dose-limiting toxicity. Baseline and periodic pulmonary function tests (DLCO) and cumulative lifetime dose limits (<400 units) are strictly observed.'
      }
    ],
    aliases: ['Blenoxane', 'Bleocip', 'Bleocel']
  },
  {
    id: 'salt-10',
    sNo: 10,
    name: 'Bortezomib',
    slug: 'bortezomib',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Targeted 26S Proteasome Inhibitor',
    descriptionShort: 'Bortezomib is a reversible 26S proteasome inhibitor used extensively in the treatment of Multiple Myeloma and Mantle Cell Lymphoma.',
    descriptionLong: 'Bortezomib is a dipeptide boronic acid derivative that specifically and reversibly binds the chymotrypsin-like active site of the 26S proteasome. In myeloma cells, inhibition of proteasomal degradation leads to toxic intracellular accumulation of polyubiquitinated proteins, suppression of the anti-apoptotic NF-κB pathway, and cell cycle arrest leading to rapid apoptosis.',
    mechanismOfAction: 'Reversibly inhibits the 26S proteasome complex, disrupting intracellular protein homeostasis and inhibiting NF-κB signaling.',
    indications: [
      'Multiple Myeloma (newly diagnosed and relapsed/refractory)',
      'Mantle Cell Lymphoma'
    ],
    commonStrengths: ['2 mg vial', '3.5 mg vial (lyophilized powder)'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Peripheral sensory neuropathy', 'Thrombocytopenia and neutropenia', 'Gastrointestinal upset (diarrhea/constipation)', 'Fatigue and malaise', 'Herpes zoster reactivation'],
    storageAdvice: 'Store unopened vials below 25°C protected from light.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why is subcutaneous (SC) Bortezomib preferred over intravenous (IV)?',
        answer: 'Subcutaneous injection offers equivalent efficacy to IV infusion with a significantly lower rate and severity of treatment-emergent peripheral neuropathy.'
      },
      {
        question: 'Is antiviral prophylaxis mandatory during Bortezomib therapy?',
        answer: 'Yes, acyclovir or valacyclovir prophylaxis is routinely prescribed to prevent varicella zoster virus (shingles) reactivation.'
      }
    ],
    aliases: ['Velcade', 'Bortecad', 'Myezom', 'Bortrac']
  },
  {
    id: 'salt-11',
    sNo: 11,
    name: 'Cabazitaxel',
    slug: 'cabazitaxel',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Semi-Synthetic Microtubule Inhibitor / Taxane',
    descriptionShort: 'Cabazitaxel is a second-generation taxane designed to overcome docetaxel resistance in metastatic castration-resistant prostate cancer.',
    descriptionLong: 'Cabazitaxel is a semi-synthetic taxane engineered with poor affinity for the P-glycoprotein multidrug resistance pump. It stabilizes tubulin polymers and inhibits microtubule depolymerization, halting mitotic cell division in tumor cells that have developed resistance to docetaxel.',
    mechanismOfAction: 'Binds to tubulin and promotes microtubule assembly while preventing disassembly, causing G2/M phase arrest and apoptotic cell death.',
    indications: [
      'Metastatic Castration-Resistant Prostate Cancer (mCRPC) previously treated with a docetaxel-containing regimen (combined with prednisone)'
    ],
    commonStrengths: ['60 mg/1.5 ml (concentrate and solvent)'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Neutropenia / febrile neutropenia (G-CSF support recommended)', 'Diarrhea', 'Anemia', 'Fatigue', 'Asthenia'],
    storageAdvice: 'Store below 25°C in original carton. Do not freeze.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Is premedication required prior to Cabazitaxel infusions?',
        answer: 'Yes, premedication with an antihistamine (H1 and H2 antagonists) and corticosteroid (dexamethasone) is mandatory to minimize hypersensitivity risks.'
      }
    ],
    aliases: ['Jevtana', 'Cabatax', 'Cabazit']
  },
  {
    id: 'salt-12',
    sNo: 12,
    name: 'Capecitabine',
    slug: 'capecitabine',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Oral Fluoropyrimidine Carbamate Prodrug (5-FU Prodrug)',
    descriptionShort: 'Capecitabine is an orally administered prodrug enzymatically converted into 5-fluorouracil inside tumor tissue for breast, colorectal, and gastric cancers.',
    descriptionLong: 'Capecitabine is a rational prodrug of 5-fluorouracil designed for tumor-targeted activation. It undergoes a 3-step enzymatic cascade culminating in conversion to 5-FU by thymidine phosphorylase, an enzyme present in significantly higher concentrations within tumor tissues than in healthy tissues.',
    mechanismOfAction: 'Selectively converted to 5-fluorouracil in tumor cells, inhibiting thymidylate synthase and blocking DNA synthesis while incorporating into RNA.',
    indications: [
      'Adjuvant treatment of Stage III Colorectal Cancer',
      'Metastatic Colorectal and Gastric Adenocarcinomas',
      'Locally advanced or metastatic Breast Cancer (monotherapy or with Docetaxel)'
    ],
    commonStrengths: ['150 mg', '500 mg'],
    dosageForms: ['Tablet'],
    commonSideEffects: ['Hand-foot syndrome (Palmar-plantar erythrodysesthesia)', 'Diarrhea', 'Nausea and stomatitis', 'Hyperbilirubinemia', 'Fatigue'],
    storageAdvice: 'Store below 30°C in original bottle with cap tightly closed.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'When should Capecitabine tablets be swallowed?',
        answer: 'Capecitabine must be swallowed whole with water within 30 minutes after completing a meal (breakfast and dinner).'
      },
      {
        question: 'How is Hand-Foot Syndrome managed on Capecitabine?',
        answer: 'Applying urea-based moisturizing creams, avoiding friction/heat on palms and soles, and prompt dose reductions upon onset of redness/pain.'
      }
    ],
    aliases: ['Xeloda', 'Capegard', 'Capnat', 'Distocide']
  },
  {
    id: 'salt-13',
    sNo: 13,
    name: 'Carboplatin',
    slug: 'carboplatin',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Second-Generation Platinum Alkylating-like Coordination Complex',
    descriptionShort: 'Carboplatin is a second-generation platinum antineoplastic with reduced nephrotoxicity and emetogenicity, widely used in ovarian, lung, and head & neck cancers.',
    descriptionLong: 'Carboplatin contains a bidentate cyclobutane dicarboxylate chelate ligand that provides greater chemical stability than cisplatin. It forms covalent intrastrand and interstrand DNA adducts, leading to distortion of the DNA helix, inhibition of DNA replication and transcription, and programmed cell death.',
    mechanismOfAction: 'Produces intrastrand cross-links between adjacent guanine residues in DNA, causing replication arrest and apoptosis in actively dividing cells.',
    indications: [
      'Advanced Ovarian Carcinoma of epithelial origin',
      'Small Cell and Non-Small Cell Lung Cancer (NSCLC/SCLC)',
      'Endometrial, Cervical, and Head & Neck Cancers'
    ],
    commonStrengths: ['150 mg/15 ml', '450 mg/45 ml', '600 mg/60 ml'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Thrombocytopenia and neutropenia (dose-limiting myelosuppression)', 'Anemia', 'Nausea and vomiting', 'Peripheral neuropathy (milder than cisplatin)'],
    storageAdvice: 'Store below 25°C protected from light. Do not freeze.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'How is the dosage of Carboplatin calculated in clinical practice?',
        answer: 'Dosing is uniquely determined using the Calvert Formula based on Target Area Under the Curve (AUC) and individual glomerular filtration rate (GFR/CrCl).'
      }
    ],
    aliases: ['Paraplatin', 'Carbopa', 'Oncocarb', 'Kemocarb']
  },
  {
    id: 'salt-14',
    sNo: 14,
    name: 'Carfilzomib',
    slug: 'carfilzomib',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Second-Generation Irreversible Proteasome Inhibitor (Epoxyketone)',
    descriptionShort: 'Carfilzomib is a selective, irreversible epoxyketone proteasome inhibitor used for relapsed or refractory Multiple Myeloma.',
    descriptionLong: 'Carfilzomib is a tetrapeptide epoxyketone that irreversibly binds to the N-terminal threonine active sites of the 20S proteasome core. Because of its irreversible mechanism and high specificity for chymotrypsin-like activity, carfilzomib induces prolonged proteasome inhibition with lower neurotoxicity compared to bortezomib.',
    mechanismOfAction: 'Irreversibly binds and inhibits the chymotrypsin-like activity of the 20S proteasome, triggering stress responses and apoptosis in myeloma cells.',
    indications: [
      'Relapsed or Refractory Multiple Myeloma in patients who have received 1 to 3 prior lines of therapy (combined with Dexamethasone ± Daratumumab/Lenalidomide)'
    ],
    commonStrengths: ['30 mg vial', '60 mg vial (lyophilized powder)'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Cardiovascular toxicity (heart failure, hypertension, ischemia)', 'Dyspnea and acute pulmonary symptoms', 'Thrombocytopenia', 'Renal impairment', 'Infusion reactions'],
    storageAdvice: 'Store refrigerated at 2°C to 8°C in original carton (Cold Chain).',
    coldStorage: 'Yes',
    faqs: [
      {
        question: 'What cardiac precautions are required before starting Carfilzomib?',
        answer: 'Baseline echocardiography, blood pressure control, and adequate hydration monitoring are mandatory before initiating carfilzomib therapy.'
      }
    ],
    aliases: ['Kyprolis', 'Carfil', 'Carfitor']
  },
  {
    id: 'salt-15',
    sNo: 15,
    name: 'Ceritinib',
    slug: 'ceritinib',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Second-Generation ALK Tyrosine Kinase Inhibitor',
    descriptionShort: 'Ceritinib is an oral second-generation ALK inhibitor indicated in ALK-positive metastatic Non-Small Cell Lung Cancer (NSCLC).',
    descriptionLong: 'Ceritinib is an ATP-competitive small-molecule inhibitor of Anaplastic Lymphoma Kinase (ALK). It penetrates the blood-brain barrier and maintains high potency against crizotinib-resistant ALK gatekeeper mutations, suppressing downstream oncogenic ERK, AKT, and STAT3 signaling pathways.',
    mechanismOfAction: 'Inhibits autophosphorylation of ALK, ALK-mediated phosphorylation of downstream signaling proteins, and reduces viability of ALK-rearranged cancer cells.',
    indications: [
      'ALK-positive metastatic Non-Small Cell Lung Cancer (NSCLC) in first-line or post-crizotinib setting'
    ],
    commonStrengths: ['150 mg'],
    dosageForms: ['Capsule', 'Tablet'],
    commonSideEffects: ['Gastrointestinal toxicity (diarrhea, nausea, vomiting, abdominal pain)', 'Hepatotoxicity (elevated ALT/AST)', 'Prolonged QTc interval', 'Hyperglycemia', 'Bradycardia'],
    storageAdvice: 'Store at 20°C to 25°C.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'How should Ceritinib be taken with food to reduce stomach upset?',
        answer: 'Modern dosing guidelines recommend 450 mg orally once daily taken WITH a meal to minimize gastrointestinal discomfort while maintaining therapeutic blood levels.'
      }
    ],
    aliases: ['Zykadia', 'Ceritad']
  },
  {
    id: 'salt-16',
    sNo: 16,
    name: 'Chlorambucil',
    slug: 'chlorambucil',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Oral Nitrogen Mustard Alkylating Agent',
    descriptionShort: 'Chlorambucil is an orally active bifunctional alkylating agent used for Chronic Lymphocytic Leukemia (CLL) and indolent Non-Hodgkin Lymphomas.',
    descriptionLong: 'Chlorambucil is one of the classic orally active aromatic nitrogen mustard derivatives. It transfers alkyl groups to DNA bases, forming cross-links between DNA strands that prevent DNA replication and lead to cellular senescence and apoptosis in lymphoid malignancies.',
    mechanismOfAction: 'Interferes with DNA replication and RNA transcription by alkylation of cellular guanine residues and formation of covalent crosslinks.',
    indications: [
      'Chronic Lymphocytic Leukemia (CLL)',
      'Malignant Lymphomas (including Hodgkin and Indolent Non-Hodgkin Lymphoma)',
      'Waldenström Macroglobulinemia'
    ],
    commonStrengths: ['2 mg', '5 mg'],
    dosageForms: ['Tablet'],
    commonSideEffects: ['Bone marrow suppression (dose-dependent neutropenia/thrombocytopenia)', 'Nausea and vomiting', 'Skin rash', 'Hepatotoxicity (rare)'],
    storageAdvice: 'Store refrigerated at 2°C to 8°C (Cold Chain). Protect from moisture.',
    coldStorage: 'Yes',
    faqs: [
      {
        question: 'Does Chlorambucil require cold chain storage?',
        answer: 'Yes, Chlorambucil tablets are heat-sensitive and must be stored refrigerated between 2°C and 8°C in airtight containers.'
      }
    ],
    aliases: ['Leukeran', 'Chloramex', 'Clokeran']
  },
  {
    id: 'salt-17',
    sNo: 17,
    name: 'Cisplatin',
    slug: 'cisplatin',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Inorganic Platinum Coordination Complex',
    descriptionShort: 'Cisplatin is a foundational platinum chemotherapy agent widely used in testicular, ovarian, lung, bladder, cervical, and head & neck cancers.',
    descriptionLong: 'Cisplatin (cis-diamminedichloroplatinum II) is one of the most widely used antineoplastic agents in medical oncology. Inside cells, lower chloride concentrations trigger aquation of cisplatin to form highly reactive positively charged platinum species that bind to the N-7 position of purine bases, generating intrastrand DNA crosslinks and apoptosis.',
    mechanismOfAction: 'Causes cross-linking of DNA purine bases, halting DNA synthesis, transcription, and triggering intrinsic apoptotic cascades.',
    indications: [
      'Testicular Germ Cell Tumors (curative potential in multi-agent regimens)',
      'Ovarian Carcinoma',
      'Advanced Bladder Urothelial Carcinoma',
      'Head and Neck Squamous Cell Carcinoma',
      'Non-Small Cell and Small Cell Lung Cancers',
      'Cervical and Esophageal Cancers'
    ],
    commonStrengths: ['10 mg/10 ml', '50 mg/50 ml'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Nephrotoxicity (dose-limiting acute kidney injury)', 'Severe acute and delayed nausea/vomiting', 'Ototoxicity (tinnitus/high-frequency hearing loss)', 'Peripheral sensory neuropathy', 'Myelosuppression'],
    storageAdvice: 'Store at 15°C to 25°C protected from light. DO NOT REFRIGERATE (precipitation will occur).',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why should Cisplatin solutions NEVER be refrigerated?',
        answer: 'Refrigeration causes cisplatin to precipitate out of solution as crystals. It must be kept at room temperature (15°C–25°C).'
      },
      {
        question: 'What protective measures prevent Cisplatin-induced kidney damage?',
        answer: 'Intravenous pre- and post-hydration with 0.9% normal saline and mannitol diuresis are mandatory to protect renal tubules.'
      }
    ],
    aliases: ['Platinol', 'Cisplat', 'Kemoplat', 'Ciswel']
  },
  {
    id: 'salt-18',
    sNo: 18,
    name: 'Cladribine',
    slug: 'cladribine',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Purine Nucleoside Antimetabolite / Adenosine Deaminase Resistant',
    descriptionShort: 'Cladribine is a synthetic purine nucleoside analog highly effective in Hairy Cell Leukemia (HCL) and Relapsing Multiple Sclerosis.',
    descriptionLong: 'Cladribine (2-chlorodeoxyadenosine) resists degradation by adenosine deaminase (ADA). Once phosphorylated intracellularly by deoxycytidine kinase into its active triphosphate form (2-CdATP), it accumulates in resting and dividing lymphocytes, inhibiting DNA polymerase, causing DNA strand breaks, and depleting intracellular ATP.',
    mechanismOfAction: 'Incorporates into lymphocyte DNA, inhibiting DNA synthesis and ribonucleotide reductase, resulting in profound, selective lymphocytotoxicity.',
    indications: [
      'Hairy Cell Leukemia (HCL - frontline standard of care)',
      'Relapsing forms of Multiple Sclerosis (oral formulation Mavenclad)',
      'Cutaneous and peripheral T-cell lymphomas'
    ],
    commonStrengths: ['10 mg/10 ml vial for infusion', '10 mg oral tablets'],
    dosageForms: ['Injection', 'Tablet'],
    commonSideEffects: ['Severe prolonged lymphopenia and neutropenia', 'Opportunistic infections (fungal, herpes)', 'Pyrexia', 'Nausea and headache'],
    storageAdvice: 'Store refrigerated at 2°C to 8°C (Cold Chain).',
    coldStorage: 'Yes',
    faqs: [
      {
        question: 'Why is Cladribine considered the gold standard for Hairy Cell Leukemia?',
        answer: 'A single 5-to-7 day cycle of Cladribine produces durable complete remission rates exceeding 85% to 90% in Hairy Cell Leukemia.'
      }
    ],
    aliases: ['Leustatin', 'Mavenclad', 'Cladrimed']
  },
  {
    id: 'salt-19',
    sNo: 19,
    name: 'Cyclophosphamide',
    slug: 'cyclophosphamide',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Oxazaphosphorine Nitrogen Mustard Alkylating Agent / Immunosuppressant',
    descriptionShort: 'Cyclophosphamide is a versatile alkylating prodrug used across hematologic malignancies, solid tumors, and severe autoimmune conditions.',
    descriptionLong: 'Cyclophosphamide is an inactive prodrug activated in hepatocytes by cytochrome P450 enzymes (CYP2B6, CYP3A4) into 4-hydroxycyclophosphamide, which decomposes to phosphoramide mustard and acrolein. Phosphoramide mustard alkylates DNA, preventing tumor replication, while acrolein causes bladder urothelial irritation.',
    mechanismOfAction: 'Alkylates DNA at the N-7 position of guanine, forming inter- and intra-strand crosslinks that inhibit DNA replication and transcription.',
    indications: [
      'Hodgkin and Non-Hodgkin Lymphomas (CHOP regimen)',
      'Breast Carcinoma (AC and CMF regimens)',
      'Multiple Myeloma and Leukemia protocols',
      'Conditioning regimens for Bone Marrow Transplantation',
      'Severe Lupus Nephritis and systemic vasculitis'
    ],
    commonStrengths: ['200 mg', '500 mg', '1000 mg vials', '25 mg', '50 mg tablets'],
    dosageForms: ['Injection', 'Tablet'],
    commonSideEffects: ['Hemorrhagic cystitis (caused by acrolein metabolite)', 'Bone marrow suppression (neutropenia)', 'Alopecia (hair loss)', 'Nausea and vomiting', 'Infertility / gonadal toxicity'],
    storageAdvice: 'Store below 25°C in a cool, dry place. High temperatures cause liquefaction.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'How is hemorrhagic cystitis prevented during high-dose Cyclophosphamide?',
        answer: 'Co-administration of Mesna (2-mercaptoethane sulfonate) and vigorous intravenous hydration neutralizes toxic acrolein in the urinary bladder.'
      }
    ],
    aliases: ['Endoxan', 'Cyphos', 'Cytoxan']
  },
  {
    id: 'salt-20',
    sNo: 20,
    name: 'Cytarabine',
    slug: 'cytarabine',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Pyrimidine Nucleoside Antimetabolite (Ara-C)',
    descriptionShort: 'Cytarabine (Ara-C) is a core antimetabolite essential for the induction and consolidation therapy of Acute Myeloid Leukemia (AML).',
    descriptionLong: 'Cytarabine (cytosine arabinoside) is converted inside cells to cytarabine triphosphate (Ara-CTP), which competes directly with deoxycytidine triphosphate for incorporation into DNA. It competitively inhibits DNA polymerase, halts chain elongation, and triggers immediate S-phase cell cycle arrest.',
    mechanismOfAction: 'Incorporates into replicating DNA, inhibiting DNA polymerase alpha and beta and causing terminating DNA synthesis.',
    indications: [
      'Acute Myeloid Leukemia (AML - 7+3 induction and HiDAC consolidation)',
      'Acute Lymphoblastic Leukemia (ALL)',
      'Meningeal Leukemia and Lymphoma (intrathecal administration)'
    ],
    commonStrengths: ['100 mg/vial', '500 mg/vial', '1000 mg/vial'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Severe bone marrow depression', 'Cerebellar toxicity / neurotoxicity (with high-dose Ara-C)', 'Cytarabine syndrome (fever, rash, bone pain)', 'Chemical conjunctivitis / keratitis', 'Gastrointestinal ulceration'],
    storageAdvice: 'Store below 25°C protected from light.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why are steroid eye drops prescribed with high-dose Cytarabine (HiDAC)?',
        answer: 'High-dose Cytarabine is excreted into tears and causes severe chemical conjunctivitis. Dexamethasone or prednisolone eye drops prevent ocular toxicity.'
      }
    ],
    aliases: ['Cytosar', 'Aracytin', 'Cytabin', 'Ara-C']
  },
  {
    id: 'salt-21',
    sNo: 21,
    name: 'Dacarbazine',
    slug: 'dacarbazine',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Triazene Non-Classic Alkylating Agent',
    descriptionShort: 'Dacarbazine is a triazene alkylating antineoplastic indicated for metastatic malignant melanoma and Hodgkin lymphoma (ABVD).',
    descriptionLong: 'Dacarbazine (DTIC) is a non-cell cycle specific alkylating agent. It undergoes hepatic microsomal N-demethylation to form the active metabolite MTIC (monomethyl triazeno imidazole carboxamide). MTIC spontaneously decomposes into diazomethane, generating carbonium ions that alkylate guanine moieties at O-6 and N-7 positions in DNA.',
    mechanismOfAction: 'Active metabolite MTIC methylates DNA at guanine residues, resulting in mispairing, DNA strand crosslinking, and cell death.',
    indications: [
      'Hodgkin Lymphoma (component of gold-standard ABVD regimen)',
      'Metastatic Malignant Melanoma',
      'Soft tissue sarcomas and neuroendocrine tumors'
    ],
    commonStrengths: ['100 mg', '200 mg', '500 mg vials'],
    dosageForms: ['Injection'],
    commonSideEffects: ['High emetogenic potential (severe acute nausea and vomiting)', 'Myelosuppression (delayed leukopenia/thrombocytopenia)', 'Flu-like syndrome (fever, myalgia)', 'Injection site pain / phlebitis'],
    storageAdvice: 'Store refrigerated at 2°C to 8°C (Cold Chain). Protect from light.',
    coldStorage: 'Yes',
    faqs: [
      {
        question: 'Why must Dacarbazine infusions be protected from light?',
        answer: 'Dacarbazine rapidly photo-degrades when exposed to ambient light into a pink or reddish toxic byproduct. Light-protective infusion covers must be used.'
      }
    ],
    aliases: ['DTIC', 'Dacarzan', 'Dacarex']
  },
  {
    id: 'salt-22',
    sNo: 22,
    name: 'Dactinomycin',
    slug: 'dactinomycin',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Chromopeptide Antitumor Antibiotic (Actinomycin D)',
    descriptionShort: 'Dactinomycin (Actinomycin D) is a chromopeptide antibiotic used in pediatric solid tumors like Wilms tumor and Ewing sarcoma.',
    descriptionLong: 'Dactinomycin is an antitumor antibiotic isolated from Streptomyces species. It contains a planar phenoxazone chromophore that intercalates between adjacent guanine-cytosine base pairs in double-stranded DNA. This sterically hinders the movement of RNA polymerase, selectively blocking messenger RNA (mRNA) transcription.',
    mechanismOfAction: 'Intercalates into DNA base pairs, inhibiting DNA-dependent RNA synthesis and topoisomerase II activity.',
    indications: [
      'Wilms Tumor (nephroblastoma in pediatric oncology)',
      'Ewing Sarcoma and Rhabdomyosarcoma',
      'Gestational Trophoblastic Neoplasia (GTN / choriocarcinoma)',
      'Testicular Non-Seminomatous Germ Cell Tumors'
    ],
    commonStrengths: ['0.5 mg (500 mcg) lyophilized vial'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Severe bone marrow depression', 'Severe stomatitis / mucositis', 'Potent vesicant (severe tissue necrosis if extravasated)', 'Radiation recall reaction', 'Alopecia'],
    storageAdvice: 'Store below 25°C protected from light.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'What is Radiation Recall with Dactinomycin?',
        answer: 'Dactinomycin can trigger severe erythema and desquamation in skin areas previously subjected to radiation therapy, known as radiation recall.'
      }
    ],
    aliases: ['Cosmegen', 'Actinomycin D', 'Dactin']
  },
  {
    id: 'salt-23',
    sNo: 23,
    name: 'Daunorubicin',
    slug: 'daunorubicin',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Anthracycline Antitumor Antibiotic / Topoisomerase II Inhibitor',
    descriptionShort: 'Daunorubicin is an anthracycline cytotoxic agent that forms the backbone of remission induction in Acute Myeloid and Lymphoblastic Leukemias.',
    descriptionLong: 'Daunorubicin is an anthracycline antibiotic that exerts its antineoplastic effects through DNA intercalation, topoisomerase II poison activity, and generation of reactive free radicals. It stabilizes the cleavable topoisomerase II-DNA complex, inducing irreversible double-strand DNA breaks that drive leukemic blast cells into apoptosis.',
    mechanismOfAction: 'Intercalates into DNA base pairs, inhibits topoisomerase II, and generates quinone-derived oxygen free radicals, damaging DNA and lipid membranes.',
    indications: [
      'Acute Myeloid Leukemia (AML - backbone of the 7+3 induction regimen)',
      'Acute Lymphoblastic Leukemia (ALL)'
    ],
    commonStrengths: ['20 mg/vial (lyophilized powder)'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Cardiotoxicity (cumulative dose-related cardiomyopathy)', 'Profound myelosuppression', 'Severe mucositis', 'Red coloration of urine / sweat', 'Vesicant tissue necrosis on extravasation'],
    storageAdvice: 'Store below 25°C protected from light.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why does urine turn red after Daunorubicin administration?',
        answer: 'Daunorubicin is naturally deep red-orange. It imparts a harmless red tint to urine, sweat, and tears for 24–48 hours after infusion.'
      },
      {
        question: 'What is the maximum cumulative lifetime dose of Daunorubicin?',
        answer: 'To avoid irreversible congestive heart failure, cumulative lifetime dose is usually capped at 400 to 550 mg/m².'
      }
    ],
    aliases: ['Cerubidine', 'Daunotec', 'Daunocin']
  },
  {
    id: 'salt-24',
    sNo: 24,
    name: 'Decitabine',
    slug: 'decitabine',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Deoxycytidine Hypomethylating Agent / DNMT1 Inhibitor',
    descriptionShort: 'Decitabine is a potent DNA hypomethylating agent indicated for Myelodysplastic Syndromes (MDS) and Acute Myeloid Leukemia (AML).',
    descriptionLong: 'Decitabine (5-aza-2\'-deoxycytidine) is a direct deoxycytidine analogue that incorporates directly into replicating DNA strands. Once inside DNA, it covalently traps and inhibits DNA methyltransferase 1 (DNMT1), leading to passive demethylation during cell division and reactivation of silenced tumor suppressor genes.',
    mechanismOfAction: 'Covalently traps DNA methyltransferase enzyme, reversing abnormal DNA promoter hypermethylation and restoring normal gene expression.',
    indications: [
      'Myelodysplastic Syndromes (MDS - all FAB/IPSS risk classifications)',
      'Acute Myeloid Leukemia (AML) in adult patients unfit for standard intensive induction chemotherapy'
    ],
    commonStrengths: ['50 mg lyophilized vial for infusion'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Neutropenia / febrile neutropenia', 'Thrombocytopenia', 'Anemia', 'Pyrexia', 'Nausea and diarrhea'],
    storageAdvice: 'Store below 25°C in original package.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'How is Decitabine administered during each cycle?',
        answer: 'Standard regimens involve either 15 mg/m² continuous IV infusion over 3 hours every 8 hours for 3 days, or 20 mg/m² daily for 5 consecutive days every 4 weeks.'
      }
    ],
    aliases: ['Dacogen', 'Decitax', 'Dacoz']
  },
  {
    id: 'salt-25',
    sNo: 25,
    name: 'Degarelix',
    slug: 'degarelix',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'GnRH / LHRH Receptor Antagonist (No Testosterone Surge)',
    descriptionShort: 'Degarelix is a GnRH antagonist that causes immediate, surge-free suppression of testosterone in advanced prostate cancer.',
    descriptionLong: 'Degarelix is a synthetic decapeptide that acts as a competitive antagonist of Gonadotropin-Releasing Hormone (GnRH) receptors in the anterior pituitary. Unlike GnRH agonists (which cause an initial testosterone flare), degarelix immediately blocks LH and FSH release, reducing serum testosterone to castrate levels (<0.5 ng/ml) within 48 to 72 hours.',
    mechanismOfAction: 'Reversibly binds to pituitary GnRH receptors, preventing GnRH-induced release of LH and FSH, resulting in rapid and sustained castrate levels of testosterone without initial flare.',
    indications: [
      'Advanced / Metastatic Hormone-Dependent Prostate Cancer',
      'Rapid androgen deprivation prior to radiation therapy'
    ],
    commonStrengths: ['80 mg vial (maintenance)', '120 mg vial (starting dose: 240 mg as 2 x 120 mg injections)'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Injection site reactions (erythema, pain, swelling, induration)', 'Hot flashes', 'Weight gain', 'Fatigue', 'Increased serum transaminases'],
    storageAdvice: 'Store at 20°C to 25°C in original package.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why does Degarelix not require antiandrogen co-prescription?',
        answer: 'Because Degarelix is an antagonist (not an agonist), it does not stimulate the receptor and produces zero initial surge in testosterone, eliminating the risk of disease flare.'
      }
    ],
    aliases: ['Firmagon', 'Degarex']
  },
  {
    id: 'salt-26',
    sNo: 26,
    name: 'Docetaxel',
    slug: 'docetaxel',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Semi-Synthetic Taxane / Microtubule Stabilizer',
    descriptionShort: 'Docetaxel is a major taxane chemotherapeutic widely used in breast, non-small cell lung, prostate, gastric, and head & neck cancers.',
    descriptionLong: 'Docetaxel is a semi-synthetic taxane derived from Taxus baccata needles. It promotes the assembly of tubulin into stable microtubules and inhibits their disassembly, stabilizing the mitotic spindle. This arrests the cell cycle at the G2/M phase and induces apoptotic death in fast-dividing cancer cells.',
    mechanismOfAction: 'Binds to free tubulin, promotes microtubule polymerization, and prevents microtubule depolymerization, disrupting mitosis and cell replication.',
    indications: [
      'Breast Cancer (adjuvant and metastatic settings)',
      'Non-Small Cell Lung Cancer (NSCLC)',
      'Metastatic Castration-Resistant Prostate Cancer (mCRPC)',
      'Advanced Gastric Adenocarcinoma',
      'Squamous Cell Carcinoma of the Head and Neck'
    ],
    commonStrengths: ['20 mg/0.5 ml', '80 mg/2 ml', '120 mg/3 ml'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Neutropenia / febrile neutropenia (dose-limiting)', 'Fluid retention syndrome (peripheral edema, pleural effusion)', 'Hypersensitivity reactions', 'Alopecia', 'Nail changes (onycholysis, pigmentation)'],
    storageAdvice: 'Store between 2°C and 25°C. Protect from light.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why is Dexamethasone premedication essential before Docetaxel?',
        answer: 'Oral dexamethasone (8 mg twice daily for 3 days starting the day before docetaxel) reduces the incidence and severity of fluid retention and hypersensitivity reactions.'
      }
    ],
    aliases: ['Taxotere', 'Docetax', 'Docecad', 'Docenat']
  },
  {
    id: 'salt-27',
    sNo: 27,
    name: 'Doxorubicin',
    slug: 'doxorubicin',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Anthracycline Cytotoxic Antibiotic (Broad Spectrum)',
    descriptionShort: 'Doxorubicin (Adriamycin) is one of the most potent and widely utilized anthracyclines for hematologic and solid malignancies.',
    descriptionLong: 'Doxorubicin, nicknamed "the red devil" due to its bright red color, is an anthracycline antibiotic that intercalates into DNA base pairs, inhibits topoisomerase II, and generates toxic reactive oxygen species (ROS). It is a core agent in AC for breast cancer, CHOP for lymphoma, and numerous sarcoma regimens.',
    mechanismOfAction: 'Intercalates between DNA base pairs, inhibits topoisomerase II relaxation of supercoiled DNA, and generates free radical iron complexes that cleave DNA.',
    indications: [
      'Breast Carcinoma (AC regimen)',
      'Hodgkin and Non-Hodgkin Lymphomas (ABVD, CHOP)',
      'Osteosarcoma, Ewing Sarcoma, and Soft Tissue Sarcomas',
      'Small Cell Lung Cancer and Bladder Carcinoma'
    ],
    commonStrengths: ['10 mg/5 ml', '50 mg/25 ml'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Cardiotoxicity (cumulative dose-dependent cardiomyopathy / heart failure)', 'Severe myelosuppression', 'Severe complete alopecia', 'Red urine coloration', 'Severe vesicant necrosis if extravasated'],
    storageAdvice: 'Store refrigerated at 2°C to 8°C (Cold Chain). Protect from light.',
    coldStorage: 'Yes',
    faqs: [
      {
        question: 'What is the lifetime cumulative dose limit for Doxorubicin?',
        answer: 'The cumulative lifetime dose should not exceed 450 to 550 mg/m² to prevent irreversible anthracycline-induced heart failure.'
      }
    ],
    aliases: ['Adriamycin', 'Doxorub', 'Doxotec', 'Kemodox']
  },
  {
    id: 'salt-28',
    sNo: 28,
    name: 'Doxorubicin — liposomal',
    slug: 'doxorubicin-liposomal',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Pegylated Liposomal Anthracycline (Cardioprotective Nanocarrier)',
    descriptionShort: 'Pegylated liposomal doxorubicin encapsulates doxorubicin inside stealth liposomes to significantly reduce cardiotoxicity and enhance tumor delivery.',
    descriptionLong: 'Pegylated Liposomal Doxorubicin (PLD) encapsulates doxorubicin within surface-bound methoxypolyethylene glycol (PEG) lipid vesicles. These "stealth" liposomes evade the reticuloendothelial system, have a markedly prolonged plasma half-life (~55 hours), and selectively accumulate in tumor tissues through the Enhanced Permeability and Retention (EPR) effect while dramatically sparing myocardial tissue.',
    mechanismOfAction: 'Liposomal nanocarriers selectively extravasate through leaky tumor vasculature, releasing doxorubicin locally to intercalate DNA and inhibit topoisomerase II with reduced cardiac exposure.',
    indications: [
      'Advanced Ovarian Cancer (platinum-refractory or post-first line relapse)',
      'AIDS-Related Kaposi Sarcoma',
      'Relapsed / Refractory Multiple Myeloma (in combination with Bortezomib)',
      'Metastatic Breast Cancer in patients with high cardiac risk'
    ],
    commonStrengths: ['20 mg/10 ml', '50 mg/25 ml'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Palmar-Plantar Erythrodysesthesia (Hand-Foot Syndrome)', 'Stomatitis / mucositis', 'Infusion-related pseudo-allergic reactions (CARPA)', 'Myelosuppression (milder than plain doxorubicin)'],
    storageAdvice: 'Store refrigerated at 2°C to 8°C (Cold Chain). DO NOT FREEZE.',
    coldStorage: 'Yes',
    faqs: [
      {
        question: 'Why is Liposomal Doxorubicin safer for the heart than plain doxorubicin?',
        answer: 'The tight junctions of heart capillaries prevent large liposome nanoparticles from entering myocardial tissue, resulting in up to 70% lower cardiac drug uptake.'
      }
    ],
    aliases: ['Caelyx', 'Doxil', 'Lipodox', 'Doxolip']
  },
  {
    id: 'salt-29',
    sNo: 29,
    name: 'Doxorubicin — plain',
    slug: 'doxorubicin-plain',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Conventional Unencapsulated Anthracycline Cytotoxic Agent',
    descriptionShort: 'Conventional non-liposomal doxorubicin hydrochloride for systemic intravenous chemotherapy in leukemia, lymphoma, breast cancer, and sarcomas.',
    descriptionLong: 'Conventional (plain) Doxorubicin Hydrochloride is the unencapsulated crystalline formulation that provides immediate systemic peak plasma concentrations. It is a cornerstone in standard curative-intent multi-agent chemotherapy regimens across hematologic and solid malignancies, requiring careful cardiac and bone marrow monitoring.',
    mechanismOfAction: 'Rapidly distributes throughout tissues, intercalating into double-stranded DNA and inhibiting topoisomerase II to induce double-strand DNA breaks.',
    indications: [
      'Breast Cancer (adjuvant and metastatic combinations)',
      'Hodgkin and Non-Hodgkin Lymphomas',
      'Acute Lymphoblastic and Myeloid Leukemias',
      'Osteosarcomas and Soft Tissue Sarcomas'
    ],
    commonStrengths: ['10 mg/5 ml', '50 mg/25 ml'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Dose-dependent cardiotoxicity', 'Neutropenia', 'Total alopecia', 'Nausea / vomiting', 'Tissue necrosis on extravasation'],
    storageAdvice: 'Store refrigerated at 2°C to 8°C (Cold Chain). Protect from light.',
    coldStorage: 'Yes',
    faqs: [
      {
        question: 'What is the role of Dexrazoxane during plain Doxorubicin therapy?',
        answer: 'Dexrazoxane is an iron-chelating cardioprotective agent administered to prevent free radical cardiac damage in patients receiving cumulative high-dose doxorubicin.'
      }
    ],
    aliases: ['Adriamycin Plain', 'Doxorubicin HCl', 'Rubex']
  },
  {
    id: 'salt-30',
    sNo: 30,
    name: 'Enzalutamide',
    slug: 'enzalutamide',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Second-Generation Non-Steroidal Androgen Receptor Signaling Inhibitor',
    descriptionShort: 'Enzalutamide is a potent androgen receptor signaling inhibitor that blocks three distinct steps of androgen pathway activation in prostate cancer.',
    descriptionLong: 'Enzalutamide is a next-generation androgen receptor inhibitor that exhibits high binding affinity to androgen receptors without agonistic properties. It acts via a triple mechanism: competitively blocking androgen binding, preventing androgen receptor nuclear translocation, and inhibiting receptor association with chromosomal DNA.',
    mechanismOfAction: 'Inhibits androgen binding to androgen receptors, halts nuclear translocation of the receptor, and impairs co-activator recruitment and DNA binding.',
    indications: [
      'Castration-Resistant Prostate Cancer (CRPC - both metastatic and non-metastatic)',
      'Metastatic Castration-Sensitive Prostate Cancer (mCSPC)'
    ],
    commonStrengths: ['40 mg', '80 mg'],
    dosageForms: ['Capsule', 'Tablet'],
    commonSideEffects: ['Fatigue and asthenia', 'Hot flashes', 'Hypertension', 'Risk of seizures (rare, crosses blood-brain barrier)', 'Fracture / falls risk'],
    storageAdvice: 'Store below 30°C in a dry place.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Does Enzalutamide require co-administration with Prednisone?',
        answer: 'No, unlike abiraterone, Enzalutamide does not cause mineralocorticoid excess and does NOT require routine steroid co-prescription.'
      },
      {
        question: 'What is the seizure risk associated with Enzalutamide?',
        answer: 'Enzalutamide crosses the blood-brain barrier and can lower the seizure threshold. It is used with extreme caution in patients with a history of seizures or stroke.'
      }
    ],
    aliases: ['Xtandi', 'Enzamide', 'Bdenza', 'Enzuta']
  }
];
