document.getElementById('form-agendar').addEventListener('submit', function(e){
e.preventDefault();

const nome = document.getElementById('nome').value;
const data = document.getElementById('data').value;
const servico = document.getElementById('servico').value;

if(!nome || !data || !servico){ alert("Preencha todos os campos."); return; }

const horario = { nome, data, servico };

let lista = JSON.parse(localStorage.getItem('agendamentos')) || [];
lista.push(horario);
localStorage.setItem('agendamentos', JSON.stringify(lista));

alert("Agendamento enviado com sucesso!");

document.getElementById('form-agendar').reset();
});