const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	nombOapell: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const campos = {
	nombre: false,
    apellido: false,
	correo: false,
	confirmCorreo: false,
	password: false,
    confirmPassword: false
}

formulario.addEventListener('submit', (e) => {
    e.preventDefoult
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