# Studio Sirlei Monteiro - Web App

Arquivos de exemplo para um micro site / landing page que usa a foto enviada como imagem principal.

## Estrutura
- index.html           -> Página pública com a foto (agenda aberta)
- login index.html     -> Página de login simples para administrador
- admin index.html     -> Painel admin para ver/agendar (exemplo local)
- firebase.js          -> Arquivo de configuração (placeholder)
- script.js            -> Script da página pública (abrir WhatsApp, formulário)
- script-admin.js      -> Script do painel admin (CRUD básico em localStorage)
- style.css            -> Estilos gerais
- README.md            -> Este arquivo
- assets/hero.jpg      -> Imagem que você enviou

## Como usar
1. Coloque `hero.jpg` em `assets/`.
2. Abra `index.html` no navegador.
3. Para testar administração, abra `login index.html`, faça login com as credenciais de exemplo (usuário: `admin`, senha: `senha123`) e você será redirecionado para `admin index.html`.

Obs: `firebase.js` é um placeholder se você quiser conectar ao Firebase (adicione sua configuração lá).