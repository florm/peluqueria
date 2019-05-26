using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PeluqueriaCanWash.Dto
{
    public class UsuarioDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int? RolId { get; set; }
    }
}