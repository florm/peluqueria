use master 
go
drop database CanWash
go
create database CanWash
go
use CanWash


create table Rol(
	Id int identity(1,1) not null,
	Nombre varchar(20) not null
)
GO
ALTER TABLE Rol ADD CONSTRAINT PK_Rol
	PRIMARY KEY CLUSTERED (Id)
GO

create table Usuario(
	Id int identity (1,1)  not null,
	Email varchar(50) not null,
	Password varchar(20) not null,
	RolId int null
)
go

 ALTER TABLE Usuario ADD CONSTRAINT PK_Usuario 
	PRIMARY KEY CLUSTERED (Id)
GO

ALTER TABLE Usuario ADD CONSTRAINT FK_Usuario_Rol
	FOREIGN KEY (RolId) REFERENCES Rol (Id)
GO


insert into Rol (Nombre)
values('Administrador'),('Cliente')
insert into Usuario (Email, Password, RolId)
values('flor@gmail.com',1234,1)
insert into Usuario (Email, Password, RolId)
values('juanperez@gmail.com',1234,2)

select * from Usuario