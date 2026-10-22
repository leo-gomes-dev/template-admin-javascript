// 1. REFERÊNCIAS DOS ELEMENTOS HTML

const userForm = document.querySelector('#user-form');
const userName = document.querySelector('#user-name');
const userEmail = document.querySelector('#user-email');
const userAdmin = document.querySelector('#user-admin');

// referenciando os campos da tabela
const table = document.querySelector('#table-users-body');

let linhaEmEdicao = null;

if (userForm) {
  userForm.addEventListener('submit', saveData);
}

function saveData(e) {
  e.preventDefault();

  let name = userName.value.trim();
  let email = userEmail.value.trim();
  let admin = userAdmin.checked ? 'Sim' : 'Não';

  if (linhaEmEdicao) {
    // editando..
    const dados = obterDadosDaLinha(linhaEmEdicao);

    dados[0].textContent = 'Foto';
    dados[1].textContent = name;
    dados[2].textContent = email;
    dados[3].textContent = admin;

    linhaEmEdicao = null;
    alert('Usuario atualizado com sucesso!');
  } else {
    let tr = document.createElement('tr');

    tr.innerHTML = `
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>
        <button type="button" class="btn-excluir">Excluir</button>
        <button type="button" class="btn-editar">Editar</button>
      </td>
    `;

    const celulas = tr.querySelectorAll('td');

    celulas[0].textContent = 'Foto';
    celulas[1].textContent = name;
    celulas[2].textContent = email;
    celulas[3].textContent = admin;

    const btnExcluir = tr.querySelector('.btn-excluir');
    const btnEditar = tr.querySelector('.btn-editar');

    btnExcluir.addEventListener('click', () => deletar(tr));
    btnEditar.addEventListener('click', () => editar(tr));

    table.appendChild(tr);
    alert('Usuario cadastrado');
  }

  userForm.reset();

  atualizarEstatisticas();
}

// obter os dados
function obterDadosDaLinha(tr) {
  return tr.querySelectorAll('td');
}

// Deletar
function deletar(tr) {
  tr.remove();

  console.log('Usuário deletado:', tr);

  atualizarEstatisticas();
}

// Editar
function editar(tr) {
  linhaEmEdicao = tr;

  const dados = obterDadosDaLinha(tr);

  userName.value = dados[1].textContent;
  userEmail.value = dados[2].textContent;
  userAdmin.checked = dados[3].textContent === 'Sim';
}

// ATUALIZAR AS ESTATÍSTICAS DO PAINEL
function atualizarEstatisticas() {
  const linhas = table.querySelectorAll('tr');

  const total = linhas.length;

  let adminCount = 0;

  linhas.forEach((linha) => {
    const colunas = obterDadosDaLinha(linha);
    if (colunas[3] && colunas[3].textContent === 'Sim') {
      adminCount++;
    }
  });

  const totalUsuarios = document.querySelector('#count-users');
  const totalAdmin = document.querySelector('#count-admins');

  if (totalUsuarios) totalUsuarios.textContent = total;
  if (totalAdmin) totalAdmin.textContent = adminCount;
}

// 8. ATUALIZAR AS ESTATÍSTICAS DO PAINEL

// Criar uma função chamada atualizarEstatisticas().

// Contar quantos usuários existem na tabela.

// Contar quantos usuários possuem o status de administrador "Sim".

// Atualizar o elemento HTML que exibe o total de usuários.

// Atualizar o elemento HTML que exibe o total de administradores.

// Exemplo:
// Total de usuários: 10
// Total de administradores: 3

// IMPORTANTE:
// Chamar atualizarEstatisticas() depois de cadastrar,
// editar ou excluir um usuário.

// Ao editar o status de um usuário comum para administrador,
// incrementar a quantidade de administradores.

// Ao editar o status de um administrador para usuário comum,
// diminuir a quantidade de administradores.

// Evitar incrementar ou diminuir manualmente sem verificar
// o estado atual da tabela. Recalcular os totais evita erros.
