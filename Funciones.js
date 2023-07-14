$(document).ready(function(){
	llenarTabla();
	 llenarDDGenero();


	$('#btnModal').click(function()	{
		console.log('modal');
		$('#modalAgregar').modal('show');
	});

	$('#btnGuardar').click(
		function()
		{
			var ID =0;
			var NOMBRE = $('#nombreC').val();
			var APP = $('#appC').val();
			var FECHA_NACIM = $('#fnC').val();
			var ESTATUS = $('#estatusC').val();

			if(NOMBRE == '')
				{$('#nombreC').focus();}
			else if(APP == '')
				{$('#appC').focus();}
			else if(ESTATUS == '')
				{$('#estatusC').focus();}
			else
			{
				var json=  {"id": ID,"nombre": NOMBRE,"app": APP,"fecha_nacim": FECHA_NACIM,"estatus": ESTATUS}
			};


			console.log( json);
			$.ajax({
				type:'ajax',
				method:'post',
				url:'http://localhost:9001/PersonalWS/create',
				data: JSON.stringify(json),
				contentType:'application/json; charset=UTF-8',
				success:function(respuesta)
				{

					$('#modalAgregar').modal('hide');
					//$('.alert-success').html("se guardo el empleado").fadein().delay(8000).fadeOut('snow');
					llenarTabla();

				},
				error: function(respuesta){
					console.log(respuesta);
				}
			});

	});

	//para editar hay que buscar
	$('#registrosBD').on('click','.btn-warning',function(){
		var id = $(this).attr('data');		
		var json=  {"id": id,"nombre": "","genero": "","precio": ""}
		$.ajax({
			type:'ajax',
			method:'post',
			url:'http://localhost:9001/PeliculaWS/buscar',
			data: JSON.stringify(json),
			contentType:'application/json; charset=UTF-8',
			success:function(respuesta)
			{	
				console.log(respuesta);		
				$('#idU').val(id);
			    $('#nombreU').val(respuesta.nombre);
				$('#generoU').val(respuesta.genero);
				$('#precioU').val(respuesta.precio);
				$('#modalEditar').modal('show');
			},
			error: function(respuesta){
				console.log(respuesta);
			}
		});
	});
	$('#btnEditar').click(
		function()
		{
			
			var ID = $('#idU').val();			
			var NOMBRE = $('#nombreU').val();
			var APP = $('#appU').val();
			var FECHA_NACIM = $('#fnU').val();
			var ESTATUS = $('#estatusU').val();
	
			if(NOMBRE == '')
				{$('#nombreU').focus();}
			else if(APP == '')
				{$('#appU').focus();}
			else if(ESTATUS == '')
				{$('#estatusU').focus();}
			else
			{
				var json=  {"id": ID,"nombre": NOMBRE,"app": APP,"fecha_nacim": FECHA_NACIM,"estatus": ESTATUS}
			};

			console.log(json);

			$.ajax({
				type:'ajax',
				method:'post',
				url:'http://localhost:9001/PersonalWS/update',
				data: JSON.stringify(json),
				contentType:'application/json; charset=UTF-8',
				success:function(respuesta)
				{
					console.log('se edito');

					$('#modalEditar').modal('hide');
					$('.alert-warning').html("Se edito el empleado").fadeIn().delay(5000).fadeOut('snow');
					llenarTabla();

				},
				error: function(respuesta){
					console.log('error' + respuesta);
				}
			});
	});

	//para eliminar hay que buscar
	$('#registrosBD').on('click','.btn-danger',function(){
		var id = $(this).attr('data');
		var json=  {"id": id,"nombre": "","genero": "","precio": ""}

		$.ajax({
			type:'ajax',
			method:'post',
			url:'http://localhost:9001/PeliculaWS/buscar',
			data: JSON.stringify(json),
			contentType:'application/json; charset=UTF-8',
			success:function(respuesta)
			{
				console.log(respuesta);		
				$('#idD').val(id);
			    $('#nombreD').val(respuesta.nombre);
				$('#generoD').val(respuesta.genero);
				$('#precioD').val(respuesta.precio);

				$('#modalEliminar').modal('show');

			},
			error: function(respuesta){
				console.log('error' + respuesta);
			}
		});
	});


	$('#btnEliminar').click(function(){
		var ID = $('#idD').val();			
		var NOMBRE = $('#nombreD').val();
		var genero = $('#appD').val();
		var precio = $('#fnD').val();
		

		var json=  {"id": id,"nombre": NOMBRE,"genero": genero,"precio": precio}

		console.log(json);

		$.ajax({
			type:'ajax',
			method:'post',
			url:'http://localhost:9001/PeliculaWS/eliminar',
			data: JSON.stringify(json),
			contentType:'application/json; charset=UTF-8',
			success:function(respuesta)
			{
				console.log('se elimino');

				$('#modalEliminar').modal('hide');			
				$('.alert-warning').html("Se elimino pelicula").fadeIn().delay(5000).fadeOut('snow');
				llenarTabla();

			},
			error: function(respuesta){
				console.log('error' + respuesta);
			}
		});
	});


	$('#dmGenero .dropdown-item').on('click', function(){
	    var id = $(this).attr('data');
	    //var genderText = $(this).text();
	     //console.log('genderText ' + genderText);
	      console.log('id ' );   
	});


	$("#tableMenu a").on('click', function(e) {
	  e.preventDefault(); // cancel the link behaviour

	  var selText = $(this).text();
	    $("#tableButton").text(selText);
	    console.log('id ' + selText);
	});

	$('#tableMenu1 li a').on('click', function(){
	    	  var selText = $(this).text();
		    
		    console.log('id ' + selText);
	});







    loadWindowSystem();

});//$(document).ready(function(){


