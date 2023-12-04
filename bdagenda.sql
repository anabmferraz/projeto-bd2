CREATE TABLE Cliente (
	cpf_cliente VARCHAR(11) PRIMARY KEY,
	nome_cliente VARCHAR(100) NOT NULL,
	telefone_cliente VARCHAR(15) NOT NULL
);

CREATE TABLE Profissional (
	cpf_profissional VARCHAR(11) PRIMARY KEY,
	nome_profissional VARCHAR(100) NOT NULL
);

CREATE TABLE Procedimento (
	id_procedimento INT PRIMARY KEY,
	nome_procedimento VARCHAR(100) NOT NULL
);

CREATE TABLE Agendamento (
	horario_agendamento TIMESTAMP NOT NULL,
	cpf_cliente VARCHAR(11) REFERENCES Cliente(cpf_cliente),
	cpf_profissional VARCHAR(11) REFERENCES Profissional(cpf_profissional),
	id_procedimento INTEGER REFERENCES Procedimento(id_procedimento)
);

INSERT INTO Cliente VALUES ('11122233344', 'Ana', '123456789');
INSERT INTO Cliente VALUES ('22233344455', 'Brenda', '987654321');
INSERT INTO Cliente VALUES ('33344455566', 'Nathalia', '246810121');
INSERT INTO Cliente VALUES ('44455566677', 'Thaisse', '369121518');
INSERT INTO Cliente VALUES ('55566677788', 'Cotrin', '123498765');

INSERT INTO Profissional VALUES ('12121212121', 'Profissional1');
INSERT INTO Profissional VALUES ('13131313131', 'Profissional2');
INSERT INTO Profissional VALUES ('14141414141', 'Profissional3');
INSERT INTO Profissional VALUES ('15151515151', 'Profissional4');
INSERT INTO Profissional VALUES ('16161616161', 'Profissional5');

INSERT INTO Procedimento VALUES (1, 'Massagem');
INSERT INTO Procedimento VALUES (2, 'Depilação');
INSERT INTO Procedimento VALUES (3, 'Sobrancelha');
INSERT INTO Procedimento VALUES (4, 'Corte cabelo');
INSERT INTO Procedimento VALUES (5, 'Unhas');

INSERT INTO Agendamento VALUES ('2023-12-04 12:00', '11122233344', '12121212121', 1);
INSERT INTO Agendamento VALUES ('2023-12-04 14:30', '22233344455', '13131313131', 2);
INSERT INTO Agendamento VALUES ('2023-12-04 15:30', '33344455566', '14141414141', 3);
INSERT INTO Agendamento VALUES ('2023-12-04 17:00', '44455566677', '15151515151', 4);
INSERT INTO Agendamento VALUES ('2023-12-04 18:00', '55566677788', '16161616161', 5);

-- Criação da função para a transação
CREATE OR REPLACE FUNCTION backup_agendamento() RETURNS TRIGGER AS $$
BEGIN
	-- Inserir dados deletados na tabela de backup
	INSERT INTO Agendamento_Backup (horario_agendamento_backup, cpf_cliente_backup, cpf_profissional_backup, id_procedimento_backup,
    usuario_que_apagou, data_exclusao)
	VALUES (OLD.horario_agendamento, OLD.cpf_cliente, OLD.cpf_profissional, OLD.id_procedimento, current_user, -- Captura o usuário que está realizando a exclusão
	current_timestamp);
	RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION backup_transaction()
RETURNS TRIGGER AS $$
BEGIN
	-- Chamar a função de backup_agendamento usando EXECUTE FUNCTION
	EXECUTE FUNCTION backup_agendamento;
	-- Deletar o registro da tabela Agendamento
	DELETE FROM Agendamento WHERE horario_agendamento = OLD.horario_agendamento;
	-- Commit da transação
	RETURN NULL; -- Alterado para NULL, pois a função é chamada como gatilho DELETE e não requer um valor de retorno
END;
$$ LANGUAGE plpgsql;

-- Criação da trigger para chamar a função backup_transaction() antes de um delete na tabela Agendamento
CREATE TRIGGER agendamento_backup_trigger
BEFORE DELETE ON Agendamento
FOR EACH ROW
EXECUTE FUNCTION backup_transaction();

CREATE INDEX idx_agendamento_cpf_cliente ON Agendamento(cpf_cliente);
CREATE INDEX idx_agendamento_cpf_profissional ON Agendamento(cpf_profissional);
CREATE INDEX idx_agendamento_id_procedimento ON Agendamento(id_procedimento);
CREATE INDEX idx_agendamento_horario_agendamento ON Agendamento(horario_agendamento);
CREATE INDEX idx_cliente_cpf_cliente ON Cliente(cpf_cliente);
CREATE INDEX idx_profissional_cpf_profissional ON Profissional(cpf_profissional);
CREATE INDEX idx_procedimento_id_procedimento ON Procedimento(id_procedimento);

--criação do papel do funcionário
CREATE ROLE funcionario_user WITH LOGIN PASSWORD 'funcionario123';

GRANT SELECT ON TABLE Agendamento TO funcionario_user;
GRANT SELECT ON TABLE Cliente TO funcionario_user;
GRANT SELECT ON TABLE Profissional TO funcionario_user;
GRANT SELECT ON TABLE Procedimento TO funcionario_user;

--criação do papel do cliente
CREATE ROLE cliente_user WITH PASSWORD 'cliente123';

CREATE OR REPLACE VIEW ViewProcedimentosAgendados AS
SELECT
	Agendamento.horario_agendamento,
	Cliente.cpf_cliente,
	Cliente.nome_cliente,
    Cliente.telefone_cliente,
    Procedimento.id_procedimento,
    Procedimento.nome_procedimento,
    Profissional.cpf_profissional,
	Profissional.nome_profissional
FROM
	Agendamento
	JOIN Cliente ON Agendamento.cpf_cliente = Cliente.cpf_cliente
	JOIN Profissional ON Agendamento.cpf_profissional = Profissional.cpf_profissional
	JOIN Procedimento ON Agendamento.id_procedimento = Procedimento.id_procedimento;

CREATE OR REPLACE FUNCTION insert_proced_agendados()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO Agendamento (
        horario_agendamento,
        cpf_cliente,
        cpf_profissional,
        id_procedimento
    ) VALUES (
        NEW.horario_agendamento,
        (SELECT cpf_cliente FROM Cliente WHERE nome_cliente = NEW.nome_cliente LIMIT 1),
        (SELECT cpf_profissional FROM Profissional WHERE nome_profissional = NEW.nome_profissional LIMIT 1),
        (SELECT id_procedimento FROM Procedimento WHERE nome_procedimento = NEW.nome_procedimento LIMIT 1)
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criação da trigger associada à tabela
CREATE TRIGGER insert_proced_agendados_trigger
INSTEAD OF INSERT ON ViewProcedimentosAgendados
FOR EACH ROW
EXECUTE FUNCTION insert_proced_agendados();

--Atribuição de privilégio de excluir da tabela agendamento
GRANT DELETE ON TABLE Agendamento TO funcionario_user;

-- Atribuição de privilégios de inserir na view ao usuário funcionario
GRANT INSERT, SELECT ON ViewProcedimentosAgendados TO funcionario_user;

--atribuição de privilégios para selecionar a view
GRANT SELECT ON ViewProcedimentosAgendados TO cliente_user;

--Atribuição de privilégio de excluir da tabela agendamento
GRANT DELETE ON TABLE Agendamento TO funcionario_user;

--Atribuição de privilégio de executar a trigger de backup
GRANT EXECUTE ON FUNCTION ViewProcedimentosAgendados TO funcionario_user;
