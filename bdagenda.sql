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

-- Criação da tabela de backup
CREATE TABLE Agendamento_Backup (
    id_backup SERIAL PRIMARY KEY,
    horario_agendamento_backup TIME NOT NULL,
    cpf_cliente_backup VARCHAR(11),
    cpf_profissional_backup VARCHAR(11),
    id_procedimento_backup INTEGER,
    usuario_que_apagou VARCHAR(100) NOT NULL,
    data_exclusao TIMESTAMP NOT NULL
);

-- Criação da função da trigger
CREATE OR REPLACE FUNCTION backup_agendamento()
RETURNS TRIGGER AS $$
BEGIN
    -- Insere os dados da linha excluída na tabela de backup
    INSERT INTO Agendamento_Backup (
        horario_agendamento_backup,
        cpf_cliente_backup,
        cpf_profissional_backup,
        id_procedimento_backup,
        usuario_que_apagou,
        data_exclusao
    ) VALUES (
        OLD.horario_agendamento,
        OLD.cpf_cliente,
        OLD.cpf_profissional,
        OLD.id_procedimento,
        current_user, -- Captura o usuário que está realizando a exclusão
        current_timestamp -- Captura a data e hora da exclusão
    );
    
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Associa a trigger à tabela Agendamento
CREATE TRIGGER agendamento_backup_trigger
BEFORE DELETE ON Agendamento
FOR EACH ROW
EXECUTE FUNCTION backup_agendamento();

-- Após a exclusão, consulte a tabela de backup para verificar se os dados foram registrados
SELECT * FROM Agendamento_Backup;

CREATE INDEX idx_cpf_cliente ON Cliente(cpf_cliente);
CREATE INDEX idx_cpf_profissional ON Profissional(cpf_profissional);
CREATE INDEX idx_id_procedimento ON Procedimento(id_procedimento);
CREATE INDEX idx_fk_cpf_cliente ON Agendamento(cpf_cliente);

-- Criação do usuário
CREATE ROLE funcionario_user WITH LOGIN PASSWORD 'funcionario123';
-- Concedendo permissão DE LEITURA NAS TABELAS
– SELECT na tabela Agendamento, Cliente, Profissional, Procedimento
GRANT SELECT ON TABLE Agendamento TO funcionario_user;
GRANT SELECT ON TABLE Cliente TO funcionario_user;
GRANT SELECT ON TABLE Profissional TO funcionario_user;
GRANT SELECT ON TABLE Procedimento TO funcionario_user;

-- Criação da visão
CREATE OR REPLACE VIEW ViewProcedimentosAgendados AS
SELECT
    Agendamento.horario_agendamento,
    Cliente.cpf_cliente,
    Cliente.nome_cliente,
    Profissional.nome_profissional,
    Procedimento.nome_procedimento
FROM
    Agendamento
    JOIN Cliente ON Agendamento.cpf_cliente = Cliente.cpf_cliente
    JOIN Profissional ON Agendamento.cpf_profissional = Profissional.cpf_profissional
    JOIN Procedimento ON Agendamento.id_procedimento = Procedimento.id_procedimento;


-- Criação de uma trigger para a inserção na view ViewProcedimentosAgendados: 
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
        (SELECT cpf_cliente FROM Cliente WHERE nome_cliente = NEW.nome_cliente),
        (SELECT cpf_profissional FROM Profissional WHERE nome_profissional = NEW.nome_profissional),
        (SELECT id_procedimento FROM Procedimento WHERE nome_procedimento = NEW.nome_procedimento)
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criação da trigger associada à tabela
CREATE TRIGGER insert_proced_agendados_trigger
INSTEAD OF INSERT ON ViewProcedimentosAgendados
FOR EACH ROW
EXECUTE FUNCTION insert_proced_agendados();

-- Atribuição de privilégios ao usuário funcionario
GRANT INSERT, SELECT ON ViewProcedimentosAgendados TO funcionario_user;

--Criação do user cliente (de apenas leitura)
CREATE ROLE cliente_user WITH PASSWORD 'cliente123';
GRANT SELECT ON ViewProcedimentosAgendados TO cliente_user;

SELECT * FROM funcionario_agendamento_view;

GRANT SELECT, INSERT, DELETE ON TABLE Agendamento TO funcionario_user;
GRANT INSERT ON TABLE Cliente TO funcionario_user;
CREATE OR REPLACE VIEW funcionario_cliente_view AS
SELECT * FROM Cliente;

GRANT SELECT, INSERT ON funcionario_cliente_view TO funcionario_user;



