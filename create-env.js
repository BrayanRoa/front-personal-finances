const fs = require("fs");
const environmentProd = `
export const environment = {
  production: true,
  API_URL: '${process.env.NG_APP_API_URL}',
  firebase: {
    projectId: '${process.env.NG_APP_FIREBASE_PROJECT_ID}',
    appId: '${process.env.NG_APP_FIREBASE_APP_ID}',
    storageBucket: '${process.env.NG_APP_FIREBASE_STORAGE_BUCKET}',
    apiKey: '${process.env.NG_APP_FIREBASE_API_KEY}',
    authDomain: '${process.env.NG_APP_FIREBASE_AUTH_DOMAIN}',
    messagingSenderId: '${process.env.NG_APP_FIREBASE_MESSAGING_SENDER_ID}'
  }
};
`;

fs.writeFileSync("./src/environments/environment.prod.ts", environmentProd);
console.log("✅ Archivo environment.prod.ts generado correctamente.");
