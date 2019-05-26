var btnCancelar = $("#btnCancelar");
var btnContinuar = $("#btnContinuar");
var btnVolverRoles = $("#btnVolverRoles");
var btnGuardarYVolver = $("#btnGuardarYVolver");
var btnRegistrarCliente = $("#btnRegistrarCliente");
var txtEmail = $("#txtEmail");
var txtPassword = $("#txtPassword");
var txtRepetirPassword = $("#txtRepetirPassword");
var tabRoles = $("#tabRoles");
var tabDatosUsuario = $("#tabDatosUsuario");
var selRoles = $("#selRoles");
var btnGuardar = $(".btnGuardar");
var txtUsuarioId = $("#txtUsuarioId");
var chkBlanquear = $("#chkBlanquear");

btnContinuar.click(function () {
	if (!validarCampos()) return;
    activarTab(tabDatosUsuario, tabRoles);
});

btnCancelar.click(function() {
	window.location.href = window.listaUsuarioController;
});

btnVolverRoles.click(function () {
	window.location.href = window.listaUsuarioController;
});

chkBlanquear.change(function () {
    var deshabilitar = !chkBlanquear.prop("checked");
	txtPassword.attr("readonly", deshabilitar);
    txtRepetirPassword.attr("readonly", deshabilitar);
    txtPassword.val("");
    txtRepetirPassword.val("");
});

btnGuardarYVolver.click(function() {
    if (!validarCampoObligatorio(selRoles)) return;
    var usuario = new Object();
    usuario.email = txtEmail.val();
    usuario.password = txtPassword.val();
    usuario.rolId = selRoles.val();
    llamadaAjax(window.guardarUsuarioController, JSON.stringify(usuario), false, "creoModificoUsuarioOk", "errorCrearModificarUsuario");

});

btnGuardar.click(function() {
    var usuario = new Object();
    usuario.id = txtUsuarioId.val();
	usuario.email = txtEmail.val();
    if (chkBlanquear.prop("checked")) {
		usuario.password = txtPassword.val();
    }
	usuario.rolId = selRoles.val();
	llamadaAjax(window.modificarUsuarioController, JSON.stringify(usuario), false, "creoModificoUsuarioOk", "errorCrearModificarUsuario");
});

function creoModificoUsuarioOk(data, param) {
	mostrarMsgExito("Se guardaron los cambios correctamente");
	setTimeout(function () {
		window.location.href = window.listaUsuarioController;
	}, 3000);
}

function errorCrearModificarUsuario() {
	mostrarMsgError("Ha ocurrido un error al guardar los cambios");
}

function activarTab(tabActual, tabSiguiente) {
	tabSiguiente.removeClass("disabled");
	tabSiguiente.tab("show");
}

function validarCampos() {
    if (!validarCampoObligatorio(txtEmail)) return false;
    if (!validarCampoEmail(txtEmail)) return false;
    if (!validarCampoObligatorio(txtPassword)) return false;
    if (!validarTxtConfirmar()) return false;
    return true;
}

function validarTxtConfirmar() {
    if (txtPassword.val() != txtRepetirPassword.val()) {
        mostrarMensajeValidacionErronea(txtRepetirPassword, "Debe ser igual a la contraseña");
		return false;
	}
    return validarCampoObligatorio(txtRepetirPassword);
}
