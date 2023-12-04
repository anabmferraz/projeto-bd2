document.getElementById("botao").addEventListener("click", function (event) {
  event.preventDefault();

  var cpfCliente = document.getElementById("cpf_cliente").value;
  var nomeCliente = document.getElementById("nome_cliente").value;
  var telefoneCliente = document.getElementById("telefone_cliente").value;
  var idProcedimento = document.getElementById("id_procedimento").value;
  var nomeProcedimento = document.getElementById("nome_procedimento").value;
  var cpfProfissional = document.getElementById("cpf_profissional").value;
  var nomeProfissional = document.getElementById("nome_profissional").value;
  var horario = document.getElementById("horario").value;
  var data = document.getElementById("data").value;

  var agendamento = {
    horario: horario,
    data: data,
    cpfCliente: cpfCliente,
    nomeCliente: nomeCliente,
    telefoneCliente: telefoneCliente,
    idProcedimento: idProcedimento,
    nomeProcedimento: nomeProcedimento,
    cpfProfissional: cpfProfissional,
    nomeProfissional: nomeProfissional,
  };

  fetch("http://localhost:8080", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(agendamento),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Agendamento inserido com sucesso:", data);

      fetch("http://localhost:8080/agendamentos")
        .then((response) => response.json())
        .then((data) => {
          atualizarTabela(data);
        })
        .catch((error) =>
          console.error("Erro ao obter agendamentos após a inserção:", error)
        );
    })
    .catch((error) => console.error("Erro ao inserir agendamento:", error));
});

function atualizarTabela(data) {
  tabelaAgendamentos.innerHTML = "";

  data.forEach((agendamento) => {
    var row = tabelaAgendamentos.insertRow();
    row.insertCell(0).innerText = agendamento.horario_agendamento;
    row.insertCell(1).innerText = agendamento.cpf_cliente;
    row.insertCell(2).innerText = agendamento.nome_cliente;
    row.insertCell(3).innerText = agendamento.telefone_cliente;
    row.insertCell(4).innerText = agendamento.id_procedimento;
    row.insertCell(5).innerText = agendamento.nome_procedimento;
    row.insertCell(6).innerText = agendamento.cpf_profissional;
    row.insertCell(7).innerText = agendamento.nome_profissional;
  });
}
