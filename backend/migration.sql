-- Tornar senha nullable na tabela Ponto
ALTER TABLE Ponto ALTER COLUMN senha VARCHAR(100) NULL;

-- Adicionar colunas novas se ainda não existirem
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Ponto' AND COLUMN_NAME = 'descricao')
    ALTER TABLE Ponto ADD descricao VARCHAR(500) NULL;

IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Ponto' AND COLUMN_NAME = 'logradouro')
    ALTER TABLE Ponto ADD logradouro VARCHAR(100) NULL;

-- Adicionar reset_code na tabela Usuario se não existir
IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Usuario' AND COLUMN_NAME = 'reset_code')
    ALTER TABLE Usuario ADD reset_code VARCHAR(6) NULL;
