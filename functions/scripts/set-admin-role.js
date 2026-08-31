#!/usr/bin/env node
/**
 * One-off operator script: grant the platform-wide 'admin' role to a user.
 *
 * There is no in-app way to do this (by design — see firestore.rules users/{userId}
 * update rule, which forbids changing `role` through the client, even for existing
 * admins, until there's a real Admin UI with an audit trail).
 *
 * Usage:
 *   firebase login                       # once, if not already logged in
 *   node functions/scripts/set-admin-role.js someone@example.com
 *
 * Uses Application Default Credentials (from `firebase login` / `gcloud auth
 * application-default login`) against the project in the repo's .firebaserc —
 * no service-account key file needed or committed.
 */

const admin = require('firebase-admin');
const { readFileSync } = require('fs');
const path = require('path');

const email = process.argv[2];
if (!email) {
  console.error('Usage: node functions/scripts/set-admin-role.js <email>');
  process.exit(1);
}

const firebaserc = JSON.parse(
  readFileSync(path.join(__dirname, '..', '..', '.firebaserc'), 'utf8'),
);
const projectId = firebaserc.projects.default;

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId,
});

async function main() {
  const userRecord = await admin.auth().getUserByEmail(email);
  const userRef = admin.firestore().collection('users').doc(userRecord.uid);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    console.error(
      `No Firestore users/${userRecord.uid} document found for ${email}. ` +
        'The user must sign in at least once before their document exists.',
    );
    process.exit(1);
  }

  await userRef.update({ role: 'admin', updatedAt: new Date() });
  console.log(`✅ ${email} (${userRecord.uid}) is now role: 'admin' on project ${projectId}.`);
}

main().catch((error) => {
  console.error('❌ Failed to set admin role:', error);
  process.exit(1);
});
