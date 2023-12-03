document.addEventListener('DOMContentLoaded', function () {
    var listaAgendamentos = [];
    var formulario = document.querySelector('form');
    var tabelaAgendamentos = document.getElementById('tabelaAgendamentos').getElementsByTagName('tbody')[0];

    function atualizarTabela() {
      tabelaAgendamentos.innerHTML = '';

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
  
    document.getElementById('botao').addEventListener('click', function (event) {
      event.preventDefault();

      var cpfCliente = document.getElementById('cpf_cliente').value;
      var nomeCliente = document.getElementById('nome_cliente').value;
      var telefoneCliente = document.getElementById('telefone_cliente').value;
      var idProcedimento = document.getElementById('id_procedimento').value;
      var nomeProcedimento = document.getElementById('nome_procedimento').value;
      var cpfProfissional = document.getElementById('cpf_profissional').value;
      var nomeProfissional = document.getElementById('nome_profissional').value;
      var horario = document.getElementById('horario').value; 
      var data = document.getElementById('data').value; 
  
      var agendamento = {
        horario: horario, 
        data: data, 
        cpfCliente: cpfCliente,
        nomeCliente: nomeCliente,
        telefoneCliente: telefoneCliente,
        idProcedimento: idProcedimento,
        nomeProcedimento: nomeProcedimento,
        cpfProfissional: cpfProfissional,
        nomeProfissional: nomeProfissional
      };
      
      listaAgendamentos.push(agendamento);

      formulario.reset();

      atualizarTabela();
    });
  });
  