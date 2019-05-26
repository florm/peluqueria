var MSGCAMPOOBLIGATORIO = "Este campo es obligatorio";
var MSGCAMPOEMAILERRONEO = "Este campo debe ser un email válido";

var contenedorAlertas = $("#contenedorAlertas");
//Botones activos
var botonesActivos;


$(document).scroll(function () {
	if ($(this).scrollTop() > 68)
		$(contenedorAlertas).addClass("sticky-alerta");
	else
		$(contenedorAlertas).removeClass("sticky-alerta");
});



function mostrarMensajeConfirmacion(contenido, confirmFunction, cancelFunction, parametrosExtra,
    btnConfirmText, btnCancelText, titulo, modelClass, hacerAncho, dismissOnConfirm, hideButtons, addFocusFirstInput) {
    quitarAlerta();
    var dialog = $("<div>");
    dialog.attr("id", "modalCustom");
    dialog.attr("role", "dialog");
    dialog.attr("tabindex", "-1");

    dialog.addClass("modal fade");
    dialog.css("display", "block");
    var modal = $("<div>");
    modal.addClass("modal-dialog" + (hacerAncho ? " modal-lg" : ""));
    modal.addClass(modelClass = ! null ? modelClass : "");
    var content = $("<div>");
    content.addClass("modal-content custom-modal-content");
    var divHeader = $("<div>");
    divHeader.addClass("d-flex modal-header");
    var h4Title = $("<h4>");
    h4Title.addClass("modal-title modal-custom-title pt-2");
    h4Title.text(titulo != null ? titulo : "");
    divHeader.append(h4Title);
    var btnClose = $("<button>");
    btnClose.attr("type", "button");
    btnClose.attr("data-dismiss", "modal");
    btnClose.attr("aria-label", "Close");
    btnClose.addClass("close");
    var spanXclose = $("<span>");
    spanXclose.attr("aria-hidden", "true");
    spanXclose.text("×");
    btnClose.append(spanXclose);
    divHeader.append(btnClose);
    content.append(divHeader);
    var body = $("<div>");
    body.addClass("modal-body");
    var divContent = $("<div>");
    divContent.addClass("d-flex justify-content-center pt-2");
    divContent.css("word-break", "break-all");
    divContent.css("word-break", "break-word");
    divContent.append(contenido);
    body.append(divContent);
    content.append(body);

    if (!hideButtons) {
        var footer = $("<div>");
        footer.addClass("d-flex px-3 pb-4 pt-2 justify-content-center");
        var btnCancel = $("<button>");
        btnCancel.addClass("btn m-1 text-white px-4 py-2 btn-cancel");
        btnCancel.attr("type", "button");
        btnCancel.attr("data-dismiss", "modal");
        btnCancel.addClass("btn-confirm-font btn-cancel-modal");
        btnCancel.text(btnCancelText != null ? btnCancelText : "Cancelar");
        if (cancelFunction != undefined) {
            btnCancel.click(function () {
                window[cancelFunction]();
            });
        }
        footer.append(btnCancel);
        var btnConfirm = $("<button>");
        btnConfirm.addClass("btn m-1 text-white px-4 py-2 btn-confirm");
        btnConfirm.attr("type", "button");
        if (dismissOnConfirm)
            btnConfirm.attr("data-dismiss", "modal");
        btnConfirm.addClass("btn-confirm-font");
        btnConfirm.text(btnConfirmText != null ? btnConfirmText : "Confirmar");
        btnConfirm.click(function () {
            window[confirmFunction](parametrosExtra, dialog);
        });
        footer.append(btnConfirm);
        content.append(footer);
    }

    modal.append(content);
    dialog.append(modal);
    dialog.modal();
    dialog.on('shown.bs.modal', function () {
        if (addFocusFirstInput)
            contenido.find('.form-control:visible:enabled:first').focus();
        else
            $(".btn-cancel-modal").focus();
    });
    return dialog;
}


