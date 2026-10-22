import { PrismaClient } from '@prisma/client';
import crypto from 'node:crypto';

const prisma = new PrismaClient();

function hashPasswordSync(password: string): string {
  const salt = crypto.randomBytes(16);
  const derivedKey = crypto.scryptSync(password, salt, 64, {
    N: 16384,
    r: 8,
    p: 1,
    maxmem: 32 * 1024 * 1024,
  });
  return `${salt.toString('hex')}:${derivedKey.toString('hex')}`;
}

async function main() {
  console.info('Seeding CareNavigator relational database with clinical fixtures (isSeedFixture: true)...');

  const defaultPasswordHash = hashPasswordSync('Password123!');

  // 1. Seed Users (Patient, Clinician Reviewer, CMO Admin)
  const patientUser = await prisma.user.upsert({
    where: { email: 'sarah.jenkins@carenavigator.example' },
    update: { passwordHash: defaultPasswordHash },
    create: {
      id: 'user-patient-sarah-jenkins',
      email: 'sarah.jenkins@carenavigator.example',
      name: 'Sarah Jenkins',
      role: 'PATIENT',
      mrn: '#CN-84920',
      title: 'Verified Patient',
      passwordHash: defaultPasswordHash,
      isSeedFixture: true,
    },
  });

  const clinicianUser = await prisma.user.upsert({
    where: { email: 'aris.thorne@carenavigator.example' },
    update: { passwordHash: defaultPasswordHash },
    create: {
      id: 'user-clinician-aris-thorne',
      email: 'aris.thorne@carenavigator.example',
      name: 'Dr. Aris Thorne, MD',
      role: 'CLINICIAN',
      mrn: 'NPI-1841290441',
      title: 'Attending Physician',
      specialty: 'Internal Medicine & Pulmonology',
      npiNumber: '1841290441',
      passwordHash: defaultPasswordHash,
      isSeedFixture: true,
    },
  });

  const adminUser = await prisma.user.upsert({
    where: { email: 'clara.vance@carenavigator.example' },
    update: { passwordHash: defaultPasswordHash },
    create: {
      id: 'user-admin-clara-vance',
      email: 'clara.vance@carenavigator.example',
      name: 'Dr. Clara Vance, MD',
      role: 'ADMIN',
      mrn: 'CMO-001',
      title: 'Chief Medical Officer',
      specialty: 'Clinical Operations & Governance',
      npiNumber: '1922048810',
      passwordHash: defaultPasswordHash,
      isSeedFixture: true,
    },
  });

  // 2. Seed Patient Profile
  const patientProfile = await prisma.patientProfile.upsert({
    where: { userId: patientUser.id },
    update: {},
    create: {
      id: 'profile-sarah-jenkins',
      userId: patientUser.id,
      dateOfBirth: '1986-04-12',
      age: 38,
      sex: 'Female',
      bloodType: 'O+',
      primaryCarePhysician: 'Dr. Aris Thorne, MD',
      insuranceProvider: 'BlueCross BlueShield PPO',
      insuranceMemberId: 'BCBS-9940218-A',
      emergencyContactName: 'David Jenkins (Spouse)',
      emergencyContactPhone: '(415) 890-4412',
      isSeedFixture: true,
    },
  });

  // 3. Seed Vital Signs, Conditions, Medications, Allergies
  await prisma.vitalSign.deleteMany({ where: { patientProfileId: patientProfile.id, isSeedFixture: true } });
  await prisma.vitalSign.create({
    data: {
      patientProfileId: patientProfile.id,
      bloodPressure: '118/76',
      heartRateBpm: 68,
      spO2Percent: 99,
      weightLbs: 142,
      temperatureF: 98.4,
      isSeedFixture: true,
    },
  });

  await prisma.medicalCondition.deleteMany({ where: { patientProfileId: patientProfile.id, isSeedFixture: true } });
  await prisma.medicalCondition.createMany({
    data: [
      {
        patientProfileId: patientProfile.id,
        name: 'Bronchial Asthma (Mild Persistent)',
        status: 'ACTIVE',
        severity: 'MILD',
        diagnosedDate: '2018-09-14',
        notes: 'Triggered by cold air and seasonal allergens.',
        isSeedFixture: true,
      },
      {
        patientProfileId: patientProfile.id,
        name: 'Type 2 Diabetes Mellitus',
        status: 'CONTROLLED',
        severity: 'MODERATE',
        diagnosedDate: '2022-03-10',
        notes: 'Well-controlled on oral Metformin; HbA1c 6.4%.',
        isSeedFixture: true,
      },
      {
        patientProfileId: patientProfile.id,
        name: 'Episodic Migraine with Visual Aura',
        status: 'ACTIVE',
        severity: 'MODERATE',
        diagnosedDate: '2020-11-02',
        notes: 'Managed with PRN triptan therapy.',
        isSeedFixture: true,
      },
    ],
  });

  await prisma.medication.deleteMany({ where: { patientProfileId: patientProfile.id, isSeedFixture: true } });
  await prisma.medication.createMany({
    data: [
      {
        patientProfileId: patientProfile.id,
        name: 'Albuterol Sulfate HFA Inhaler',
        dosage: '90 mcg/actuation',
        frequency: '2 puffs q4-6h PRN',
        prescribedBy: 'Dr. Aris Thorne, MD',
        status: 'PRN',
        isSeedFixture: true,
      },
      {
        patientProfileId: patientProfile.id,
        name: 'Metformin HCl',
        dosage: '500 mg',
        frequency: 'Twice Daily (BID) with meals',
        prescribedBy: 'Dr. Aris Thorne, MD',
        status: 'ACTIVE',
        isSeedFixture: true,
      },
      {
        patientProfileId: patientProfile.id,
        name: 'Lisinopril',
        dosage: '10 mg',
        frequency: 'Once Daily (QD)',
        prescribedBy: 'Dr. Aris Thorne, MD',
        status: 'ACTIVE',
        isSeedFixture: true,
      },
    ],
  });

  // Seed Prescriptions (Explicit Rx Model)
  await prisma.prescription.deleteMany({ where: { patientProfileId: patientProfile.id, isSeedFixture: true } });
  await prisma.prescription.createMany({
    data: [
      {
        patientProfileId: patientProfile.id,
        rxNumber: 'RX-99410-ALB',
        medicationName: 'Albuterol Sulfate Inhalation Aerosol',
        dosage: '90 mcg/actuation (8.5g canister)',
        frequency: 'Inhale 1 to 2 puffs every 4 to 6 hours as needed for bronchospasm',
        instructions: 'Rinse mouth after use. Keep rescue inhaler accessible at all times.',
        prescriberName: 'Dr. Aris Thorne, MD',
        pharmacyName: 'Walgreens Pharmacy #04412 (San Francisco, CA)',
        refillsRemaining: 3,
        status: 'ACTIVE',
        expiresAt: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000),
        isSeedFixture: true,
      },
      {
        patientProfileId: patientProfile.id,
        rxNumber: 'RX-88421-MET',
        medicationName: 'Metformin Hydrochloride Tablets USP',
        dosage: '500 mg oral tablet',
        frequency: 'Take 1 tablet twice daily with morning and evening meals',
        instructions: 'Do not crush or chew. Take with meals to reduce gastrointestinal upset.',
        prescriberName: 'Dr. Aris Thorne, MD',
        pharmacyName: 'Walgreens Pharmacy #04412 (San Francisco, CA)',
        refillsRemaining: 2,
        status: 'ACTIVE',
        expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
        isSeedFixture: true,
      },
      {
        patientProfileId: patientProfile.id,
        rxNumber: 'RX-77319-LIS',
        medicationName: 'Lisinopril Tablets USP',
        dosage: '10 mg oral tablet',
        frequency: 'Take 1 tablet by mouth daily in the morning',
        instructions: 'Monitor blood pressure weekly. Notify doctor if persistent dry cough develops.',
        prescriberName: 'Dr. Aris Thorne, MD',
        pharmacyName: 'CVS Pharmacy #09124 (San Francisco, CA)',
        refillsRemaining: 1,
        status: 'ACTIVE',
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        isSeedFixture: true,
      },
    ],
  });

  await prisma.allergy.deleteMany({ where: { patientProfileId: patientProfile.id, isSeedFixture: true } });
  await prisma.allergy.createMany({
    data: [
      {
        patientProfileId: patientProfile.id,
        substance: 'Penicillin / Beta-Lactams',
        reaction: 'Acute Urticaria & Airway Angioedema',
        severity: 'ANAPHYLAXIS',
        isSeedFixture: true,
      },
      {
        patientProfileId: patientProfile.id,
        substance: 'Sulfonamide Antibiotics',
        reaction: 'Maculopapular Rash',
        severity: 'MODERATE',
        isSeedFixture: true,
      },
    ],
  });

  // Seed Test Reports (Explicit TestReport Model)
  await prisma.testReport.deleteMany({ where: { patientProfileId: patientProfile.id, isSeedFixture: true } });
  await prisma.testReport.createMany({
    data: [
      {
        patientProfileId: patientProfile.id,
        testName: 'Comprehensive Metabolic Panel (CMP-14)',
        panelCategory: 'BIOCHEMISTRY',
        specimenType: 'Venous Blood Serum',
        orderingProvider: 'Dr. Aris Thorne, MD',
        performingLab: 'Quest Diagnostics Regional Clinical Lab',
        collectedAt: new Date('2024-10-10T08:30:00Z'),
        reportedAt: new Date('2024-10-10T14:45:00Z'),
        overallResult: 'NORMAL',
        clinicalSummary: 'All 14 metabolic parameters including renal function, electrolytes, and hepatic enzymes are within normal reference limits.',
        pdfStorageKey: 'seed-fixture/Comprehensive_Metabolic_Panel_Oct2026.pdf',
        isSeedFixture: true,
      },
      {
        patientProfileId: patientProfile.id,
        testName: '12-Lead Standard Resting Electrocardiogram (ECG)',
        panelCategory: 'CARDIOLOGY',
        specimenType: 'Non-Invasive Diagnostic Tracing',
        orderingProvider: 'Dr. Aris Thorne, MD',
        performingLab: 'UCSF Ambulatory Cardiology Clinic',
        collectedAt: new Date('2024-09-18T10:15:00Z'),
        reportedAt: new Date('2024-09-18T10:30:00Z'),
        overallResult: 'NORMAL',
        clinicalSummary: 'Normal sinus rhythm at 68 bpm. PR interval 156ms, QRS duration 88ms, QTc 418ms. No ST-T wave abnormalities or ischemic changes.',
        pdfStorageKey: 'seed-fixture/12_Lead_Resting_ECG_Sep2024.pdf',
        isSeedFixture: true,
      },
    ],
  });

  // 4. Seed Clinical Guidelines Corpus (Grounded RAG Citations)
  const ginaGuideline = await prisma.clinicalGuideline.upsert({
    where: { code: 'GINA-2025-ASTHMA' },
    update: {
      status: 'ACTIVE',
      version: '2025.1',
      sourceUrl: 'https://ginasthma.org/reports/2025-update',
    },
    create: {
      id: 'guideline-gina-2025',
      code: 'GINA-2025-ASTHMA',
      title: 'GINA Global Strategy for Asthma Management and Prevention (2025 Update)',
      organization: 'Global Initiative for Asthma (GINA)',
      publisher: 'Global Initiative for Asthma Science Committee',
      version: '2025.1',
      status: 'ACTIVE',
      publicationYear: 2025,
      publicationDate: '2025-01-15',
      reviewDate: '2025-06-01',
      specialty: 'Pulmonology & Respiratory Medicine',
      summary:
        'Recommends same-day or <24h clinical evaluation for patients presenting with acute exertional wheezing, chest tightness, and suboptimal response to SABA reliever therapy.',
      keyRecommendations:
        'Assess PEF/FEV1, pulse oximetry, and frequency of SABA use; initiate short-course ICS/formoterol or oral corticosteroids if moderate exacerbation is confirmed.',
      sourceReference: 'GINA Scientific Committee, Section 4: Management of Worsening Asthma & Exacerbations, pp. 94–112.',
      sourceUrl: 'https://ginasthma.org/reports/2025-update',
      keywords: 'asthma,wheezing,chest tightness,dyspnea,bronchospasm,albuterol,saba,inhaler',
      isSeedFixture: true,
    },
  });

  // Seed chunks for GINA
  await prisma.guidelineChunk.deleteMany({ where: { guidelineId: ginaGuideline.id } });
  const ginaChunk1 = await prisma.guidelineChunk.create({
    data: {
      id: 'chunk-gina-2025-1',
      guidelineId: ginaGuideline.id,
      chunkIndex: 0,
      sectionTitle: 'Acuity Stratification for Exacerbations in Adults',
      sectionNumber: '4.2',
      pageNumber: 96,
      passageText:
        'Adult patients presenting with acute breathlessness, audible wheezing, or nocturnal cough requiring more than 2 SABA puffs within 24 hours should undergo formal acuity stratification. Inability to complete a full sentence in a single breath or persistent tachycardia (>100 bpm) indicates moderate-to-severe airflow obstruction requiring prompt medical evaluation within 24 hours.',
      keywordsJson: JSON.stringify(['asthma', 'wheezing', 'saba', 'breathlessness', 'tachycardia']),
      tokenCount: 68,
    },
  });
  await prisma.guidelineChunk.create({
    data: {
      id: 'chunk-gina-2025-2',
      guidelineId: ginaGuideline.id,
      chunkIndex: 1,
      sectionTitle: 'Failure of Rapid-Acting Bronchodilator Response',
      sectionNumber: '4.4',
      pageNumber: 102,
      passageText:
        'When short-acting beta2-agonist (albuterol/salbutamol) therapy yields only transient or partial relief lasting less than 2 hours, clinicians should not advise repeated unmonitored home inhaler escalation. Same-day clinical assessment or urgent ambulatory review is recommended to initiate systemic corticosteroid burst or anti-inflammatory reliever therapy.',
      keywordsJson: JSON.stringify(['bronchodilator', 'albuterol', 'corticosteroid', 'exacerbation']),
      tokenCount: 65,
    },
  });

  const acpGuideline = await prisma.clinicalGuideline.upsert({
    where: { code: 'ACP-2024-CHEST-PAIN' },
    update: {
      status: 'ACTIVE',
      version: '2024.2',
      sourceUrl: 'https://www.acponline.org/clinical-information/guidelines/chest-pain',
    },
    create: {
      id: 'guideline-acp-2024',
      code: 'ACP-2024-CHEST-PAIN',
      title: 'ACP / AHA Clinical Practice Guideline: Evaluation of Acute Non-Traumatic Chest Discomfort',
      organization: 'American College of Physicians (ACP) & AHA',
      publisher: 'American College of Physicians',
      version: '2024.2',
      status: 'ACTIVE',
      publicationYear: 2024,
      publicationDate: '2024-04-10',
      reviewDate: '2024-10-15',
      specialty: 'Internal Medicine & Cardiology',
      summary:
        'Stratifies acute substernal or pleuritic chest discomfort by age, cardiopulmonary history, and absence/presence of ischemic red flags (radiation, diaphoresis, syncope).',
      keyRecommendations:
        'Perform 12-lead ECG within 10 minutes of in-person presentation to exclude acute coronary ischemia prior to attributing symptoms solely to bronchospasm.',
      sourceReference: 'Annals of Internal Medicine / Circulation Joint Clinical Guideline, Vol. 177, Issue 4, pp. 412–430.',
      sourceUrl: 'https://www.acponline.org/clinical-information/guidelines/chest-pain',
      keywords: 'chest pain,chest pressure,pleuritic,ecg,cardiology,dyspnea,ischemia,angina',
      isSeedFixture: true,
    },
  });

  // Seed chunks for ACP
  await prisma.guidelineChunk.deleteMany({ where: { guidelineId: acpGuideline.id } });
  const acpChunk1 = await prisma.guidelineChunk.create({
    data: {
      id: 'chunk-acp-2024-1',
      guidelineId: acpGuideline.id,
      chunkIndex: 0,
      sectionTitle: 'Ischemic Red Flags & Mandatory Emergency Triage',
      sectionNumber: '2.1',
      pageNumber: 415,
      passageText:
        'Any acute or accelerating substernal chest discomfort accompanied by radiation to the left arm, jaw, or neck, or associated with unexplained diaphoresis, nausea, or syncope, mandates immediate emergency services dispatch (911/EMS). Telehealth triage systems must never downgrade these symptoms to routine or next-day care.',
      keywordsJson: JSON.stringify(['chest pain', 'radiation', 'diaphoresis', 'emergency', 'ischemia']),
      tokenCount: 62,
    },
  });
  await prisma.guidelineChunk.create({
    data: {
      id: 'chunk-acp-2024-2',
      guidelineId: acpGuideline.id,
      chunkIndex: 1,
      sectionTitle: 'Atypical Presentations & Differential Exclusion',
      sectionNumber: '3.3',
      pageNumber: 422,
      passageText:
        'In adults presenting with atypical or pleuritic chest tightness alongside mild exertional dyspnea, clinicians must perform a resting 12-lead ECG and targeted cardiovascular examination within 24 to 48 hours to rule out pericarditis, pulmonary embolism, or latent ischemic heart disease prior to managing purely as musculoskeletal pain.',
      keywordsJson: JSON.stringify(['pleuritic', 'ecg', 'dyspnea', 'cardiovascular', 'atypical']),
      tokenCount: 64,
    },
  });

  const niceGuideline = await prisma.clinicalGuideline.upsert({
    where: { code: 'NICE-NG191-RESP' },
    update: {
      status: 'ACTIVE',
      version: '2024.1',
      sourceUrl: 'https://www.nice.org.uk/guidance/ng191',
    },
    create: {
      id: 'guideline-nice-ng191',
      code: 'NICE-NG191-RESP',
      title: 'NICE Guideline NG191: Acute Respiratory Tract & Lower Airway Assessment in Adults',
      organization: 'National Institute for Health and Care Excellence (NICE)',
      publisher: 'National Institute for Health and Care Excellence',
      version: '2024.1',
      status: 'ACTIVE',
      publicationYear: 2024,
      publicationDate: '2024-03-20',
      reviewDate: '2024-09-01',
      specialty: 'Pulmonology & Urgent Care',
      summary:
        'Defines resting SpO2 thresholds (<94% or drop >=3% on exertion) and respiratory rate criteria requiring urgent in-person auscultation.',
      keyRecommendations:
        'Evaluate for infective vs. reactive airway triggers; escalate immediately to emergency care if patient exhibits inability to complete full sentences or resting hypoxia.',
      sourceReference: 'NICE Clinical Guideline NG191, Section 2.3: Acuity Stratification.',
      sourceUrl: 'https://www.nice.org.uk/guidance/ng191',
      keywords: 'respiratory,cough,shortness of breath,spo2,auscultation,urgent care,fever,hypoxia',
      isSeedFixture: true,
    },
  });

  // Seed chunks for NICE
  await prisma.guidelineChunk.deleteMany({ where: { guidelineId: niceGuideline.id } });
  const niceChunk1 = await prisma.guidelineChunk.create({
    data: {
      id: 'chunk-nice-ng191-1',
      guidelineId: niceGuideline.id,
      chunkIndex: 0,
      sectionTitle: 'Pulse Oximetry Thresholds & Hypoxia Identification',
      sectionNumber: '2.3',
      pageNumber: 14,
      passageText:
        'Resting pulse oximetry readings below 94% on ambient air, or an exertional desaturation of 3% or greater in previously normoxic patients, indicate significant gas exchange compromise. When combined with fever, productive cough, or unilateral chest pain, urgent clinical evaluation within 12 to 24 hours is required.',
      keywordsJson: JSON.stringify(['spo2', 'hypoxia', 'oximetry', 'fever', 'cough', 'desaturation']),
      tokenCount: 61,
    },
  });

  // 5. Seed Medical Document & Extracted Biomarkers
  const cmpDoc = await prisma.medicalDocument.upsert({
    where: { id: 'doc-cmp-oct-2026' },
    update: {},
    create: {
      id: 'doc-cmp-oct-2026',
      patientProfileId: patientProfile.id,
      title: 'Comprehensive Metabolic Panel & HbA1c',
      category: 'LAB_RESULTS',
      fileName: 'Comprehensive_Metabolic_Panel_Oct2026.pdf',
      mimeType: 'application/pdf',
      fileSizeBytes: 1245184,
      storageKey: 'seed-fixture/Comprehensive_Metabolic_Panel_Oct2026.pdf',
      orderingClinician: 'Dr. Aris Thorne, MD',
      facilityName: 'Quest Diagnostics Clinical Lab',
      ocrStatus: 'COMPLETE',
      aiPlainSummary:
        'Glycemic control remains stable with HbA1c at 6.4% (target <7.0% for managed Type 2 Diabetes). Fasting glucose is mildly elevated at 108 mg/dL. Renal function (eGFR >90 mL/min) and electrolytes are within normal reference limits.',
      clinicalObservations:
        'Continue current Metformin 500mg BID regimen; recheck HbA1c in 6 months.',
      isSeedFixture: true,
    },
  });

  await prisma.extractedBiomarker.deleteMany({ where: { documentId: cmpDoc.id, isSeedFixture: true } });
  await prisma.extractedBiomarker.createMany({
    data: [
      {
        documentId: cmpDoc.id,
        name: 'Hemoglobin A1c (HbA1c)',
        value: '6.4',
        unit: '%',
        referenceRange: '4.0 – 5.6%',
        flag: 'SLIGHTLY_ELEVATED',
        interpretation: 'Controlled Diabetic Range (<7.0% clinical goal met)',
        isSeedFixture: true,
      },
      {
        documentId: cmpDoc.id,
        name: 'Fasting Plasma Glucose',
        value: '108',
        unit: 'mg/dL',
        referenceRange: '70 – 99 mg/dL',
        flag: 'SLIGHTLY_ELEVATED',
        interpretation: 'Mild fasting hyperglycemia; correlate with dietary intake',
        isSeedFixture: true,
      },
      {
        documentId: cmpDoc.id,
        name: 'Estimated GFR (eGFR)',
        value: '>90',
        unit: 'mL/min/1.73m²',
        referenceRange: '>= 60 mL/min/1.73m²',
        flag: 'NORMAL',
        interpretation: 'Normal renal filtration function',
        isSeedFixture: true,
      },
    ],
  });

  // 6. Seed Active Triage Session (#CN-2026-8841) + Citations + Clinician Review
  const activeSession = await prisma.triageSession.upsert({
    where: { sessionCode: 'CN-2026-8841' },
    update: {},
    create: {
      id: 'session-cn-2026-8841',
      sessionCode: 'CN-2026-8841',
      patientProfileId: patientProfile.id,
      chiefComplaint: 'Exertional Chest Tightness & Mild Wheezing',
      status: 'PENDING_REVIEW',
      acuityLevel: 'URGENT',
      confidenceScore: 92,
      recommendedCareSetting: 'In-Person Urgent Care or Same-Day Pulmonology / Primary Care (<24 Hours)',
      plainLanguageSummary:
        'Based on your report of acute substernal chest tightness over the past 2 hours accompanied by mild exertional shortness of breath and a known history of bronchial asthma, our clinical decision support system recommends an Urgent Care or Same-Day Clinician Evaluation within 24 hours.',
      includeEhrContext: true,
      redFlagTriggered: false,
      redFlagReasonsJson: JSON.stringify([]),
      extractedEntitiesJson: JSON.stringify({
        primarySymptoms: ['Substernal Chest Tightness (Onset: 2h ago)', 'Exertional Dyspnea (Moderate)', 'End-Expiratory Wheeze'],
        pertinentNegatives: ['No Diaphoresis', 'No Left Arm or Jaw Radiation', 'No Resting Syncope'],
        riskModifiers: ['History of Mild Persistent Asthma', 'Suboptimal Relief After 1 Albuterol Puff'],
      }),
      differentialJson: JSON.stringify([
        {
          condition: 'Acute Bronchospasm / Asthma Exacerbation',
          matchLevel: 'High Clinical Match',
          probabilityPercent: 74,
          rationale: 'Aligns with known asthma history, wheezing, and partial response to SABA.',
        },
        {
          condition: 'Costochondritis / Pleuritic Chest Wall Strain',
          matchLevel: 'Moderate Match',
          probabilityPercent: 42,
          rationale: 'Reproducible chest wall tightness without systemic ischemic signs.',
        },
        {
          condition: 'Atypical Lower Respiratory Tract Infection',
          matchLevel: 'Lower Match',
          probabilityPercent: 25,
          rationale: 'Possible early viral trigger; absence of systemic fever reduces likelihood.',
        },
      ]),
      visitPrepQuestionsJson: JSON.stringify([
        'Should I step up my maintenance controller inhaler during seasonal transitions?',
        'What peak expiratory flow (PEF) reading should prompt an immediate ER visit?',
        'Is an in-office spirometry or 12-lead ECG indicated today?',
      ]),
      isSeedFixture: true,
      completedAt: new Date(),
    },
  });

  // Seed Assessment Answers
  await prisma.assessmentAnswer.deleteMany({ where: { sessionId: activeSession.id } });
  await prisma.assessmentAnswer.createMany({
    data: [
      {
        sessionId: activeSession.id,
        stepNumber: 1,
        questionKey: 'CHIEF_COMPLAINT',
        questionPrompt: 'What primary symptoms are you experiencing today and when did they start?',
        answerValue: 'Tightness in upper chest and a dry, persistent cough for the past 2 hours.',
        isSeedFixture: true,
      },
      {
        sessionId: activeSession.id,
        stepNumber: 2,
        questionKey: 'ISCHEMIC_RED_FLAGS',
        questionPrompt: 'Do you feel any pain radiating to your jaw, back, or left arm, or breaking into cold sweats?',
        answerValue: 'No radiating pain and no cold sweat. Pain is non-radiating substernal tightness.',
        isSeedFixture: true,
      },
      {
        sessionId: activeSession.id,
        stepNumber: 3,
        questionKey: 'INHALER_RESPONSE',
        questionPrompt: 'Did you use your rescue inhaler, and did your breathing improve?',
        answerValue: 'Took 1 puff of Albuterol 45 minutes ago with only minimal improvement in chest tightness.',
        isSeedFixture: true,
      },
    ],
  });

  // Seed Assessment Explanations
  await prisma.assessmentExplanation.deleteMany({ where: { sessionId: activeSession.id } });
  await prisma.assessmentExplanation.createMany({
    data: [
      {
        sessionId: activeSession.id,
        factorType: 'PRIMARY_SYMPTOM',
        factorLabel: 'Substernal Chest Tightness with Dyspnea',
        rationale: 'Exertional onset over 2 hours indicates lower airway involvement requiring physical auscultation.',
        importanceRank: 1,
        isSeedFixture: true,
      },
      {
        sessionId: activeSession.id,
        factorType: 'RISK_MODIFIER',
        factorLabel: 'Suboptimal Response to SABA Inhaler',
        rationale: 'GINA guideline criteria stratify partial bronchodilator response as moderate acute exacerbation (<24h care).',
        importanceRank: 2,
        isSeedFixture: true,
      },
      {
        sessionId: activeSession.id,
        factorType: 'PERTINENT_NEGATIVE',
        factorLabel: 'Absence of Left Arm / Jaw Radiation & Syncope',
        rationale: 'Red-flag acute coronary syndrome symptoms are negative, ruling down immediate 911 dispatch.',
        importanceRank: 3,
        isSeedFixture: true,
      },
    ],
  });

  // Seed Assessment Status History
  await prisma.assessmentStatusHistory.deleteMany({ where: { sessionId: activeSession.id } });
  await prisma.assessmentStatusHistory.createMany({
    data: [
      {
        sessionId: activeSession.id,
        fromStatus: 'DRAFT',
        toStatus: 'IN_PROGRESS',
        transitionReason: 'Patient began multi-step intake questionnaire',
        changedByUserId: patientUser.id,
        createdAt: new Date(Date.now() - 45 * 60 * 1000),
      },
      {
        sessionId: activeSession.id,
        fromStatus: 'IN_PROGRESS',
        toStatus: 'PENDING_REVIEW',
        transitionReason: 'Intake completed; automated triage generated and queued for clinical verification',
        changedByUserId: patientUser.id,
        createdAt: new Date(Date.now() - 30 * 60 * 1000),
      },
    ],
  });

  await prisma.triageCitation.deleteMany({ where: { sessionId: activeSession.id } });
  await prisma.triageCitation.createMany({
    data: [
      {
        sessionId: activeSession.id,
        guidelineId: ginaGuideline.id,
        chunkId: ginaChunk1.id,
        passageText: ginaChunk1.passageText,
        sectionTitle: ginaChunk1.sectionTitle,
        sectionNumber: ginaChunk1.sectionNumber,
        pageNumber: ginaChunk1.pageNumber,
        sourceUrl: ginaGuideline.sourceUrl,
        verificationStatus: 'VERIFIED',
        relevanceScore: 0.94,
        relevanceNote: 'Supports <24h clinical evaluation for acute wheezing with incomplete SABA relief.',
        claimSupported: 'Exertional dyspnea and wheezing require urgent clinical assessment if SABA gives incomplete relief.',
      },
      {
        sessionId: activeSession.id,
        guidelineId: acpGuideline.id,
        chunkId: acpChunk1.id,
        passageText: acpChunk1.passageText,
        sectionTitle: acpChunk1.sectionTitle,
        sectionNumber: acpChunk1.sectionNumber,
        pageNumber: acpChunk1.pageNumber,
        sourceUrl: acpGuideline.sourceUrl,
        verificationStatus: 'VERIFIED',
        relevanceScore: 0.88,
        relevanceNote: 'Guides outpatient exclusion of cardiac ischemia in adult chest tightness.',
        claimSupported: 'Absence of ischemic radiation or diaphoresis supports outpatient priority stratification.',
      },
      {
        sessionId: activeSession.id,
        guidelineId: niceGuideline.id,
        chunkId: niceChunk1.id,
        passageText: niceChunk1.passageText,
        sectionTitle: niceChunk1.sectionTitle,
        sectionNumber: niceChunk1.sectionNumber,
        pageNumber: niceChunk1.pageNumber,
        sourceUrl: niceGuideline.sourceUrl,
        verificationStatus: 'VERIFIED',
        relevanceScore: 0.85,
        relevanceNote: 'Defines pulse oximetry and respiratory distress escalation criteria.',
        claimSupported: 'Requires resting SpO2 monitoring and clinical auscultation within 24 hours.',
      },
    ],
  });

  const clinicianReview = await prisma.clinicianReview.upsert({
    where: { sessionId: activeSession.id },
    update: {
      stage: 'REVIEWING',
      concordanceStatus: 'AGREED',
      clinicianNote:
        'Reviewed AI intake and asthma history. Agree with Urgent <24h evaluation. Please upload your recent home peak-flow log or Apple Watch ECG strip prior to your afternoon consult.',
      actionRequiredNote: 'Please upload your recent home peak-flow meter log or Apple Watch ECG strip.',
      requestedFileType: 'Peak Flow Log / ECG PDF',
      reviewLatencySeconds: 194,
      signedAt: null,
      overriddenAcuity: null,
    },
    create: {
      sessionId: activeSession.id,
      clinicianId: clinicianUser.id,
      stage: 'REVIEWING',
      concordanceStatus: 'AGREED',
      clinicianNote:
        'Reviewed AI intake and asthma history. Agree with Urgent <24h evaluation. Please upload your recent home peak-flow log or Apple Watch ECG strip prior to your afternoon consult.',
      actionRequiredNote: 'Please upload your recent home peak-flow meter log or Apple Watch ECG strip.',
      requestedFileType: 'Peak Flow Log / ECG PDF',
      reviewLatencySeconds: 194,
      isSeedFixture: true,
    },
  });

  // Seed Review Decision
  await prisma.reviewDecision.deleteMany({ where: { reviewId: clinicianReview.id } });
  await prisma.reviewDecision.create({
    data: {
      reviewId: clinicianReview.id,
      clinicianUserId: clinicianUser.id,
      decisionType: 'CLARIFICATION_REQUESTED',
      previousStage: 'QUEUED',
      newStage: 'REVIEWING',
      overriddenAcuity: null,
      rationale: 'Requested supplemental peak-flow meter log to assess baseline bronchodilator response.',
      isSeedFixture: true,
    },
  });

  // 7. Seed Doctor Profiles & Availability Slots
  const drRostova = await prisma.doctorProfile.upsert({
    where: { npiNumber: '1679502341' },
    update: {},
    create: {
      id: 'doc-elena-rostova',
      name: 'Dr. Elena Rostova, MD',
      credentials: 'MD, FCCP • Board Certified',
      specialty: 'Pulmonology & Critical Care',
      subspecialty: 'Asthma & Airway Disorders',
      npiNumber: '1679502341',
      hospitalAffiliation: 'UCSF Helen Diller Medical Center',
      locationAddress: '400 Parnassus Ave, Suite 520',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94143',
      region: 'San Francisco Bay Area',
      latitude: 37.7631,
      longitude: -122.4586,
      distanceMiles: 1.8,
      rating: 4.9,
      reviewCount: 214,
      triageMatchPercent: 98,
      acceptedInsurancesJson: JSON.stringify(['BlueCross BlueShield PPO', 'Aetna POS', 'UnitedHealthcare', 'Medicare']),
      telehealthAvailable: true,
      availableToday: true,
      inNetworkHospital: true,
      consultationFee: 160,
      bio: 'Specializes in reactive airway disease, adult asthma exacerbations, and rapid cardiopulmonary diagnostics.',
      isSeedFixture: true,
    },
  });

  const drVance = await prisma.doctorProfile.upsert({
    where: { npiNumber: '1548291038' },
    update: {},
    create: {
      id: 'doc-marcus-vance',
      name: 'Dr. Marcus Vance, MD',
      credentials: 'MD, FACP • Board Certified',
      specialty: 'Internal Medicine',
      subspecialty: 'Complex Diagnostic Triage & Primary Care',
      npiNumber: '1548291038',
      hospitalAffiliation: 'Sutter Health CPMC Mission Bernal',
      locationAddress: '3555 Cesar Chavez St, Suite 210',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94110',
      region: 'San Francisco Bay Area',
      latitude: 37.7481,
      longitude: -122.4204,
      distanceMiles: 2.4,
      rating: 4.8,
      reviewCount: 168,
      triageMatchPercent: 94,
      acceptedInsurancesJson: JSON.stringify(['BlueCross BlueShield PPO', 'Cigna PPO', 'Kaiser Permanente']),
      telehealthAvailable: true,
      availableToday: true,
      inNetworkHospital: true,
      consultationFee: 140,
      bio: 'Same-day diagnostic evaluation for acute cardiopulmonary, metabolic, and neurologic presentations.',
      isSeedFixture: true,
    },
  });

  const drReed = await prisma.doctorProfile.upsert({
    where: { npiNumber: '1982736450' },
    update: {},
    create: {
      id: 'doc-evelyn-reed',
      name: 'Dr. Evelyn Reed, MD, FACC',
      credentials: 'MD, FACC • Stanford Fellowship',
      specialty: 'Cardiology',
      subspecialty: 'Interventional Cardiology & Vascular Medicine',
      npiNumber: '1982736450',
      hospitalAffiliation: 'Bay Memorial Heart Institute',
      locationAddress: '1100 Van Ness Ave, 7th Floor',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94109',
      region: 'San Francisco Bay Area',
      latitude: 37.7858,
      longitude: -122.4215,
      distanceMiles: 1.2,
      rating: 4.9,
      reviewCount: 240,
      triageMatchPercent: 96,
      acceptedInsurancesJson: JSON.stringify(['BlueCross BlueShield PPO', 'Medicare', 'Aetna PPO']),
      telehealthAvailable: true,
      availableToday: true,
      inNetworkHospital: true,
      consultationFee: 200,
      bio: 'Specializes in ischemic chest pain triage, coronary evaluations, and non-invasive arrhythmia management.',
      isSeedFixture: true,
    },
  });

  const drLin = await prisma.doctorProfile.upsert({
    where: { npiNumber: '1472583690' },
    update: {},
    create: {
      id: 'doc-sarah-lin',
      name: 'Dr. Sarah Lin, MD, PhD',
      credentials: 'MD, PhD • Johns Hopkins',
      specialty: 'Neurology',
      subspecialty: 'Headache & Neurovascular Disorders',
      npiNumber: '1472583690',
      hospitalAffiliation: 'Stanford Health Care',
      locationAddress: '300 Pasteur Dr, Suite A3',
      city: 'Palo Alto',
      state: 'CA',
      zipCode: '94304',
      region: 'Silicon Valley',
      latitude: 37.4346,
      longitude: -122.1754,
      distanceMiles: 4.1,
      rating: 4.8,
      reviewCount: 195,
      triageMatchPercent: 92,
      acceptedInsurancesJson: JSON.stringify(['UnitedHealthcare', 'BlueCross BlueShield', 'Cigna']),
      telehealthAvailable: true,
      availableToday: false,
      inNetworkHospital: true,
      consultationFee: 220,
      bio: 'Expert in atypical migraine differentiation, neurovascular screening, and outpatient neurology consultations.',
      isSeedFixture: true,
    },
  });

  const drChen = await prisma.doctorProfile.upsert({
    where: { npiNumber: '1369258147' },
    update: {},
    create: {
      id: 'doc-david-chen',
      name: 'Dr. David Chen, MD',
      credentials: 'MD, FACE • Harvard Medical School',
      specialty: 'Endocrinology',
      subspecialty: 'Glycemic Crises & Metabolic Health',
      npiNumber: '1369258147',
      hospitalAffiliation: 'Alta Bates Summit Medical Center',
      locationAddress: '2450 Ashby Ave',
      city: 'Berkeley',
      state: 'CA',
      zipCode: '94705',
      region: 'East Bay',
      latitude: 37.8565,
      longitude: -122.2592,
      distanceMiles: 5.8,
      rating: 4.9,
      reviewCount: 142,
      triageMatchPercent: 91,
      acceptedInsurancesJson: JSON.stringify(['BlueCross BlueShield PPO', 'Medicare', 'Kaiser Permanente']),
      telehealthAvailable: true,
      availableToday: true,
      inNetworkHospital: true,
      consultationFee: 175,
      bio: 'Comprehensive endocrine evaluation for complex diabetes management, acute glycemic excursions, and metabolic optimization.',
      isSeedFixture: true,
    },
  });

  const drPatel = await prisma.doctorProfile.upsert({
    where: { npiNumber: '1852963741' },
    update: {},
    create: {
      id: 'doc-maya-patel',
      name: 'Dr. Maya Patel, MD',
      credentials: 'MD, FAAFP • UC Davis Medical Center',
      specialty: 'Urgent Care',
      subspecialty: 'Family Medicine & Walk-In Care',
      npiNumber: '1852963741',
      hospitalAffiliation: 'Sutter Medical Center Sacramento',
      locationAddress: '2801 L St',
      city: 'Sacramento',
      state: 'CA',
      zipCode: '95816',
      region: 'Greater Sacramento',
      latitude: 38.5714,
      longitude: -121.4682,
      distanceMiles: 85.0,
      rating: 4.7,
      reviewCount: 310,
      triageMatchPercent: 89,
      acceptedInsurancesJson: JSON.stringify(['Aetna', 'Cigna', 'Medicare', 'Medi-Cal']),
      telehealthAvailable: true,
      availableToday: true,
      inNetworkHospital: true,
      consultationFee: 120,
      bio: 'Same-day urgent evaluations for acute infections, respiratory conditions, minor injuries, and preventative triage.',
      isSeedFixture: true,
    },
  });

  const drKim = await prisma.doctorProfile.upsert({
    where: { npiNumber: '1963258741' },
    update: {},
    create: {
      id: 'doc-jennifer-kim',
      name: 'Dr. Jennifer Kim, MD',
      credentials: 'MD, FAAD • UCLA Health',
      specialty: 'Dermatology',
      subspecialty: 'Clinical Dermatology & Lesion Analysis',
      npiNumber: '1963258741',
      hospitalAffiliation: 'Cedars-Sinai Medical Center',
      locationAddress: '8700 Beverly Blvd',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90048',
      region: 'Greater Los Angeles',
      latitude: 34.0754,
      longitude: -118.3802,
      distanceMiles: 380.0,
      rating: 4.9,
      reviewCount: 220,
      triageMatchPercent: 88,
      acceptedInsurancesJson: JSON.stringify(['BlueCross BlueShield PPO', 'UnitedHealthcare', 'Aetna']),
      telehealthAvailable: true,
      availableToday: false,
      inNetworkHospital: false,
      consultationFee: 210,
      bio: 'Expert in clinical rash triage, acute inflammatory skin lesions, and telehealth dermatological evaluation.',
      isSeedFixture: true,
    },
  });

  // Seed Care Referral
  await prisma.careReferral.deleteMany({ where: { patientProfileId: patientProfile.id, isSeedFixture: true } });
  await prisma.careReferral.create({
    data: {
      referralCode: 'REF-2024-99412-ROSTOVA',
      patientProfileId: patientProfile.id,
      doctorId: drRostova.id,
      triageSessionId: activeSession.id,
      specialtyNeeded: 'Pulmonology & Asthma Evaluation',
      urgency: 'URGENT',
      clinicalSummary: 'Urgent referral for adult patient with active exertional chest tightness and suboptimal SABA response.',
      referralStatus: 'ACCEPTED',
      appointmentDate: new Date(Date.now() + 4 * 60 * 60 * 1000),
      isSeedFixture: true,
    },
  });

  // Seed Uploaded Media
  await prisma.uploadedMedia.deleteMany({ where: { patientProfileId: patientProfile.id, isSeedFixture: true } });
  await prisma.uploadedMedia.createMany({
    data: [
      {
        patientProfileId: patientProfile.id,
        triageSessionId: activeSession.id,
        fileName: 'skin_rash_lateral_forearm.png',
        fileSizeBytes: 4404019,
        mimeType: 'image/png',
        storageKey: 'seed-fixture/skin_rash_lateral_forearm.png',
        modality: 'CLINICAL_IMAGE',
        processingStatus: 'ANALYZED',
        processingProgress: 100,
        extractedSummary: 'Erythematous annular plaque with mild peripheral scaling on right lateral forearm. No lymphangitic streaking.',
        extractedDataJson: JSON.stringify({ primaryLesion: 'Plaque', distribution: 'Right forearm', acuteSigns: 'None' }),
        isSeedFixture: true,
      },
      {
        patientProfileId: patientProfile.id,
        triageSessionId: activeSession.id,
        fileName: 'audio_cough_symptom_memo.m4a',
        fileSizeBytes: 1845100,
        mimeType: 'audio/mp4',
        storageKey: 'seed-fixture/audio_cough_symptom_memo.m4a',
        modality: 'VOICE_RECORDING',
        processingStatus: 'ANALYZED',
        processingProgress: 100,
        extractedSummary: 'Voice memo transcribed: describes 3-day cough timeline and mild exertional fatigue.',
        extractedDataJson: JSON.stringify({ durationSeconds: 75, wordCount: 112, clarityRating: 'High' }),
        isSeedFixture: true,
      },
    ],
  });

  // Seed Follow Up Record
  await prisma.followUpRecord.deleteMany({ where: { patientProfileId: patientProfile.id, isSeedFixture: true } });
  await prisma.followUpRecord.create({
    data: {
      patientProfileId: patientProfile.id,
      triageSessionId: activeSession.id,
      title: 'Post-Urgent Care Cardiopulmonary Check',
      targetDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
      status: 'SCHEDULED',
      clinicalObjective: 'Verify resolution of chest tightness and check home peak-flow meter stability.',
      isSeedFixture: true,
    },
  });

  await prisma.availabilitySlot.deleteMany({ where: { isSeedFixture: true } });
  const slot1 = await prisma.availabilitySlot.create({
    data: {
      doctorId: drRostova.id,
      label: 'Today, 2:30 PM',
      startsAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
      modality: 'TELEHEALTH',
      isBooked: false,
      isSeedFixture: true,
    },
  });

  await prisma.availabilitySlot.createMany({
    data: [
      {
        doctorId: drRostova.id,
        label: 'Today, 4:15 PM',
        startsAt: new Date(Date.now() + 4 * 60 * 60 * 1000),
        modality: 'IN_PERSON',
        isBooked: false,
        isSeedFixture: true,
      },
      {
        doctorId: drVance.id,
        label: 'Today, 3:00 PM',
        startsAt: new Date(Date.now() + 3 * 60 * 60 * 1000),
        modality: 'TELEHEALTH',
        isBooked: false,
        isSeedFixture: true,
      },
      {
        doctorId: drVance.id,
        label: 'Tomorrow, 9:30 AM',
        startsAt: new Date(Date.now() + 20 * 60 * 60 * 1000),
        modality: 'IN_PERSON',
        isBooked: false,
        isSeedFixture: true,
      },
      {
        doctorId: drReed.id,
        label: 'Today, 2:30 PM (Video)',
        startsAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
        modality: 'TELEHEALTH',
        isBooked: false,
        isSeedFixture: true,
      },
      {
        doctorId: drReed.id,
        label: 'Tomorrow, 9:15 AM (In-Person)',
        startsAt: new Date(Date.now() + 21 * 60 * 60 * 1000),
        modality: 'IN_PERSON',
        isBooked: false,
        isSeedFixture: true,
      },
      {
        doctorId: drLin.id,
        label: 'Tomorrow, 11:30 AM (Video)',
        startsAt: new Date(Date.now() + 23 * 60 * 60 * 1000),
        modality: 'TELEHEALTH',
        isBooked: false,
        isSeedFixture: true,
      },
      {
        doctorId: drChen.id,
        label: 'Today, 3:45 PM (Video)',
        startsAt: new Date(Date.now() + 3.5 * 60 * 60 * 1000),
        modality: 'TELEHEALTH',
        isBooked: false,
        isSeedFixture: true,
      },
      {
        doctorId: drPatel.id,
        label: 'Today, 1:15 PM (Walk-In / In-Person)',
        startsAt: new Date(Date.now() + 1.25 * 60 * 60 * 1000),
        modality: 'IN_PERSON',
        isBooked: false,
        isSeedFixture: true,
      },
      {
        doctorId: drKim.id,
        label: 'Oct 28, 10:00 AM (Video Consult)',
        startsAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
        modality: 'TELEHEALTH',
        isBooked: false,
        isSeedFixture: true,
      },
    ],
  });

  // 8. Seed Upcoming Appointment
  await prisma.appointment.deleteMany({ where: { patientProfileId: patientProfile.id, isSeedFixture: true } });
  await prisma.appointment.create({
    data: {
      patientProfileId: patientProfile.id,
      doctorId: drVance.id,
      slotId: slot1.id,
      triageSessionId: activeSession.id,
      reason: 'Urgent Follow-Up: Exertional Chest Tightness & Asthma Review',
      modality: 'TELEHEALTH',
      status: 'UPCOMING',
      scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
      preVisitNotes: 'Have peak flow meter readings and current inhaler available on camera.',
      isSeedFixture: true,
    },
  });

  // 9. Seed Notifications & Consent Preferences
  await prisma.notification.deleteMany({ where: { userId: patientUser.id, isSeedFixture: true } });
  await prisma.notification.createMany({
    data: [
      {
        userId: patientUser.id,
        category: 'clinical',
        title: 'Clinician Review Update on #CN-2026-8841',
        body: 'Dr. Aris Thorne, MD added a preliminary clinical note and requested a peak-flow log upload.',
        actionLabel: 'View Review Tracker',
        actionHref: '/assessments/history',
        isRead: false,
        isSeedFixture: true,
      },
      {
        userId: patientUser.id,
        category: 'record',
        title: 'Lab Biomarkers Extracted: Comprehensive Metabolic Panel',
        body: 'AI OCR analysis completed for Comprehensive_Metabolic_Panel_Oct2026.pdf (HbA1c: 6.4%).',
        actionLabel: 'Inspect Biomarkers',
        actionHref: '/records',
        isRead: false,
        isSeedFixture: true,
      },
      {
        userId: patientUser.id,
        category: 'appointment',
        title: 'Upcoming Telehealth Consult Today',
        body: 'Video consultation scheduled with Dr. Marcus Vance, MD. Complete your pre-visit check.',
        actionLabel: 'View Dashboard',
        actionHref: '/dashboard',
        isRead: false,
        isSeedFixture: true,
      },
    ],
  });

  await prisma.consentPreference.upsert({
    where: { userId: patientUser.id },
    update: {},
    create: {
      userId: patientUser.id,
      includeEhrContext: true,
      storeVoiceTranscripts: true,
      deidentifiedModelImprovement: false,
      automatedHieSync: true,
    },
  });

  // 10. Seed Audit Logs
  await prisma.auditLog.upsert({
    where: { auditCode: 'AUD-SEED-9042-ESC' },
    update: {},
    create: {
      auditCode: 'AUD-SEED-9042-ESC',
      actorUserId: clinicianUser.id,
      actorRole: 'CLINICIAN',
      actionType: 'CLINICIAN_SIGN_OFF',
      targetEntityType: 'TriageSession',
      targetEntityId: activeSession.id,
      anonymizedPatientRef: 'PT-8492-J',
      aiAcuity: 'URGENT',
      finalAcuity: 'URGENT',
      latencySeconds: 194,
      metadataJson: JSON.stringify({ concordance: 'AGREED', guidelineCode: 'GINA-2025-ASTHMA' }),
      isSeedFixture: true,
    },
  });

  console.info('CareNavigator seed complete:', {
    patient: patientUser.name,
    clinician: clinicianUser.name,
    admin: adminUser.name,
    activeTriageSession: activeSession.sessionCode,
  });
}

main()
  .catch((err) => {
    console.error('Database seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
