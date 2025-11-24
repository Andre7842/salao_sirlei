# Salão Sirlei — Site Completo

Este repositório contém um site completo para um salão de beleza com:
- Página inicial
- Página de serviços
- Sistema de agendamento (armazenado em localStorage)
- Painel administrativo simples (visualiza e gerencia agendamentos)
- Layout responsivo e acessível
- Instruções para integração com Firebase (opcional)

## Como usar
1. Descompacte o arquivo `salao_site_completo.zip`.
2. Abra `index.html` no navegador.
3. Faça agendamentos na página "Agendar" — eles serão salvos no `localStorage`.
4. Para visualizar/agendar pelo painel admin, abra `admin.html`.

## Para transformar em site real (recomendado)
- Hospede os arquivos em um serviço estático (GitHub Pages, Netlify, Vercel).
- Para salvar agendamentos em nuvem, configure Firebase Firestore / Realtime Database. Veja `firebase_instructions.md`.
- Para funcionalidades avançadas (login, notificações por e-mail/WhatsApp), implemente backend (Node.js, PHP, Firebase Functions).

## Estrutura de arquivos
- index.html
- services.html
- agendar.html
- admin.html
- css/style.css
- js/app.js
- js/admin.js
- firebase_instructions.md

## Licença
Uso livre — personalize para seu salão.