function llamadaAjax(urlServicioWeb, datosServicioWeb, esAsincronico,
    funcionEscenarioExitoso, funcionEscenarioErroneo, parametrosExtra,
    noMostrarLoading, mensajeLoading) {

    var respuesta;

    if (!noMostrarLoading)
        // dibujar el div dinamicamente
        mostrarMsgWarning(mensajeLoading != null && mensajeLoading != undefined ? mensajeLoading : 'Procesando...');

    // el parametro parametrosExtra, son datos que se pueden mandar
    // opcionalmente y que serán reenviados a la funcion de exito o error.
    $.ajax({
        type: "POST",
        url: urlServicioWeb,
        data: datosServicioWeb,
        contentType: "application/json; charset=utf-8",
        async: esAsincronico,
        dataType: "json",
        traditional: true,
        //timeout: 15000,
        cache: false,
        success: function (jsDeRetorno, a) {
            respuesta = true;
            var res;
            if (!jsDeRetorno || !jsDeRetorno.error) {
                if (!noMostrarLoading) {
                    // quitar loading dibujado
                    quitarAlerta();
                }

                res = window[funcionEscenarioExitoso](jsDeRetorno,
                    parametrosExtra);
                return res;
            }

            else {
                if (!noMostrarLoading)
                    // quitar loading dibujado
                    quitarAlerta();
                res = window[funcionEscenarioErroneo](jsDeRetorno.error,
                    parametrosExtra);
                return res;
            }
        },

        error: function (e, a, i) {
            respuesta = false;
            if (!noMostrarLoading)
                // quitar loading dibujado
                quitarAlerta();
            if (e.status == 300) {
                window.location = e.responseText;
                return;
            }
            else if (e.readyState == 0) {
                // Network error
                return mostrarMsgError("No se ha podido establecer la conexión con el servidor. Revise si tiene acceso a internet y vuelva a intentar la operación nuevamente");
            }

            if (window[funcionEscenarioErroneo])
                return window[funcionEscenarioErroneo](e.responseText,
                    parametrosExtra);
            else
                mostrarMsgError(e.responseText);
        }
    });

    return respuesta;
}
function mostrarAlerta(msg, tipoAlerta, hacerFadeOut) {
	var type;

	var alertaCustom = "alertacustom" + createGuid();
	var alerta = "<div id='" + alertaCustom + "' class='alert " + type + " alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='false'>&times;</span></button>" + msg + "</div>";
	var alerta = $("<div>");
	alerta.attr("id", alertaCustom);
	var imgIcon = $("<img>");
	imgIcon.addClass("pr-2");
	switch (tipoAlerta) {
	case "s":
		alerta.css("background", "#43d160");
		imgIcon.attr("src", window.pathImgSuccess);
		break;
	case "e":
		alerta.css("background", "#ff5150");
		imgIcon.attr("src", window.pathImgError);
		break;
	case "w": alerta.css("background", "#ffc917");
		break;
	}
	alerta.append(imgIcon);
	var spanMsg = $("<span>");
	spanMsg.text(msg);
	alerta.append(spanMsg);
	if (contenedorAlertas != null && contenedorAlertas != undefined) {
		quitarAlerta();
		contenedorAlertas.hide().html(alerta).fadeIn(250);
		if (hacerFadeOut)
			window.setTimeout(function () { $("#" + alertaCustom).fadeTo(500, 0).slideUp(500, function () { $(this).remove(); }); }, 4750);
	}
}

function quitarAlerta() {
	$(botonesActivos).prop("disabled", "");
	contenedorAlertas.empty();
}

//GUID
function S4() {
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function createGuid() {
	return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}

// Función estandar para mostrar alertas
function mostrarMsgError(msg) {
	//pasamos "e" de error
	mostrarAlerta(msg, "e", true);

	$(botonesActivos).prop("disabled", "");
}

function mostrarMsgExito(msg) {
	//pasamos "s" de success
	mostrarAlerta(msg, "s", true);

	$(botonesActivos).prop("disabled", "");
}

function mostrarMsgWarning(msg) {
	//pasamos "w" de warning (tambien loading..)
	mostrarAlerta(msg, "w", false);
	botonesActivos = $("button[disabled!=disabled], a[disabled!=disabled]");
	$(botonesActivos).prop("disabled", "disabled");
}

function validarCampoObligatorio(object) {
	if (object.val() != null && object.val().trim() != '' && object.val() != '-1') {
		ocultarMensajeValidacionErronea(object);
		return true;
	} else {
		mostrarMensajeValidacionErronea(object, MSGCAMPOOBLIGATORIO);
		return false;
	}
}

function validarCampoEmail(object) {
	var email = object.val();
	var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

	if (caract.test(email)) {
		ocultarMensajeValidacionErronea(object);
		return true;
	}
	else {
		mostrarMensajeValidacionErronea(object, MSGCAMPOEMAILERRONEO);
		return false;
	}
}

function ocultarMensajeValidacionErronea(object) {
	var parent = object.parents(".form-group");
	object.removeClass("is-invalid");
	var errGid = object.attr('errGid');
	var msgError = parent.find('[id=helpBlock2' + (errGid ? errGid : '') + ']');
	if (msgError) msgError.remove();
	object.removeAttr('errGid');

}

function mostrarMensajeValidacionErronea(object, msj) {
	ocultarMensajeValidacionErronea(object);
	var parent = object.parents(".form-group");
	if (!object.hasClass('is-invalid')) {
		object.addClass("is-invalid");
		var divErrMsj = $('<div>');
		var gid = getGID();
		object.attr('errGid', gid);
		divErrMsj.attr('id', 'helpBlock2' + gid);//la idea es que no existan elementos con el mismo Id, por eso se usa el GID.
		divErrMsj.addClass('invalid-feedback');
		divErrMsj.addClass('span-error-identifier');//para identificar el span dentro del form-group, se usara esta class.
		divErrMsj[0].innerHTML = msj;

		parent.append(divErrMsj);
	} else {
		var divErrMsj = parent.find(".span-error-identifier");
		divErrMsj[0].innerHTML = msj;
	}
}

function getGID() {
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}