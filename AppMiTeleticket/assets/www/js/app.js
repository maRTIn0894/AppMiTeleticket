var url = "http://50.97.242.3/PetroperuDAO.php?";
var idguardarsesion = " ";
var correosesion = " ";
var idhora = " ";
var idfecha = " ";
var idespectaculo = " ";
var idlugar = " ";

//PARA REGISTRAR UN USUARIO
$("#btnregistrar").on("click",function(){
	var nombre = $("#txtnombreregistrar").val();
	var apellido = $("#txtapellidoregistrar").val();
	var edad = $("#txtedadregistrar").val();
	var correo = $("#txtcorreoregistrar").val();
	var contrasena = $("#txtcontrasenaregistrar").val();	
	
	url1 = url+"opcion=1&nombre="+nombre+"&apellido="+apellido+"&edad="+edad+"&correo="+correo+"&contrasena="+contrasena+"&callback=?";
	
	$.mobile.loading('show',{text:'Registrando',textVisible:true});
	$.getJSON(url1,getResultadoRegistrarSolicitud);
	}
);

function getResultadoRegistrarSolicitud(presultado){
	console.log(presultado);
	var resultado = presultado;
	if (resultado==1)
		$("#idresultadosol").html("<b>Registro Satisfactorio</b>");		
	else
		$("#idresultadosol").html("<b>No se puede Registrar Usuario</b>");		
	$.mobile.loading('hide');	
}	

//PARA REGISTRAR EN AGENDA
$("#btnagendar").on("click",function(){
	url1 = url + "opcion=9&correo="+correosesion+"&espectaculo="+idespectaculo+"&fecha="+idfecha+"&hora="+idhora+"&lugar="+idlugar+"&callback=?";
	$.mobile.loading('show',{text:'Agendando',textVisible:true});
	$.getJSON(url1,getResultadoAgendar);
}
);

function getResultadoAgendar(presultado){
	console.log(presultado);
	var resultado = presultado;
	if (resultado==1)
		$("#idresultadoagenda").html("<b>Agendado Satisfactorio</b>");		
	else
		$("#idresultadoagenda").html("<b>No se puede Agendar / Evento ya Agendado</b>");		
	$.mobile.loading('hide');	
}

//PARA LOGEARSE AL SISTEMA
$("#btnconfirmar").on("click",function(){
	var usuario = $("#txtloginusuario").val();
	var clave = $("#txtloginpassword").val();
		
	$.getJSON(url+"opcion=2&usuario="+usuario+"&clave="+clave+"&callback=?",getRecuperarNombre);
}
);

function getRecuperarNombre(presultado){
	console.log(presultado);	
	var nombre = presultado;
	if (nombre == (false)){
		$("#idresultadologin").html("<b>Usuario o Contrase�a Incorrectos</b>");				
	}else{
		if(nombre[0]=="martin_ramos_0894@hotmail.com"){
			$.mobile.changePage("#idMenuUsuarioMaster");
			correosesion = nombre[0];
			$("#idsaludousuario2").html("Bienvenido: " + nombre[2] + " " + nombre[3]);
		}else{
			$.mobile.changePage("#idMenuUsuario");
			correosesion = nombre[0];
			$("#idsaludousuario").html("Bienvenido: " + nombre[2] + " " + nombre[3]);
		}		
	}		
	$.mobile.loading('hide');	

}

//PARA LISTAR UBICACIONES
$("#idAgregarEspectaculoMaster").on("pageshow",function(){
	$.getJSON(url+"opcion=3&callback=?",getListaUbicaciones);
}
);

function getListaUbicaciones(presultado){
	var lista="";
	for(i=0;i<presultado.length;i++){
		console.log(presultado[i]);
		vli="<option value="+presultado[i][2]+">"+presultado[i][0]+" - "+presultado[i][1]+"</option>";
		lista = lista+vli;
	}
	$("#chubicacion").html(lista);
	$("#chubicacion").listview('refresh');
}

//PARA REGISTRAR ESPECTACULO
$("#btnregistrarespectaculo").on("click",function(){
	var nombre = $("#txtespecnombreregistrar").val();
	var genero = $("#chgenero").val();
	var ubicacion = $("#chubicacion").val();
	var fecha = $("#txtespecfecha").val();
	var hora = $("#txtespechora").val();	
	var precio = $("#txtespecprecio").val();
	var descripcion = $("#txtespecdescripcion").val();
	
	url1 = url+"opcion=4&nombre="+nombre+"&genero="+genero+"&ubicacion="+ubicacion+"&fecha="+fecha+"&hora="+hora+"&precio="+precio+"&descripcion="+descripcion+"&callback=?";
	
	$.mobile.loading('show',{text:'Registrando',textVisible:true});
	$.getJSON(url1,getResultadoRegistrarEspectaculo);
	}
);

