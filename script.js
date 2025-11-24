function agendar() {
    const nome = document.getElementById('nome').value;
    const data = document.getElementById('data').value;
    const retorno = document.getElementById('retorno');

    if (!nome || !data) {
        retorno.innerText = "Preencha todos os campos!";
        return;
    }

    retorno.innerText = `Agendamento confirmado para ${nome} em ${new Date(data).toLocaleString()}`;
}
