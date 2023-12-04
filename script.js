
/////////
//PARTE DE SALVAR DADOS A PARTIR DO AGENDAMENTO
/////////

// Função chamada ao enviar o formulário
function salvarDados(event) {
  // Evitar o comportamento padrão de recarregar a página
  event.preventDefault();

  // Obter referências aos campos do formulário
  var dataHorario = document.getElementById('dataHorario').value;
  var cpfCliente = document.getElementById('cpfCliente').value;
  var nomeCliente = document.getElementById('nomeCliente').value;
  var telefoneCliente = document.getElementById('telefoneCliente').value;
  var idProcedimento = document.getElementById('idProcedimento').value;
  var nomeProcedimento = document.getElementById('nomeProcedimento').value;
  var cpfProfissional = document.getElementById('cpfProfissional').value;
  var nomeProfissional = document.getElementById('nomeProfissional').value;

  // Criar um objeto com os dados
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

  // Exemplo: Imprimir os dados no console (pode ser substituído pelo envio para um servidor)
  console.log('Dados a serem salvos:', dados);

  // Limpar os campos do formulário após salvar (opcional)
  document.getElementById('formulario').reset();
}

// Adicionar um ouvinte de evento ao formulário
document.getElementById('formulario').addEventListener('submit', salvarDados);

/////////
//TABELA DE AGENDAMENTOS 
/////////

// Função chamada ao enviar o formulário
function salvarDados(event) {
  // Evitar o comportamento padrão de recarregar a página
  event.preventDefault();

  // Obter referências aos campos do formulário
  var dataHorario = document.getElementById('dataHorario').value;
  var cpfCliente = document.getElementById('cpfCliente').value;
  var idProcedimento = document.getElementById('idProcedimento').value;
  var cpfProfissional = document.getElementById('cpfProfissional').value;

  // Criar uma nova linha para a tabela de Procedimentos Agendados
  var tableBody = document.querySelector('#procedimentosAgendados tbody');
  var newRow = tableBody.insertRow(tableBody.rows.length);

  // Criar células e adicionar os dados
  var cellDataHorario = newRow.insertCell(0);
  var cellCpfCliente = newRow.insertCell(1);
  var cellIdProcedimento = newRow.insertCell(2);
  var cellCpfProfissional = newRow.insertCell(3);

  cellDataHorario.appendChild(document.createTextNode(dataHorario));
  cellCpfCliente.appendChild(document.createTextNode(cpfCliente));
  cellIdProcedimento.appendChild(document.createTextNode(idProcedimento));
  cellCpfProfissional.appendChild(document.createTextNode(cpfProfissional));

  // Limpar os campos do formulário após salvar (opcional)
  document.getElementById('formulario').reset();
}

// Adicionar um ouvinte de evento ao formulário
document.getElementById('formulario').addEventListener('submit', salvarDados);

///////
//EXCLUIR AGENDAMENTO
////////

// Função chamada ao enviar o formulário
function salvarDados(event) {
  // Evitar o comportamento padrão de recarregar a página
  event.preventDefault();

  // Obter referências aos campos do formulário
  var dataHorario = document.getElementById('dataHorario').value;
  var cpfCliente = document.getElementById('cpfCliente').value;
  var idProcedimento = document.getElementById('idProcedimento').value;
  var cpfProfissional = document.getElementById('cpfProfissional').value;

  // Criar uma nova linha para a tabela de Procedimentos Agendados
  var table = document.querySelector('#procedimentosAgendados tbody');
  var newRow = table.insertRow();

  // Adicionar células com os dados e botão de excluir
  newRow.innerHTML = `
      <td>${dataHorario}</td>
      <td>${cpfCliente}</td>
      <td>${idProcedimento}</td>
      <td>${cpfProfissional}</td>
      <td><button onclick="excluirLinha(this)">Excluir</button></td>
  `;

  // Limpar os campos do formulário após salvar (opcional)
  document.getElementById('formulario').reset();
}

// Função para excluir a linha
function excluirLinha(btn) {
  var row = btn.parentNode.parentNode; // Obter a linha pai do botão
  row.parentNode.removeChild(row); // Remover a linha da tabela
}

// Adicionar um ouvinte de evento ao formulário
document.getElementById('formulario').addEventListener('submit', salvarDados);

//////
//TABELA DE BACKUP 
//////

// Função para excluir a linha
function excluirLinha(btn) {
  var row = btn.parentNode.parentNode; // Obter a linha pai do botão
  var tableBackup = document.querySelector('#tabelaBackup tbody');

  // Criar uma nova linha para a tabela de backup
  var newRowBackup = tableBackup.insertRow();

  // Copiar os dados da linha principal para a linha de backup
  for (var i = 0; i < row.cells.length - 1; i++) {
      var cellBackup = newRowBackup.insertCell(i);
      cellBackup.textContent = row.cells[i].textContent;
  }

  // Remover a linha da tabela principal
  row.parentNode.removeChild(row);
}

// Função chamada ao enviar o formulário de login do cliente
function entrarCliente() {
  var cpfConsulta = document.getElementById('cpfPessoaConsulta').value;
  var senhaConsulta = document.getElementById('senhaPessoaConsulta').value;

  // Simulação de autenticação (substitua pela lógica real)
  if (senhaConsulta === '10') {
      // Filtrar agendamentos com base no CPF do cliente
      var agendamentosFiltrados = agendamentos.filter(function (agendamento) {
          return agendamento.cpfCliente === cpfConsulta;
      });

      // Preencher a tabela de agendamentos do cliente
      var tableCliente = document.querySelector('#agendamentosCliente tbody');
      tableCliente.innerHTML = '';

      for (var i = 0; i < agendamentosFiltrados.length; i++) {
          var agendamento = agendamentosFiltrados[i];
          var newRowCliente = tableCliente.insertRow(tableCliente.rows.length);

          newRowCliente.innerHTML = `
              <td>${agendamento.data}</td>
              <td>${agendamento.cpfCliente}</td>
              <td>${agendamento.idProcedimento}</td>
              <td>${agendamento.cpfProfissional}</td>
          `;
      }
  } else {
      alert('CPF ou senha incorretos.');
  }
}

// Função para excluir a linha e registrar a data de exclusão
function excluirLinha(btn) {
  var row = btn.parentNode.parentNode; // Obter a linha pai do botão
  var tableBackup = document.querySelector('#tabelaBackupBody');

  // Criar uma nova linha para a tabela de backup
  var newRowBackup = tableBackup.insertRow();

  // Copiar os dados da linha principal para a linha de backup
  for (var i = 0; i < row.cells.length; i++) {
      var cellBackup = newRowBackup.insertCell(i);
      cellBackup.textContent = row.cells[i].textContent;
  }

  // Adicionar a data de exclusão
  var cellDataExclusao = newRowBackup.insertCell(row.cells.length);
  cellDataExclusao.textContent = new Date().toLocaleString();

  // Remover a linha da tabela principal
  row.parentNode.removeChild(row);
}
