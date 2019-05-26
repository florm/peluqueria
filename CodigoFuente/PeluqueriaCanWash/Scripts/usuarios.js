var btnEliminarUsuario = $(".btnEliminarUsuario");
var modalTxtNombre = $("#modalTxtNombre");
var modalTxtUsuario = $("#modalTxtUsuario");
var modalEliminar = $("#modalEliminar");
var modalBlanquear = $("#modalBlanquear");
var blanquear = $(".blanquear");

btnEliminarUsuario.click(function () {
	eliminarDialog($(this).attr("usuarioId"), $(this).attr("usuarioEmail"));
});


blanquear.click(function () {
	blanquearDialog($(this).attr("usuarioId"), $(this).attr("usuarioEmail"));
});



function eliminar(params, dialog) {
	llamadaAjax(window.eliminarUsuarioController,
		JSON.stringify(params),
		true,
		"eliminoUsuarioOk",
		null,
		dialog);
}

function eliminoUsuarioOk(resultado, dialog) {
	if (dialog != null)
		dialog.modal("hide");
	mostrarMsgExito("El usuario ha sido eliminado correctamente");
	setTimeout(function () {
		window.location.href = window.listaUsuarioController;
	}, 3000);


}

function eliminarDialog(id, nombre) {
	modalTxtUsuario.text(nombre);
	mostrarMensajeConfirmacion(modalEliminar,
		"eliminar",
		null,
		{ id: id },
		"Sí, eliminar",
		"Cancelar",
		"Eliminar Usuario",
		"modal-eliminar",
		false,
		true);
}

function blanquearDialog(id, nombre) {
	modalTxtUsuario.text(nombre);
	mostrarMensajeConfirmacion(modalBlanquear,
		"blanqueo",
		null,
		{ id: id },
		"Sí, blanquear",
		"Cancelar",
		"Blanquear Contraseña",
		"modal-eliminar",
		false,
		true);
}

function blanqueo(params, dialog) {
    llamadaAjax(window.blanquearUsuarioController,
		JSON.stringify(params),
		true,
		"blanqueoOk",
		null,
		dialog);
}

function blanqueoOk(resultado, dialog) {
	if (dialog != null)
		dialog.modal("hide");
	mostrarMsgExito("La contraseña ha sido blanqueado correctamente");
	
}