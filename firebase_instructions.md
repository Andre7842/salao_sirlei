# Instruções para integrar Firebase (opcional)

1. Crie um projeto no Firebase: https://console.firebase.google.com/
2. No painel, adicione um app Web e copie as credenciais (apiKey, authDomain, projectId...).
3. Instale e configure Firestore ou Realtime Database.
4. No arquivo `js/app.js`, substitua a lógica de `saveBooking()` para enviar os dados para Firestore:
   ```js
   // Exemplo simplificado:
   import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
   import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js';

   const firebaseConfig = { /* suas credenciais */ };
   const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);

   async function saveBooking(){
     // ... validar campos ...
     await addDoc(collection(db, 'bookings'), booking);
   }
   ```
5. Proteja as regras do banco (somente admin pode ler/escrever) ou use Firebase Authentication.
6. Para notificações, use Firebase Functions para enviar e-mail ou WhatsApp via um provedor externo.