function getResultadoRegistrarEspectaculo(presultado){
	console.log(presultado);
	var resultado = presultado;
	if (resultado==1)
		$("#idresultadosolespec").html("<b>Registro Satisfactorio</b>");		
	else
		$("#idresultadosolespec").html("<b>No se puede Registrar Espectaculo</b>");		
	$.mobile.loading('hide');	
}	


//PARA LISTAR TODOS LOS ESPECTACULOS RECOMENDADOS
$("#idVerEspectaculo").on("pageshow",function(){
	$.mobile.loading('show',{text:'Cargando Datos',textVisible:true});
	//alert(idguardarsesion);
	$.getJSON(url+"opcion=8&cod_espec="+idguardarsesion+"&callback=?",getEspectaculoRecomendados);
}
);
 
function getEspectaculoRecomendados(presultado){
	var lista="";
	//shuffle(presultado);
	for(i=0;i<2;i++){
		console.log(presultado[i]);
		vli="<li><a id="+presultado[i][4]+" onClick=listaespec(this.id)><p class='ui-li-aside'>"+
		"<img src=img/"+presultado[i][4]+".jpg>"+
		"<h2 id=generoespec value="+presultado[i][5]+">Nombre: "+presultado[i][0]+"</h2>"
		+"<h4>Ubicacion: "+presultado[i][1]+"</h4>"+"</p>"+
		"<p><h4>Hora: "+presultado[i][2]+"</h4></p>"+
		"<p><h4>Fecha: "+presultado[i][3]+"</h4></p></a></li>"+
		"</li>";
		lista = lista+vli;
	}
	$("#idlistaespectaculosrecomendados").html(lista);
	$("#idlistaespectaculosrecomendados").listview('refresh');
	$.mobile.loading('hide');
}

//PARA LISTAR ESPECTACULOS POR GENERO
$("#btnbuscarespectaculonousuario").on("click",function(){
	var buscarespec = $("#chbuscargenero").val();
		
	url1 = url+"opcion=5&buscarespec="+buscarespec+"&callback=?";
	
	$.mobile.loading('show',{text:'Buscando',textVisible:true});
	$.getJSON(url1,getEspectaculosNoUsuario);
	}
);

function getEspectaculosNoUsuario(presultado){
	$.mobile.changePage("#idBuscarEspectaculoNoUsuario");
	var lista="";
	for(i=0;i<presultado.length;i++){
		console.log(presultado[i]);
		vli="<li><a id="+presultado[i][4]+" onClick=listaespecnousuario(this.id)><p class='ui-li-aside'>"+
		"<img src=img/"+presultado[i][4]+".jpg>"+
		"<h2 id=generoespec value="+presultado[i][5]+">Nombre: "+presultado[i][0]+"</h2>"
		+"<h4>Ubicacion: "+presultado[i][1]+"</h4>"+"</p>"+
		"<p><h4>Hora: "+presultado[i][2]+"</h4></p>"+
		"<p><h4>Fecha: "+presultado[i][3]+"</h4></p></a></li>"+
		"</li>";
		lista = lista+vli;
	}
	$("#idBuscarEspc").html(lista);
	$("#idBuscarEspc").listview('refresh');
	$.mobile.loading('hide');
}

function listaespecnousuario(id){
	//alert(id);
	//alert(correosesion);
	
	$.getJSON(url+"opcion=6&id_espec="+id+"&callback=?",getEspectaculoNoUsuario);
	idguardarsesion = id;
	}

function getEspectaculoNoUsuario(presultado){
	$.mobile.changePage("#idVerEspectaculoNoUsuario");
	console.log(presultado);
	$("#idnombreespecno").html(presultado[0]);
	idespectaculo=presultado[0];
	$("#idlugarespecno").html(presultado[1]);
	idlugar=presultado[1];
	$("#idhoraespecno").html(presultado[2]);
	idhora=presultado[2];
	$("#idfechaespecno").html(presultado[3]);
	idfecha=presultado[3];
	$("#iddescripcionespecno").html(presultado[6]);
	$.mobile.loading('hide');
	//alert(idhora);
}

