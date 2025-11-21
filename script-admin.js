// script-admin.js — CRUD simples usando localStorage

// Verifica sessão
if(!localStorage.getItem('studio_logged')){
  alert('Você precisa estar logado');
  window.location.href = 'login index.html';
}

const apptsKey = 'studio_appts_v1';

function loadAppts(){
  const raw = localStorage.getItem(apptsKey);
  return raw ? JSON.parse(raw) : [];
}

function saveAppts(list){
  localStorage.setItem(apptsKey, JSON.stringify(list));
}

function renderList(){
  const list = loadAppts();
  const ul = document.getElementById('appts');
  ul.innerHTML = '';
  list.forEach((a, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${a.name}</strong> — ${a.service} ${a.date ? ' — ' + a.date : ''} <button data-i="${i}" class="btn small danger">Remover</button>`;
    ul.appendChild(li);
  });
}

// Handlers
const form = document.getElementById('apptForm');
form.addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('a_name').value.trim();
  const service = document.getElementById('a_service').value.trim();
  const date = document.getElementById('a_date').value;
  const list = loadAppts();
  list.push({name, service, date});
  saveAppts(list);
  renderList();
  form.reset();
});

// remover
document.getElementById('appts').addEventListener('click', function(e){
  if(e.target.matches('button')){
    const idx = Number(e.target.dataset.i);
    const list = loadAppts();
    list.splice(idx,1);
    saveAppts(list);
    renderList();
  }
});

// logout
document.getElementById('logoutBtn').addEventListener('click', function(){
  localStorage.removeItem('studio_logged');
  window.location.href = 'login index.html';
});

// init
renderList();