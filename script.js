document.addEventListener('DOMContentLoaded', function () {
    // Aguarde o DOM ser completamente carregado
  
    // Crie uma lista para armazenar os agendamentos
    var listaAgendamentos = [];
  
    // Selecione o formulário
    var formulario = document.querySelector('form');
  
    // Selecione a tabela
    var tabelaAgendamentos = document.getElementById('tabelaAgendamentos').getElementsByTagName('tbody')[0];
  
    // Função para atualizar a tabela
    function atualizarTabela() {
      // Limpe o conteúdo atual da tabela
      tabelaAgendamentos.innerHTML = '';
  
      // Adicione cada agendamento à tabela
      listaAgendamentos.forEach(function (agendamento) {
        var row = tabelaAgendamentos.insertRow();
        row.insertCell(0).innerText = agendamento.horario; // Campo de horário
        row.insertCell(1).innerText = agendamento.data; // Campo de data
        row.insertCell(2).innerText = agendamento.cpfCliente;
        row.insertCell(3).innerText = agendamento.nomeCliente;
        row.insertCell(4).innerText = agendamento.telefoneCliente;
        row.insertCell(5).innerText = agendamento.idProcedimento;
        row.insertCell(6).innerText = agendamento.nomeProcedimento;
        row.insertCell(7).innerText = agendamento.cpfProfissional;
        row.insertCell(8).innerText = agendamento.nomeProfissional;
      });
    }
  
    // Adicione um ouvinte de evento ao botão "Finalizar Agendamento"
    document.getElementById('botao').addEventListener('click', function (event) {
      // Impedir o comportamento padrão do botão (enviar e recarregar a página)
      event.preventDefault();
  
      // Obter os valores dos campos do formulário
      var cpfCliente = document.getElementById('cpf_cliente').value;
      var nomeCliente = document.getElementById('nome_cliente').value;
      var telefoneCliente = document.getElementById('telefone_cliente').value;
      var idProcedimento = document.getElementById('id_procedimento').value;
      var nomeProcedimento = document.getElementById('nome_procedimento').value;
      var cpfProfissional = document.getElementById('cpf_profissional').value;
      var nomeProfissional = document.getElementById('nome_profissional').value;
      var horario = document.getElementById('horario').value; // Novo campo de horário
      var data = document.getElementById('data').value; // Novo campo de data
  
      // Criar um objeto com os dados do agendamento
      var agendamento = {
        horario: horario, // Novo campo de horário
        data: data, // Novo campo de data
        cpfCliente: cpfCliente,
        nomeCliente: nomeCliente,
        telefoneCliente: telefoneCliente,
        idProcedimento: idProcedimento,
        nomeProcedimento: nomeProcedimento,
        cpfProfissional: cpfProfissional,
        nomeProfissional: nomeProfissional
      };
  
      // Adicionar o agendamento à lista
      listaAgendamentos.push(agendamento);
  
      // Limpar os campos do formulário após o envio
      formulario.reset();
  
      // Atualizar a tabela com os agendamentos mais recentes
      atualizarTabela();
    });
  });
  