function loadWindowSystem(){

	$('#selGenders').on('click', function(){
	    	  var selText = $(this).text();
		    var vasss = $(this).value();
		    console.log('id ' + selText);
	});

}







function llenarTabla(){
	$.ajax({
		method:'get',
		url:'http://localhost:9001/EmployeesWS/listarEmp',
		contentType:'application/json; charset=UTF-8',
		dataType:'json',
		success:function (respuesta){
			var cuerpo ='';
			for(var i=0; i<respuesta.length; i++)
			{
				cuerpo += '<tr>' +
						'<td> ' + respuesta[i].id  + '</td>' +
						'<td> ' + respuesta[i].gender.name  + '</td>' +
						'<td> ' + respuesta[i].job.name  + '</td>' +
						'<td> ' + respuesta[i].name  + '</td>' +
						'<td> ' + respuesta[i].last_name  + '</td>' +
						'<td> ' + respuesta[i].birthdate  + '</td>' +
						'<td> <a class="btn btn-warning" data="' + respuesta[i].id + '"><i class="fa fa-fw fa-sync"></i> </a>  </td>' +
						'<td> <a class="btn btn-danger" data="' + respuesta[i].id + '"><i class="fa fa-fw fa-trash"></i> </a>  </td>' +
						'</tr>'			
			};					

			$('#registrosBD').html(cuerpo);	
		},
		error: function(respuesta){
			console.log('error');
		}
	});
};


function llenarDDGenero(){

	var cuerpo1 ='';
	cuerpo1 += '<a class="dropdown-item" href="#" data="123">nuevo</a>';
	$('#dmGenero').html(cuerpo1);	


	$.ajax({
		method:'get',
		url:'http://localhost:9001/EmployeesWS/listarGen',
		contentType:'application/json; charset=UTF-8',
		dataType:'json',
		success:function (respuesta){
			var cuerpo ='';
			var cuerpo2 ='';
			var cuerpo3 ='';
			for(var i=0; i<respuesta.length; i++)
			{
				cuerpo += '<a class="dropdown-item" href="#" data="' + respuesta[i].id + '">' + respuesta[i].name  + '</a>' 

				//cuerpo2 += '<li data="' + respuesta[i].id + '" > <a href="#"> ' + respuesta[i].name  + '</a>  </li>' 
				cuerpo2 += '<li> <a href="#"> ' + respuesta[i].name  + ' </a>  </li>' 

				cuerpo3  += '<option value="' + respuesta[i].id + '"> ' + respuesta[i].name  + ' </option>'
			};					

		$('#dmGenero').html(cuerpo);	
		$('#tableMenu1').html(cuerpo2);
		$('#selGenders').html(cuerpo3);
		
		},
		error: function(respuesta){
			console.log('error');
		}
	});

};


