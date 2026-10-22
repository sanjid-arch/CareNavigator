-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'PATIENT',
    "mrn" TEXT,
    "title" TEXT,
    "specialty" TEXT,
    "npiNumber" TEXT,
    "avatarUrl" TEXT,
    "passwordHash" TEXT,
    "isSeedFixture" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PatientProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "sex" TEXT NOT NULL,
    "bloodType" TEXT NOT NULL,
    "primaryCarePhysician" TEXT NOT NULL,
    "insuranceProvider" TEXT NOT NULL,
    "insuranceMemberId" TEXT NOT NULL,
    "emergencyContactName" TEXT,
    "emergencyContactPhone" TEXT,
    "lastSyncedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isSeedFixture" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PatientProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VitalSign" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientProfileId" TEXT NOT NULL,
    "bloodPressure" TEXT NOT NULL,
    "heartRateBpm" INTEGER NOT NULL,
    "spO2Percent" INTEGER NOT NULL,
    "weightLbs" REAL NOT NULL,
    "temperatureF" REAL NOT NULL DEFAULT 98.6,
    "recordedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isSeedFixture" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "VitalSign_patientProfileId_fkey" FOREIGN KEY ("patientProfileId") REFERENCES "PatientProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MedicalCondition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientProfileId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "severity" TEXT NOT NULL DEFAULT 'MODERATE',
    "diagnosedDate" TEXT,
    "notes" TEXT,
    "isSeedFixture" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "MedicalCondition_patientProfileId_fkey" FOREIGN KEY ("patientProfileId") REFERENCES "PatientProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Medication" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientProfileId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "prescribedBy" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "isSeedFixture" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Medication_patientProfileId_fkey" FOREIGN KEY ("patientProfileId") REFERENCES "PatientProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Allergy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientProfileId" TEXT NOT NULL,
    "substance" TEXT NOT NULL,
    "reaction" TEXT NOT NULL,
    "severity" TEXT NOT NULL DEFAULT 'SEVERE',
    "isSeedFixture" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Allergy_patientProfileId_fkey" FOREIGN KEY ("patientProfileId") REFERENCES "PatientProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MedicalDocument" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientProfileId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'LAB_RESULTS',
    "fileName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "fileSizeBytes" INTEGER NOT NULL,
    "storageKey" TEXT NOT NULL,
    "orderingClinician" TEXT,
    "facilityName" TEXT,
    "ocrStatus" TEXT NOT NULL DEFAULT 'COMPLETE',
    "aiPlainSummary" TEXT,
    "clinicalObservations" TEXT,
    "uploadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isSeedFixture" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "MedicalDocument_patientProfileId_fkey" FOREIGN KEY ("patientProfileId") REFERENCES "PatientProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExtractedBiomarker" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "documentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "referenceRange" TEXT NOT NULL,
    "flag" TEXT NOT NULL DEFAULT 'NORMAL',
    "interpretation" TEXT,
    "isSeedFixture" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "ExtractedBiomarker_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "MedicalDocument" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ClinicalGuideline" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "publicationYear" INTEGER NOT NULL,
    "specialty" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "keyRecommendations" TEXT NOT NULL,
    "sourceReference" TEXT NOT NULL,
    "keywords" TEXT NOT NULL,
    "isSeedFixture" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "TriageSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionCode" TEXT NOT NULL,
    "patientProfileId" TEXT NOT NULL,
    "chiefComplaint" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'IN_PROGRESS',
    "acuityLevel" TEXT NOT NULL DEFAULT 'ROUTINE',
    "confidenceScore" INTEGER NOT NULL DEFAULT 90,
    "recommendedCareSetting" TEXT NOT NULL,
    "plainLanguageSummary" TEXT NOT NULL,
    "includeEhrContext" BOOLEAN NOT NULL DEFAULT true,
    "redFlagTriggered" BOOLEAN NOT NULL DEFAULT false,
    "redFlagReasonsJson" TEXT NOT NULL DEFAULT '[]',
    "extractedEntitiesJson" TEXT NOT NULL DEFAULT '{}',
    "differentialJson" TEXT NOT NULL DEFAULT '[]',
    "visitPrepQuestionsJson" TEXT NOT NULL DEFAULT '[]',
    "voiceTranscript" TEXT,
    "isSeedFixture" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "completedAt" DATETIME,
    CONSTRAINT "TriageSession_patientProfileId_fkey" FOREIGN KEY ("patientProfileId") REFERENCES "PatientProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TriageMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "metadataJson" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TriageMessage_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "TriageSession" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TriageCitation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "guidelineId" TEXT NOT NULL,
    "relevanceNote" TEXT NOT NULL,
    CONSTRAINT "TriageCitation_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "TriageSession" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TriageCitation_guidelineId_fkey" FOREIGN KEY ("guidelineId") REFERENCES "ClinicalGuideline" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ClinicianReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "clinicianId" TEXT NOT NULL,
    "stage" TEXT NOT NULL DEFAULT 'REVIEWING',
    "concordanceStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "overriddenAcuity" TEXT,
    "clinicianNote" TEXT,
    "actionRequiredNote" TEXT,
    "requestedFileType" TEXT,
    "supplementalDocId" TEXT,
    "reviewLatencySeconds" INTEGER NOT NULL DEFAULT 194,
    "signedAt" DATETIME,
    "updatedAt" DATETIME NOT NULL,
    "isSeedFixture" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "ClinicianReview_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "TriageSession" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ClinicianReview_clinicianId_fkey" FOREIGN KEY ("clinicianId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DoctorProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "credentials" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "subspecialty" TEXT,
    "npiNumber" TEXT NOT NULL,
    "hospitalAffiliation" TEXT NOT NULL,
    "locationAddress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "distanceMiles" REAL NOT NULL,
    "rating" REAL NOT NULL,
    "reviewCount" INTEGER NOT NULL,
    "triageMatchPercent" INTEGER NOT NULL,
    "acceptedInsurancesJson" TEXT NOT NULL DEFAULT '[]',
    "telehealthAvailable" BOOLEAN NOT NULL DEFAULT true,
    "availableToday" BOOLEAN NOT NULL DEFAULT true,
    "inNetworkHospital" BOOLEAN NOT NULL DEFAULT true,
    "consultationFee" INTEGER NOT NULL DEFAULT 150,
    "bio" TEXT NOT NULL,
    "isSeedFixture" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "AvailabilitySlot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "doctorId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "startsAt" DATETIME NOT NULL,
    "modality" TEXT NOT NULL DEFAULT 'TELEHEALTH',
    "isBooked" BOOLEAN NOT NULL DEFAULT false,
    "isSeedFixture" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "AvailabilitySlot_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "DoctorProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientProfileId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "slotId" TEXT,
    "triageSessionId" TEXT,
    "reason" TEXT NOT NULL,
    "modality" TEXT NOT NULL DEFAULT 'TELEHEALTH',
    "status" TEXT NOT NULL DEFAULT 'UPCOMING',
    "scheduledAt" DATETIME NOT NULL,
    "preVisitNotes" TEXT,
    "isSeedFixture" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Appointment_patientProfileId_fkey" FOREIGN KEY ("patientProfileId") REFERENCES "PatientProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "DoctorProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Appointment_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "AvailabilitySlot" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Appointment_triageSessionId_fkey" FOREIGN KEY ("triageSessionId") REFERENCES "TriageSession" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "actionLabel" TEXT,
    "actionHref" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "isDismissed" BOOLEAN NOT NULL DEFAULT false,
    "isSeedFixture" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ConsentPreference" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "includeEhrContext" BOOLEAN NOT NULL DEFAULT true,
    "storeVoiceTranscripts" BOOLEAN NOT NULL DEFAULT true,
    "deidentifiedModelImprovement" BOOLEAN NOT NULL DEFAULT false,
    "automatedHieSync" BOOLEAN NOT NULL DEFAULT true,
    "commCriticalEmail" BOOLEAN NOT NULL DEFAULT true,
    "commCriticalSms" BOOLEAN NOT NULL DEFAULT true,
    "commCriticalPush" BOOLEAN NOT NULL DEFAULT true,
    "commReviewEmail" BOOLEAN NOT NULL DEFAULT true,
    "commReviewSms" BOOLEAN NOT NULL DEFAULT true,
    "commReviewPush" BOOLEAN NOT NULL DEFAULT true,
    "commAppointmentEmail" BOOLEAN NOT NULL DEFAULT true,
    "commAppointmentSms" BOOLEAN NOT NULL DEFAULT true,
    "commAppointmentPush" BOOLEAN NOT NULL DEFAULT false,
    "commPreventiveEmail" BOOLEAN NOT NULL DEFAULT true,
    "commPreventiveSms" BOOLEAN NOT NULL DEFAULT false,
    "commPreventivePush" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ConsentPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "auditCode" TEXT NOT NULL,
    "actorUserId" TEXT,
    "actorRole" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    "targetEntityType" TEXT NOT NULL,
    "targetEntityId" TEXT NOT NULL,
    "anonymizedPatientRef" TEXT,
    "aiAcuity" TEXT,
    "finalAcuity" TEXT,
    "latencySeconds" INTEGER,
    "metadataJson" TEXT NOT NULL DEFAULT '{}',
    "isSeedFixture" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditLog_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_mrn_key" ON "User"("mrn");

-- CreateIndex
CREATE UNIQUE INDEX "PatientProfile_userId_key" ON "PatientProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ClinicalGuideline_code_key" ON "ClinicalGuideline"("code");

-- CreateIndex
CREATE UNIQUE INDEX "TriageSession_sessionCode_key" ON "TriageSession"("sessionCode");

-- CreateIndex
CREATE UNIQUE INDEX "ClinicianReview_sessionId_key" ON "ClinicianReview"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "DoctorProfile_npiNumber_key" ON "DoctorProfile"("npiNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ConsentPreference_userId_key" ON "ConsentPreference"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AuditLog_auditCode_key" ON "AuditLog"("auditCode");
