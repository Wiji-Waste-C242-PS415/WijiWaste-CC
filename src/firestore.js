const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
const admin = require("firebase-admin");

const client = new SecretManagerServiceClient();

let db; // Menyimpan instance Firestore

async function initializeFirebase() {
  if (db) return db; // Hindari inisialisasi ulang
  const [accessResponse] = await client.accessSecretVersion({
    name: "projects/wijiwaste/secrets/serviceaccount/versions/latest",
  });

  const serviceAccount = JSON.parse(
    accessResponse.payload.data.toString("utf8")
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  db = admin.firestore();
  return db;
}

module.exports = initializeFirebase;
