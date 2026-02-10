import "dotenv/config";
import admin from "firebase-admin";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
let privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (!projectId || !clientEmail || !privateKey) {
    console.error("Ошибка: задайте FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY в .env");
    process.exit(1);
}

privateKey = privateKey.replace(/\\n/g, "\n");

const arg = process.argv[2];
if (!arg) {
    console.error("Укажите email или uid пользователя:");
    console.error("  node scripts/set-admin.mjs user@example.com");
    console.error("  node scripts/set-admin.mjs <uid>");
    process.exit(1);
}

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId,
            clientEmail,
            privateKey,
        }),
    });
}

const auth = admin.auth();

async function setAdmin() {
    let uid;
    if (arg.includes("@")) {
        const user = await auth.getUserByEmail(arg);
        uid = user.uid;
        console.log("Найден пользователь:", user.email, "uid:", uid);
    } else {
        uid = arg;
        const user = await auth.getUser(uid);
        console.log("Пользователь:", user.email, "uid:", uid);
    }

    await auth.setCustomUserClaims(uid, { admin: true });
    console.log("Роль admin выдана. Пользователь должен перелогиниться, чтобы токен обновился.");
}

setAdmin().catch((err) => {
    console.error(err);
    process.exit(1);
});
