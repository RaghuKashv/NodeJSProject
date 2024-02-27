IF NOT EXISTS (SELECT 1 FROM sys.databases WHERE name = 'raghusdb')
BEGIN
    CREATE DATABASE raghusdb;
END;
USE raghusdb;
 
IF OBJECT_ID('raghusdb.dbo.raghu', 'U') IS NOT NULL
    DROP TABLE raghusdb.dbo.raghu;
 
CREATE TABLE raghusdb.dbo.raghu (
    id           BIGINT IDENTITY(1,1) NOT NULL,
    first_name   NVARCHAR(255) NULL,
    last_name    NVARCHAR(255) NULL,
    email        NVARCHAR(255) NULL,
    phone        NVARCHAR(255) NULL,
    address      NVARCHAR(255) NULL,
    diagnosis    NVARCHAR(255) NULL,
    image_url    NVARCHAR(255) NULL,
    created_at   DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT UQ_raghu_email UNIQUE (email)
);