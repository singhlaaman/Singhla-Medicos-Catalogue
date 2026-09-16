import { SaltInfo } from '../types';

export const SALTS_PART_2: SaltInfo[] = [
  {
    id: 'salt-31',
    sNo: 31,
    name: 'Erlotinib',
    slug: 'erlotinib',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'First-Generation EGFR Tyrosine Kinase Inhibitor (TKI)',
    descriptionShort: 'Erlotinib is an oral EGFR tyrosine kinase inhibitor used in Non-Small Cell Lung Cancer with EGFR exon 19 deletions or exon 21 L858R mutations and advanced Pancreatic Cancer.',
    descriptionLong: 'Erlotinib is an ATP-competitive reversible inhibitor of the epidermal growth factor receptor (EGFR/HER1) tyrosine kinase. In NSCLC tumors harboring sensitizing EGFR activating mutations, erlotinib shuts down downstream pro-survival RAS-RAF-MEK-ERK and PI3K-AKT signaling cascades, blocking cell proliferation and angiogenesis.',
    mechanismOfAction: 'Reversibly binds to the ATP-binding pocket of EGFR tyrosine kinase, preventing receptor autophosphorylation and downstream oncogenic signaling.',
    indications: [
      'Metastatic Non-Small Cell Lung Cancer (NSCLC) with sensitizing EGFR mutations (Exon 19 del / L858R)',
      'Locally advanced, unresectable, or metastatic Pancreatic Cancer (combined with Gemcitabine)'
    ],
    commonStrengths: ['25 mg', '100 mg', '150 mg'],
    dosageForms: ['Tablet'],
    commonSideEffects: ['Acneiform skin rash', 'Diarrhea', 'Paronychia / dry skin', 'Fatigue / anorexia', 'Interstitial lung disease (ILD - rare, serious)'],
    storageAdvice: 'Store at 20°C to 25°C in original bottle.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Should Erlotinib be taken with or without food?',
        answer: 'Erlotinib must be taken on an empty stomach, at least 1 hour before or 2 hours after food intake, as food increases systemic exposure unpredictably.'
      },
      {
        question: 'Does the development of skin rash correlate with Erlotinib efficacy?',
        answer: 'Yes, clinical studies indicate that patients who develop an acneiform skin rash generally have higher response rates and longer progression-free survival.'
      }
    ],
    aliases: ['Tarceva', 'Erlocip', 'Erlocent', 'Erlotaz']
  },
  {
    id: 'salt-32',
    sNo: 32,
    name: 'Etoposide',
    slug: 'etoposide',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Podophyllotoxin Derivative / Topoisomerase II Inhibitor (VP-16)',
    descriptionShort: 'Etoposide (VP-16) is a topoisomerase II inhibitor indicated in Small Cell Lung Cancer, Testicular Germ Cell Tumors, and Lymphomas.',
    descriptionLong: 'Etoposide is a semi-synthetic derivative of podophyllotoxin. It forms a ternary complex with topoisomerase II and DNA, preventing religation of cleaved nucleic acid strands. This results in the accumulation of double-strand DNA breaks during the late S and G2 phases of the cell cycle, leading to apoptotic tumor cell death.',
    mechanismOfAction: 'Stabilizes the topoisomerase II-DNA cleavage complex, preventing DNA ligation and causing permanent double-stranded DNA breaks.',
    indications: [
      'Small Cell Lung Cancer (SCLC - frontline EP regimen with Cisplatin/Carboplatin)',
      'Refractory Testicular Germ Cell Tumors (BEP regimen)',
      'Hodgkin and Non-Hodgkin Lymphomas',
      'Acute Myeloid Leukemia (AML)'
    ],
    commonStrengths: ['100 mg/5 ml injection', '50 mg', '100 mg capsules'],
    dosageForms: ['Injection', 'Capsule'],
    commonSideEffects: ['Bone marrow suppression (severe leukopenia/neutropenia)', 'Alopecia (hair loss)', 'Hypotension during rapid IV infusion', 'Nausea / vomiting', 'Secondary leukemias (t-AML - rare long term)'],
    storageAdvice: 'Store vials at 15°C to 25°C. Protect from light. Do not refrigerate concentrated solution.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why must Etoposide IV be infused slowly over at least 30 to 60 minutes?',
        answer: 'Rapid IV infusion of Etoposide can cause sudden, severe hypotension and bronchospasm due to the formulation solvents.'
      }
    ],
    aliases: ['Vepesid', 'Lastet', 'Eposin', 'Oncosid']
  },
  {
    id: 'salt-33',
    sNo: 33,
    name: 'Everolimus',
    slug: 'everolimus',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'mTOR (Mammalian Target of Rapamycin) Serine/Threonine Kinase Inhibitor',
    descriptionShort: 'Everolimus is an oral mTORC1 inhibitor used in advanced HR+ Breast Cancer, Renal Cell Carcinoma, Neuroendocrine Tumors, and Tuberous Sclerosis Complex.',
    descriptionLong: 'Everolimus is a 40-O-(2-hydroxyethyl) derivative of sirolimus. It binds with high affinity to the intracellular immunophilin FKBP-12 to form an inhibitory complex that directly targets the mTOR complex 1 (mTORC1). This blocks downstream phosphorylation of p70 S6 kinase and 4E-BP1, suppressing tumor cell growth, translation of oncogenic proteins, and VEGF-driven angiogenesis.',
    mechanismOfAction: 'Inhibits the mTORC1 signaling pathway, arresting tumor cells in the G1 phase and down-regulating hypoxia-inducible factor (HIF-1α) and VEGF expression.',
    indications: [
      'Hormone Receptor-Positive (HR+) / HER2-Advanced Breast Cancer (in combination with Exemestane)',
      'Advanced Renal Cell Carcinoma (post-VEGF-targeted therapy)',
      'Progressive Neuroendocrine Tumors (NETs) of pancreatic, GI, or lung origin',
      'Subependymal Giant Cell Astrocytoma (SEGA) and Renal Angiomyolipoma in Tuberous Sclerosis'
    ],
    commonStrengths: ['2.5 mg', '5 mg', '10 mg'],
    dosageForms: ['Tablet'],
    commonSideEffects: ['Aphthous stomatitis / mouth ulcers', 'Non-infectious pneumonitis', 'Hyperglycemia and hypercholesterolemia', 'Increased infection susceptibility', 'Peripheral edema'],
    storageAdvice: 'Store at 20°C to 25°C in original blister pack protected from light and moisture.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'How are Everolimus-associated mouth ulcers managed?',
        answer: 'Dexamethasone steroid oral mouthwash (alcohol-free) used prophylactically significantly reduces the incidence and severity of stomatitis.'
      }
    ],
    aliases: ['Afinitor', 'Certican', 'Volantis', 'Evertor']
  },
  {
    id: 'salt-34',
    sNo: 34,
    name: 'Exemestane',
    slug: 'exemestane',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Steroidal Irreversible Aromatase Inactivator (Type I)',
    descriptionShort: 'Exemestane is an oral irreversible steroidal aromatase inactivator used for adjuvant and advanced treatment of postmenopausal HR+ breast cancer.',
    descriptionLong: 'Exemestane is a steroidal analogue of androstenedione that functions as a "suicide substrate" for the aromatase enzyme. It binds irreversibly to the active catalytic pocket of aromatase, leading to permanent enzyme inactivation. Unlike non-steroidal inhibitors, exemestane has slight androgenic properties and permanently shuts down estrogen synthesis in postmenopausal women.',
    mechanismOfAction: 'Irreversibly binds and permanently inactivates the aromatase (estrogen synthetase) enzyme, suppressing peripheral estrogen levels by ~90%.',
    indications: [
      'Adjuvant treatment of postmenopausal women with ER+ early breast cancer following 2 to 3 years of Tamoxifen',
      'Advanced / metastatic breast cancer in postmenopausal women whose disease has progressed following tamoxifen therapy'
    ],
    commonStrengths: ['25 mg'],
    dosageForms: ['Tablet'],
    commonSideEffects: ['Hot flashes', 'Arthralgia and musculoskeletal pain', 'Fatigue / insomnia', 'Bone loss (osteopenia)', 'Mild nausea'],
    storageAdvice: 'Store at 20°C to 25°C.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'When should Exemestane be taken relative to food?',
        answer: 'Exemestane should be taken once daily preferably after a meal, as taking it with food increases bioavailability by roughly 40%.'
      }
    ],
    aliases: ['Aromasin', 'Xmastin', 'Aromex']
  },
  {
    id: 'salt-35',
    sNo: 35,
    name: 'Fludarabine',
    slug: 'fludarabine',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Fluorinated Purine Nucleoside Antimetabolite',
    descriptionShort: 'Fludarabine is a purine nucleoside analog that forms the therapeutic cornerstone in the FCR regimen for Chronic Lymphocytic Leukemia (CLL).',
    descriptionLong: 'Fludarabine phosphate is rapidly dephosphorylated in plasma to 2-fluoro-ara-A, transported into cells, and rephosphorylated to its active triphosphate form (2-fluoro-ara-ATP). This active metabolite inhibits multiple enzymes critical for DNA replication, including DNA polymerase alpha, ribonucleotide reductase, and DNA primase, inducing apoptosis in quiescent and proliferating lymphocytes.',
    mechanismOfAction: 'Inhibits DNA polymerase, ribonucleotide reductase, DNA primase, and DNA ligase I, halting DNA synthesis and cell division in malignant lymphoid clones.',
    indications: [
      'B-cell Chronic Lymphocytic Leukemia (CLL - component of FCR chemoimmunotherapy)',
      'Indolent Non-Hodgkin Lymphomas and Mantle Cell Lymphoma',
      'Conditioning regimens prior to allogeneic hematopoietic stem cell transplantation'
    ],
    commonStrengths: ['50 mg lyophilized vial for injection', '10 mg oral tablets'],
    dosageForms: ['Injection', 'Tablet'],
    commonSideEffects: ['Severe prolonged T-cell lymphopenia (CD4+ depletion)', 'Opportunistic infections (PJP, HSV, VZV)', 'Myelosuppression', 'Autoimmune hemolytic anemia (AIHA)', 'Neurotoxicity (high doses)'],
    storageAdvice: 'Store vials at 15°C to 25°C.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why is blood irradiation necessary for patients who receive Fludarabine?',
        answer: 'Due to severe T-cell suppression, irradiated cellular blood products are mandatory to prevent fatal transfusion-associated graft-versus-host disease (TA-GvHD).'
      }
    ],
    aliases: ['Fludara', 'Fludac', 'Fludarabin']
  },
  {
    id: 'salt-36',
    sNo: 36,
    name: 'Fluorouracil (5-FU)',
    slug: 'fluorouracil-5-fu',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Pyrimidine Antimetabolite / Thymidylate Synthase Inhibitor',
    descriptionShort: 'Fluorouracil (5-FU) is a foundational antimetabolite chemotherapeutic utilized in colorectal, gastric, breast, head & neck, and pancreatic cancers.',
    descriptionLong: 'Fluorouracil (5-FU) is an analogue of uracil that is converted intracellularly into active metabolites: FdUMP, FUTP, and FdUTP. FdUMP forms a stable ternary covalent complex with thymidylate synthase and 5,10-methylenetetrahydrofolate (enhanced by leucovorin), blocking thymidine synthesis essential for DNA replication.',
    mechanismOfAction: 'FdUMP irreversibly blocks thymidylate synthase (TS), causing "thymineless death"; FUTP incorporates into RNA, disrupting processing and translation.',
    indications: [
      'Colorectal and Anal Carcinomas (FOLFOX, FOLFIRI, FOLFIRINOX regimens)',
      'Gastric and Esophageal Adenocarcinomas',
      'Pancreatic and Biliary Tract Cancers',
      'Breast Cancer (CMF, FAC regimens)',
      'Squamous Cell Carcinomas of Head and Neck'
    ],
    commonStrengths: ['250 mg/5 ml', '500 mg/10 ml', '1000 mg/20 ml'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Diarrhea / enteritis', 'Stomatitis / oral mucositis', 'Myelosuppression', 'Hand-foot syndrome (continuous infusions)', 'Coronary vasospasm / angina (rare)'],
    storageAdvice: 'Store between 15°C and 25°C protected from light. Do not freeze (precipitates redissolve upon gentle warming).',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why is Leucovorin (folinic acid) given with 5-Fluorouracil?',
        answer: 'Leucovorin stabilizes the binding of 5-FU metabolite (FdUMP) to thymidylate synthase, significantly amplifying the anticancer cytotoxicity of 5-FU.'
      },
      {
        question: 'What is Dihydropyrimidine Dehydrogenase (DPD) deficiency?',
        answer: 'DPD breaks down 5-FU. Patients with genetic DPD deficiency cannot metabolize the drug and face life-threatening toxicity unless tested and dose-reduced.'
      }
    ],
    aliases: ['5-FU', 'Adrucil', 'Flonida', 'Kefol']
  },
  {
    id: 'salt-37',
    sNo: 37,
    name: 'Gefitinib',
    slug: 'gefitinib',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'First-Generation Selective EGFR Tyrosine Kinase Inhibitor',
    descriptionShort: 'Gefitinib is an oral targeted EGFR tyrosine kinase inhibitor indicated as first-line therapy in EGFR-mutated advanced Non-Small Cell Lung Cancer.',
    descriptionLong: 'Gefitinib was the first selective small-molecule inhibitor of epidermal growth factor receptor (EGFR) tyrosine kinase approved for clinical use. It selectively binds the adenosine triphosphate (ATP)-binding pocket on the intracellular catalytic domain of EGFR, inhibiting downstream pro-survival AKT and MAPK cascades and triggering apoptosis in EGFR-sensitizing mutant lung adenocarcinomas.',
    mechanismOfAction: 'Competitively blocks the ATP-binding pocket of EGFR tyrosine kinase, suppressing EGFR autophosphorylation and downstream oncogenic survival signaling.',
    indications: [
      'First-line treatment of patients with metastatic Non-Small Cell Lung Cancer (NSCLC) harboring EGFR exon 19 deletions or exon 21 (L858R) substitution mutations'
    ],
    commonStrengths: ['250 mg'],
    dosageForms: ['Tablet'],
    commonSideEffects: ['Skin rash (papulopustular/acneiform)', 'Diarrhea', 'Dry skin / pruritus', 'Elevated ALT/AST transaminases', 'Paronychia'],
    storageAdvice: 'Store at 20°C to 25°C in original package.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Can Gefitinib tablets be dispersed in water for patients with swallowing difficulties?',
        answer: 'Yes, Gefitinib tablets can be dropped into approximately 50 ml of non-carbonated drinking water, stirred until dispersed (without crushing), and swallowed immediately.'
      }
    ],
    aliases: ['Iressa', 'Geftinat', 'Gefitero', 'Gefticip']
  },
  {
    id: 'salt-38',
    sNo: 38,
    name: 'Gemcitabine',
    slug: 'gemcitabine',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Deoxycytidine Nucleoside Analog Antimetabolite',
    descriptionShort: 'Gemcitabine is a broad-spectrum pyrimidine antimetabolite indicated in pancreatic, non-small cell lung, ovarian, bladder, and breast cancers.',
    descriptionLong: 'Gemcitabine (2\',2\'-difluorodeoxycytidine) is a fluorine-substituted deoxycytidine analog. Inside cells, it is sequentially phosphorylated by deoxycytidine kinase to gemcitabine diphosphate (dFdCDP) and triphosphate (dFdCTP). dFdCDP inhibits ribonucleotide reductase (depleting dNTP pools), while dFdCTP incorporates into DNA where one additional nucleotide is added ("masked chain termination") before DNA polymerase is locked and replication arrests.',
    mechanismOfAction: 'Inhibits ribonucleotide reductase and incorporates into replicating DNA, causing masked chain termination and apoptotic cell death.',
    indications: [
      'Locally advanced or metastatic Pancreatic Carcinoma (first-line standard)',
      'Locally advanced or metastatic Non-Small Cell Lung Cancer (NSCLC)',
      'Advanced Ovarian Carcinoma (combined with Carboplatin)',
      'Metastatic Breast Cancer (combined with Paclitaxel)',
      'Advanced Urothelial / Bladder Carcinoma (Gemcitabine + Cisplatin)'
    ],
    commonStrengths: ['200 mg/vial', '1000 mg/vial', '1400 mg/vial'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Myelosuppression (neutropenia/thrombocytopenia)', 'Flu-like symptoms (fever, chills, myalgia)', 'Peripheral edema', 'Transient elevation in liver transaminases', 'Dyspnea / rash'],
    storageAdvice: 'Store reconstituted solution at 20°C to 25°C. DO NOT REFRIGERATE reconstituted solution as crystals may precipitate.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why is Gemcitabine typically infused over exactly 30 minutes?',
        answer: 'Prolonging the infusion time beyond 60 minutes saturates the intracellular activating enzyme (deoxycytidine kinase) and increases toxicity without increasing efficacy.'
      }
    ],
    aliases: ['Gemzar', 'Gemtaz', 'Gemyat', 'Gemcite']
  },
  {
    id: 'salt-39',
    sNo: 39,
    name: 'Goserelin acetate',
    slug: 'goserelin-acetate',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Synthetic LHRH / GnRH Receptor Agonist Depot',
    descriptionShort: 'Goserelin is a long-acting injectable LHRH agonist depot used in hormone-sensitive prostate and premenopausal ER+ breast cancers.',
    descriptionLong: 'Goserelin acetate is a synthetic decapeptide analogue of natural gonadotropin-releasing hormone (GnRH). Continuous exposure down-regulates and desensitizes pituitary GnRH receptors, stopping the pulsatile secretion of LH and FSH. This reduces serum testosterone to castrate levels in men and serum estradiol to postmenopausal levels in women.',
    mechanismOfAction: 'Down-regulates pituitary GnRH receptors upon chronic continuous stimulation, shutting down gonadal sex hormone production.',
    indications: [
      'Locally advanced and metastatic Prostate Cancer',
      'Advanced Hormone Receptor-Positive (ER+) Breast Cancer in premenopausal women',
      'Endometriosis and uterine fibroids',
      'Ovarian function suppression during adjuvant chemotherapy'
    ],
    commonStrengths: ['3.6 mg (1-month depot implant)', '10.8 mg (3-month depot implant)'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Hot flashes and sweating', 'Loss of libido and erectile dysfunction', 'Decreased bone mineral density', 'Mood changes / fatigue', 'Initial tumor flare (prostate)'],
    storageAdvice: 'Store below 25°C. Protect from light.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'How is the Goserelin implant administered?',
        answer: 'Goserelin is administered subcutaneously into the anterior abdominal wall using a specialized pre-filled syringe with a retractable safety needle.'
      }
    ],
    aliases: ['Zoladex', 'Goserel']
  },
  {
    id: 'salt-40',
    sNo: 40,
    name: 'Hydroxyurea',
    slug: 'hydroxyurea',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Ribonucleotide Reductase Inhibitor / Cytoreductive Agent',
    descriptionShort: 'Hydroxyurea is an oral cytoreductive agent used in myeloproliferative neoplasms (CML, polycythemia vera, essential thrombocythemia) and sickle cell disease.',
    descriptionLong: 'Hydroxyurea (hydroxycarbamide) is a simple hydroxylated urea derivative that selectively inhibits the enzyme ribonucleotide diphosphate reductase. By scavanging tyrosyl free radicals at the catalytic site of the enzyme, it prevents the conversion of ribonucleotides to deoxyribonucleotides, selectively inhibiting DNA synthesis without interfering with RNA or protein synthesis.',
    mechanismOfAction: 'Inhibits ribonucleotide reductase, depleting intracellular deoxyribonucleotide pools and arresting cells in the S phase of mitosis.',
    indications: [
      'Chronic Myeloid Leukemia (CML - for rapid cytoreduction)',
      'Polycythemia Vera (PV) and Essential Thrombocythemia (ET)',
      'Sickle Cell Anemia (induces fetal hemoglobin HbF production to reduce vaso-occlusive crises)',
      'Head and neck squamous cell carcinomas (radiosensitizer)'
    ],
    commonStrengths: ['500 mg'],
    dosageForms: ['Capsule'],
    commonSideEffects: ['Bone marrow suppression (leukopenia, anemia, thrombocytopenia)', 'Cutaneous leg ulcers (with long-term use)', 'Hyperpigmentation of skin and nails', 'Gastrointestinal disturbances', 'Macrocytosis'],
    storageAdvice: 'Store below 25°C in a tightly closed container.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why does Hydroxyurea cause red blood cells to become large (Macrocytosis)?',
        answer: 'Hydroxyurea impairs DNA synthesis in erythroid precursors, which delays cell division and leads to an elevated Mean Corpuscular Volume (MCV), a harmless marker of compliance.'
      }
    ],
    aliases: ['Hydrea', 'Cytodrox', 'Myelostat', 'Droxia']
  },
  {
    id: 'salt-41',
    sNo: 41,
    name: 'Ibrutinib',
    slug: 'ibrutinib',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'First-in-Class Bruton’s Tyrosine Kinase (BTK) Inhibitor',
    descriptionShort: 'Ibrutinib is a pioneering oral covalent BTK inhibitor for Chronic Lymphocytic Leukemia (CLL), Mantle Cell Lymphoma, and Waldenström Macroglobulinemia.',
    descriptionLong: 'Ibrutinib is an orally bioavailable, small-molecule inhibitor of Bruton’s tyrosine kinase (BTK). It forms a specific covalent bond with cysteine residue 481 (Cys-481) in the BTK active site, permanently inhibiting B-cell antigen receptor (BCR) signaling. This mobilizes malignant B-cells from protective lymph node niches into peripheral blood and triggers apoptosis.',
    mechanismOfAction: 'Covalently binds to Cys-481 of BTK, irreversibly inhibiting BCR signaling, chemokine-mediated cell adhesion, and migration in B-cell malignancies.',
    indications: [
      'Chronic Lymphocytic Leukemia (CLL) / Small Lymphocytic Lymphoma (SLL) with or without 17p deletion',
      'Mantle Cell Lymphoma (MCL) following at least one prior therapy',
      'Waldenström Macroglobulinemia (WM)',
      'Marginal Zone Lymphoma (MZL)',
      'Chronic Graft-versus-Host Disease (cGVHD)'
    ],
    commonStrengths: ['140 mg', '420 mg', '560 mg'],
    dosageForms: ['Capsule', 'Tablet'],
    commonSideEffects: ['Atrial fibrillation / cardiac arrhythmias', 'Bleeding / bruising (antiplatelet effect)', 'Diarrhea', 'Hypertension', 'Transient treatment-induced lymphocytosis'],
    storageAdvice: 'Store below 30°C in original container.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why do white blood cell counts spike when starting Ibrutinib?',
        answer: 'Ibrutinib displaces leukemic cells from lymph nodes and spleen into the bloodstream. This transient asymptomatic lymphocytosis is expected and does not represent disease progression.'
      },
      {
        question: 'Should Ibrutinib be paused before surgical procedures?',
        answer: 'Yes, because Ibrutinib impairs collagen-mediated platelet aggregation, it is typically withheld 3 to 7 days before and after major surgical procedures.'
      }
    ],
    aliases: ['Imbruvica', 'Ibrunat', 'Ibrutix']
  },
  {
    id: 'salt-42',
    sNo: 42,
    name: 'Imatinib mesylate',
    slug: 'imatinib-mesylate',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'First-in-Class BCR-ABL & KIT/PDGFR Tyrosine Kinase Inhibitor',
    descriptionShort: 'Imatinib is the landmark targeted tyrosine kinase inhibitor that revolutionized the treatment of Philadelphia chromosome-positive CML and GIST.',
    descriptionLong: 'Imatinib mesylate (formerly STI571) is a 2-phenylaminopyrimidine derivative that specifically occupies the ATP-binding pocket of the constitutively active BCR-ABL fusion protein kinase found in Philadelphia chromosome-positive (Ph+) Chronic Myeloid Leukemia (CML). It also potently inhibits the receptor tyrosine kinases KIT (CD117) and PDGFRA, transforming outcomes in Gastrointestinal Stromal Tumors (GIST).',
    mechanismOfAction: 'Competitively blocks the ATP-binding site of BCR-ABL, c-KIT, and PDGFR tyrosine kinases, arresting downstream oncogenic survival signaling.',
    indications: [
      'Philadelphia Chromosome-Positive Chronic Myeloid Leukemia (Ph+ CML in chronic, accelerated, or blast phase)',
      'Ph+ Acute Lymphoblastic Leukemia (Ph+ ALL)',
      'KIT (CD117)-positive unresectable or metastatic Gastrointestinal Stromal Tumors (GIST)',
      'Dermatofibrosarcoma Protuberans (DFSP)'
    ],
    commonStrengths: ['100 mg', '400 mg'],
    dosageForms: ['Tablet'],
    commonSideEffects: ['Periorbital edema / fluid retention', 'Nausea and diarrhea', 'Muscle cramps / musculoskeletal pain', 'Skin rash', 'Myelosuppression'],
    storageAdvice: 'Store at 20°C to 25°C.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'How should Imatinib tablets be taken to avoid stomach irritation?',
        answer: 'Imatinib must always be taken with a meal and a large glass of water (250 ml) to reduce the risk of gastrointestinal irritation and nausea.'
      }
    ],
    aliases: ['Gleevec', 'Glivec', 'Veenat', 'Imatib', 'Imalek']
  },
  {
    id: 'salt-43',
    sNo: 43,
    name: 'Imiquimod',
    slug: 'imiquimod',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Topical Toll-Like Receptor 7 (TLR7) Agonist / Immune Response Modifier',
    descriptionShort: 'Imiquimod is a topical immune response modifier that stimulates innate and cell-mediated immunity to treat superficial basal cell carcinoma and actinic keratosis.',
    descriptionLong: 'Imiquimod is an imidazoquinoline amine that lacks direct cytotoxic activity against tumor cells. Instead, it acts as an agonist at Toll-Like Receptor 7 (TLR7) on plasmacytoid dendritic cells and monocytes. Activation triggers massive synthesis and release of pro-inflammatory cytokines including interferon-alpha (IFN-α), TNF-α, and interleukins, mounting an immune assault that clears dysplastic and malignant cutaneous lesions.',
    mechanismOfAction: 'Agonist at TLR7, activating NF-κB and inducing secretion of IFN-alpha, IL-12, and TNF-alpha to stimulate a cytotoxic T-cell antitumor response.',
    indications: [
      'Superficial Basal Cell Carcinoma (sBCC) on the trunk, neck, or extremities in adults',
      'Actinic Keratosis (AK) on the face and scalp',
      'External genital and perianal warts (condylomata acuminata)'
    ],
    commonStrengths: ['5% cream (single-use sachets)'],
    dosageForms: ['Cream'],
    commonSideEffects: ['Local skin reactions (erythema, erosion, crusting, flaking, edema)', 'Application site burning / pruritus', 'Localized hypopigmentation or hyperpigmentation', 'Mild flu-like systemic symptoms'],
    storageAdvice: 'Store below 25°C. Do not freeze.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'How long should Imiquimod cream be left on the skin?',
        answer: 'Imiquimod cream is applied at bedtime and left on the skin for 6 to 10 hours before washing off thoroughly with mild soap and water.'
      },
      {
        question: 'Is intense redness and peeling normal during Imiquimod use?',
        answer: 'Yes, local inflammatory reactions (redness, scabbing) are a direct pharmacologic reflection of active immune system engagement against target cells.'
      }
    ],
    aliases: ['Aldara', 'Imiquad', 'Zymer']
  },
  {
    id: 'salt-44',
    sNo: 44,
    name: 'Irinotecan',
    slug: 'irinotecan',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Camptothecin Derivative / Topoisomerase I Inhibitor',
    descriptionShort: 'Irinotecan is a topoisomerase I inhibitor that serves as a cornerstone of combination chemotherapy (FOLFIRI) in metastatic colorectal cancer.',
    descriptionLong: 'Irinotecan (CPT-11) is a semi-synthetic water-soluble derivative of camptothecin. It is converted in the liver and gastrointestinal tract by carboxylesterases to its active metabolite, SN-38, which is 1000-fold more potent than irinotecan. SN-38 binds to the topoisomerase I-DNA complex, preventing DNA religation and causing replication fork collision that results in double-strand DNA cleavage and cell death.',
    mechanismOfAction: 'Active metabolite SN-38 traps the topoisomerase I-DNA cleavage complex, leading to replication fork collapse and lethal DNA double-strand breaks.',
    indications: [
      'Metastatic Colorectal Cancer (mCRC - component of FOLFIRI and FOLFIRINOX regimens)',
      'Advanced Pancreatic Adenocarcinoma',
      'Small Cell Lung Cancer (SCLC)'
    ],
    commonStrengths: ['40 mg/2 ml', '100 mg/5 ml', '500 mg/25 ml'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Acute cholinergic syndrome (diaphoresis, abdominal cramps, early diarrhea)', 'Delayed-onset severe diarrhea (life-threatening without loperamide)', 'Severe neutropenia', 'Nausea and vomiting', 'Alopecia'],
    storageAdvice: 'Store at 15°C to 30°C protected from light. Do not freeze.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'How is acute vs delayed Irinotecan diarrhea differentiated and treated?',
        answer: 'Acute diarrhea (<24 hours) is cholinergic and treated with IV atropine. Delayed diarrhea (>24 hours) is mediated by SN-38 and requires aggressive high-dose loperamide.'
      },
      {
        question: 'What genetic polymorphism affects Irinotecan toxicity?',
        answer: 'Patients homozygous for the UGT1A1*28 allele have impaired glucuronidation of SN-38 and are at heightened risk of severe neutropenia and diarrhea.'
      }
    ],
    aliases: ['Camptosar', 'Irnocam', 'Iricip', 'Oncotecan']
  },
  {
    id: 'salt-45',
    sNo: 45,
    name: 'Lapatinib',
    slug: 'lapatinib',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Dual EGFR (ErbB1) and HER2 (ErbB2) Reversible Tyrosine Kinase Inhibitor',
    descriptionShort: 'Lapatinib is an oral dual HER2/EGFR kinase inhibitor used in combination with capecitabine or letrozole for advanced HER2-positive breast cancer.',
    descriptionLong: 'Lapatinib is an orally active 4-anilinoquinazoline dual tyrosine kinase inhibitor that reversibly binds the intracellular ATP-binding domains of both EGFR (HER1) and HER2 (neu/ErbB2). By crossing the blood-brain barrier and operating inside the cell, lapatinib continues to inhibit downstream MAPK and PI3K/AKT oncogenic signaling even in tumors with truncated p95HER2 receptors that are resistant to trastuzumab.',
    mechanismOfAction: 'Inhibits receptor autophosphorylation of EGFR and HER2 intracellular tyrosine kinase domains, preventing downstream tumor proliferation and survival.',
    indications: [
      'Advanced or Metastatic HER2-Overexpressing Breast Cancer previously treated with anthracycline, taxane, and trastuzumab (combined with Capecitabine)',
      'Hormone Receptor-Positive / HER2-Positive Metastatic Breast Cancer (combined with an Aromatase Inhibitor)'
    ],
    commonStrengths: ['250 mg'],
    dosageForms: ['Tablet'],
    commonSideEffects: ['Diarrhea (frequent, dose-limiting)', 'Hand-foot syndrome (when combined with capecitabine)', 'Acneiform rash', 'Hepatotoxicity (elevated transaminases)', 'Decreased left ventricular ejection fraction (LVEF)'],
    storageAdvice: 'Store below 30°C.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Can Lapatinib cross the blood-brain barrier in HER2+ brain metastases?',
        answer: 'Yes, being a small molecule, Lapatinib penetrates into the central nervous system significantly better than large monoclonal antibodies like Trastuzumab.'
      }
    ],
    aliases: ['Tykerb', 'Lapaterox', 'Herclon-L', 'Abnib']
  },
  {
    id: 'salt-46',
    sNo: 46,
    name: 'Lenalidomide',
    slug: 'lenalidomide',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Second-Generation Immunomodulatory Drug (IMiD) / Cereblon E3 Ligase Modulator',
    descriptionShort: 'Lenalidomide is a cornerstone oral immunomodulatory agent for Multiple Myeloma, Myelodysplastic Syndrome with 5q deletion, and Mantle Cell Lymphoma.',
    descriptionLong: 'Lenalidomide is a synthetic thalidomide derivative with potent antineoplastic, anti-angiogenic, and immunomodulatory properties. It binds specifically to Cereblon (CRBN), the substrate recognition component of the CRL4-CRBN E3 ubiquitin ligase complex. This induces the selective ubiquitination and proteasomal destruction of Ikaros (IKZF1) and Aiolos (IKZF3) transcription factors, causing cytotoxic myeloma cell death and boosting T-cell / NK-cell immune activation.',
    mechanismOfAction: 'Recruits IKZF1 and IKZF3 to Cereblon E3 ubiquitin ligase for targeted degradation, downregulates IRF4 and MYC, and stimulates IL-2 production in T-cells.',
    indications: [
      'Multiple Myeloma (newly diagnosed maintenance and relapsed/refractory regimens)',
      'Myelodysplastic Syndrome (MDS) associated with a deletion 5q cytogenetic abnormality',
      'Relapsed or refractory Mantle Cell Lymphoma (MCL)',
      'Follicular and Marginal Zone Lymphomas (R-squared regimen with Rituximab)'
    ],
    commonStrengths: ['5 mg', '10 mg', '15 mg', '25 mg'],
    dosageForms: ['Capsule'],
    commonSideEffects: ['Venous Thromboembolism (DVT / Pulmonary Embolism - thromboprophylaxis required)', 'Severe Teratogenicity (black box warning)', 'Neutropenia and thrombocytopenia', 'Fatigue / muscle cramps', 'Skin rash / pruritus'],
    storageAdvice: 'Store at 20°C to 25°C.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why is blood-thinner prophylaxis required with Lenalidomide?',
        answer: 'Lenalidomide, especially when combined with dexamethasone, significantly raises blood clot risks; low-dose aspirin or low-molecular-weight heparin is mandatory.'
      },
      {
        question: 'What are the pregnancy prevention mandates for Lenalidomide?',
        answer: 'Lenalidomide is a severe human teratogen. Strict pregnancy testing and two forms of reliable contraception are required under risk management programs (REMS).'
      }
    ],
    aliases: ['Revlimid', 'Lenalid', 'Lenangio', 'Myeloma-L']
  },
  {
    id: 'salt-47',
    sNo: 47,
    name: 'Lenvatinib',
    slug: 'lenvatinib',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Multi-Targeted Receptor Tyrosine Kinase Inhibitor (VEGFR1-3, FGFR1-4, RET, KIT, PDGFRα)',
    descriptionShort: 'Lenvatinib is a multi-kinase inhibitor indicated in Differentiated Thyroid Cancer, Hepatocellular Carcinoma, and advanced Renal Cell Carcinoma.',
    descriptionLong: 'Lenvatinib is a potent oral receptor tyrosine kinase inhibitor that targets VEGFR1, VEGFR2, and VEGFR3, along with fibroblast growth factor receptors (FGFR1, FGFR2, FGFR3, and FGFR4), platelet-derived growth factor receptor alpha (PDGFRα), KIT, and RET proto-oncogenes. Its dual inhibition of both VEGF and FGF signaling pathways simultaneously shuts down tumor angiogenesis and suppresses lymphangiogenesis and tumor proliferation.',
    mechanismOfAction: 'Selectively inhibits the kinase activities of VEGFR, FGFR, PDGFRα, KIT, and RET, blocking neo-vascularization and oncogenic cell growth.',
    indications: [
      'Radioiodine-Refractory Differentiated Thyroid Cancer (DTC)',
      'Unresectable Hepatocellular Carcinoma (HCC - first-line systemic therapy)',
      'Advanced Renal Cell Carcinoma (RCC - combined with Pembrolizumab or Everolimus)',
      'Advanced Endometrial Carcinoma (combined with Pembrolizumab)'
    ],
    commonStrengths: ['4 mg', '10 mg'],
    dosageForms: ['Capsule'],
    commonSideEffects: ['Severe hypertension', 'Proteinuria and renal impairment', 'Palmar-plantar erythrodysesthesia (Hand-Foot Syndrome)', 'Diarrhea / weight loss / decreased appetite', 'Hepatotoxicity / fatigue'],
    storageAdvice: 'Store below 25°C.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'How does Lenvatinib dosing differ in liver cancer (HCC) vs thyroid cancer?',
        answer: 'In HCC, dosing is weight-based (8 mg daily for <60 kg; 12 mg daily for ≥60 kg), whereas differentiated thyroid cancer starts at a fixed dose of 24 mg once daily.'
      }
    ],
    aliases: ['Lenvima', 'Lenvenib', 'Bdlenva', 'Lenvat']
  },
  {
    id: 'salt-48',
    sNo: 48,
    name: 'Letrozole',
    slug: 'letrozole',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Potent Non-Steroidal Third-Generation Aromatase Inhibitor',
    descriptionShort: 'Letrozole is a highly selective third-generation aromatase inhibitor used in postmenopausal women with hormone receptor-positive early and metastatic breast cancer.',
    descriptionLong: 'Letrozole is a competitive, non-steroidal inhibitor of the aromatase enzyme system (cytochrome P450 19A1). By competitively binding to the heme component of the aromatase enzyme in peripheral adipose tissue, letrozole suppresses whole-body estrogen synthesis by over 98%, removing the hormonal fuel required for hormone-receptor-positive breast tumor cell growth.',
    mechanismOfAction: 'Inhibits aromatase enzyme to prevent peripheral conversion of androgens to estrogens in postmenopausal women, decreasing estrogen-driven tumor proliferation.',
    indications: [
      'Adjuvant treatment of postmenopausal women with Hormone Receptor-Positive (HR+) Early Breast Cancer',
      'Extended adjuvant treatment following 5 years of Tamoxifen',
      'First-line therapy for postmenopausal women with advanced or metastatic HR+ Breast Cancer (often with CDK4/6 inhibitors)'
    ],
    commonStrengths: ['2.5 mg'],
    dosageForms: ['Tablet'],
    commonSideEffects: ['Hot flashes and night sweats', 'Arthralgia / bone and joint aches', 'Loss of bone mineral density (osteoporosis)', 'Fatigue and hypercholesterolemia', 'Hair thinning'],
    storageAdvice: 'Store at 15°C to 30°C in a dry place.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why is Letrozole often combined with CDK4/6 inhibitors (e.g. Ribociclib, Palbociclib)?',
        answer: 'Combining Letrozole with a CDK4/6 inhibitor provides dual inhibition of estrogen signaling and cell cycle progression, more than doubling progression-free survival.'
      }
    ],
    aliases: ['Femara', 'Letroz', 'Fempro', 'Letoval']
  },
  {
    id: 'salt-49',
    sNo: 49,
    name: 'Leuprolide',
    slug: 'leuprolide',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Synthetic Nonapeptide GnRH / LHRH Superagonist Depot',
    descriptionShort: 'Leuprolide (Leuprorelin) is a GnRH agonist depot injection providing profound androgen deprivation in prostate cancer and estrogen suppression in breast cancer.',
    descriptionLong: 'Leuprolide acetate is a synthetic nonapeptide analogue of naturally occurring gonadotropin-releasing hormone (GnRH). Continuous administration leads to initial stimulation followed by profound desensitization and down-regulation of pituitary GnRH receptors, suppressing LH and FSH secretion and reducing serum testosterone/estrogen levels to castrate levels within 2 to 4 weeks.',
    mechanismOfAction: 'Continuous stimulation desensitizes pituitary GnRH receptors, halting LH/FSH release and inducing sustained medical castration.',
    indications: [
      'Palliative and definitive treatment of Advanced Hormone-Dependent Prostate Cancer',
      'Endometriosis and Uterine Leiomyomas (fibroids)',
      'Premenopausal Hormone Receptor-Positive Breast Cancer (ovarian ablation / suppression)',
      'Central Precocious Puberty'
    ],
    commonStrengths: ['3.75 mg (1-month depot)', '7.5 mg (1-month depot)', '11.25 mg (3-month depot)', '22.5 mg (3-month depot)'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Hot flashes and diaphoresis', 'Erectile dysfunction and loss of libido', 'Osteopenia / bone mineral loss', 'Fatigue / gynecomastia', 'Initial tumor flare / bone pain'],
    storageAdvice: 'Store below 25°C. Protect from light and freezing.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why is an antiandrogen prescribed during the first weeks of Leuprolide?',
        answer: 'Leuprolide causes a temporary 1-to-2 week surge in testosterone ("flare phenomenon") before castration occurs. Antiandrogens block this flare from worsening symptoms.'
      }
    ],
    aliases: ['Lupron', 'Eligard', 'Lupride', 'Prostap']
  },
  {
    id: 'salt-50',
    sNo: 50,
    name: 'Megestrol acetate',
    slug: 'megestrol-acetate',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Synthetic Progestin / Antineoplastic & Appetite Stimulant',
    descriptionShort: 'Megestrol acetate is a synthetic progestogen used for palliative treatment of breast/endometrial cancers and cancer-related anorexia-cachexia syndrome.',
    descriptionLong: 'Megestrol acetate is a synthetic derivative of naturally occurring progesterone. In breast and endometrial carcinomas, it exerts antineoplastic effects via anti-luteinizing action on the pituitary, down-regulation of estrogen receptors, and alteration of progestin-dependent gene expression. Additionally, it acts centrally on the hypothalamus to stimulate appetite and reverse cancer cachexia.',
    mechanismOfAction: 'Suppresses pituitary gonadotropins and alters estrogen receptor activity; centrally stimulates neuropeptide Y (NPY) to increase appetite and weight gain.',
    indications: [
      'Palliative treatment of advanced Breast Carcinoma and Endometrial Carcinoma',
      'Treatment of anorexia, cachexia, or unexplained significant weight loss in patients with cancer or AIDS'
    ],
    commonStrengths: ['40 mg', '160 mg tablets', '40 mg/ml oral suspension'],
    dosageForms: ['Tablet', 'Syrup'],
    commonSideEffects: ['Weight gain and increased appetite', 'Thromboembolism (DVT, PE)', 'Peripheral edema / fluid retention', 'Breakthrough menstrual bleeding', 'Secondary adrenal insufficiency on abrupt withdrawal'],
    storageAdvice: 'Store between 15°C and 30°C in a tightly closed container.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why should Megestrol acetate not be stopped abruptly?',
        answer: 'Megestrol possesses mild glucocorticoid-like activity. Abrupt discontinuation can lead to adrenal axis suppression and acute secondary adrenal insufficiency.'
      }
    ],
    aliases: ['Megace', 'Megstat', 'Endogest-M']
  },
  {
    id: 'salt-51',
    sNo: 51,
    name: 'Melphalan',
    slug: 'melphalan',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Phenylalanine Derivative Nitrogen Mustard Alkylating Agent (L-PAM)',
    descriptionShort: 'Melphalan is a classic alkylating agent essential for Multiple Myeloma conditioning before autologous stem cell transplantation (ASCT).',
    descriptionLong: 'Melphalan (L-phenylalanine mustard) is a bifunctional alkylating agent. The phenylalanine moiety facilitates active transport across cellular membranes via L-type amino acid transporters. Once inside, its bis-chloroethylamine groups alkylate the N-7 position of guanine, forming intra- and inter-strand DNA crosslinks that block replication and trigger p53-independent myeloma apoptosis.',
    mechanismOfAction: 'Forms covalent crosslinks between DNA strands at the N-7 position of guanine, blocking DNA transcription and inducing apoptosis.',
    indications: [
      'High-dose conditioning therapy for Multiple Myeloma prior to Autologous Stem Cell Transplantation (ASCT)',
      'Palliative treatment of Multiple Myeloma in non-transplant candidates',
      'Epithelial Ovarian Cancer and localized Malignant Melanoma (isolated limb perfusion)'
    ],
    commonStrengths: ['2 mg', '5 mg tablets', '50 mg vial for injection (with diluent)'],
    dosageForms: ['Injection', 'Tablet'],
    commonSideEffects: ['Profound myelosuppression (neutropenia/thrombocytopenia)', 'Severe gastrointestinal mucositis / stomatitis', 'Nausea and vomiting', 'Alopecia', 'Secondary leukemias (MDS/AML - long term)'],
    storageAdvice: 'Store tablets refrigerated at 2°C to 8°C (Cold Chain). Store unconstituted injection vials below 25°C protected from light.',
    coldStorage: 'Yes',
    faqs: [
      {
        question: 'Why are ice chips (cryotherapy) used during high-dose Melphalan infusions?',
        answer: 'Chewing ice chips before and during IV melphalan constricts oral mucosal blood vessels, reducing drug delivery to the mouth and preventing severe oral mucositis.'
      }
    ],
    aliases: ['Alkeran', 'Melfal', 'Alphalan']
  },
  {
    id: 'salt-52',
    sNo: 52,
    name: 'Mercaptopurine (6-MP)',
    slug: 'mercaptopurine-6-mp',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Thiopurine Antimetabolite / Purine Antagonist',
    descriptionShort: 'Mercaptopurine (6-MP) is an oral thiopurine antimetabolite essential for maintenance therapy in pediatric and adult Acute Lymphoblastic Leukemia (ALL).',
    descriptionLong: '6-Mercaptopurine is a prodrug converted intracellularly by hypoxanthine-guanine phosphoribosyltransferase (HGPRT) into 6-thioinosinic acid (TIMP). Active thioguanine nucleotides (TGNs) are incorporated into DNA and RNA, leading to false-base mismatch, DNA strand breaks, and inhibition of de novo purine ribonucleotide synthesis.',
    mechanismOfAction: 'Incorporates active thioguanine nucleotides into DNA/RNA and inhibits de novo purine biosynthesis, halting S-phase cellular proliferation.',
    indications: [
      'Maintenance therapy for Acute Lymphoblastic Leukemia (ALL)',
      'Acute Promyelocytic Leukemia (maintenance regimens)',
      'Inflammatory Bowel Disease (Crohn’s disease / Ulcerative colitis - off label)'
    ],
    commonStrengths: ['50 mg'],
    dosageForms: ['Tablet'],
    commonSideEffects: ['Myelosuppression (dose-limiting leukopenia/thrombocytopenia)', 'Hepatotoxicity (cholestasis / elevated transaminases)', 'Hyperuricemia', 'Nausea / anorexia', 'Pancreatitis'],
    storageAdvice: 'Store below 25°C in a dry place protected from light.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why is TPMT and NUDT15 testing critical before starting Mercaptopurine?',
        answer: 'Patients with genetic deficiencies in TPMT or NUDT15 cannot properly detoxify 6-MP, leading to toxic accumulation of TGNs and life-threatening bone marrow failure unless doses are reduced by 50–90%.'
      },
      {
        question: 'What happens if Mercaptopurine is taken with Allopurinol?',
        answer: 'Allopurinol blocks xanthine oxidase, the primary breakdown pathway of 6-MP. If combined, the 6-MP dose must be reduced to 25%–33% of the standard dose.'
      }
    ],
    aliases: ['Purinethol', '6-MP', 'Purinet', 'Emkaper']
  },
  {
    id: 'salt-53',
    sNo: 53,
    name: 'Methotrexate',
    slug: 'methotrexate',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Folate Analog Antimetabolite / Dihydrofolate Reductase (DHFR) Inhibitor',
    descriptionShort: 'Methotrexate is a pivotal antifolate antimetabolite used across leukemias, osteosarcomas, gestational trophoblastic disease, lymphoma, and severe autoimmune conditions.',
    descriptionLong: 'Methotrexate (MTX) is a folic acid structural analogue that competitively inhibits the enzyme dihydrofolate reductase (DHFR). This prevents the reduction of dihydrofolate to tetrahydrofolate, depleting the intracellular coenzyme pools required for the de novo synthesis of thymidylate and purine nucleotides necessary for DNA synthesis, repair, and cellular replication.',
    mechanismOfAction: 'Competitively inhibits DHFR, starving dividing cells of tetrahydrofolate and blocking thymidylate and purine synthesis during the S-phase.',
    indications: [
      'Acute Lymphoblastic Leukemia (ALL - systemically and intrathecally)',
      'Osteosarcoma (High-Dose Methotrexate HDMTX with Leucovorin rescue)',
      'Gestational Trophoblastic Neoplasia (Choriocarcinoma)',
      'Primary CNS Lymphoma',
      'Severe Rheumatoid Arthritis and Psoriasis (low-dose weekly)'
    ],
    commonStrengths: ['2.5 mg', '5 mg', '10 mg tablets', '50 mg/2 ml', '500 mg/20 ml', '1000 mg vials'],
    dosageForms: ['Tablet', 'Injection'],
    commonSideEffects: ['Myelosuppression', 'Severe stomatitis / mucositis', 'Nephrotoxicity (tubular crystallization at high doses)', 'Hepatotoxicity (elevated LFTs / fibrosis)', 'Pulmonary toxicity / pneumonitis'],
    storageAdvice: 'Store at 15°C to 25°C protected from light.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why is Leucovorin (Folinic Acid) Rescue mandatory after High-Dose Methotrexate?',
        answer: 'High-dose MTX kills cancer cells but also threatens normal bone marrow and GI lining. Leucovorin bypasses DHFR inhibition, selectively rescuing healthy tissues.'
      },
      {
        question: 'Why is urine alkalinization (pH > 7.0) necessary during HDMTX infusions?',
        answer: 'Methotrexate and its metabolite precipitate in acidic urine, causing acute renal tubular obstruction. Sodium bicarbonate keeps urine alkaline and soluble.'
      }
    ],
    aliases: ['Trexall', 'Neotrexate', 'Folitrax', 'Mexate']
  },
  {
    id: 'salt-54',
    sNo: 54,
    name: 'Mitomycin C',
    slug: 'mitomycin-c',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Pyrroloindole Antitumor Antibiotic / Bioreductive Alkylating Agent',
    descriptionShort: 'Mitomycin C is a potent antitumor antibiotic used in intravesical bladder cancer, anal cancer (Nigro protocol), and ophthalmic trabeculectomy.',
    descriptionLong: 'Mitomycin C is an antineoplastic antibiotic isolated from Streptomyces caespitosus. It functions as a bioreductive prodrug, requiring intracellular enzymatic reduction of its quinone ring to generate an active bifunctional and trifunctional alkylating species that crosslinks complementary DNA strands, particularly at guanine and cytosine residues, inhibiting DNA synthesis.',
    mechanismOfAction: 'Bioreductive activation generates active alkylating moieties that form covalent crosslinks with DNA, inhibiting DNA replication in hypoxic and normoxic cells.',
    indications: [
      'Superficial Bladder Cancer (post-TURBT intravesical instillation)',
      'Squamous Cell Carcinoma of the Anal Canal (Nigro chemoradiation protocol)',
      'Gastric and Pancreatic Adenocarcinomas (in combination regimens)',
      'Ophthalmic glaucoma filtration surgery (trabeculectomy antifibrotic)'
    ],
    commonStrengths: ['2 mg', '10 mg', '40 mg vials'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Delayed and cumulative myelosuppression (prolonged thrombocytopenia)', 'Hemolytic Uremic Syndrome (HUS / thrombotic microangiopathy)', 'Chemical cystitis (intravesical use)', 'Severe vesicant necrosis if extravasated', 'Interstitial pneumonitis'],
    storageAdvice: 'Store below 25°C protected from light.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why is Mitomycin C bone marrow suppression unique?',
        answer: 'Unlike many cytotoxics that cause nadirs at day 10–14, Mitomycin C causes delayed and cumulative myelosuppression that peaks 4 to 6 weeks after administration.'
      }
    ],
    aliases: ['Mutamycin', 'Mitocin', 'Mitozytrex']
  },
  {
    id: 'salt-55',
    sNo: 55,
    name: 'Nilotinib',
    slug: 'nilotinib',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Second-Generation BCR-ABL Tyrosine Kinase Inhibitor',
    descriptionShort: 'Nilotinib is a second-generation oral BCR-ABL kinase inhibitor with 30-fold higher potency than imatinib for Ph+ Chronic Myeloid Leukemia.',
    descriptionLong: 'Nilotinib is a rationally designed derivative of imatinib engineered for high-affinity conformational fitting into the inactive kinase domain of BCR-ABL. It exhibits 20- to 50-fold greater inhibitory potency than imatinib and overcomes 32 of 33 known imatinib-resistant BCR-ABL kinase domain mutations (except T315I).',
    mechanismOfAction: 'Selectively binds the ATP-binding site of BCR-ABL kinase in its inactive conformation, shutting down downstream leukemogenic signaling pathways.',
    indications: [
      'Newly diagnosed adult patients with Philadelphia Chromosome-Positive Chronic Myeloid Leukemia in chronic phase (Ph+ CML-CP)',
      'Chronic Phase and Accelerated Phase Ph+ CML in patients resistant or intolerant to prior therapy including Imatinib'
    ],
    commonStrengths: ['150 mg', '200 mg'],
    dosageForms: ['Capsule'],
    commonSideEffects: ['QTc interval prolongation (black box warning)', 'Arterial occlusive events (peripheral artery disease, coronary events)', 'Hyperglycemia and hypercholesterolemia', 'Elevated lipase / pancreatitis', 'Rash and headache'],
    storageAdvice: 'Store at 20°C to 25°C in original packaging.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why is Nilotinib strictly taken on an empty stomach?',
        answer: 'Food significantly increases the bioavailability of Nilotinib, which can precipitate dangerous cardiac QTc prolongation. Fast 2 hours before and 1 hour after dosing.'
      },
      {
        question: 'What cardiac monitoring is required during Nilotinib therapy?',
        answer: 'Baseline and periodic ECGs are required to monitor QTc interval prolongation, alongside routine vascular checkups for peripheral vascular disease.'
      }
    ],
    aliases: ['Tasigna', 'Nilotin', 'Nilong']
  },
  {
    id: 'salt-56',
    sNo: 56,
    name: 'Nintedanib',
    slug: 'nintedanib',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Triple Angiokinase Inhibitor (VEGFR1-3, FGFR1-3, PDGFRα/β)',
    descriptionShort: 'Nintedanib is an oral triple angiokinase inhibitor approved for Idiopathic Pulmonary Fibrosis (IPF) and second-line Non-Small Cell Lung Cancer.',
    descriptionLong: 'Nintedanib is an indolinone derivative that simultaneously blocks vascular endothelial growth factor receptors (VEGFR1–3), platelet-derived growth factor receptors (PDGFRα and β), and fibroblast growth factor receptors (FGFR1–3). In oncology, it inhibits tumor angiogenesis and vascular remodeling; in pulmonary medicine, it halts progressive lung fibroproliferation and slows decline in forced vital capacity (FVC).',
    mechanismOfAction: 'Competitively binds to the ATP-binding pocket of VEGFR, PDGFR, and FGFR kinase domains, blocking pro-angiogenic and pro-fibrotic signaling cascades.',
    indications: [
      'Advanced Non-Small Cell Lung Cancer (NSCLC) of adenocarcinoma histology in combination with Docetaxel following first-line chemotherapy',
      'Idiopathic Pulmonary Fibrosis (IPF)',
      'Systemic Sclerosis-Associated Interstitial Lung Disease (SSc-ILD)'
    ],
    commonStrengths: ['100 mg', '150 mg'],
    dosageForms: ['Capsule'],
    commonSideEffects: ['Diarrhea (very common, manageable with loperamide)', 'Nausea and vomiting', 'Elevated liver enzymes (ALT/AST/bilirubin)', 'Decreased appetite and weight loss', 'Bleeding events / arterial thromboembolism'],
    storageAdvice: 'Store below 25°C in original blister pack protected from moisture.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'How should Nintedanib capsules be taken?',
        answer: 'Nintedanib capsules must be swallowed whole with water with food. They must never be opened or crushed due to a bitter taste and potential mucosal irritation.'
      }
    ],
    aliases: ['Ofev', 'Vargatef', 'Nindanib', 'Nintena']
  },
  {
    id: 'salt-57',
    sNo: 57,
    name: 'Octreotide',
    slug: 'octreotide',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Synthetic Somatostatin Octapeptide Analog',
    descriptionShort: 'Octreotide is a synthetic somatostatin analogue that suppresses hormonal hypersecretion in Neuroendocrine Tumors (NETs, Carcinoid) and Acromegaly.',
    descriptionLong: 'Octreotide is a synthetic cyclic octapeptide pharmacologically mirroring natural somatostatin but with a markedly prolonged elimination half-life (~90–120 minutes vs 2 minutes for native somatostatin). It binds with high affinity to somatostatin receptors 2 and 5 (SSTR2, SSTR5), powerfully inhibiting the hypersecretion of growth hormone, serotonin, gastrin, insulin, glucagon, and VIP, and stabilizing neuroendocrine tumor growth.',
    mechanismOfAction: 'High-affinity agonist at somatostatin SSTR2 and SSTR5 receptors, suppressing gastrointestinal and pituitary hormone secretion and tumor growth.',
    indications: [
      'Symptomatic control and tumor stabilization in metastatic Carcinoid Tumors (flushing and diarrhea of Carcinoid Syndrome)',
      'Vasoactive Intestinal Peptide-secreting tumors (VIPomas)',
      'Acromegaly (in patients who cannot undergo surgery/radiotherapy)',
      'Acute management of bleeding gastroesophageal varices in portal hypertension'
    ],
    commonStrengths: ['0.05 mg/ml', '0.1 mg/ml', '0.5 mg/ml (SC/IV)', '10 mg', '20 mg', '30 mg depot (Sandostatin LAR)'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Biliary sludge and gallstone formation (cholelithiasis)', 'Gastrointestinal cramps / diarrhea / steatorrhea', 'Sinus bradycardia / conduction abnormalities', 'Hyperglycemia or hypoglycemia (altered insulin balance)', 'Injection site pain'],
    storageAdvice: 'Store refrigerated at 2°C to 8°C (Cold Chain). Protect from light.',
    coldStorage: 'Yes',
    faqs: [
      {
        question: 'Why are regular gallbladder ultrasound exams recommended on long-term Octreotide?',
        answer: 'Octreotide inhibits gallbladder contractility and decreases bile flow, predisposing up to 50% of long-term users to gallstone and biliary sludge development.'
      }
    ],
    aliases: ['Sandostatin', 'Sandostatin LAR', 'Octride', 'Octoride']
  },
  {
    id: 'salt-58',
    sNo: 58,
    name: 'Oxaliplatin',
    slug: 'oxaliplatin',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Third-Generation Organoplatinum (Diaminocyclohexane / DACH Platinum)',
    descriptionShort: 'Oxaliplatin is a third-generation platinum antineoplastic forming the core of adjuvant and metastatic colorectal cancer regimens (FOLFOX).',
    descriptionLong: 'Oxaliplatin features a 1,2-diaminocyclohexane (DACH) carrier ligand that imparts distinct pharmacological properties compared to cisplatin and carboplatin. The bulky DACH-platinum-DNA adducts effectively prevent DNA mismatch repair protein binding and overcome typical cisplatin resistance, making it uniquely efficacious against colorectal adenocarcinomas.',
    mechanismOfAction: 'Forms intra- and inter-strand Pt-DNA crosslinks containing a bulky DACH ring that obstructs DNA replication and transcription and resists standard repair.',
    indications: [
      'Adjuvant treatment of Stage III Colorectal Cancer following complete resection (FOLFOX / CAPOX)',
      'Metastatic Colorectal Cancer (mCRC)',
      'Advanced Gastric, Esophageal, and Pancreatic (FOLFIRINOX) Adenocarcinomas'
    ],
    commonStrengths: ['50 mg/10 ml', '100 mg/20 ml', '150 mg/30 ml'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Acute cold-induced peripheral sensory neuropathy (pharyngolaryngeal dysesthesia)', 'Chronic cumulative sensory neuropathy (stocking-glove numbness)', 'Neutropenia and thrombocytopenia', 'Nausea and diarrhea', 'Hypersensitivity reactions (after multiple cycles)'],
    storageAdvice: 'Store at 20°C to 25°C. Protect from light. Do not freeze. NEVER DILUTE IN CHLORIDE-CONTAINING (saline) SOLUTIONS.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why must patients avoid cold drinks and cold air during Oxaliplatin treatment?',
        answer: 'Oxaliplatin causes acute cold-triggered dysesthesia (throat spasm sensation, perioral tingling). Patients must avoid ice, cold beverages, and cold exposure for 48 hours post-infusion.'
      },
      {
        question: 'Why is Oxaliplatin only diluted in 5% Dextrose and NEVER in Normal Saline?',
        answer: 'Chloride ions in normal saline rapidly degrade oxaliplatin into toxic, inactive decomposition products. It must strictly be diluted in 5% Dextrose (D5W).'
      }
    ],
    aliases: ['Eloxatin', 'Oxitan', 'Oplat', 'Dacotin']
  },
  {
    id: 'salt-59',
    sNo: 59,
    name: 'Paclitaxel',
    slug: 'paclitaxel',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Natural Taxane Diterpenoid / Microtubule Polymerization Stabilizer',
    descriptionShort: 'Paclitaxel is a natural taxoid antineoplastic used in breast, ovarian, non-small cell lung, Kaposi sarcoma, and pancreatic cancers.',
    descriptionLong: 'Paclitaxel was originally extracted from the Pacific yew tree (Taxus brevifolia). It targets beta-tubulin subunits, promoting the assembly of microtubules from tubulin dimers and hyper-stabilizing their structure against depolymerization. This prevents normal spindle organization during mitosis, arresting the cell cycle in G2/M and inducing apoptosis.',
    mechanismOfAction: 'Hyper-stabilizes microtubule polymers and prevents disassembly, blocking dynamic mitotic spindle reorganization and arresting cell division in G2/M.',
    indications: [
      'Ovarian Carcinoma (first-line with Carboplatin)',
      'Breast Cancer (adjuvant sequential therapy and metastatic disease)',
      'Advanced Non-Small Cell Lung Cancer (NSCLC)',
      'AIDS-Related Kaposi Sarcoma',
      'Pancreatic Adenocarcinoma (nab-paclitaxel formulation)'
    ],
    commonStrengths: ['30 mg/5 ml', '100 mg/16.7 ml', '260 mg/43.3 ml', '300 mg/50 ml'],
    dosageForms: ['Injection'],
    commonSideEffects: ['Hypersensitivity reactions (due to polyoxyl 35 castor oil vehicle Cremophor EL)', 'Peripheral sensory neuropathy (glove-and-stocking)', 'Myelosuppression (severe neutropenia)', 'Complete alopecia', 'Myalgia and arthralgia'],
    storageAdvice: 'Store at 20°C to 25°C protected from light. Use non-PVC administration sets and in-line 0.22 micron filters.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why is strict premedication necessary before conventional Paclitaxel infusions?',
        answer: 'To prevent severe anaphylactoid hypersensitivity reactions caused by the Cremophor EL solvent, patients receive Dexamethasone, Diphenhydramine, and an H2-blocker.'
      },
      {
        question: 'Why must non-PVC tubing be used for Paclitaxel administration?',
        answer: 'The surfactant vehicle (Cremophor EL) leaches toxic plasticizers (DEHP) from standard PVC bags and tubing. Polyethylene-lined or polyolefin sets must be used.'
      }
    ],
    aliases: ['Taxol', 'Paclitec', 'Mitotax', 'Paclicad', 'Abraxane (nab-paclitaxel)']
  },
  {
    id: 'salt-60',
    sNo: 60,
    name: 'Pazopanib',
    slug: 'pazopanib',
    category: 'Direct oncology / antineoplastic',
    drugClass: 'Multi-Targeted Receptor Tyrosine Kinase Inhibitor (VEGFR1-3, PDGFRα/β, c-KIT)',
    descriptionShort: 'Pazopanib is an oral multi-kinase inhibitor approved for advanced Renal Cell Carcinoma and advanced Soft Tissue Sarcoma.',
    descriptionLong: 'Pazopanib is a potent oral second-generation receptor tyrosine kinase inhibitor that targets VEGFR1, VEGFR2, VEGFR3, PDGFRα, PDGFRβ, and the stem cell factor receptor (c-KIT). By shutting down these intertwined signaling networks, pazopanib halts vascular endothelial proliferation, cuts off tumor angiogenesis, and delays disease progression in solid renal and sarcoma tumors.',
    mechanismOfAction: 'Competitively inhibits the intracellular kinase domain of VEGFR, PDGFR, and c-KIT receptors, inhibiting angiogenesis and tumor cell growth.',
    indications: [
      'Advanced / Metastatic Renal Cell Carcinoma (first-line or post-cytokine therapy)',
      'Advanced Soft Tissue Sarcoma (STS) in patients who received prior anthracycline chemotherapy'
    ],
    commonStrengths: ['200 mg', '400 mg'],
    dosageForms: ['Tablet'],
    commonSideEffects: ['Hepatotoxicity / elevated liver enzymes (ALT/AST/bilirubin - black box warning)', 'Hypertension', 'Hair color depigmentation (hair lightening)', 'Diarrhea and nausea', 'Fatigue / weight loss'],
    storageAdvice: 'Store at 20°C to 25°C.',
    coldStorage: 'No',
    faqs: [
      {
        question: 'Why does Pazopanib cause hair color lightening (depigmentation)?',
        answer: 'Pazopanib inhibits c-KIT receptor tyrosine kinases, which regulate melanocyte pigmentation, resulting in reversible lightening of hair and skin color.'
      },
      {
        question: 'Should Pazopanib be taken with or without food?',
        answer: 'Pazopanib must be taken without food on an empty stomach (1 hour before or 2 hours after a meal) to maintain safe, consistent drug absorption.'
      }
    ],
    aliases: ['Votrient', 'Pazopad', 'Pazonib']
  }
];
