const formulario = document.getElementById('formulario'); //Traemos el formulario
const inputs = document.querySelectorAll('#formulario input');//como así tambien los inputs de éste
const enviado = document.getElementById('enviado'); // y el div donde vamos a mostrar los datos del formulario enviado
const errores = document.getElementById('errores');

const regex = {
	nombOapell: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos, hasta 40 caracteres
	contraseña: /^.{4,16}$/, // 4 a 16 caracteres
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // que tenga @ y un .algo
}

const campos = { // Por defecto todos los campos estan en false
	nombre:             false,
    apellido:           false,
    edad:               false,
	email:              false,
	confirmEmail:       false,
	contraseña:         false,
    confirmContraseña:  false
}

const validar =(e)=>{
    switch (e.target.id){ // "Switchea" segun los diferentes ID de los input
        case "nombre":
            validaInputs(regex.nombOapell, e.target, e.target.id);
        break;
        case "apellido":
            validaInputs(regex.nombOapell, e.target, e.target.id);
        break;
        case "edad":
            if(e.target.value>=18&&e.target.value<125){ // la edad hace la validación aqui mismo, sin necesidad de expreciones regulares
                document.getElementById('grupo_edad').classList.remove('error');
                document.getElementById('grupo_edad').classList.add('bien');
                campos['edad']=true;
            }else{
                document.getElementById('grupo_edad').classList.remove('bien');
                document.getElementById('grupo_edad').classList.add('error');
                campos['edad']=false
            }
        break;
        case "email":
            validaInputs(regex.email, e.target, e.target.id);
            validaIguales(e.target.id, 'confirmEmail');
        break;
        case "confirmEmail":
            validaIguales('email', e.target.id);
        break;
        case "contraseña":
            validaInputs(regex.contraseña, e.target, e.target.id);
            validaIguales(e.target.id, 'confirmContraseña');
        break;
        case "confirmContraseña":
            validaIguales('contraseña', e.target.id);
        break;
    }
}

const validaInputs=(expresion, et, id)=>{ // funcion que recibe la exprecion regular para cada caso y
    if(expresion.test(et.value)){    //  sobre qué aplicarla
        document.getElementById(`grupo_${id}`).classList.remove('error'); // quita estilos de error
        document.getElementById(`grupo_${id}`).classList.add('bien'); // agrega los estilos de que está too bien
        campos[id]=true; // cambia el estado del campo del mismo nombre
    }else{ // lo mismo que arriba pero al vezre
        document.getElementById(`grupo_${id}`).classList.remove('bien');
        document.getElementById(`grupo_${id}`).classList.add('error');
        campos[id]=false;
    }
}

const validaIguales=(otro, id)=>{//compara los valores de 2 id pasados por parametro
    const uno = document.getElementById(id);
    const dos = document.getElementById(otro);

    if(uno.value===dos.value){
        document.getElementById(`grupo_${id}`).classList.remove('error');
        document.getElementById(`grupo_${id}`).classList.add('bien');
        campos[id]=true;
    }else{
        document.getElementById(`grupo_${id}`).classList.remove('bien');
        document.getElementById(`grupo_${id}`).classList.add('error');
        campos[id]=false;
    }
}

