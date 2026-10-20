// 1. REFERÊNCIAS DOS ELEMENTOS HTML

// Selecionar os elementos da tabela e do formulário.
const table = document.querySelector('#table-users-body');
const form = document.querySelector('#user-form');

// Selecionar os campos do formulário.
const userName = document.querySelector('#user-name');
const userEmail = document.querySelector('#user-email');
const userAdmin = document.querySelector('#user-admin');

// Selecionar os elementos das estatísticas.
const totalUsuarios = document.querySelector('#count-users');
const totalAdmins = document.querySelector('#count-admins');

// Guardar a linha que está sendo editada.
// null significa que nenhuma linha está sendo editada.
let linhaEmEdicao = null;

// 2. EVENTO DO FORMULÁRIO

// Executar a função saveData quando o formulário for enviado.
if (form) {
  form.addEventListener('submit', saveData);
}

// 3. CADASTRAR OU ATUALIZAR UM USUÁRIO

function saveData(e) {
  // Impedir que a página seja recarregada.
  e.preventDefault();

  // Capturar os valores digitados no formulário.
  const user = userName.value.trim();
  const email = userEmail.value.trim();

  // Verificar se a opção de administrador está marcada.
  const admin = userAdmin.checked ? 'Sim' : 'Não';

  // Verificar se estamos editando um usuário existente.
  if (linhaEmEdicao) {
    // Recuperar as células da linha que será editada.
    const dados = obterDadosDaLinha(linhaEmEdicao);

    // Atualizar as informações do usuário.
    dados.celulas[1].textContent = user;
    dados.celulas[2].textContent = email;
    dados.celulas[3].textContent = admin;

    // Finalizar o modo de edição.
    linhaEmEdicao = null;

    alert('Usuário atualizado com sucesso!');
  } else {
    // Criar uma nova linha na tabela.
    const tr = document.createElement('tr');

    // Inserir as informações e os botões na linha.
    tr.innerHTML = `
      <td>
        <img
          src="../../img/profile.png"
          style="width: 40px;"
          alt="Imagem do usuário"
        >
      </td>
      <td></td>
      <td></td>
      <td></td>
      <td>
        <div>
          <button type="button" class="btn-excluir">Excluir</button>
          <button type="button" class="btn-editar">Editar</button>
        </div>
      </td>
    `;

    // Preencher os dados usando textContent.
    // Isso evita interpretar o nome e o e-mail como HTML.
    const celulas = tr.querySelectorAll('td');

    celulas[1].textContent = user;
    celulas[2].textContent = email;
    celulas[3].textContent = admin;

    // Selecionar os botões da nova linha.
    const btnExcluir = tr.querySelector('.btn-excluir');
    const btnEditar = tr.querySelector('.btn-editar');

    // Adicionar os eventos dos botões.
    btnExcluir.addEventListener('click', () => deletar(tr));
    btnEditar.addEventListener('click', () => editar(tr));

    // Adicionar a linha ao corpo da tabela.
    table.appendChild(tr);

    alert('Usuário cadastrado com sucesso!');
  }

  // Atualizar as estatísticas após cadastrar ou editar.
  atualizarEstatisticas();

  // Limpar os campos do formulário.
  form.reset();
}

// 4. EXCLUIR UM USUÁRIO

function deletar(linha) {
  // Se a linha excluída estiver em edição, limpar o formulário.
  if (linha === linhaEmEdicao) {
    linhaEmEdicao = null;
    form.reset();
  }

  // Remover a linha da tabela.
  linha.remove();

  // Recalcular os totais após a exclusão.
  atualizarEstatisticas();

  alert('Usuário excluído com sucesso!');
}

// 5. RECUPERAR OS DADOS DE UMA LINHA

function obterDadosDaLinha(linha) {
  // Selecionar todas as células da linha.
  const celulas = linha.querySelectorAll('td');

  // Retornar os dados do usuário.
  return {
    nome: celulas[1].textContent,
    email: celulas[2].textContent,
    isAdmin: celulas[3].textContent === 'Sim',
    celulas: celulas,
  };
}

// 6. EDITAR UM USUÁRIO

function editar(linha) {
  // Guardar a linha que será editada.
  linhaEmEdicao = linha;

  // Recuperar os dados do usuário selecionado.
  const dados = obterDadosDaLinha(linha);

  // Preencher o formulário com os dados existentes.
  userName.value = dados.nome;
  userEmail.value = dados.email;
  userAdmin.checked = dados.isAdmin;

  // Colocar o cursor no campo de nome.
  userName.focus();
}

// 7. ATUALIZAR AS ESTATÍSTICAS

function atualizarEstatisticas() {
  // Selecionar todas as linhas de usuários cadastrados.
  const linhas = table.querySelectorAll('tr');

  // O total de usuários corresponde à quantidade de linhas.
  const quantidadeUsuarios = linhas.length;

  // Começar a contagem de administradores em zero.
  let quantidadeAdmins = 0;

  // Percorrer todas as linhas da tabela.
  linhas.forEach((linha) => {
    // Recuperar os dados do usuário atual.
    const dados = obterDadosDaLinha(linha);

    // Se for administrador, incrementar a contagem.
    if (dados.isAdmin) {
      quantidadeAdmins++;
    }
  });

  // Exibir os totais no HTML.
  totalUsuarios.textContent = quantidadeUsuarios;
  totalAdmins.textContent = quantidadeAdmins;
}

// 8. INICIALIZAR AS ESTATÍSTICAS

// Atualizar os totais assim que o script for executado.
// Isso também considera os usuários que já estão na tabela.
if (table && totalUsuarios && totalAdmins) {
  atualizarEstatisticas();
}