//LISTAR ESPECACULOS POR GENERO USUARIO
$("#btnbuscarespectaculousuario").on("click",function(){
	var buscarespec = $("#chbuscargenerousuario").val();
		
	url1 = url+"opcion=5&buscarespec="+buscarespec+"&callback=?";
	
	$.mobile.loading('show',{text:'Buscando',textVisible:true});
	$.getJSON(url1,getEspectaculosUsuario);
	}
);

function getEspectaculosUsuario(presultado){
	$.mobile.changePage("#idBuscarEspectaculoUsuario");
	var lista="";
	for(i=0;i<presultado.length;i++){
		console.log(presultado[i]);
		vli="<li><a id="+presultado[i][4]+" onClick=listaespec(this.id)><p class='ui-li-aside'>"+
		"<img src=img/"+presultado[i][4]+".jpg>"+
		"<h2 id=generoespec value="+presultado[i][5]+">Nombre: "+presultado[i][0]+"</h2>"
		+"<h4>Ubicacion: "+presultado[i][1]+"</h4>"+"</p>"+
		"<p><h4>Hora: "+presultado[i][2]+"</h4></p>"+
		"<p><h4>Fecha: "+presultado[i][3]+"</h4></p></a></li>"+
		"</li>";
		lista = lista+vli;
	}
	$("#idBuscarEspcUsuario").html(lista);
	$("#idBuscarEspcUsuario").listview('refresh');
	$.mobile.loading('hide');
}

function listaespec(id){
	//alert(id);
	//alert(correosesion);
	
	$.getJSON(url+"opcion=6&id_espec="+id+"&callback=?",getEspectaculo);
	idguardarsesion = id;
	}

function getEspectaculo(presultado){
	$("#idresultadoagenda").html("");
	$.mobile.changePage("#idVerEspectaculo");
	console.log(presultado);
	$("#idnombreespec").html(presultado[0]);
	idespectaculo=presultado[0];
	$("#idlugarespec").html(presultado[1]);
	idlugar=presultado[1];
	$("#idhoraespec").html(presultado[2]);
	idhora=presultado[2];
	$("#idfechaespec").html(presultado[3]);
	idfecha=presultado[3];
	$("#iddescripcionespec").html(presultado[6]);
	$.mobile.loading('hide');
	//alert(idhora);
}


//PARA LISTAR TODOS LOS ESPECTACULOS
$("#idListarEspectaculoMaster").on("pageshow",function(){
	$.mobile.loading('show',{text:'Cargando Datos',textVisible:true});
	$.getJSON(url+"opcion=7&callback=?",getListaEspectaculos);
}
);
 
function getListaEspectaculos(presultado){
	var lista="";
	for(i=0;i<presultado.length;i++){
		console.log(presultado[i]);
		vli="<li><a id="+presultado[i][4]+" onClick=listaespecnousuario(this.id)><p class='ui-li-aside'>"+
		"<img src=img/"+presultado[i][4]+".jpg>"+
		"<h2 id=generoespec value="+presultado[i][5]+">Nombre: "+presultado[i][0]+"</h2>"
		+"<h4>Ubicacion: "+presultado[i][1]+"</h4>"+"</p>"+
		"<p><h4>Hora: "+presultado[i][2]+"</h4></p>"+
		"<p><h4>Fecha: "+presultado[i][3]+"</h4></p></a></li>"+
		"</li>";
		lista = lista+vli;
	}
	$("#idlistaespectaculos").html(lista);
	$("#idlistaespectaculos").listview('refresh');
	$.mobile.loading('hide');
}

//PARA LISTAR ESPECTACULOS AGENDADOS
$("#idVerAgenda").on("pageshow",function(){
	$.mobile.loading('show',{text:'Cargando Datos',textVisible:true});
	$.getJSON(url+"opcion=10&correo="+correosesion+"&callback=?",getListaEspectaculosAgendados);
}
);
 
function getListaEspectaculosAgendados(presultado){
	var lista="";
	for(i=0;i<presultado.length;i++){
		console.log(presultado[i]);
		vli="<li><p class='ui-li-aside'>"+
		"<img src=img/"+presultado[i][5]+".jpg>"+
		"<h2>Nombre: "+presultado[i][1]+"</h2>"
		+"<h4>Ubicacion: "+presultado[i][4]+"</h4>"+"</p>"+
		"<p><h4>Hora: "+presultado[i][3]+"</h4></p>"+
		"<p><h4>Fecha: "+presultado[i][2]+"</h4></p></a></li>"+
		"</li>";
		lista = lista+vli;
	}
	$("#idlistaespectaculosagendados").html(lista);
	$("#idlistaespectaculosagendados").listview('refresh');
	$.mobile.loading('hide');
}