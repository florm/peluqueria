using System.Collections.Generic;
using System.Data;
using System.Linq;
using PeluqueriaCanWash.Dto;
using PeluqueriaCanWash.Models;

namespace PeluqueriaCanWash.Servicios
{
    internal class ServicioUsuario
    {
        private CanWashEntities _db = new CanWashEntities();

        public List<Usuario> GetAll()
        {
            return _db.Usuario.ToList();
        }

        public Usuario GetById(int id)
        {
            return _db.Usuario.FirstOrDefault(u => u.Id == id);
        }

        public void Crear(Usuario usuario)
        {
            _db.Usuario.Add(usuario);
            _db.SaveChanges();
        }

        public void Modificar(UsuarioDto usuario)
        {
            var usuarioModel = GetById(usuario.Id);
            usuarioModel.Email = usuario.Email;
            usuarioModel.Password = usuario.Password ?? usuarioModel.Password;
            usuarioModel.RolId = usuario.RolId;
            _db.SaveChanges();

        }

        public void BlanquearPassword(int usuarioId)
        {
            var usuarioModel = GetById(usuarioId);
            usuarioModel.Password = "1234";
            _db.SaveChanges();
        }

        public void Eliminar(int id)
        {
            var usuarioModel = GetById(id);
            _db.Usuario.Remove(usuarioModel);
            _db.SaveChanges();
        }
    }
}