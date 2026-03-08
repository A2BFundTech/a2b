import "dotenv/config";
import admin from "firebase-admin";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
let privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (!projectId || !clientEmail || !privateKey) {
  console.error(
    "Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY in .env",
  );
  process.exit(1);
}

privateKey = privateKey.replace(/\\n/g, "\n");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

const db = admin.firestore();
const DEFAULT_VALUE = process.argv[2] ?? "0";

async function run() {
  const snapshot = await db.collection("projects").get();
  let batch = db.batch();
  let pendingOps = 0;
  let updatedCount = 0;

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const hasNewField = Object.prototype.hasOwnProperty.call(
      data,
      "quantityOfApartments",
    );
    const hasOldField = Object.prototype.hasOwnProperty.call(
      data,
      "quantityOfApartnents",
    );

    if (hasNewField && !hasOldField) continue;

    const patch = {};

    if (!hasNewField) {
      patch.quantityOfApartments = hasOldField
        ? String(data.quantityOfApartnents ?? DEFAULT_VALUE)
        : DEFAULT_VALUE;
    }

    if (hasOldField) {
      patch.quantityOfApartnents = admin.firestore.FieldValue.delete();
    }

    batch.update(doc.ref, patch);
    pendingOps += 1;
    updatedCount += 1;

    if (pendingOps >= 450) {
      await batch.commit();
      batch = db.batch();
      pendingOps = 0;
    }
  }

  if (pendingOps > 0) {
    await batch.commit();
  }

  console.log(`Backfill done. Updated documents: ${updatedCount}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
