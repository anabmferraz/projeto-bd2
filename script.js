/*
SALVAR DADOS A PARTIR DO AGENDAMENTO
*/

//Função chamada ao enviar o formulário
function salvarDados(event) {
  event.preventDefault();

  //Obter referências aos campos do formulário
  var dataHorario = document.getElementById('dataHorario').value;
  var cpfCliente = document.getElementById('cpfCliente').value;
  var nomeCliente = document.getElementById('nomeCliente').value;
  var telefoneCliente = document.getElementById('telefoneCliente').value;
  var idProcedimento = document.getElementById('idProcedimento').value;
  var nomeProcedimento = document.getElementById('nomeProcedimento').value;
  var cpfProfissional = document.getElementById('cpfProfissional').value;
  var nomeProfissional = document.getElementById('nomeProfissional').value;

  //Criar um objeto com os dados
  var dados = {
      dataHorario: dataHorario,
      cpfCliente: cpfCliente,
      nomeCliente: nomeCliente,
      telefoneCliente: telefoneCliente,
      idProcedimento: idProcedimento,
      nomeProcedimento: nomeProcedimento,
      cpfProfissional: cpfProfissional,
      nomeProfissional: nomeProfissional
  };

  console.log('Dados a serem salvos:', dados);
  //Limpar os campos do formulário após salvar 
  document.getElementById('formulario').reset();
}

//Adicionar um ouvinte de evento ao formulário
document.getElementById('formulario').addEventListener('submit', salvarDados);


/*
TABELA DE AGENDAMENTOS
*/

function adicionarLinhaAgendamento(event) {
  event.preventDefault();

  //Obter referências aos campos do formulário
  var dataHorario = document.getElementById('dataHorario').value;
  var cpfCliente = document.getElementById('cpfCliente').value;
  var nomeCliente = document.getElementById('nomeCliente').value;
  var telefoneCliente = document.getElementById('telefoneCliente').value;
  var idProcedimento = document.getElementById('idProcedimento').value;
  var nomeProcedimento = document.getElementById('nomeProcedimento').value;
  var cpfProfissional = document.getElementById('cpfProfissional').value;
  var nomeProfissional = document.getElementById('nomeProfissional').value;

  //Criar uma nova linha para a tabela de Procedimentos Agendados
  var tableBody = document.getElementById('procedimentosAgendados').getElementsByTagName('tbody')[0];
  var newRow = tableBody.insertRow();

  //Adicionar células com os dados
  newRow.innerHTML = `
      <td>${dataHorario}</td>
      <td>${cpfCliente}</td>
      <td>${nomeCliente}</td>
      <td>${telefoneCliente}</td>
      <td>${idProcedimento}</td>
      <td>${nomeProcedimento}</td>
      <td>${nomeProfissional}</td>
      <td>${cpfProfissional}</td>
  `;

  //Limpar os campos do formulário após salvar
  document.getElementById('formulario').reset();
}

//Adicionar um ouvinte de evento ao formulário de agendamento
document.getElementById('formulario').addEventListener('submit', adicionarLinhaAgendamento);


/*
EXCLUIR AGENDAMENTO
*/

//Função chamada ao enviar o formulário
function salvarDados(event) {
  //Evitar o comportamento padrão de recarregar a página
  event.preventDefault();

  //Obter referências aos campos do formulário
  var dataHorario = document.getElementById('dataHorario').value;
  var cpfCliente = document.getElementById('cpfCliente').value;
  var nomeCliente = document.getElementById('nomeCliente').value;
  var telefoneCliente = document.getElementById('telefoneCliente').value;
  var idProcedimento = document.getElementById('idProcedimento').value;
  var nomeProcedimento = document.getElementById('nomeProcedimento').value;
  var cpfProfissional = document.getElementById('cpfProfissional').value;
  var nomeProfissional = document.getElementById('nomeProfissional').value;

  //Criar uma nova linha para a tabela de Procedimentos Agendados
  var table = document.querySelector('#procedimentosAgendados tbody');
  var newRow = table.insertRow();

  newRow.innerHTML = `
      <td>${dataHorario}</td>
      <td>${cpfCliente}</td>
      <td>${nomeCliente}</td>
      <td>${telefoneCliente}</td>
      <td>${idProcedimento}</td>
      <td>${nomeProcedimento}</td>
      <td>${nomeProfissional}</td>
      <td>${cpfProfissional}</td>
      <td><button onclick="excluirLinha(this)">Excluir</button></td>
  `;

  //Limpar os campos do formulário após salvar
  document.getElementById('formulario').reset();
}

//Função para excluir a linha
function excluirLinha(btn) {
  var row = btn.parentNode.parentNode; //Obter a linha pai do botão
  row.parentNode.removeChild(row); //Remover a linha da tabela
}

//Adicionar um ouvinte de evento ao formulário
document.getElementById('formulario').addEventListener('submit', salvarDados);


/*
TABELA DE BACKUP
*/

