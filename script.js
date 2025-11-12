function mostrar(pagina) {
  document.querySelectorAll(".secao").forEach(secao => secao.classList.add("oculto"));
  document.getElementById(pagina).classList.remove("oculto");
}

function agendar() {
  const nome = document.getElementById("nome").value;
  const servico = document.getElementById("servico").value;
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;
  const confirmacao = document.getElementById("confirmacao");

  confirmacao.textContent = `✅ Olá, ${nome}! Seu horário para ${servico} foi agendado em ${data} às ${hora}.`;
  confirmacao.style.color = "#4CAF50";

  document.querySelector("form").reset();
  return false; // impede recarregamento da página
}
