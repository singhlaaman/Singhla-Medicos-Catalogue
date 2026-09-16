import { SaltInfo } from '../types';

export const SALTS_PART_3: SaltInfo[] = [
  {
    id: 'salt-61',
    sNo: 61,
    name: 'Pegaspargase / PEG L-asparaginase',
    slug: 'pegaspargase-peg-l-asparaginase',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Pegylated Asparagine-Depleting Enzyme',
    descriptionShort: 'Pegaspargase is a pegylated L-asparaginase enzyme used as a critical component in multi-agent regimens for Acute Lymphoblastic Leukemia (ALL).',
    descriptionLong: 'Pegaspargase is a modified form of L-asparaginase derived from Escherichia coli, covalently conjugated with monomethoxypolyethylene glycol (mPEG). Leukemic lymphoblasts lack asparagine synthetase and are incapable of synthesizing asparagine de novo, depending on circulating plasma asparagine pools. Pegaspargase hydrolyzes plasma asparagine into aspartic acid and ammonia, depriving leukemic cells of an essential amino acid and precipitating selective apoptotic cell death.',
    mechanismOfAction: 'Enzymatically hydrolyzes circulating L-asparagine to L-aspartic acid and ammonia, selectively starving asparagine-dependent leukemic blasts.',
    indications: [
      'First-line Acute Lymphoblastic Leukemia (ALL) in pediatric and adult protocols (combined with chemotherapy)',
      'Relapsed or refractory ALL with history of hypersensitivity to native E. coli L-asparaginase'
    ],
    commonStrengths: ['3750 IU/5 ml vial'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Acute pancreatitis / hyperlipasemia', 'Coagulopathy (thrombosis and hemorrhage due to antithrombin III depletion)', 'Hepatotoxicity (hyperbilirubinemia / elevated transaminases)', 'Hyperglycemia / secondary diabetes', 'Anaphylaxis / hypersensitivity reactions'],
    storageAdvice: 'Store refrigerated at 2°C to 8°C (Cold Chain). DO NOT SHAKE OR FREEZE.',
    coldStorage: 'Yes',
    faqs: [
      {
        question: 'Why does Pegaspargase require cold chain storage without shaking?',
        answer: 'Pegaspargase is a large pegylated enzyme protein. Shaking or freezing denatures the delicate tertiary structure, rendering the enzyme inactive.'
      },
      {
        question: 'Why must coagulation profiles be checked before Pegaspargase administration?',
        answer: 'Asparagine depletion impairs hepatic synthesis of coagulation factors and anticoagulant proteins (antithrombin III, protein C/S), increasing both clot and bleeding risks.'
      }
    ],
    aliases: ['Oncaspar', 'Pegpar', 'Asparlas', 'Pegaspar']
  },
  {
    id: 'salt-62',
    sNo: 62,
    name: 'Pomalidomide',
    slug: 'pomalidomide',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Third-Generation Immunomodulatory Drug (IMiD) / Cereblon E3 Ligase Modulator',
    descriptionShort: 'Pomalidomide is a third-generation IMiD indicated for relapsed and refractory Multiple Myeloma previously treated with lenalidomide and bortezomib.',
    descriptionLong: 'Pomalidomide is an amino-phthaloyl-substituted derivative of thalidomide engineered for enhanced potency against myeloma clones that have developed resistance to lenalidomide. It binds Cereblon (CRBN) with approximately 10-fold higher affinity than lenalidomide, inducing accelerated proteasomal degradation of transcription factors Ikaros and Aiolos and exerting direct cytotoxic and immune-stimulating actions.',
    mechanismOfAction: 'High-affinity Cereblon E3 ubiquitin ligase binding, driving Ikaros/Aiolos destruction, inhibiting IRF4/MYC, and suppressing pro-angiogenic cytokines (VEGF, bFGF).',
    indications: [
      'Relapsed and Refractory Multiple Myeloma in patients who have received at least two prior therapies including Lenalidomide and a Proteasome Inhibitor (combined with Dexamethasone)'
    ],
    commonStrengths: ['1 mg', '2 mg', '3 mg', '4 mg'],
    dosageForms: ['Capsule'],
    commonSideEffects: ['Neutropenia / febrile neutropenia', 'Venous thromboembolism (DVT/PE - mandatory thromboprophylaxis)', 'Fatigue and asthenia', 'Peripheral neuropathy (low incidence)', 'Severe teratogenicity'],
    storageAdvice: 'Store at 20°C to 25°C in original package.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why is Pomalidomide effective in patients whose disease progressed on Lenalidomide?',
        answer: 'Pomalidomide exhibits significantly higher binding affinity to Cereblon, allowing it to effectively overcome acquired resistance pathways that develop against earlier IMiDs.'
      }
    ],
    aliases: ['Pomalyst', 'Imnovid', 'Pomalid', 'Pomahope']
  },
  {
    id: 'salt-63',
    sNo: 63,
    name: 'Regorafenib',
    slug: 'regorafenib',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Broad-Spectrum Multi-Kinase Angiogenic and Oncogenic Inhibitor',
    descriptionShort: 'Regorafenib is an oral multi-kinase inhibitor approved for refractory Metastatic Colorectal Cancer, GIST, and Hepatocellular Carcinoma.',
    descriptionLong: 'Regorafenib is a fluorinated analogue of sorafenib that targets an expansive spectrum of membrane-bound and intracellular tyrosine and serine/threonine kinases. It potently inhibits VEGFR1–3, TIE2 (angiopoietin receptor), KIT, RET, RAF-1, BRAF, and PDGFR, halting tumor angiogenesis, oncogenesis, and remodeling of the immunosuppressive tumor microenvironment.',
    mechanismOfAction: 'Broad-spectrum inhibition of angiogenic (VEGFR1-3, TIE2), stromal (PDGFR-beta, FGFR1), and oncogenic (KIT, RET, RAF) kinases.',
    indications: [
      'Metastatic Colorectal Cancer (mCRC) in patients previously treated with fluoropyrimidine-, oxaliplatin-, and irinotecan-based chemotherapy',
      'Advanced Gastrointestinal Stromal Tumor (GIST) post-imatinib and sunitinib',
      'Hepatocellular Carcinoma (HCC) in patients previously treated with Sorafenib'
    ],
    commonStrengths: ['40 mg'],
    dosageForms: ['Tablet'],
    commonSideEffects: ['Palmar-Plantar Erythrodysesthesia (Hand-Foot Skin Reaction)', 'Severe hypertension', 'Hepatotoxicity (severe drug-induced liver injury - black box warning)', 'Diarrhea and dysphonia (voice changes)', 'Fatigue and anorexia'],
    storageAdvice: 'Store below 25°C in original container with desiccant tightly capped.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'How should Regorafenib be taken with breakfast?',
        answer: 'Regorafenib should be taken once daily at the same time each morning following a light meal containing less than 30% fat (e.g. toast with jam, cereal, skim milk).'
      }
    ],
    aliases: ['Stivarga', 'Nublexa', 'Resihance', 'Regonix']
  },
  {
    id: 'salt-64',
    sNo: 64,
    name: 'Ribociclib',
    slug: 'ribociclib',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Selective Cyclin-Dependent Kinase 4 and 6 (CDK4/6) Inhibitor',
    descriptionShort: 'Ribociclib is an oral selective CDK4/6 inhibitor used in combination with endocrine therapy for HR+/HER2-advanced or metastatic breast cancer.',
    descriptionLong: 'Ribociclib is a highly selective small-molecule inhibitor of cyclin-dependent kinases 4 and 6 (CDK4/6). In HR+ breast cancer cells, hyperactivated cyclin D-CDK4/6 complexes phosphorylate the retinoblastoma (Rb) tumor suppressor protein, unlocking the E2F transcription factor and driving uncontrolled cell cycle transit from G1 to S phase. Ribociclib halts Rb phosphorylation, inducing G1 cell cycle arrest and tumor senescence.',
    mechanismOfAction: 'Selectively inhibits CDK4 and CDK6, blocking Rb phosphorylation and preventing G1-to-S phase cell cycle transition.',
    indications: [
      'HR-positive, HER2-negative advanced or metastatic Breast Cancer in combination with an Aromatase Inhibitor (Letrozole) as initial endocrine therapy',
      'HR-positive, HER2-negative advanced or metastatic Breast Cancer in combination with Fulvestrant'
    ],
    commonStrengths: ['200 mg'],
    dosageForms: ['Tablet'],
    commonSideEffects: ['Neutropenia (reversible, non-cumulative)', 'QTc interval prolongation (requires ECG monitoring)', 'Hepatotoxicity / elevated transaminases (ALT/AST)', 'Nausea and fatigue', 'Alopecia (mild thinning)'],
    storageAdvice: 'Store at 20°C to 25°C in original blister pack.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'What is the standard dosing schedule for Ribociclib?',
        answer: 'The standard schedule is 600 mg (three 200 mg tablets) orally once daily for 21 consecutive days followed by a 7-day break (28-day cycle).'
      },
      {
        question: 'Why are baseline and Day 14 ECGs mandatory on Ribociclib?',
        answer: 'Ribociclib can cause dose-dependent QTc prolongation. ECGs before starting and on Day 14 of Cycle 1 and Cycle 2 ensure cardiac electrical safety.'
      }
    ],
    aliases: ['Kisqali', 'Kryxana', 'Ribonix']
  },
  {
    id: 'salt-65',
    sNo: 65,
    name: 'Rituximab',
    slug: 'rituximab',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Chimeric Anti-CD20 Monoclonal Antibody',
    descriptionShort: 'Rituximab is the benchmark anti-CD20 monoclonal antibody used in B-cell Non-Hodgkin Lymphomas, CLL, and severe autoimmune disorders.',
    descriptionLong: 'Rituximab is a genetically engineered chimeric murine/human IgG1-kappa monoclonal antibody that binds specifically to the transmembrane antigen CD20 located on pre-B and mature B lymphocytes. Binding of rituximab recruits immune effectors to mediate B-cell lysis via Complement-Dependent Cytotoxicity (CDC), Antibody-Dependent Cellular Cytotoxicity (ADCC), and direct induction of apoptosis.',
    mechanismOfAction: 'Binds specifically to CD20 on B-lymphocytes, destroying malignant clones through complement activation, NK-cell ADCC, and apoptosis induction.',
    indications: [
      'Diffuse Large B-Cell Lymphoma (DLBCL - R-CHOP regimen)',
      'Follicular and Marginal Zone Non-Hodgkin Lymphomas',
      'Chronic Lymphocytic Leukemia (CLL - FCR regimen)',
      'Granulomatosis with Polyangiitis (GPA / Wegener\'s) and Microscopic Polyangiitis',
      'Moderate to severe Rheumatoid Arthritis (refractory to anti-TNF)'
    ],
    commonStrengths: ['100 mg/10 ml', '500 mg/50 ml', '1400 mg/11.7 ml (subcutaneous)'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Infusion-related reactions (fever, chills, rigors, bronchospasm - premedication mandatory)', 'Severe B-cell lymphopenia and prolonged hypogammaglobulinemia', 'Hepatitis B Virus (HBV) reactivation (black box warning)', 'Progressive Multifocal Leukoencephalopathy (PML - rare JC virus infection)'],
    storageAdvice: 'Store refrigerated at 2°C to 8°C (Cold Chain). Protect from direct light. Do not freeze or shake.',
    coldStorage: 'Yes',
    faqs: [
      {
        question: 'Why is Hepatitis B screening mandatory before starting Rituximab?',
        answer: 'Rituximab suppresses B-cell immunity and can trigger fatal Hepatitis B virus reactivation in carriers. Pre-screening and prophylactic antiviral therapy are mandatory.'
      },
      {
        question: 'What premedication is administered prior to IV Rituximab?',
        answer: 'Acetaminophen (paracetamol) and an antihistamine (diphenhydramine) ± intravenous methylprednisolone are administered 30–60 minutes before each infusion.'
      }
    ],
    aliases: ['Rituxan', 'MabThera', 'Ristova', 'Reditux', 'Ruxience']
  },
  {
    id: 'salt-66',
    sNo: 66,
    name: 'Sorafenib',
    slug: 'sorafenib',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Oral Multi-Targeted Tyrosine and Serine/Threonine Kinase Inhibitor',
    descriptionShort: 'Sorafenib is an oral multi-kinase inhibitor approved for advanced Hepatocellular Carcinoma (HCC), Renal Cell Carcinoma, and Differentiated Thyroid Cancer.',
    descriptionLong: 'Sorafenib tosylate is a bi-aryl urea multi-kinase inhibitor that targets both tumor cell proliferation and tumor angiogenesis. It inhibits intracellular serine/threonine kinases in the MAP kinase pathway (C-RAF, wild-type B-RAF, and mutant V600E B-RAF) as well as cell surface receptor tyrosine kinases (VEGFR1–3, PDGFR-beta, c-KIT, and RET).',
    mechanismOfAction: 'Inhibits RAF/MEK/ERK signaling to block tumor cell proliferation and VEGFR/PDGFR signaling to cut off tumor blood vessel formation.',
    indications: [
      'Unresectable Hepatocellular Carcinoma (HCC)',
      'Advanced Renal Cell Carcinoma (RCC) in patients who have failed prior cytokine therapy',
      'Locally recurrent or metastatic, progressive Differentiated Thyroid Carcinoma (DTC) refractory to radioactive iodine'
    ],
    commonStrengths: ['200 mg'],
    dosageForms: ['Tablet'],
    commonSideEffects: ['Palmar-Plantar Erythrodysesthesia (Hand-Foot Skin Reaction - very common)', 'Diarrhea and weight loss', 'Hypertension', 'Alopecia and dry skin', 'Fatigue / anorexia'],
    storageAdvice: 'Store at 20°C to 25°C in a dry place.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Should Sorafenib be taken with high-fat meals?',
        answer: 'No. Sorafenib should be taken without food or with a low-to-moderate fat meal, as high-fat meals reduce bioavailability by 30%.'
      }
    ],
    aliases: ['Nexavar', 'Sorafenat', 'Soranib', 'Sorafine']
  },
  {
    id: 'salt-67',
    sNo: 67,
    name: 'Tamoxifen',
    slug: 'tamoxifen',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Selective Estrogen Receptor Modulator (SERM)',
    descriptionShort: 'Tamoxifen is the cornerstone SERM used for prevention and treatment of ER-positive breast cancer in premenopausal and postmenopausal women.',
    descriptionLong: 'Tamoxifen is a non-steroidal triphenylethylene derivative that acts as a Selective Estrogen Receptor Modulator (SERM). In mammary tissue, it competitively antagonizes estrogen binding to estrogen receptors (ER), suppressing estrogen-dependent gene transcription and tumor proliferation. Conversely, it exerts beneficial estrogen-agonist effects in bone (preserving bone density) and the cardiovascular system, but can stimulate the endometrium.',
    mechanismOfAction: 'Competitively blocks estrogen receptors in breast tissue, preventing estrogen-mediated tumor proliferation while acting as an agonist in bone and endometrium.',
    indications: [
      'Adjuvant therapy for premenopausal and postmenopausal women with ER-positive early breast cancer',
      'Advanced / Metastatic ER-positive Breast Cancer',
      'Ductal Carcinoma In Situ (DCIS) following breast surgery and radiation',
      'Chemoprevention / risk reduction of breast cancer in high-risk women'
    ],
    commonStrengths: ['10 mg', '20 mg'],
    dosageForms: ['Tablet'],
    commonSideEffects: ['Hot flashes and night sweats', 'Endometrial hyperplasia / polyps / uterine cancer risk', 'Venous thromboembolism (DVT, pulmonary embolism)', 'Vaginal discharge / dryness', 'Mood alterations / cataracts'],
    storageAdvice: 'Store at 20°C to 25°C. Protect from light.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why should CYP2D6 inhibitors like Paroxetine or Fluoxetine be avoided with Tamoxifen?',
        answer: 'Tamoxifen is a prodrug converted into its active metabolite Endoxifen by CYP2D6. Strong CYP2D6-inhibiting antidepressants block this activation, compromising efficacy.'
      },
      {
        question: 'Why is gynecological monitoring necessary on Tamoxifen?',
        answer: 'Because of mild estrogenic agonism on the uterus, any unexpected vaginal bleeding must be investigated promptly to rule out endometrial hyperplasia or carcinoma.'
      }
    ],
    aliases: ['Nolvadex', 'Tamodex', 'Cytotam', 'Tamoxilon']
  },
  {
    id: 'salt-68',
    sNo: 68,
    name: 'Tegafur + uracil',
    slug: 'tegafur-uracil',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Oral Fluoropyrimidine Combination (UFT / DPD-Inhibited 5-FU Prodrug)',
    descriptionShort: 'Tegafur + uracil (UFT) is an oral fluoropyrimidine combination that maintains sustained 5-FU antitumor levels with reduced catabolic degradation.',
    descriptionLong: 'Tegafur + uracil (UFT) is a fixed 1:4 molar combination of tegafur and uracil. Tegafur is a bioavailable oral prodrug that is slowly metabolized in the liver to 5-fluorouracil. Uracil competitively inhibits dihydropyrimidine dehydrogenase (DPD), the primary rate-limiting enzyme responsible for 5-FU catabolism, resulting in elevated and prolonged intratumoral concentrations of 5-FU with enhanced clinical efficacy.',
    mechanismOfAction: 'Tegafur delivers continuous 5-FU while co-administered uracil competitively blocks DPD, preventing 5-FU breakdown and maximizing tumor cell cytotoxicity.',
    indications: [
      'Adjuvant chemotherapy for curatively resected Colorectal and Gastric Carcinomas',
      'Advanced / Metastatic Colorectal and Gastric Adenocarcinomas (often with oral Folinate / Leucovorin)',
      'Head and neck, breast, and non-small cell lung carcinomas'
    ],
    commonStrengths: ['Tegafur 100 mg + Uracil 224 mg capsules'],
    dosageForms: ['Capsule'],
    commonSideEffects: ['Diarrhea and abdominal pain', 'Nausea and anorexia', 'Oral stomatitis', 'Myelosuppression (leukopenia/thrombocytopenia)', 'Hyperpigmentation of palms and soles'],
    storageAdvice: 'Store below 25°C protected from moisture.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'How should Tegafur + Uracil capsules be timed relative to meals?',
        answer: 'Capsules should be taken at least 1 hour before or 1 hour after meals in 2 to 3 divided daily doses with plenty of water.'
      }
    ],
    aliases: ['UFT', 'Ufur', 'Tegafur-Uracil']
  },
  {
    id: 'salt-69',
    sNo: 69,
    name: 'Temozolomide',
    slug: 'temozolomide',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Oral Imidazotetrazine Alkylating Agent (CNS Penetrating)',
    descriptionShort: 'Temozolomide is the gold-standard oral alkylating agent with high blood-brain barrier penetration for Glioblastoma Multiforme and Anaplastic Astrocytoma.',
    descriptionLong: 'Temozolomide (TMZ) is an oral imidazotetrazine prodrug that undergoes spontaneous non-enzymatic chemical conversion at physiologic pH to the active alkylating species MTIC. MTIC rapidly methylates DNA primarily at the O6 and N7 positions of guanine. O6-methylguanine mispairs with thymine during replication, triggering repetitive mismatch repair cycles that culminate in double-strand DNA breaks and glioblastoma apoptosis.',
    mechanismOfAction: 'Spontaneously hydrolyzes to MTIC at physiologic pH, methylating O6 positions of guanine in DNA and inducing lethal replication-dependent DNA breaks.',
    indications: [
      'Newly diagnosed Glioblastoma Multiforme (GBM - Stupp protocol with concurrent radiotherapy followed by maintenance)',
      'Refractory Anaplastic Astrocytoma',
      'Advanced Neuroendocrine Tumors (combined with Capecitabine / CAPTEM regimen)'
    ],
    commonStrengths: ['20 mg', '100 mg', '140 mg', '250 mg'],
    dosageForms: ['Capsule'],
    commonSideEffects: ['Myelosuppression (thrombocytopenia and neutropenia - nadir on Days 21-28)', 'Nausea and vomiting (antiemetic prophylaxis required)', 'Fatigue and headache', 'Constipation / anorexia', 'Pneumocystis jirovecii pneumonia risk (during concurrent radiation)'],
    storageAdvice: 'Store at 20°C to 25°C in original container.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why does MGMT promoter methylation status predict Temozolomide response?',
        answer: 'O6-methylguanine-DNA methyltransferase (MGMT) is a repair enzyme that removes TMZ-induced DNA damage. Patients with a methylated (silenced) MGMT promoter derive significantly greater survival benefit.'
      },
      {
        question: 'Why is PJP prophylaxis required during concurrent radiation and Temozolomide?',
        answer: 'Concurrent chemo-radiation severely suppresses CD4+ lymphocyte counts, necessitating prophylactic Co-trimoxazole to prevent Pneumocystis pneumonia.'
      }
    ],
    aliases: ['Temodar', 'Temodal', 'Temonat', 'Glioz']
  },
  {
    id: 'salt-70',
    sNo: 70,
    name: 'Trastuzumab',
    slug: 'trastuzumab',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Humanized IgG1 Monoclonal Antibody Targeting Human Epidermal Growth Factor Receptor 2 (HER2)',
    descriptionShort: 'Trastuzumab is the foundational HER2-targeted monoclonal antibody that transformed survival in HER2-positive Breast and Gastric Cancers.',
    descriptionLong: 'Trastuzumab is a recombinant humanized IgG1 monoclonal antibody that binds with high affinity to subdomain IV of the extracellular domain of the HER2 (ErbB2) receptor tyrosine kinase. Receptor binding sterically blocks HER2 homodimerization and ligand-independent downstream PI3K/AKT signaling, promotes endocytic destruction of HER2, and flags malignant cells for antibody-dependent cellular cytotoxicity (ADCC) by natural killer cells.',
    mechanismOfAction: 'Binds HER2 extracellular subdomain IV, inhibiting oncogenic signaling cascades, inducing cell cycle arrest, and activating immune-mediated ADCC.',
    indications: [
      'HER2-overexpressing Breast Cancer (adjuvant, neoadjuvant, and metastatic settings)',
      'HER2-overexpressing Metastatic Gastric or Gastroesophageal Junction Adenocarcinoma (in combination with Cisplatin and Capecitabine/5-FU)'
    ],
    commonStrengths: ['150 mg vial', '440 mg multidose vial with bacteriostatic water', '600 mg/5 ml subcutaneous vial (Herceptin SC)'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Cardiotoxicity (reversible decrease in Left Ventricular Ejection Fraction / CHF)', 'Infusion-related reactions (fever, rigors, chills)', 'Dyspnea and cough', 'Fatigue / asthenia', 'Diarrhea'],
    storageAdvice: 'Store refrigerated at 2°C to 8°C (Cold Chain). DO NOT FREEZE OR SHAKE.',
    coldStorage: 'Yes',
    faqs: [
      {
        question: 'How is cardiac safety monitored during Trastuzumab treatment?',
        answer: 'Baseline echocardiogram or MUGA scan to measure Left Ventricular Ejection Fraction (LVEF), repeated every 3 months during therapy. Trastuzumab is held if LVEF drops significantly.'
      },
      {
        question: 'Why should Trastuzumab not be infused concurrently with Anthracyclines?',
        answer: 'Co-administering Trastuzumab with anthracyclines (like Doxorubicin) dramatically multiplies the risk of heart failure. They are given sequentially, never concurrently.'
      }
    ],
    aliases: ['Herceptin', 'Herclon', 'Trasturel', 'Ogivri', 'Kanjinti']
  },
  {
    id: 'salt-71',
    sNo: 71,
    name: 'Tretinoin',
    slug: 'tretinoin',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'All-Trans Retinoic Acid (ATRA) / Cellular Differentiation Inducer',
    descriptionShort: 'Tretinoin (ATRA) is the standard-of-care differentiating agent that cures Acute Promyelocytic Leukemia (APL) by forcing promyelocytes to mature.',
    descriptionLong: 'Tretinoin (all-trans retinoic acid / ATRA) is a natural metabolite of retinol (vitamin A). In Acute Promyelocytic Leukemia (APL), the t(15;17) chromosomal translocation generates the abnormal PML-RARA fusion protein, which arrests myeloid differentiation at the promyelocyte stage. Supraphysiologic doses of ATRA dissociate corepressor complexes from PML-RARA, restoring transcription and forcing leukemic promyelocytes to differentiate into mature, non-dividing granulocytes.',
    mechanismOfAction: 'Binds nuclear retinoic acid receptors (RARs), dissociating corepressor complexes from PML-RARA and inducing terminal differentiation of leukemic promyelocytes.',
    indications: [
      'Remission induction and consolidation of Acute Promyelocytic Leukemia (APL / FAB M3) characterized by the t(15;17) translocation (combined with Arsenic Trioxide or Anthracyclines)',
      'Refractory APL failing standard anthracycline chemotherapy'
    ],
    commonStrengths: ['10 mg'],
    dosageForms: ['Capsule'],
    commonSideEffects: ['Differentiation Syndrome (fever, dyspnea, pleural/pericardial effusions, pulmonary infiltrates, hypotension - life threatening)', 'Severe headache / Pseudotumor cerebri (benign intracranial hypertension)', 'Hyperleukocytosis', 'Dry skin, cheilitis, and mucocutaneous dryness', 'Hypertriglyceridemia and elevated transaminases'],
    storageAdvice: 'Store below 25°C protected from light.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'What is Differentiation Syndrome and how is it managed immediately?',
        answer: 'Differentiation syndrome occurs when massive maturation of promyelocytes releases inflammatory cytokines. At the first sign (fever, dyspnea), high-dose IV Dexamethasone (10 mg q12h) must be started immediately.'
      },
      {
        question: 'Should Tretinoin capsules be taken with food?',
        answer: 'Yes, taking Tretinoin capsules with a meal optimizes gastrointestinal absorption and minimizes gastric irritation.'
      }
    ],
    aliases: ['Vesanoid', 'ATRA', 'Tretin', 'Retin-A']
  },
  {
    id: 'salt-72',
    sNo: 72,
    name: 'Triptorelin',
    slug: 'triptorelin',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Potent Synthetic Decapeptide GnRH / LHRH Agonist Depot',
    descriptionShort: 'Triptorelin is a long-acting injectable GnRH superagonist depot used in advanced hormone-dependent prostate cancer and precocious puberty.',
    descriptionLong: 'Triptorelin pamoate is a synthetic decapeptide analogue of GnRH with higher receptor affinity and resistance to enzymatic degradation than natural GnRH. Following an initial transient gonadotropin stimulatory phase, sustained triptorelin exposure causes desensitization and internalization of pituitary GnRH receptors, halting LH and FSH release and maintaining castrate testosterone levels.',
    mechanismOfAction: 'Continuous stimulation desensitizes pituitary GnRH receptors, suppressing LH and FSH secretion and reducing circulating sex hormones to castrate levels.',
    indications: [
      'Advanced Hormone-Dependent Prostate Cancer',
      'Endometriosis and Uterine Leiomyomas (fibroids) prior to surgery',
      'Central Precocious Puberty (CPP in children)'
    ],
    commonStrengths: ['3.75 mg (1-month depot)', '11.25 mg (3-month depot)', '22.5 mg (6-month depot)'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Hot flashes and sweating', 'Loss of libido and erectile dysfunction', 'Decreased bone density', 'Fatigue / mood changes', 'Initial flare of disease symptoms (bone pain, urinary obstruction)'],
    storageAdvice: 'Store below 25°C. Do not freeze.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'How long do the depot effects of 11.25 mg and 22.5 mg Triptorelin last?',
        answer: 'The 11.25 mg depot provides continuous testosterone suppression for 3 months (84 days), while the 22.5 mg depot delivers steady suppression for 6 months (168 days).'
      }
    ],
    aliases: ['Decapeptyl', 'Trelstar', 'Pamorelin', 'Diphereline']
  },
  {
    id: 'salt-73',
    sNo: 73,
    name: 'Vinblastine',
    slug: 'vinblastine',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Natural Vinca Alkaloid / Microtubule Depolymerizer',
    descriptionShort: 'Vinblastine is a classic vinca alkaloid antineoplastic used in the ABVD regimen for Hodgkin lymphoma, testicular cancer, and Kaposi sarcoma.',
    descriptionLong: 'Vinblastine sulfate is a natural alkaloid extracted from the Madagascar periwinkle (Catharanthus roseus). It binds specifically to tubulin dimers at the vinca domain, inhibiting microtubule assembly and causing the dissolution of mitotic spindles. This locks tumor cells in mitotic metaphase and triggers apoptosis.',
    mechanismOfAction: 'Binds tubulin and prevents polymerization into microtubules, arresting cells in mitotic metaphase (M-phase specific).',
    indications: [
      'Hodgkin Lymphoma (component of frontline ABVD regimen)',
      'Advanced Testicular Germ Cell Tumors (VBP regimen)',
      'Kaposi Sarcoma and Histiocytosis (Langerhans Cell Histiocytosis)',
      'Advanced Breast and Bladder Carcinomas'
    ],
    commonStrengths: ['10 mg/10 ml vial'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Dose-limiting myelosuppression (severe leukopenia/neutropenia)', 'Constipation / paralytic ileus (autonomic neuropathy)', 'Potent vesicant (severe tissue necrosis if extravasated)', 'Alopecia', 'Myalgia and peripheral neuropathy'],
    storageAdvice: 'Store refrigerated at 2°C to 8°C (Cold Chain). Protect from light. STRICTLY FOR INTRAVENOUS USE ONLY - FATAL IF GIVEN BY OTHER ROUTES.',
    coldStorage: 'Yes',
    faqs: [
      {
        question: 'Why is there a black box warning: FATAL IF GIVEN INTRATHECALLY for Vinca Alkaloids?',
        answer: 'Intrathecal injection of Vinblastine or Vincristine causes progressive, excruciating, irreversible ascending myeloencephalopathy and near 100% fatality.'
      },
      {
        question: 'How does Vinblastine toxicity differ from Vincristine?',
        answer: 'Vinblastine primarily causes dose-limiting bone marrow suppression (leukopenia), whereas Vincristine primarily causes neurotoxicity with minimal bone marrow effects.'
      }
    ],
    aliases: ['Velbe', 'Vinblast', 'Cytoblastin']
  },
  {
    id: 'salt-74',
    sNo: 74,
    name: 'Vincristine',
    slug: 'vincristine',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Natural Vinca Alkaloid / Microtubule Assembly Inhibitor',
    descriptionShort: 'Vincristine is an essential vinca alkaloid used in Acute Lymphoblastic Leukemia, Non-Hodgkin Lymphoma (CHOP), Wilms tumor, and pediatric malignancies.',
    descriptionLong: 'Vincristine sulfate binds to tubulin at distinct vinca-binding sites, inhibiting the polymerization of tubulin into microtubules and leading to the breakdown of the mitotic spindle apparatus. Because it exhibits virtually no bone marrow toxicity at therapeutic doses, it is an indispensable component in curative combination regimens (such as CHOP for lymphoma and induction for ALL).',
    mechanismOfAction: 'Inhibits tubulin polymerization and disrupts mitotic spindle formation, arresting eukaryotic cell division in metaphase.',
    indications: [
      'Acute Lymphoblastic Leukemia (ALL - core induction and maintenance component)',
      'Hodgkin and Non-Hodgkin Lymphomas (CHOP, CVP regimens)',
      'Pediatric solid tumors: Wilms Tumor, Neuroblastoma, Rhabdomyosarcoma, and Medulloblastoma',
      'Immune Thrombocytopenic Purpura (ITP - refractory)'
    ],
    commonStrengths: ['1 mg/ml (1 mg/1 ml and 2 mg/2 ml vials)'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Peripheral sensory and motor neuropathy (loss of deep tendon reflexes, foot drop)', 'Autonomic neuropathy / severe constipation and paralytic ileus', 'Jaw pain and cranial nerve palsies', 'Severe vesicant necrosis if extravasated', 'Syndrome of Inappropriate Antidiuretic Hormone (SIADH)'],
    storageAdvice: 'Store refrigerated at 2°C to 8°C (Cold Chain). Protect from light. FOR INTRAVENOUS USE ONLY - FATAL IF GIVEN BY OTHER ROUTES.',
    coldStorage: 'Yes',
    faqs: [
      {
        question: 'Why is single-dose Vincristine capped at a maximum of 2 mg in adult regimens?',
        answer: 'To prevent severe, debilitating, and irreversible peripheral and autonomic neurotoxicity, standard adult doses of Vincristine are strictly capped at 2.0 mg per administration.'
      },
      {
        question: 'Why are bowel regimens routinely started with Vincristine?',
        answer: 'Vincristine damages autonomic enteric nerves, causing severe constipation and paralytic ileus; prophylactic stool softeners and stimulant laxatives are standard.'
      }
    ],
    aliases: ['Oncovin', 'Cytocristin', 'Vincrist', 'Oncocristin']
  },
  {
    id: 'salt-75',
    sNo: 75,
    name: 'Vinorelbine',
    slug: 'vinorelbine',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Semi-Synthetic Third-Generation Vinca Alkaloid',
    descriptionShort: 'Vinorelbine is a third-generation vinca alkaloid used as adjuvant and first-line therapy for Non-Small Cell Lung Cancer and advanced Breast Cancer.',
    descriptionLong: 'Vinorelbine tartrate is a semi-synthetic vinca alkaloid structurally modified on the catharanthine ring. This structural modification confers higher selectivity for mitotic microtubules over axonal microtubules, resulting in potent antitumor activity against lung and breast carcinomas with significantly lower peripheral neurotoxicity compared to vincristine.',
    mechanismOfAction: 'Selectively interferes with mitotic tubulin polymerization, arresting cell division at the G2/M phase with reduced affinity for axonal microtubules.',
    indications: [
      'Adjuvant treatment and advanced/metastatic therapy for Non-Small Cell Lung Cancer (NSCLC - combined with Cisplatin)',
      'Advanced or Metastatic Breast Cancer failing prior anthracycline- or taxane-containing therapy'
    ],
    commonStrengths: ['10 mg/1 ml', '50 mg/5 ml vials for infusion', '20 mg', '30 mg', '80 mg oral capsules'],
    dosageForms: ['Injection', 'Capsule'],
    commonSideEffects: ['Dose-limiting granulocytopenia / neutropenia', 'Injection site phlebitis / chemical irritation (short 6-10 min infusion recommended)', 'Nausea and vomiting', 'Constipation / abdominal cramping', 'Fatigue / asthenia'],
    storageAdvice: 'Store refrigerated at 2°C to 8°C (Cold Chain). Protect from light. FOR INTRAVENOUS USE ONLY.',
    coldStorage: 'Yes',
    faqs: [
      {
        question: 'Why is Vinorelbine IV infused rapidly over 6 to 10 minutes followed by vigorous flushing?',
        answer: 'Vinorelbine is a venous irritant. Rapid infusion followed by a rapid 150–250 ml saline flush minimizes contact time with venous endothelium and prevents chemical phlebitis.'
      }
    ],
    aliases: ['Navelbine', 'Vinotec', 'Relbina', 'Navelbin']
  },
  {
    id: 'salt-76',
    sNo: 76,
    name: 'Aprepitant',
    slug: 'aprepitant',
    category: 'Oncology supportive / complication management',
    drugClass: 'Substance P / Neurokinin-1 (NK1) Receptor Antagonist',
    descriptionShort: 'Aprepitant is an oral NK1 receptor antagonist indicated for the prevention of acute and delayed Chemotherapy-Induced Nausea and Vomiting (CINV).',
    descriptionLong: 'Aprepitant is a selective, high-affinity antagonist of human substance P / neurokinin-1 (NK1) receptors in the brain stem emetic center (solitary tract nucleus and area postrema). When combined with a 5-HT3 antagonist (like ondansetron) and dexamethasone (the 3-drug antiemetic regimen), aprepitant provides unmatched protection against both acute and delayed emesis caused by highly and moderately emetogenic chemotherapy.',
    mechanismOfAction: 'Crosses the blood-brain barrier and selectively blocks NK1 receptors, preventing substance P from triggering the central emetic reflex.',
    indications: [
      'Prevention of acute and delayed nausea and vomiting associated with initial and repeat courses of Highly Emetogenic Chemotherapy (HEC - e.g. Cisplatin, high-dose AC)',
      'Prevention of Moderately Emetogenic Chemotherapy (MEC)-induced nausea and vomiting',
      'Prevention of Postoperative Nausea and Vomiting (PONV)'
    ],
    commonStrengths: ['80 mg', '125 mg (standard 3-day pack: 1 x 125 mg on Day 1 + 2 x 80 mg on Days 2-3)'],
    dosageForms: ['Capsule'],
    commonSideEffects: ['Fatigue and asthenia', 'Hiccups (singultus)', 'Constipation / diarrhea', 'Elevated liver enzymes (ALT/AST)', 'Headache / dizziness'],
    storageAdvice: 'Store at 20°C to 25°C in original blister pack.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why is Dexamethasone dose reduced by ~50% when given with Aprepitant?',
        answer: 'Aprepitant is a moderate inhibitor of CYP3A4, the enzyme that metabolizes dexamethasone. Reducing oral dexamethasone dose by 50% maintains appropriate steroid blood levels.'
      }
    ],
    aliases: ['Emend', 'Aprecap', 'Apreset', 'Aprepep']
  },
  {
    id: 'salt-77',
    sNo: 77,
    name: 'Calcium leucovorin',
    slug: 'calcium-leucovorin',
    category: 'Oncology supportive / complication management',
    drugClass: 'Reduced Active Folate Analog / Chemotherapy Cytoprotectant & Biomodulator',
    descriptionShort: 'Calcium leucovorin (Folinic Acid) is used for rescue after high-dose Methotrexate and as an essential biochemical amplifier of 5-Fluorouracil.',
    descriptionLong: 'Calcium leucovorin (calcium folinate) is the calcium salt of 5-formyl tetrahydrofolic acid. It is an active, reduced form of folic acid that does not require reduction by dihydrofolate reductase (DHFR). In high-dose methotrexate rescue, it provides healthy cells with the necessary tetrahydrofolate cofactors to resume purine and thymidine synthesis. In colorectal cancer, leucovorin stabilizes the ternary complex between 5-FU and thymidylate synthase, massively increasing 5-FU cytotoxicity.',
    mechanismOfAction: 'Bypasses DHFR to rescue non-malignant cells from methotrexate toxicity; binds and stabilizes the FdUMP-thymidylate synthase complex to enhance 5-FU antitumor efficacy.',
    indications: [
      'Leucovorin Rescue following High-Dose Methotrexate (HDMTX) in osteosarcoma and leukemia',
      'Biochemical modulation of 5-Fluorouracil in Colorectal and Gastric Cancers (FOLFOX, FOLFIRI, De Gramont regimens)',
      'Treatment of accidental overdose of folic acid antagonists (methotrexate, trimethoprim)',
      'Megaloblastic anemia secondary to folate deficiency'
    ],
    commonStrengths: ['15 mg tablets', '50 mg', '100 mg', '350 mg vials for injection'],
    dosageForms: ['Tablet', 'Injection'],
    commonSideEffects: ['Allergic reactions (rash, pruritus, urticaria)', 'Exacerbation of 5-FU toxicities (severe diarrhea, stomatitis, neutropenia)', 'Pyrexia post-infusion', 'Nausea / vomiting'],
    storageAdvice: 'Store vials at 20°C to 25°C protected from light.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why is timing of Leucovorin Rescue so critical after High-Dose Methotrexate?',
        answer: 'Leucovorin must be started exactly within 24 to 36 hours of initiating HDMTX and continued until serum methotrexate levels drop below 0.05–0.1 micromolar to prevent fatal toxicity.'
      }
    ],
    aliases: ['Wellcovorin', 'Leucovorin Calcium', 'Folinic Acid', 'Biovorin']
  },
  {
    id: 'salt-78',
    sNo: 78,
    name: 'Darbepoetin alfa',
    slug: 'darbepoetin-alfa',
    category: 'Oncology supportive / complication management',
    drugClass: 'Long-Acting Recombinant Erythropoiesis-Stimulating Agent (ESA)',
    descriptionShort: 'Darbepoetin alfa is a hyperglycosylated erythropoietin analogue with a 3-fold longer half-life used for chemotherapy-induced anemia.',
    descriptionLong: 'Darbepoetin alfa is an engineered erythropoiesis-stimulating protein containing 5 N-linked carbohydrate chains (compared to 3 in recombinant human erythropoietin). This increased sialic acid content slows renal and hepatic clearance, providing an elimination half-life approximately 3-fold longer than epoetin alfa (~25–70 hours). This allows convenient weekly or every-3-week dosing to stimulate red blood cell production and reduce transfusion requirements.',
    mechanismOfAction: 'Stimulates erythropoietin receptors on bone marrow erythroid progenitor cells, promoting proliferation, differentiation, and survival of red blood cells.',
    indications: [
      'Treatment of anemia in patients with non-myeloid malignancies receiving concurrent myelosuppressive chemotherapy (when planned for ≥2 additional months)',
      'Treatment of anemia associated with Chronic Kidney Disease (CKD) on dialysis or non-dialysis'
    ],
    commonStrengths: ['25 mcg', '40 mcg', '60 mcg', '100 mcg', '300 mcg pre-filled syringes (PFS)'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Hypertension (blood pressure monitoring mandatory)', 'Vascular access thrombosis / venous thromboembolism (DVT/PE)', 'Myocardial infarction / stroke (when hemoglobin exceeds target >11-12 g/dl)', 'Peripheral edema', 'Headache and myalgia'],
    storageAdvice: 'Store refrigerated at 2°C to 8°C (Cold Chain). DO NOT FREEZE OR SHAKE.',
    coldStorage: 'Yes',
    faqs: [
      {
        question: 'What is the target hemoglobin ceiling when using Darbepoetin alfa?',
        answer: 'ESAs should target the lowest hemoglobin level sufficient to avoid RBC transfusions (typically 10 to 11 g/dL). Exceeding 11–12 g/dL significantly increases stroke, thrombosis, and mortality risks.'
      }
    ],
    aliases: ['Aranesp', 'Actorise', 'Darbecel', 'Cresp']
  },
  {
    id: 'salt-79',
    sNo: 79,
    name: 'Deflazacort',
    slug: 'deflazacort',
    category: 'Oncology supportive / complication management',
    drugClass: 'Synthetic Oxazoline Glucocorticoid / Corticosteroid',
    descriptionShort: 'Deflazacort is an oxazoline corticosteroid derivative with favorable bone and carbohydrate safety profiles used as supportive therapy.',
    descriptionLong: 'Deflazacort is a synthetic oxazoline derivative of prednisolone. Once converted to its active metabolite 21-desacetyldeflazacort, it exhibits potent anti-inflammatory and immunosuppressive properties. Clinical pharmacologic studies demonstrate that deflazacort exerts relatively lower negative impacts on bone calcium loss, carbohydrate metabolism, and weight gain compared to equivalent doses of prednisone or dexamethasone.',
    mechanismOfAction: 'Binds glucocorticoid receptors, inhibiting pro-inflammatory cytokine transcription (IL-1, IL-6, TNF-alpha) and suppressing edema and immune activation.',
    indications: [
      'Supportive management in oncology (reducing peritumoral edema, anti-inflammatory support)',
      'Duchenne Muscular Dystrophy (DMD)',
      'Severe autoimmune diseases (rheumatoid arthritis, systemic lupus erythematosus, asthma)'
    ],
    commonStrengths: ['6 mg', '18 mg', '24 mg', '30 mg'],
    dosageForms: ['Tablet'],
    commonSideEffects: ['Cushingoid appearance (moon face)', 'Weight gain / fluid retention', 'Increased susceptibility to infections', 'Mild hyperglycemia', 'Gastrointestinal upset / dyspepsia'],
    storageAdvice: 'Store below 25°C in a dry place.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why is Deflazacort preferred over Prednisone in certain long-term regimens?',
        answer: 'Deflazacort has demonstrated lower trabecular bone resorption and less adverse impact on glucose tolerance compared to traditional prednisone.'
      }
    ],
    aliases: ['Emflaza', 'Defcort', 'Dezacor', 'Defza']
  },
  {
    id: 'salt-80',
    sNo: 80,
    name: 'Denosumab',
    slug: 'denosumab',
    category: 'Oncology supportive / complication management',
    drugClass: 'Fully Human Monoclonal Antibody Targeting Receptor Activator of Nuclear Factor Kappa-B Ligand (RANKL)',
    descriptionShort: 'Denosumab is a fully human anti-RANKL antibody that prevents Skeletal-Related Events (SREs) in bone metastases and treats Giant Cell Tumor of Bone.',
    descriptionLong: 'Denosumab is a fully human IgG2 monoclonal antibody that binds with high specificity and affinity to RANKL (Receptor Activator of Nuclear Factor-κB Ligand). By blocking RANKL from binding to its receptor RANK on the surface of osteoclasts and osteoclast precursors, denosumab powerfully inhibits osteoclast formation, function, and survival. This suppresses osteolytic bone destruction caused by solid tumor bone metastases and multiple myeloma.',
    mechanismOfAction: 'Neutralizes RANKL, preventing osteoclast activation and halting tumor-induced osteolytic bone resorption and skeletal complications.',
    indications: [
      'Prevention of Skeletal-Related Events (fractures, spinal cord compression, radiation to bone) in patients with Bone Metastases from solid tumors (Xgeva 120 mg)',
      'Giant Cell Tumor of Bone (GCTB) that is unresectable or where surgical resection is likely to result in severe morbidity',
      'Hypercalcemia of Malignancy refractory to bisphosphonate therapy',
      'Treatment of Osteoporosis in postmenopausal women at high risk for fracture (Prolia 60 mg)'
    ],
    commonStrengths: ['120 mg/1.7 ml single-use vial (Xgeva)', '60 mg/1 ml pre-filled syringe (Prolia)'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Severe Hypocalcemia (calcium and Vitamin D supplementation mandatory)', 'Osteonecrosis of the Jaw (ONJ - pre-treatment dental exam required)', 'Atypical femoral fractures', 'Musculoskeletal pain', 'Dyspnea and fatigue'],
    storageAdvice: 'Store refrigerated at 2°C to 8°C (Cold Chain). Protect from direct light. Do not freeze or shake.',
    coldStorage: 'Yes',
    faqs: [
      {
        question: 'Why is a comprehensive dental checkup mandatory before starting Denosumab 120 mg (Xgeva)?',
        answer: 'Denosumab can cause Osteonecrosis of the Jaw (ONJ), particularly following invasive dental extractions. All dental work should be completed prior to therapy.'
      },
      {
        question: 'Why is daily Calcium and Vitamin D co-supplementation essential?',
        answer: 'Denosumab rapidly and profoundly shuts down bone calcium release. Patients must take daily calcium (500-1000 mg) and vitamin D (400-800 IU) to prevent life-threatening hypocalcemia.'
      }
    ],
    aliases: ['Xgeva', 'Prolia', 'Denoscan']
  },
  {
    id: 'salt-81',
    sNo: 81,
    name: 'Dexamethasone',
    slug: 'dexamethasone',
    category: 'Oncology supportive / complication management',
    drugClass: 'High-Potency Long-Acting Glucocorticoid',
    descriptionShort: 'Dexamethasone is an indispensable high-potency corticosteroid used for CINV antiemesis, peritumoral brain edema, and myeloma therapy.',
    descriptionLong: 'Dexamethasone is a long-acting synthetic glucocorticoid with approximately 25 to 30 times the anti-inflammatory potency of hydrocortisone and virtually zero mineralocorticoid (sodium-retaining) activity. It is a cornerstone in supportive oncology: preventing acute and delayed chemotherapy-induced nausea, reducing life-threatening cerebral edema associated with brain tumors/metastases, preventing hypersensitivity reactions, and inducing direct apoptosis in lymphoid/myeloma cells.',
    mechanismOfAction: 'Inhibits phospholipase A2 and nuclear translocation of NF-κB, suppressing cytokine cascade, reducing capillary permeability, and enhancing central antiemetic control.',
    indications: [
      'Prevention of acute and delayed Chemotherapy-Induced Nausea and Vomiting (CINV)',
      'Management of Vasogenic Cerebral Edema associated with primary and metastatic Brain Tumors',
      'Premedication to prevent infusion hypersensitivity reactions (Paclitaxel, Docetaxel, Monoclonal Antibodies)',
      'Core component in Multiple Myeloma induction regimens (combined with IMiDs and Proteasome Inhibitors)',
      'Spinal cord compression and superior vena cava syndrome emergency decompression'
    ],
    commonStrengths: ['0.5 mg', '2 mg', '4 mg', '8 mg tablets', '4 mg/ml', '8 mg/2 ml vials for injection'],
    dosageForms: ['Tablet', 'Injection'],
    commonSideEffects: ['Insomnia and mood changes / hyperactivity', 'Hyperglycemia / steroid-induced diabetes', 'Increased appetite and weight gain', 'Dyspepsia / peptic ulceration (PPI protection recommended)', 'Immunosuppression and muscle wasting (myopathy)'],
    storageAdvice: 'Store below 25°C protected from light.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why should Dexamethasone doses be taken in the morning?',
        answer: 'Dexamethasone causes central nervous system stimulation and insomnia. Taking doses with breakfast (and lunch) prevents sleep disruption.'
      }
    ],
    aliases: ['Decadron', 'Dexona', 'Demisone', 'Dexacort']
  },
  {
    id: 'salt-82',
    sNo: 82,
    name: 'Epoetin alfa / recombinant human erythropoietin',
    slug: 'epoetin-alfa-recombinant-human-erythropoietin',
    category: 'Oncology supportive / complication management',
    drugClass: 'Recombinant Human Erythropoietin (rHuEPO) / Erythropoiesis-Stimulating Agent',
    descriptionShort: 'Epoetin alfa is a recombinant erythropoietin that stimulates bone marrow RBC production to treat chemotherapy-induced anemia.',
    descriptionLong: 'Epoetin alfa is a 165-amino acid glycoprotein manufactured via recombinant DNA technology in mammalian Chinese Hamster Ovary (CHO) cells. It has identical biological effects and amino acid sequence to endogenous human erythropoietin. It binds to erythropoietin receptors on erythroid blast precursors in bone marrow, rescuing them from apoptosis and accelerating red blood cell differentiation to increase hematocrit and alleviate debilitating fatigue.',
    mechanismOfAction: 'Activates erythropoietin receptor homodimers, triggering JAK2-STAT5 signaling cascades that drive erythroid precursor proliferation and maturation.',
    indications: [
      'Treatment of anemia caused by concurrent myelosuppressive Chemotherapy in patients with non-myeloid malignancies',
      'Treatment of anemia in Chronic Kidney Disease (CKD)',
      'Reduction of allogeneic red blood cell transfusions in elective, non-cardiac, non-vascular surgery'
    ],
    commonStrengths: ['2000 IU', '4000 IU', '10000 IU', '40000 IU pre-filled syringes (PFS) and vials'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Hypertension / hypertensive encephalopathy', 'Thromboembolic events (DVT, PE, stroke)', 'Pure Red Cell Aplasia (PRCA - rare anti-EPO antibody mediated)', 'Flu-like symptoms / arthralgia', 'Injection site pain'],
    storageAdvice: 'Store refrigerated at 2°C to 8°C (Cold Chain). DO NOT FREEZE OR SHAKE.',
    coldStorage: 'Yes',
    faqs: [
      {
        question: 'Why must iron levels (Ferritin and Transferrin Saturation) be checked before starting Epoetin alfa?',
        answer: 'Erythropoietin stimulates rapid hemoglobin synthesis which rapidly depletes iron stores. Adequate iron levels (TSAT ≥ 20%, Ferritin ≥ 100 ng/mL) are required for full response.'
      }
    ],
    aliases: ['Procrit', 'Epogen', 'Eprex', 'Wepox', 'Relipoietin']
  },
  {
    id: 'salt-83',
    sNo: 83,
    name: 'Filgrastim',
    slug: 'filgrastim',
    category: 'Oncology supportive / complication management',
    drugClass: 'Recombinant Human Granulocyte Colony-Stimulating Factor (G-CSF)',
    descriptionShort: 'Filgrastim is a recombinant G-CSF that rapidly stimulates neutrophil production to prevent and treat chemotherapy-induced febrile neutropenia.',
    descriptionLong: 'Filgrastim is a non-glycosylated recombinant methionyl human granulocyte colony-stimulating factor (r-metHuG-CSF) produced in Escherichia coli. It binds specifically to the G-CSF receptor on hematopoietic precursor cells in the bone marrow, stimulating the proliferation, differentiation, and activation of neutrophil precursors. Administered daily following chemotherapy, filgrastim dramatically shortens the duration and depth of severe neutropenia, preventing life-threatening infectious hospitalizations.',
    mechanismOfAction: 'Binds to G-CSF cell-surface receptors on myeloid progenitor cells, accelerating neutrophil production, maturation, and functional antimicrobial activation.',
    indications: [
      'Prevention and reduction of the incidence of Febrile Neutropenia in patients with non-myeloid malignancies receiving myelosuppressive chemotherapy',
      'Mobilization of autologous and allogeneic Hematopoietic Progenitor Cells into peripheral blood for leukapheresis and stem cell transplantation',
      'Severe Chronic Neutropenia (congenital, cyclic, or idiopathic)',
      'Acute Myeloid Leukemia (following induction or consolidation chemotherapy to accelerate recovery)'
    ],
    commonStrengths: ['300 mcg/0.5 ml (30 MU)', '480 mcg/0.5 ml (48 MU) pre-filled syringes and vials'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Medullary bone pain (lower back, pelvis, sternum - manageable with paracetamol or antihistamines/loratadine)', 'Splenomegaly / splenic rupture (rare, serious)', 'Transient elevation in uric acid, LDH, and alkaline phosphatase', 'Leukocytosis (WBC > 50,000/mcL)', 'Acute Respiratory Distress Syndrome (ARDS)'],
    storageAdvice: 'Store refrigerated at 2°C to 8°C (Cold Chain). Protect from light. Do not freeze or shake.',
    coldStorage: 'Yes',
    faqs: [
      {
        question: 'Why is Loratadine (antihistamine) frequently recommended for Filgrastim bone pain?',
        answer: 'G-CSF stimulates bone marrow expansion and local histamine release in bone. Non-drowsy antihistamines like Loratadine provide significant relief from bone pain.'
      },
      {
        question: 'When should Filgrastim injections be started after chemotherapy?',
        answer: 'Filgrastim must be initiated at least 24 hours AFTER the completion of chemotherapy. It should never be given within 24 hours before or after chemotherapy.'
      }
    ],
    aliases: ['Neupogen', 'Grafeel', 'Colstim', 'Zarxio', 'Nivestim']
  },
  {
    id: 'salt-84',
    sNo: 84,
    name: 'Hydrocortisone',
    slug: 'hydrocortisone',
    category: 'Oncology supportive / complication management',
    drugClass: 'Short-Acting Physiological Glucocorticoid & Mineralocorticoid',
    descriptionShort: 'Hydrocortisone is a short-acting corticosteroid used in acute infusion reactions, adrenal replacement therapy, and emergency oncologic anaphylaxis.',
    descriptionLong: 'Hydrocortisone (cortisol) is the primary natural glucocorticoid secreted by the adrenal cortex. In oncology supportive care, intravenous hydrocortisone sodium succinate is the standard emergency agent for managing acute allergic infusion reactions, managing acute adrenal insufficiency (secondary to adrenalectomy or immunotherapy-induced hypophysitis/adrenalitis), and providing physiologic hormone replacement.',
    mechanismOfAction: 'Binds intracellular glucocorticoid and mineralocorticoid receptors, stabilizing mast cell membranes and suppressing immediate inflammatory mediator release.',
    indications: [
      'Immediate management of acute anaphylactic and hypersensitivity Infusion Reactions to chemotherapy or monoclonal antibodies',
      'Acute and chronic Adrenal Insufficiency (including immune checkpoint inhibitor-induced adrenalitis / hypophysitis)',
      'Severe shock unresponsive to conventional vasopressor therapy',
      'Severe acute asthma / bronchospasm exacerbations'
    ],
    commonStrengths: ['100 mg/vial', '200 mg/vial lyophilized powder for injection (hydrocortisone sodium succinate)', '5 mg', '10 mg', '20 mg oral tablets'],
    dosageForms: ['Injection', 'Tablet'],
    commonSideEffects: ['Transient perianal burning / tingling sensation (during rapid IV push)', 'Fluid retention and hypertension (due to mineralocorticoid activity)', 'Hyperglycemia', 'Hypokalemia', 'Insomnia and mood changes'],
    storageAdvice: 'Store unconstituted injection vials below 25°C protected from light.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why is Hydrocortisone the drug of choice for Immune Checkpoint Inhibitor (ICI)-induced adrenal crisis?',
        answer: 'Hydrocortisone provides both glucocorticoid and mineralocorticoid activity, rapidly restoring vascular tone, blood pressure, and electrolyte balance.'
      }
    ],
    aliases: ['Solu-Cortef', 'Primacort', 'Cortef', 'Hycort']
  },
  {
    id: 'salt-85',
    sNo: 85,
    name: 'Netupitant + palonosetron',
    slug: 'netupitant-palonosetron',
    category: 'Oncology supportive / complication management',
    drugClass: 'Fixed-Dose Combination NK1 Receptor Antagonist and Second-Generation 5-HT3 Antagonist',
    descriptionShort: 'Netupitant + Palonosetron (NEPA) is a single-dose oral combination that prevents both acute and delayed CINV for up to 5 full days.',
    descriptionLong: 'Netupitant + Palonosetron (NEPA) is the first fixed-dose combination antiemetic targeting two critical emetic pathways simultaneously. Palonosetron is a potent second-generation 5-HT3 receptor antagonist with an ultra-long half-life (~40 hours) and receptor internalizing properties. Netupitant is a highly selective NK1 receptor antagonist with a half-life of ~90 hours. A single capsule taken 1 hour before chemotherapy provides comprehensive protection across the entire 120-hour (5-day) emetic risk window.',
    mechanismOfAction: 'Simultaneously blocks peripheral serotonin 5-HT3 receptors (palonosetron) and central neurokinin NK1 receptors (netupitant), preventing both acute and delayed emesis.',
    indications: [
      'Prevention of acute and delayed nausea and vomiting associated with initial and repeat courses of Highly Emetogenic Chemotherapy (HEC - e.g. Cisplatin-based)',
      'Prevention of acute and delayed nausea and vomiting associated with Moderately Emetogenic Chemotherapy (MEC - e.g. AC regimens)'
    ],
    commonStrengths: ['Netupitant 300 mg + Palonosetron 0.5 mg fixed-dose oral capsule'],
    dosageForms: ['Capsule'],
    commonSideEffects: ['Headache', 'Constipation', 'Fatigue / asthenia', 'Dyspepsia', 'Erythema / dizziness'],
    storageAdvice: 'Store below 25°C in original packaging.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why is NEPA administered as only a single capsule per chemotherapy cycle?',
        answer: 'Both netupitant (half-life ~90 hours) and palonosetron (half-life ~40 hours) are exceptionally long-acting, delivering sustained antiemetic coverage for 5 full days with one single dose.'
      }
    ],
    aliases: ['Akynzeo', 'Nepa', 'Netupal', 'Akynzeo IV (Fosnetupitant/Palonosetron)']
  },
  {
    id: 'salt-86',
    sNo: 86,
    name: 'Ondansetron',
    slug: 'ondansetron',
    category: 'Oncology supportive / complication management',
    drugClass: 'First-Generation Selective Serotonin 5-HT3 Receptor Antagonist',
    descriptionShort: 'Ondansetron is a gold-standard 5-HT3 antiemetic used to prevent and manage acute chemotherapy-, radiation-, and postoperative nausea and vomiting.',
    descriptionLong: 'Ondansetron is a carbazole derivative that selectively and competitively blocks serotonin 5-HT3 receptors located peripherally on vagal nerve terminals in the gastrointestinal mucosa and centrally in the chemoreceptor trigger zone (CTZ) of the area postrema. By preventing serotonin released from enterochromaffin cells from triggering the vagal emetic reflex, ondansetron effectively prevents acute emesis associated with chemotherapy and radiation.',
    mechanismOfAction: 'Selectively blocks 5-HT3 receptors on vagal afferents in the gut and centrally in the chemoreceptor trigger zone, preventing acute nausea and vomiting reflexes.',
    indications: [
      'Prevention of acute nausea and vomiting associated with initial and repeat courses of Moderately and Highly Emetogenic Chemotherapy (MEC/HEC)',
      'Prevention and treatment of Radiation-Induced Nausea and Vomiting (RINV)',
      'Prevention and treatment of Postoperative Nausea and Vomiting (PONV)'
    ],
    commonStrengths: ['4 mg', '8 mg tablets / orally disintegrating tablets (ODT)', '4 mg/2 ml', '8 mg/4 ml vials for injection', '2 mg/5 ml syrup'],
    dosageForms: ['Tablet', 'Injection', 'Syrup'],
    commonSideEffects: ['Headache (very common)', 'Constipation (due to decreased colonic transit time)', 'Dose-dependent QTc prolongation (ECG precaution at high doses)', 'Transient asymptomatic elevation of liver transaminases', 'Warm sensation or flushing during rapid IV injection'],
    storageAdvice: 'Store below 30°C protected from light.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why is single IV Ondansetron capped at a maximum of 16 mg?',
        answer: 'Intravenous single doses greater than 16 mg significantly increase the risk of serious cardiac arrhythmias and QTc interval prolongation (Torsades de pointes).'
      },
      {
        question: 'When should oral Ondansetron be taken before chemotherapy?',
        answer: 'Oral Ondansetron tablets should be taken approximately 30 minutes before starting chemotherapy.'
      }
    ],
    aliases: ['Zofran', 'Emeset', 'Ondamac', 'Vomigo', 'Zofer']
  },
  {
    id: 'salt-87',
    sNo: 87,
    name: 'Pegfilgrastim',
    slug: 'pegfilgrastim',
    category: 'Oncology supportive / complication management',
    drugClass: 'Long-Acting Pegylated Granulocyte Colony-Stimulating Factor (PEG-G-CSF)',
    descriptionShort: 'Pegfilgrastim is a long-acting pegylated G-CSF given as a single injection once per cycle to prevent chemotherapy-induced febrile neutropenia.',
    descriptionLong: 'Pegfilgrastim is a covalent conjugate of recombinant methionyl human G-CSF (filgrastim) with a single 20-kDa monomethoxypolyethylene glycol (PEG) molecule. Pegylation dramatically increases molecular size and reduces renal clearance, shifting elimination exclusively to neutrophil-mediated clearance ("self-regulating clearance"). As a result, a single 6 mg subcutaneous injection once per chemotherapy cycle replaces 10 to 14 daily injections of filgrastim.',
    mechanismOfAction: 'Stimulates G-CSF receptors on bone marrow precursors; pegylation provides sustained serum levels until neutrophil recovery triggers self-regulating drug clearance.',
    indications: [
      'Reduction in the incidence of infection, as manifested by Febrile Neutropenia, in patients with non-myeloid malignancies receiving myelosuppressive anti-cancer drugs'
    ],
    commonStrengths: ['6 mg/0.6 ml pre-filled syringe (PFS) and on-body injector device'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Medullary bone pain (manageable with simple analgesics or loratadine)', 'Transient leukocytosis during recovery', 'Injection site erythema / pain', 'Splenic enlargement (rare splenic rupture warning)'],
    storageAdvice: 'Store refrigerated at 2°C to 8°C (Cold Chain). Protect from light. DO NOT FREEZE OR SHAKE.',
    coldStorage: 'Yes',
    faqs: [
      {
        question: 'Why must Pegfilgrastim be given at least 24 hours AFTER chemotherapy?',
        answer: 'Administering G-CSF within 24 hours of chemotherapy stimulates bone marrow cells right when cytotoxic drugs are circulating, worsening myelosuppression.'
      },
      {
        question: 'How does "self-regulating" clearance work with Pegfilgrastim?',
        answer: 'Pegfilgrastim stays in the blood stimulating marrow until new neutrophils mature. The recovering neutrophils then engulf and eliminate the drug automatically.'
      }
    ],
    aliases: ['Neulasta', 'Peg-Grafeel', 'Pegex', 'Fulphila', 'Udenyca']
  },
  {
    id: 'salt-88',
    sNo: 88,
    name: 'Sargramostim',
    slug: 'sargramostim',
    category: 'Oncology supportive / complication management',
    drugClass: 'Recombinant Human Granulocyte-Macrophage Colony-Stimulating Factor (rhu GM-CSF)',
    descriptionShort: 'Sargramostim is a recombinant GM-CSF that accelerates myeloid, monocyte, and dendritic cell recovery following bone marrow transplantation.',
    descriptionLong: 'Sargramostim is a recombinant glycoprotein produced in yeast (Saccharomyces cerevisiae) that functions identically to endogenous Granulocyte-Macrophage Colony-Stimulating Factor (GM-CSF). Unlike G-CSF (which primarily targets neutrophils), GM-CSF stimulates the proliferation, differentiation, and activation of multiple lineages: neutrophils, monocytes, macrophages, and dendritic cells, enhancing both antimicrobial defense and antigen-presenting immune responses.',
    mechanismOfAction: 'Binds to the heterodimeric GM-CSF receptor on early hematopoietic progenitor cells, stimulating multi-lineage production of granulocytes, macrophages, and dendritic cells.',
    indications: [
      'Acceleration of myeloid recovery following Autologous or Allogeneic Bone Marrow Transplantation (BMT)',
      'Treatment of delayed engraftment or graft failure following BMT',
      'Mobilization of hematopoietic progenitor cells for peripheral blood stem cell collection',
      'Management of acute radiation syndrome (hematopoietic sub-syndrome)'
    ],
    commonStrengths: ['250 mcg/vial', '500 mcg/vial lyophilized powder for injection'],
    dosageForms: ['Injection'],
    commonSideEffects: ['First-dose reaction (hypotension, tachycardia, flushing, hypoxia - unique to GM-CSF)', 'Fluid retention / capillary leak syndrome (edema, pericardial/pleural effusions at high doses)', 'Bone pain and arthralgia', 'Fever and chills', 'Transient leukocytosis / eosinophilia'],
    storageAdvice: 'Store refrigerated at 2°C to 8°C (Cold Chain). Protect from light.',
    coldStorage: 'Yes',
    faqs: [
      {
        question: 'How does Sargramostim (GM-CSF) differ functionally from Filgrastim (G-CSF)?',
        answer: 'Filgrastim strictly stimulates neutrophil granulocytes, whereas Sargramostim stimulates neutrophils, monocytes, macrophages, and dendritic cells, boosting broad cellular immunity.'
      }
    ],
    aliases: ['Leukine', 'Prokine']
  },
  {
    id: 'salt-89',
    sNo: 89,
    name: 'Zoledronic acid',
    slug: 'zoledronic-acid',
    category: 'Oncology supportive / complication management',
    drugClass: 'Third-Generation Nitrogen-Containing Bisphosphonate (Imidazole Ring)',
    descriptionShort: 'Zoledronic acid is the most potent nitrogen-containing bisphosphonate used for bone metastases, multiple myeloma, and hypercalcemia of malignancy.',
    descriptionLong: 'Zoledronic acid is a heterocyclic nitrogen-containing third-generation bisphosphonate featuring an imidazole ring that confers high mineral binding affinity to hydroxyapatite crystals in bone. It potently inhibits the enzyme farnesyl pyrophosphate (FPP) synthase in the mevalonate pathway of osteoclasts. This stops protein prenylation, halting osteoclastic bone resorption and protecting against skeletal fractures and spinal cord compression.',
    mechanismOfAction: 'Inhibits farnesyl pyrophosphate (FPP) synthase in osteoclasts, causing loss of ruffled border function and osteoclast apoptosis, halting bone resorption.',
    indications: [
      'Prevention of Skeletal-Related Events (pathologic fractures, spinal cord compression, bone radiotherapy) in patients with advanced solid tumors with Bone Metastases and Multiple Myeloma (4 mg q3-4 weeks)',
      'Treatment of Hypercalcemia of Malignancy (HCM - 4 mg single IV dose)',
      'Treatment and prevention of Osteoporosis in postmenopausal women and men (5 mg annual IV infusion - Aclasta / Reclast)'
    ],
    commonStrengths: ['4 mg/5 ml concentrate', '4 mg/100 ml ready-to-infuse solution (Zometa)', '5 mg/100 ml infusion bottle (Aclasta / Reclast)'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Acute phase response (flu-like symptoms: fever, myalgia, arthralgia, bone pain during first 48 hours)', 'Hypocalcemia and hypophosphatemia (calcium/vitamin D supplementation required)', 'Renal impairment / nephrotoxicity (creatinine clearance monitoring mandatory)', 'Osteonecrosis of the Jaw (ONJ - mandatory prior dental clearance)', 'Atypical subtrochanteric femur fractures'],
    storageAdvice: 'Store at 20°C to 25°C. Infuse over at least 15 minutes with adequate pre-hydration.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why must Zoledronic Acid IV be infused over at least 15 minutes?',
        answer: 'Infusing faster than 15 minutes causes peak plasma surges that precipitate renal tubular toxicity and acute kidney injury.'
      },
      {
        question: 'Why is serum creatinine monitoring and dose adjustment mandatory before every Zoledronic Acid infusion?',
        answer: 'Zoledronic acid is excreted entirely by the kidneys. Serum creatinine must be checked before each dose, and doses must be reduced in patients with pre-existing mild-to-moderate renal impairment.'
      }
    ],
    aliases: ['Zometa', 'Aclasta', 'Reclast', 'Zoldonat', 'Blaztere']
  },
  {
    id: 'salt-90',
    sNo: 90,
    name: 'HPV-16/18 bivalent recombinant vaccine',
    slug: 'hpv-16-18-bivalent-recombinant-vaccine',
    category: 'Oncology-related adjunct / prevention',
    drugClass: 'Recombinant Virus-Like Particle (VLP) Prophylactic Cancer Vaccine',
    descriptionShort: 'HPV-16/18 bivalent vaccine is a prophylactic cancer vaccine formulated with AS04 adjuvant to prevent cervical cancer and HPV-induced precancerous lesions.',
    descriptionLong: 'The HPV-16/18 bivalent recombinant vaccine is a non-infectious prophylactic recombinant vaccine composed of major capsid L1 virus-like particles (VLPs) of High-Risk Human Papillomavirus types 16 and 18. Formulated with the proprietary AS04 adjuvant system (aluminum hydroxide + 3-O-desacyl-4\'-monophosphoryl lipid A), the vaccine induces exceptionally high, durable neutralizing antibody titers that neutralize HPV virions before they can infect cervical basal epithelial cells, preventing cervical dysplasia, cervical carcinoma, and HPV-driven anogenital malignancies.',
    mechanismOfAction: 'Presents recombinant L1 capsid protein VLPs to the immune system, inducing high-titer neutralising IgG antibodies that prevent persistent HPV-16/18 infection.',
    indications: [
      'Prevention of cervical cancer (squamous cell carcinoma and adenocarcinoma) caused by oncogenic HPV types 16 and 18',
      'Prevention of High-Grade Cervical Intraepithelial Neoplasia (CIN 2/3) and cervical adenocarcinoma in situ (AIS)',
      'Prevention of persistent HPV 16/18 infection in females from 9 years of age onward'
    ],
    commonStrengths: ['0.5 ml pre-filled syringe (20 mcg HPV-16 L1 + 20 mcg HPV-18 L1 with AS04 adjuvant)'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Injection site reactions (pain, redness, swelling - very common due to AS04 adjuvant)', 'Headache and fatigue', 'Myalgia and arthralgia', 'Low-grade fever', 'Syncope / vasovagal dizziness (15-minute post-vaccination seated observation recommended)'],
    storageAdvice: 'Store refrigerated at 2°C to 8°C (Cold Chain). DO NOT FREEZE. Protect from light.',
    coldStorage: 'Yes',
    faqs: [
      {
        question: 'What is the recommended age and schedule for HPV vaccination?',
        answer: 'Recommended for girls aged 9–14 years as a 2-dose schedule (0 and 6 months). For individuals aged 15 years and older, a 3-dose schedule (0, 1, and 6 months) is standard.'
      },
      {
        question: 'Can the HPV vaccine treat an existing cervical HPV infection?',
        answer: 'No, the HPV vaccine is strictly preventive. It does not treat or clear pre-existing HPV infections or established cervical dysplasia.'
      }
    ],
    aliases: ['Cervarix', 'Bivalent HPV Vaccine', 'HPV Vaccine']
  },
  {
    id: 'salt-91',
    sNo: 91,
    name: 'Curcumin',
    slug: 'curcumin',
    category: 'Oncology-related adjunct / prevention',
    drugClass: 'Polyphenolic Curcuminoid / Phytochemical Anti-Inflammatory & Antioxidant Adjunct',
    descriptionShort: 'Curcumin is a bioactive polyphenolic curcuminoid utilized as an integrative adjunct to reduce inflammation and modulate oxidative stress pathways in cancer care.',
    descriptionLong: 'Curcumin (diferuloylmethane) is the principal active polyphenolic compound extracted from the rhizomes of Curcuma longa (turmeric). In integrative and supportive oncology, highly bioavailable curcumin formulations (enhanced with piperine, phospholipids, or nano-micelles) are studied and utilized as supportive adjuncts. Curcumin down-regulates pro-inflammatory nuclear factor kappa-B (NF-κB), suppresses cyclooxygenase-2 (COX-2) and 5-lipoxygenase, modulates oxidative stress, and helps alleviate treatment-associated inflammation.',
    mechanismOfAction: 'Down-regulates NF-κB, COX-2, 5-LOX, and pro-inflammatory cytokines (TNF-alpha, IL-6), while up-regulating Nrf2-mediated endogenous antioxidant defenses.',
    indications: [
      'Supportive nutritional and anti-inflammatory adjunct in cancer care',
      'Management of treatment-related inflammatory symptoms and joint discomfort',
      'Modulation of systemic oxidative stress and metabolic well-being'
    ],
    commonStrengths: ['500 mg', '95% standardized curcuminoids capsules (often with 5 mg piperine / BioPerine or phytosome complexes)'],
    dosageForms: ['Capsule', 'Tablet'],
    commonSideEffects: ['Mild gastrointestinal upset / acid reflux', 'Loose stools / diarrhea (at very high doses)', 'Antiplatelet effect (mild increase in bleeding risk with anticoagulants)', 'Staining of mouth or clothes (yellow)'],
    storageAdvice: 'Store below 25°C in a dry place protected from direct sunlight.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why is standard dietary turmeric poorly absorbed and how is pharmaceutical Curcumin improved?',
        answer: 'Unformulated curcumin has very low oral bioavailability. Enhanced formulations combine curcumin with black pepper extract (piperine) or liposomal/phospholipid nanocarriers to boost absorption by up to 2000%.'
      },
      {
        question: 'Should Curcumin supplements be paused before surgery?',
        answer: 'Yes, because Curcumin possesses mild natural antiplatelet and blood-thinning properties, it should be discontinued at least 1 to 2 weeks before scheduled surgeries.'
      }
    ],
    aliases: ['Turmeric extract', 'Curcumin C3 Complex', 'Curcubest', 'Theracurmin', 'Longvida']
  }
];
