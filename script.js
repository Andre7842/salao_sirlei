// script.js — lógica da página pública

// Número de WhatsApp no formato internacional (sem sinais). Substitua pelo número real.
const WHATSAPP_NUMBER = '5513997315017'; // exemplo: 55 (Brasil) 13 99731-5017 -> 5513997315017

// Botão rápido na hero
const waBtn = document.getElementById('whatsappBtn');
if(waBtn){
  waBtn.href = `https://wa.me/${WHATSAPP_NUMBER}`;
  waBtn.target = '_blank';
}

// Formulário que envia mensagem formatada para o WhatsApp
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const service = document.getElementById('service').value.trim();
    const date = document.getElementById('date').value;
    let text = `Olá, meu nome é ${encodeURIComponent(name)}.%0ASolicito agendamento para: ${encodeURIComponent(service)}.`;
    if(date) text += `%0AData preferida: ${encodeURIComponent(date)}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, '_blank');
  });
}