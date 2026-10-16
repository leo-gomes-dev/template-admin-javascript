const form = document.querySelector('#login-form');
const email = document.querySelector('#login-email');
const password = document.querySelector('#login-password');

// Evento de escuta do formulario
form.addEventListener('submit', loginUser);

// Função para Logar User
function loginUser(e) {
  e.preventDefault();

  // validar se os campos foram preenchidos
  if (email.value === '' && password.value === '') {
    // precisamos alertar o usuario para preencher os campos

    alert('Preencha os campos para prosseguir');
  }

  // validar se a senha esta correta
  if (email.value === 'leo@teste.com' && password.value === '123456') {
    window.location.href = 'pages/dashboard/dashboard.html';

    console.log(`Sejam bem vindo ${email}`);
  } else {
    alert('Email ou senha esta incorreto');
    return;
  }
}