//Função para excluir a linha
function excluirLinha(btn) {
  var row = btn.parentNode.parentNode; //Obter a linha pai do botão
  var tableBackup = document.querySelector('#tabelaBackup tbody');

  //Criar uma nova linha para a tabela de backup
  var newRowBackup = tableBackup.insertRow();

  //Copiar os dados da linha principal para a linha de backup
  for (var i = 0; i < row.cells.length - 1; i++) {
      var cellBackup = newRowBackup.insertCell(i);
      cellBackup.textContent = row.cells[i].textContent;
  }

  //Remover a linha da tabela principal
  row.parentNode.removeChild(row);
}

//Função para o login do cliente
function entrarCliente() {
  var usernameConsulta = document.getElementById('usernameClienteConsulta').value;
  var senhaConsulta = document.getElementById('senhaPessoaConsulta').value;

  //Simulação de autenticação (substitua pela lógica real)
  if (senhaConsulta === '10') {
    //Filtrar agendamentos com base no username do cliente
    var agendamentosFiltrados = agendamentos.filter(function (agendamento) {
      return agendamento.usernameCliente === usernameConsulta;
    });

    //Preencher a tabela de agendamentos do cliente
    var tableCliente = document.querySelector('#agendamentosCliente tbody');
    tableCliente.innerHTML = '';

    for (var i = 0; i < agendamentosFiltrados.length; i++) {
      var agendamento = agendamentosFiltrados[i];
      var newRowCliente = tableCliente.insertRow(tableCliente.rows.length);

      newRowCliente.innerHTML = `
          <td>${agendamento.data}</td>
          <td>${agendamento.usernameCliente}</td> 
          <td>${agendamento.idProcedimento}</td>
          <td>${agendamento.cpfProfissional}</td>
      `;
    }
  } else {
    alert('Nome de usuário ou senha incorretos.');
  }
}

//Função para excluir a linha e registrar a data de exclusão
  function excluirLinha(btn) {
    var row = btn.closest('tr'); //Obter a linha pai do botão
    var tableBackup = document.querySelector('#tabelaBackup tbody');
  
    //Obter os dados da linha principal
    var dataHorario = row.cells[0].textContent;
    var cpfCliente = row.cells[1].textContent;
    var idProcedimento = row.cells[4].textContent;
    var cpfProfissional = row.cells[7].textContent;
  
    //Criar um objeto com os dados
    var dadosBackup = {
      data: dataHorario,
      cpfCliente: cpfCliente,
      idProcedimento: idProcedimento,
      cpfProfissional: cpfProfissional,
      dataExclusao: new Date().toLocaleString()
    };
  
    //Criar uma nova linha para a tabela de backup
    var newRowBackup = tableBackup.insertRow();
  
    //Adicionar as células com os dados do objeto
    for (var key in dadosBackup) {
      var cell = newRowBackup.insertCell();
      cell.textContent = dadosBackup[key];
    }
  
    //Remover a linha da tabela principal
    row.parentNode.removeChild(row);
  }

//Função para esconder elementos
function esconderElemento(elementoId) {
  document.getElementById(elementoId).style.display = 'none';
}

//Função para mostrar elementos
function mostrarElemento(elementoId) {
  document.getElementById(elementoId).style.display = 'block';
}


//Função para fazer login do funcionário
function entrarFuncionario() {
  var usernameConsulta = document.getElementById('usernameFuncionarioConsulta').value;
  var senhaConsulta = document.getElementById('senhaFuncionarioConsulta').value;

  //Simulação de autenticação (substitua pela lógica real)
  if (senhaConsulta === 'senhaDoFuncionario') {
    //Lógica para o login do funcionário (substitua conforme necessário)
    alert('Login do Funcionário bem-sucedido!');
    //Exemplo: redirecionar para uma página de administração, etc.
  } else {
    alert('Nome de usuário ou senha incorretos para o funcionário.');
  }
}


/*!ESSA PARTE SERVE PARA ESCONDER AS TABELAS DO FUNCIONARIO
//Função chamada ao clicar no botão Entrar
function entrar() {
  // Obtenha o CPF e a senha digitados
  var cpfDigitado = document.getElementById('cpfPessoaConsulta').value;
  var senhaDigitada = document.getElementById('senhaPessoaConsulta').value;

  // Verifique se o CPF e a senha estão corretos (substitua isso pela lógica real de autenticação)
  if (cpfDigitado === 'cpfCorreto' && senhaDigitada === 'senhaCorreta') {
      // Mostrar os elementos do formulário, tabela de procedimentos agendados e tabela de backup
      mostrarElemento('formulario');
      mostrarElemento('procedimentosAgendados');
      mostrarElemento('tabelaBackup');
      // Esconder a seção de login
      esconderElemento('secaoPessoa');
  }else{
      //Exibir mensagem de erro (pode ser substituída por uma lógica de tratamento de erro adequada)
      alert('CPF ou senha incorretos. Tente novamente.');
  }
}

//Inicialmente, esconder o formulário, a tabela de procedimentos agendados e a tabela de backup
esconderElemento('formulario');
esconderElemento('procedimentosAgendados');
esconderElemento('tabelaBackup');
*/
