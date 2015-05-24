var url = "http://23.246.240.61/PetroperuDAO.php?";
var idguardarsesion = " ";

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
		$("#idresultadologin").html("<b>Usuario o Contraseña Incorrectos</b>");				
	}else{
		if(nombre[0]=="martin_ramos_0894@hotmail.com"){
			$.mobile.changePage("#idMenuUsuarioMaster");
			$("#idsaludousuario2").html("Bienvenido: " + nombre[2] + " " + nombre[3]);
		}else{
			$.mobile.changePage("#idMenuUsuario");
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
	for(i=0;i<3;i++){
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
$("#btnbuscarespectaculo").on("click",function(){
	var buscarespec = $("#chbuscargenero").val();
		
	url1 = url+"opcion=5&buscarespec="+buscarespec+"&callback=?";
	
	$.mobile.loading('show',{text:'Buscando',textVisible:true});
	$.getJSON(url1,getEspectaculos);
	}
);

function getEspectaculos(presultado){
	$.mobile.changePage("#idBuscarEspectaculo");
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
	$("#idBuscarEspc").html(lista);
	$("#idBuscarEspc").listview('refresh');
	$.mobile.loading('hide');
}

function listaespec(id){
	//alert(id);
	$.getJSON(url+"opcion=6&id_espec="+id+"&callback=?",getEspectaculo);
	idguardarsesion = id;
	}

function getEspectaculo(presultado){
	$.mobile.changePage("#idVerEspectaculo");
	console.log(presultado);
	$("#idnombreespec").html(presultado[0]);
	$("#idlugarespec").html(presultado[1]);
	$("#idhoraespec").html(presultado[2]);
	$("#idfechaespec").html(presultado[3]);
	$("#iddescripcionespec").html(presultado[6]);
	$.mobile.loading('hide');
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
		vli="<li><a id="+presultado[i][4]+" onClick=listaespec(this.id)><p class='ui-li-aside'>"+
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
