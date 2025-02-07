const fs = require("fs");

const envProd = `
export const environment = {
    production: true,
    API_URL: '${process.env.API_URL}',
    firebase: {
        projectId: '${process.env.FIREBASE_PROJECT_ID}',
        appId: '${process.env.FIREBASE_APP_ID}',
        storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
        apiKey: '${process.env.FIREBASE_API_KEY}',
        authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
        messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}'
    }
};
`;

fs.writeFileSync("./src/environments/environment.prod.ts", envProd);
console.log("✔️ Archivo environment.prod.ts generado correctamente");
