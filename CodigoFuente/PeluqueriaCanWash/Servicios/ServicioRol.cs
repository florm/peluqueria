using System.Collections.Generic;
using System.Data;
using System.Linq;
using PeluqueriaCanWash.Models;

namespace PeluqueriaCanWash.Servicios
{
    internal class ServicioRol
    {
        private CanWashEntities _db = new CanWashEntities();

        public List<Rol> GetAll()
        {
            return _db.Rol.ToList();
        }
        
    }
}