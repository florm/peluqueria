using System.Collections.Generic;
using System.Web.Mvc;
using PagedList;
using PeluqueriaCanWash.Dto;
using PeluqueriaCanWash.Models;
using PeluqueriaCanWash.Servicios;



namespace PeluqueriaCanWash.Controllers
{
    public class UsuariosController : Controller
    {
        private readonly ServicioUsuario _servicioUsuario = new ServicioUsuario();
        private readonly ServicioRol _servicioRol= new ServicioRol();
        public ActionResult Index(int? pag)
        {
            
            var usuarios = _servicioUsuario.GetAll();
            return View(usuarios.ToPagedList(pag ?? 1, 3));
        }

        public ActionResult Crear()
        {
            ViewBag.roles = _servicioRol.GetAll();
            ViewBag.estaEditando = false;
            return View();
        }


        [HttpPost]
        public JsonResult Guardar(Usuario usuario)
        {

            _servicioUsuario.Crear(usuario);
            return Json("");
        }

        public ActionResult Detalles(int id)
        {
            ViewBag.roles = _servicioRol.GetAll();
            var usuario = _servicioUsuario.GetById(id);
            ViewBag.estaEditando = true;
            return View("Crear", usuario);

        }
        public JsonResult Modificar(UsuarioDto usuario)
        {
            _servicioUsuario.Modificar(usuario);
            return Json("");
        }


        public JsonResult Eliminar(int id)
        {
            _servicioUsuario.Eliminar(id);
            return Json("");
        }

        public ActionResult Blanquear(int id)
        {

            _servicioUsuario.BlanquearPassword(id);
            return RedirectToAction("Index");
        }


    }
}