formulario.addEventListener('submit', (e) => {// Lo que ejecuta el boton de enviar
    e.preventDefault();// evitamos que cambie la url
	const termYcond = document.getElementById('termYcond');//traemos el checkbox de los terminos y condiciones
    const camposError = {};
    const mensajesError = [
        "El nombre no puede tener numeros, maximo 40 caracteres",
        "El apellido no puede tener numeros, maximo 40 caracteres",
        "Debe ser mayor de edad y menor de 125",
        "El Email debe tener un @ y un '.com' o similar",
        "Los Email no coinciden",
        "La contraseña debe tener entre 4 y 16 cracteres",
        "Las contraseñas no coinciden"
    ];
    const camposValor = {};
    const keys = Object.keys(campos);
    if(campos.nombre && campos.apellido && campos.edad && campos.email && campos.confirmEmail && campos.contraseña && campos.confirmContraseña && termYcond.checked){
        // si toooodos los campos son verdaderos y el checkbox is checked...
        console.log("enviado!!");
        formulario.style.display="none";
        enviado.style.display="block";
        var pCabecera = document.createElement("p");
        var pPie = document.createElement("p");
        pCabecera.innerText="FELICITACIONES! En breve recibirá un email de confirmación (Mentira, no recibirá nada pero hagamos de cuenta que si)\nLos datos enviados fueron los siguientes:";
        enviado.appendChild(pCabecera);
        var lista = document.createElement("ul");
        for(let i=0; i<keys.length; i++){
            camposValor[keys[i]] = document.getElementById(keys[i]).value;
            var li = document.createElement("li");
            li.innerText = keys[i]+":  "+camposValor[keys[i]];
            lista.appendChild(li);
        }
        enviado.appendChild(lista);
        pPie.innerText="Como podrá apreciar al ver expuesta su contreseña, nuestra seguridad no es de lo mejor\nEstamos trabajando para mejorar nuestro sitio, cordialmente Paint NFTeam (Re que soy yo solo, porque hablo en plural?)";
        enviado.appendChild(pPie);
    } else {
        errores.style.display="block";
        errores.innerHTML="";
        var pECabecera = document.createElement("p");
        pECabecera.innerText="Revisar los error/es en el/los siguiente/s campo/s\n";
        errores.appendChild(pECabecera);
        var lista = document.createElement("ul");        
        for(let i=0;i<keys.length;i++){
            if(!campos[keys[i]]){
                camposError[keys[i]] = mensajesError[i];
                var li = document.createElement("li");
                li.innerText = camposError[keys[i]];
                lista.appendChild(li);
            }
        }
        errores.appendChild(lista);
    }
});

inputs.forEach((input)=>{
    input.addEventListener('keyup', validar); //Cada que se levanta la tecla se ejecuta la validación
    input.addEventListener('blur', validar); // de igual manera si se le quita el foco al input
});
//-------------------ejercicios del trabajo practico-----
function ejercicio1(){
    nombre = null;
    var anios;
    while(nombre==null || nombre==""){
        nombre=prompt("Dime tu nombre:","")
    }
    while(anios==null || anios==0){
        anios=prompt("Dime tu edad:")
    }
    alert("Bienvenido, " + nombre + ". Ya has vivido aprox "+anios*365+" dias! faaa...")
}

function rectangulo(){
    var b = prompt("Ingrese Base");
    var h = prompt("Ingrese Altura");
    for (i=0;i<h;i++){
        for (k=0;k<b;k++){
            document.write("*");
        }
        document.write("<br>");
    }    
}

function ejercicio3(){    
    var lista = new Array ('a','b','c','1','x','9','d','4');
    var item ;
    for (item=0;item<lista.length;item++){
        if (lista[item] != "1" && lista[item] != "9" && lista[item] != "4"){
            document.write(lista[item]+'<br>');
        }
    }
}

function ejercicio4(){
    var i;
    for(i=0;i<50;i++){
        document.write(Math.floor(Math.random()*7)+" - ");
    }
}

function ejercicio5(){
    var random = Math.floor(Math.random()*1000000)+1;
    var randomTrucho = Math.floor(Math.random()*1000000)+1;
    var intentos=0;
    alert("Bienvenido! tendrás que avidinar el numero de 1 a 1.000.000 que estoy pensando")
    do{
        var num = prompt("Ingrese numero",randomTrucho);
        if (num==randomTrucho){
            alert("TE LA KREISTE WEEE JAJAJJA nop, no es ése el numero XD")
        } else if(num<random){
            alert("nop, un poco mas alto");
        } else if(num>random){
            alert("nop, un poco mas bajo")
        }
        randomTrucho=0;
        intentos++;
    }while(num!=random)
    alert("FELICITACIONES! SI, EL NUMERO ERA EL "+random+" Solo te costó "+intentos+" intentos descubrirlo!")
}

function ejercicio6(){
    var str = prompt("Ingrese su frase","");
    var res = str.split(" ");
    var num = res.length;
    var inv = res.slice().reverse();
    var az = res.slice().sort();
    var za = az.slice().reverse();
    
    alert("A continuación, información sobre su frase:\n-Tiene un largo de: "+num+
    " palabras\n-Empieza con la palabra '"+res[0]+
    "'\n-Termina con la palabra '"+res[res.length-1]+
    "'\n-Su frase escrita en orden inverso: "+inv.join(" ")+
    "\n-Su frase ordenada alfabéticamente: "+az.join(" ")+
    "\n-Su frase ordenada de la Z a la A: "+za.join(" "));
}