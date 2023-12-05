// importar os módulos, express é pra aplicação web
const express = require("express");
const bodyParser = require("body-parser"); // lida com json
const db = require("./db"); // interagir com banco de dados

const app = express();
const port = 8080; // porta pra saida

app.use(express.static("projeto-bd2"));
app.use(bodyParser.json());

// Senhas para clientes e funcionários
const senhaClientes = "cliente123";
const senhaFuncionarios = "funcionario123";

//verificar a autenticação do usuário
app.use((req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensagem: "Credenciais não fornecidas" });
  }

  const [, base64Credentials] = authHeader.split(" ");
  const [usuario] = Buffer.from(base64Credentials, "base64")
    .toString()
    .split(":");

  // Simula a verificação de senha para cada tipo de usuário
  if (usuario.startsWith("cliente") && authHeader.includes(senhaClientes)) {
    req.usuarioAutenticado = { papel: "cliente" };
    next();
  } else if (
    usuario.startsWith("funcionario") &&
    authHeader.includes(senhaFuncionarios)
  ) {
    req.usuarioAutenticado = { papel: "funcionario" };
    next();
  } else {
    return res.status(401).json({ mensagem: "Credenciais inválidas" });
  }
});

//verifica se o cliente é autenticado 
app.get("/agendamentos/cliente", async (req, res) => {
  if (!req.usuarioAutenticado || req.usuarioAutenticado.papel !== "cliente") {
    return res.status(401).json({ mensagem: "Acesso não autorizado" });
  }

  try {
    const result = await db.query("SELECT * FROM ViewProcedimentosAgendados");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erro ao obter agendamentos do cliente", error);
    res.status(500).json({ mensagem: "Erro ao obter agendamentos do cliente" });
  }
});

// autentica o usuário e recebe a senha e o user
app.post("/autenticar", (req, res) => {
  const { usuario, senha } = req.body;

  if (usuario.startsWith("cliente") && senha === "cliente123") {
    res.status(200).json({ papel: "cliente" });
  } else if (usuario.startsWith("funcionario") && senha === "funcionario123") {
    res.status(200).json({ papel: "funcionario" });
  } else {
    res.status(401).json({ mensagem: "Credenciais inválidas" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
