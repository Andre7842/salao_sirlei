// script-admin.js
// firebase.js deve estar incluído (auth, db)

// força login: se não logado, redireciona
auth.onAuthStateChanged(user => {
  if(!user) {
    // se estiver em admin.html, volta ao login
    if(window.location.pathname.includes('admin.html')) window.location.href = 'login.html';
  } else {
    // carregamentos
    carregarServicosAdmin();
    carregarAgendamentos();
    carregarConfig();
    atualizarDashboard();
  }
});

function logout(){ auth.signOut().then(()=>window.location.href='index.html') }

// ---------------- SERVIÇOS ----------------
async function carregarServicosAdmin(){
  const container = document.getElementById('listaServicosAdmin');
  if(!container) return;
  db.collection('servicos').orderBy('nome').onSnapshot(snap => {
    let html = '';
    snap.forEach(doc => {
      const s = doc.data();
      html += `
        <div class="list-item">
          <div style="flex:1">
            <input value="${s.nome || ''}" onchange="atualizaNome('${doc.id}', this.value)" style="padding:6px;border-radius:8px;width:55%;border:1px solid #ddd">
            <input type="number" value="${s.valor || 0}" onchange="atualizaValor('${doc.id}', this.value)" style="padding:6px;border-radius:8px;width:30%;border:1px solid #ddd;margin-left:8px">
          </div>
          <div>
            <button onclick="removerServico('${doc.id}')" style="background:#e53935;color:#fff;padding:6px 8px;border:none;border-radius:8px">Excluir</button>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  });
}

function addServico(){
  const nome = document.getElementById('novoNome').value.trim();
  const valor = Number(document.getElementById('novoValor').value) || 0;
  if(!nome){ alert('Digite nome do serviço'); return; }
  db.collection('servicos').add({ nome, valor }).then(()=> {
    document.getElementById('novoNome').value='';
    document.getElementById('novoValor').value='';
  });
}

function atualizaNome(id, novo){ db.collection('servicos').doc(id).update({ nome: novo }) }
function atualizaValor(id, novo){ db.collection('servicos').doc(id).update({ valor: Number(novo) }) }
function removerServico(id){ if(confirm('Remover serviço?')) db.collection('servicos').doc(id).delete() }

// ---------------- CONFIG ----------------
function salvarConfig(){
  const dias = document.getElementById('diasFuncionamento').value || '';
  db.collection('config').doc('geral').set({ diasFuncionamento: dias.split(',').map(s=>s.trim()).filter(Boolean) })
  alert('Config salva');
}

function carregarConfig(){
  db.collection('config').doc('geral').onSnapshot(doc=>{
    const data = doc.exists ? doc.data() : null;
    if(data && data.diasFuncionamento){
      document.getElementById('diasFuncionamento').value = data.diasFuncionamento.join(',');
    }
  })
}

// ---------------- AGENDAMENTOS ----------------
async function carregarAgendamentos(){
  const lista = document.getElementById('listaAgendamentos');
  if(!lista) return;
  db.collection('agendamentos').orderBy('data','desc').onSnapshot(snap => {
    let html = '';
    snap.forEach(doc => {
      const a = doc.data();
      const id = doc.id;
      html += `
        <div class="list-item" style="flex-direction:column;align-items:flex-start">
          <div style="width:100%;display:flex;justify-content:space-between;align-items:center">
            <div><strong>${a.nomeCliente}</strong> — ${a.servicoNome} <span style="color:#d62a6c">R$ ${Number(a.valor).toFixed(2)}</span></div>
            <div>
              <button onclick="marcarConcluido('${id}')" style="padding:6px;border-radius:8px;background:#43a047;color:#fff;border:none">Concluir</button>
              <button onclick="removerAgendamento('${id}')" style="padding:6px;border-radius:8px;background:#e53935;color:#fff;border:none;margin-left:6px">Excluir</button>
            </div>
          </div>
          <div style="width:100%;margin-top:6px;color:#555">${a.data} • ${a.hora} • status: ${a.status || '—'}</div>
        </div>
      `;
    });
    lista.innerHTML = html;
    atualizarDashboard();
  });
}

function filtrarPorData(){
  const date = document.getElementById('filtroData').value;
  const lista = document.getElementById('listaAgendamentos');
  if(!date){ carregarAgendamentos(); return; }
  db.collection('agendamentos').where('data','==',date).orderBy('hora').get().then(snap => {
    let html = '';
    snap.forEach(doc => {
      const a = doc.data();
      html += `<div class="list-item"><div><strong>${a.nomeCliente}</strong> — ${a.servicoNome} • ${a.hora}</div></div>`;
    });
    lista.innerHTML = html;
  });
}

function marcarConcluido(id){ db.collection('agendamentos').doc(id).update({ status: 'concluido' }) }
function removerAgendamento(id){ if(confirm('Excluir agendamento?')) db.collection('agendamentos').doc(id).delete() }

// ---------------- DASHBOARD ----------------
function atualizarDashboard(){
  const cont = document.getElementById('dashboard');
  if(!cont) return;

  const hoje = new Date().toISOString().slice(0,10);
  Promise.all([
    db.collection('agendamentos').where('data','==',hoje).get(),
    db.collection('agendamentos').get(),
  ]).then(([hojeSnap, allSnap])=>{
    const totalHoje = hojeSnap.size;
    const total = allSnap.size;
    let concl = 0;
    let receita = 0;
    allSnap.forEach(d => {
      const a = d.data();
      if(a.status === 'concluido') concl++;
      receita += Number(a.valor || 0);
    });

    cont.innerHTML = `
      <div>Total agendamentos: <strong>${total}</strong></div>
      <div>Hoje: <strong>${totalHoje}</strong></div>
      <div>Concluídos: <strong>${concl}</strong></div>
      <div>Receita (estimada): <strong>R$ ${receita.toFixed(2)}</strong></div>
    `;
  });
}

// ---------------- EXPORT CSV ----------------
function exportarCSV(){
  db.collection('agendamentos').get().then(snap => {
    let csv = 'nomeCliente,servicoNome,valor,data,hora,status\n';
    snap.forEach(d => {
      const a = d.data();
      csv += `"${a.nomeCliente}","${a.servicoNome}",${a.valor},"${a.data}","${a.hora}","${a.status || ''}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'agendamentos.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
  });
}