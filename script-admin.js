function carregar(){
  const lista = JSON.parse(localStorage.getItem('agendamentos')) || [];
  const ul = document.getElementById('lista');
  ul.innerHTML = "";

  lista.forEach((item, i) => {
    const li = document.createElement('li');
    li.className = 'admin-item';
    li.innerHTML = `
      <strong>${item.nome}</strong><br>
      Data: ${item.data}<br>
      Serviço: ${item.servico}<br>
      <button class="btn danger small" onclick="remover(${i})">Excluir</button>
    `;
    ul.appendChild(li);
  });
}

function remover(i){
  let lista = JSON.parse(localStorage.getItem('agendamentos')) || [];
  lista.splice(i,1);
  localStorage.setItem('agendamentos', JSON.stringify(lista));
  carregar();
}

document.getElementById('form-admin').addEventListener('submit', e => {
  e.preventDefault();
  const n = document.getElementById('a-nome').value;
  const d = document.getElementById('a-data').value;
  const s = document.getElementById('a-servico').value;

  let lista = JSON.parse(localStorage.getItem('agendamentos')) || [];
  lista.push({nome:n, data:d, servico:s});
  localStorage.setItem('agendamentos', JSON.stringify(lista));

  carregar();
  e.target.reset();
});

carregar();