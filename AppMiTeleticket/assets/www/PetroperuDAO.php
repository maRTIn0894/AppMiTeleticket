<?php
	$opcion = $_GET["opcion"];
	
	switch ($opcion){
		case 1: 
		//Registrar usuario
		$nombre = $_GET["nombre"];
		$apellido = $_GET["apellido"];
		$edad = $_GET["edad"];
		$correo = $_GET["correo"];
		$contrasena = $_GET["contrasena"];
		
		$sql = "insert into tb_usuario(nombres, apellidos, edad, correo, contrasena) values('$nombre', '$apellido', $edad, '$correo', '$contrasena')";
		$cn = mysql_connect("localhost","root","");
		mysql_select_db("bd_teleticket", $cn);
		mysql_query($sql);
		
		//Recupera el numero de filas afectadas
		$tx = mysql_affected_rows();
		
		mysql_close($cn);
		
		$response = $_GET["callback"]."(".json_encode($tx).")";
		echo $response;
		break;
		 
		case 2:
		//Recuperar usuario
		$usuario = $_GET["usuario"];
		$clave = $_GET["clave"];
		$sql = "SELECT correo, contrasena, nombres, apellidos from tb_usuario where correo='$usuario' AND contrasena='$clave'";
		
		$cn = mysql_connect("localhost","root","");
		mysql_select_db("bd_teleticket", $cn);
		$resultado = mysql_query($sql,$cn);
				
		$usuario = mysql_fetch_row($resultado);
				
		mysql_close($cn);
		
		$response = $_GET["callback"]."(".json_encode($usuario).")";
		echo $response;
		break;
		
		case 3:
		//Recuperar ubicaciones
		$sql = "SELECT nombre, direccion, numeracion from tb_ubicaciones ORDER BY nombre";
		
		$cn = mysql_connect("localhost","root","");
		mysql_select_db("bd_teleticket", $cn);
		$resultado = mysql_query($sql,$cn);
		$total = mysql_num_rows($resultado);		
		
		$lista = array();
		for($i=0; $i<$total;$i++){
			$lista[] = mysql_fetch_row($resultado);
		}
		
		mysql_close($cn);
		
		//print_r($lista);
		
		$response = $_GET["callback"]."(".json_encode($lista).")";
		echo $response;
		break;
		
		case 4: 
		//Registrar Espectaculo
		$nombre = $_GET["nombre"];
		$genero = $_GET["genero"];
		$ubicacion = $_GET["ubicacion"];
		$fecha = $_GET["fecha"];
		$hora = $_GET["hora"];
		$precio = $_GET["precio"];
		$descripcion = $_GET["descripcion"];
		
		$sql = "insert into tb_espectaculo(nombre, ubicacion, precio, descripcion, genero, hora, fecha) values('$nombre', '$ubicacion', $precio, '$descripcion', '$genero', '$hora', '$fecha')";
		$cn = mysql_connect("localhost","root","");
		mysql_select_db("bd_teleticket", $cn);
		mysql_query($sql);
		
		//Recupera el numero de filas afectadas
		$tx = mysql_affected_rows();
		
		mysql_close($cn);
		
		$response = $_GET["callback"]."(".json_encode($tx).")";
		echo $response;
		break;
		
		case 5: 
		//Buscar Espectaculo
		$buscarespec = $_GET["buscarespec"];
		$sql = "select e.nombre, u.nombre, e.hora, e.fecha, e.cod_espec, e.genero from tb_espectaculo e inner join tb_ubicaciones u on e.ubicacion = u.numeracion where genero = '$buscarespec'";
		$cn = mysql_connect("localhost","root","");
		mysql_select_db("bd_teleticket", $cn);
		$resultado = mysql_query($sql,$cn);
		$total = mysql_num_rows($resultado);		
		
		$lista = array();
		for($i=0; $i<$total;$i++){
			$lista[] = mysql_fetch_row($resultado);
		}
		
		mysql_close($cn);
		
		//print_r($lista);
		
		$response = $_GET["callback"]."(".json_encode($lista).")";
		echo $response;
		break;
		
		case 6:
		//Listar un Espectaculo
		$id_espec = $_GET["id_espec"];
		$sql = "select e.nombre, u.nombre, e.hora, e.fecha, e.cod_espec, e.genero, e.descripcion from tb_espectaculo e inner join tb_ubicaciones u on e.ubicacion = u.numeracion where e.cod_espec = $id_espec";
		
		$cn = mysql_connect("localhost","root","");
		mysql_select_db("bd_teleticket", $cn);
		$resultado = mysql_query($sql,$cn);
				
		$usuario = mysql_fetch_row($resultado);
				
		mysql_close($cn);
		
		$response = $_GET["callback"]."(".json_encode($usuario).")";
		echo $response;
		break;
		
		case 7:
		//Listar Espectaculos
		$sql = "select e.nombre, u.nombre, e.hora, e.fecha, e.cod_espec, e.genero, e.descripcion from tb_espectaculo e inner join tb_ubicaciones u on e.ubicacion = u.numeracion ORDER BY e.nombre";
		
		$cn = mysql_connect("localhost","root","");
		mysql_select_db("bd_teleticket", $cn);
		$resultado = mysql_query($sql,$cn);
		$total = mysql_num_rows($resultado);		
		
		$lista = array();
		for($i=0; $i<$total;$i++){
			$lista[] = mysql_fetch_row($resultado);
		}
		
		mysql_close($cn);
		
		//print_r($lista);
		
		$response = $_GET["callback"]."(".json_encode($lista).")";
		echo $response;
		break;
		
		case 8:
		//Listar un Espectaculo Recomendados
		$cod_espec = $_GET["cod_espec"];
		$sql = "select e.nombre, u.nombre, e.hora, e.fecha, e.cod_espec, e.genero from tb_espectaculo e join tb_ubicaciones u on e.ubicacion = u.numeracion where genero = (select genero from tb_espectaculo where cod_espec = $cod_espec)";
		
		$cn = mysql_connect("localhost","root","");
		mysql_select_db("bd_teleticket", $cn);
		$resultado = mysql_query($sql,$cn);
		$total = mysql_num_rows($resultado);		
		
		$lista = array();
		for($i=0; $i<$total;$i++){
			$lista[] = mysql_fetch_row($resultado);
		}
		
		mysql_close($cn);
		
		//print_r($lista);
		
		$response = $_GET["callback"]."(".json_encode($lista).")";
		echo $response;
		break;
		
		default:
		break;

	}
?>