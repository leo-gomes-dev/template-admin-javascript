const table = document.querySelector('#table-users-body');
const form = document.querySelector('#user-form');
const userName = document.querySelector('#user-name');
const userEmail = document.querySelector('#user-email');
const userAdmin = document.querySelector('#user-admin');

// armazena a linha que está sendo editada no momento
let linhaEmEdicao = null;

if (form) {
  form.addEventListener('submit', saveData);
}

function saveData(e) {
  e.preventDefault();
  let user = userName.value;
  let email = userEmail.value;
  let admin = userAdmin && userAdmin.checked ? 'Sim' : 'Não';

  if (linhaEmEdicao) {
    const celulas = linhaEmEdicao;
  } else {
    // Modo de criação normal (seu código original)
    let tr = document.createElement('tr');
    tr.innerHTML = `
      <td><img src="../../img/profile.png" style="width:40px ;" alt="imagem do ususario" ></td>
      <td>${user}</td>
      <td>${email}</td>
      <td>${admin}</td>
      <td>
        <div>
          <button class="btn-excluir">Excluir</button>
          <button class="btn-editar">Editar</button>
        </div>
      </td>
    `;

    const btnExcluir = tr.querySelector('.btn-excluir');
    const btnEditar = tr.querySelector('.btn-editar');

    btnExcluir.addEventListener('click', () => deletar(tr));
    btnEditar.addEventListener('click', () => editar(tr));

    table.appendChild(tr);
  }
  form.reset();
}

function deletar(linha) {
  // Se a linha que está sendo deletada for a que está em edição, limpa o formulário
  if (linha === linhaEmEdicao) {
    linhaEmEdicao = null;
    form.reset();
  }
  linha.remove();
  alert('Usuário excluído!');
}

function editar(linha) {
  console.log(linha);
}
