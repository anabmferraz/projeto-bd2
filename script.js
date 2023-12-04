function entrarComoCliente() {
  const usuarioInput = document.getElementById("usernameClienteConsulta");
  const senhaInput = document.getElementById("senhaPessoaConsulta");

  const usuario = usuarioInput.value;
  const senha = senhaInput.value;

  const credenciais = btoa(`${usuario}:${senha}`);

  console.log("Tentando autenticar como cliente...");

  enviarAutenticacao(credenciais, "cliente");
}

function entrarComoFuncionario() {
  const usuarioInput = document.getElementById("usernameFuncionarioConsulta");
  const senhaInput = document.getElementById("senhaPessoaConsulta");

  const usuario = usuarioInput.value;
  const senha = senhaInput.value;

  const credenciais = btoa(`${usuario}:${senha}`);

  console.log("Tentando autenticar como funcionário...");

  enviarAutenticacao(credenciais, "funcionario");
}

function enviarAutenticacao(credenciais, papel) {
  const urlAutenticacao = "/"; // Alterado para o diretório raiz

  fetch(urlAutenticacao, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credenciais}`,
    },
    body: JSON.stringify({ usuario: papel }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }
      return response.json();
    })
    .then((data) => {
      if (papel === "cliente") {
        window.location.href = "/procedimentos-agendados-cliente";
      } else if (papel === "funcionario") {
        window.location.href = "/procedimentos-agendados-funcionario";
      }
    })
    .catch((error) => {
      console.error("Erro de autenticação:", error);
      alert("Erro de autenticação. Verifique suas credenciais.");
    });
}
