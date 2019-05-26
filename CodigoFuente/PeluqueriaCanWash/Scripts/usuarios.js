var btnEliminarUsuario = $(".btnEliminarUsuario");
var modalTxtNombre = $("#modalTxtNombre");
var modalEliminar = $("#modalEliminar");


btnEliminarUsuario.click(function () {
	eliminarDialog($(this).attr("usuarioId"), $(this).attr("usuarioEmail"));
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

