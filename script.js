// script.js - cliente (index.html)
// firebase.js já deve ter sido incluído (auth, db)

// util: mostrar/ocultar páginas
function mostrar(id){
  document.querySelectorAll('.secao').forEach(s => s.classList.add('oculto'));
  const el = document.getElementById(id);
  if(el) el.classList.remove('oculto');
}

// popula serviços em tempo real e select
function carregarServicosSite(){
  const lista = document.getElementById('servicosSite');
  const select = document.getElementById('servicoSelect');
  if(!lista || !select) return;

  db.collection('servicos').orderBy('nome').onSnapshot(snap => {
    let html = '';
    let options = '<option value="">Selecione um serviço</option>';
    snap.forEach(doc => {
      const s = doc.data();
      html += `<div class="card-servico vidro"><h3>${s.nome}</h3><p>R$ ${Number(s.valor).toFixed(2)}</p></div>`;
      options += `<option value="${doc.id}">${s.nome} — R$ ${Number(s.valor).toFixed(2)}</option>`;
    });
    lista.innerHTML = html;
    select.innerHTML = options;
  });
}

// handle agendamento
document.addEventListener('DOMContentLoaded', () => {
  carregarServicosSite();

  const form = document.getElementById('formAgendamento');
  if(form){
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nome = document.getElementById('nome').value.trim();
      const servicoId = document.getElementById('servicoSelect').value;
      const data = document.getElementById('data').value;
      const hora = document.getElementById('hora').value;
      const confirm = document.getElementById('confirmacao');

      if(!nome || !servicoId || !data || !hora){
        confirm.innerText = 'Preencha todos os campos.';
        confirm.style.color = 'red';
        return;
      }

      // Verifica se horário já existe
      const ref = db.collection('agendamentos');
      const snapshot = await ref.where('data','==',data).where('hora','==',hora).get();
      if(!snapshot.empty){
        confirm.innerText = 'Horário indisponível. Escolha outro.';
        confirm.style.color = 'red';
        return;
      }

      // Pega dados do serviço (nome/valor)
      const sDoc = await db.collection('servicos').doc(servicoId).get();
      const sData = sDoc.exists ? sDoc.data() : { nome: 'Serviço', valor: 0 };

      // Salva agendamento
      await db.collection('agendamentos').add({
        nomeCliente: nome,
        servicoId,
        servicoNome: sData.nome || '',
        valor: Number(sData.valor) || 0,
        data,
        hora,
        criadoEm: firebase.firestore.FieldValue.serverTimestamp(),
        status: 'agendado' // agendado, concluido, cancelado
      });

      confirm.innerText = `✅ ${nome}, seu horário para ${sData.nome} em ${data} às ${hora} foi criado.`;
      confirm.style.color = '#2e7d32';
      form.reset();

      // link WhatsApp com mensagem pronta (abertura)
      const phone = '5586988888888'; // número do salão (troque se quiser)
      const text = encodeURIComponent(`Olá! Eu, ${nome}, agendei ${sData.nome} em ${data} às ${hora}. Confirma, por favor?`);
      const waLink = `https://wa.me/${phone}?text=${text}`;
      const whEl = document.getElementById('link-whats-principal');
      if(whEl){ whEl.href = waLink; }
      // opcional: abrir whats automaticamente -> window.open(waLink, '_blank');
    });
  }
});