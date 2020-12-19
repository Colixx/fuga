var canvas;
var ctx;
var fuente = new FontFace('Coalition', "url(fonts/Coalition.ttf) format('truetype')");
document.fonts.add(fuente);
fuente.load().then(dibujar);

// var imagenes
var imgExtraterrestre;
var imgSatelite;
var imgMeteorito;
var imgNaveyanki;
var imgVaca;
var musicaFondo;
var audioVaca;
var movExtraterrestre
var colision
var audioAcelerar
var audioYanki
var explosionMeteorito
var explosionSatelite

/*Variables para el juego*/
var puntos=0;
var vidas=3;

/*Variable para el fondo*/
var posicionFondo=0;


/*crear objetos*/
var extraterrestre= new Personaje(200,150,60,60);//!Acá les falto pasar el ancho y alto
var satelite=new Elemento(1800,200,"satelite",80,81);//los ultimos dos valores son ancho y alto
var satelite2=new Elemento(700,150,"satelite",80,81);//los ultimos dos valores son ancho y alto
var meteorito=new Elemento(1200,250,"meteorito",90,42);//los ultimos dos valores son ancho y alto
var naveYanki=new Elemento(2000,120,"naveYanki",77,46);//los ultimos dos valores son ancho y alto
var vaca=new Elemento(800,10,"vaca",83,96);//los ultimos dos valores son ancho y alto


function dibujar(){
    //selecciono el canvas
    canvas=document.getElementById("canvas");
    canvas.style.backgroundImage="url(imagenes/fondo-01.png)";
    canvas.style.backgroundSize="cover";
    //defino el contexto
    ctx=canvas.getContext("2d");

    dibujaTexto();
    /*Manera en que dibuja al personaje*/
    imgExtraterrestre=new Image();//creo un objeto image
    imgExtraterrestre.src="imagenes/extraterrestre.png";
    imgExtraterrestre.onload=function(){//si la imagen está cargada
        extraterrestre.dibujaPersonaje();
    }
    
    /*Manera que dibuja los planetas*/

    imgMeteorito=new Image();
    imgMeteorito.src="imagenes/meteorito-10.png"
    imgMeteorito.onload=function(){
	    meteorito.dibujaElemento(imgMeteorito);
    }

 	imgVaca=new Image();
    imgVaca.src="imagenes/vaquita-11.png"
    imgMeteorito.onload=function(){
	    vaca.dibujaElemento(imgVaca);
    } 

    imgSatelite=new Image();
    imgSatelite.src="imagenes/satelites-04.png"
    imgSatelite.onload=function(){
        satelite.dibujaElemento(imgSatelite);
    }
    imgSatelite2=new Image();
    imgSatelite2.src="imagenes/satelites-05.png"
    imgSatelite2.onload=function(){
        satelite2.dibujaElemento(imgSatelite2);
    }
    
    imgNaveyanki=new Image();
    imgNaveyanki.src="imagenes/naveyanki-12.png"
    imgNaveyanki.onload=function(){
        naveYanki.dibujaElemento(imgNaveyanki);
    }
    musicaFondo =  new Audio();
	musicaFondo.src="audios/musicaFondo.mp3";
	audioVaca =  new Audio();
	audioVaca.src="audios/audioVaca.mp3";
	movExtraterrestre =  new Audio();
	movExtraterrestre.src="audios/movExtraterrestre.mp3";
	colision = new Audio();
	colision.src="audios/colision.mp3"
	audioAcelerar = new Audio();
	audioAcelerar.src="audios/audioAcelerar.mp3"
	audioYanki = new Audio();
	audioYanki.src="audios/audioYanki.mp3"
	explosionMeteorito = new Audio();
	explosionMeteorito.src="audios/explosionMeteorito.mp3"
	explosionSatelite = new Audio();
	explosionSatelite.src="audios/explosionSatelite.mp3"

    setInterval(function(){
		
		if(vidas>0){
			/*Hacer que los elementos se muevan*/
			naveYanki.mover();
            meteorito.mover();
            satelite.mover();
            satelite2.mover();
            vaca.mover();
            musicaFondo.play();
            posicionFondo-=1;
			canvas.style.backgroundPosition=posicionFondo+"px 0px"
			/*ver si colisionaron con el personaje*/
			naveYanki.colision();
            meteorito.colision();
            satelite.colision();
            satelite2.colision();
            vaca.colision();
            /*borra y redibuja*/
			borrar();
			dibujaTexto();
			extraterrestre.dibujaPersonaje();
			naveYanki.dibujaElemento(imgNaveyanki);
            meteorito.dibujaElemento(imgMeteorito);
            satelite.dibujaElemento(imgSatelite);
            satelite2.dibujaElemento(imgSatelite2);
            vaca.dibujaElemento(imgVaca);

     
		}else{
			movExtraterrestre.pause();
			audioAcelerar.pause();
			audioVaca.pause();
			explosionMeteorito.pause();
			explosionSatelite.pause();
			audioYanki.pause();
			colision.pause();	
			borrar();
			if (posicionFondo<-6000){
			ctx.font="80px Coalition";
			ctx.fillStyle="#FFFFFF";
			ctx.fillText("PERDISTE",135,180)
			ctx.font="28px Coalition";
			ctx.fillStyle="#FFFFFF";
			ctx.fillText("PUNTOS ALCANZADOS:"+puntos,135,220)
			ctx.font="28px Coalition";
			ctx.fillStyle="#FFFFFF";
			ctx.fillText("VOLVER A JUGAR",220,260)
			}else{
			ctx.font="80px Coalition";
			ctx.fillStyle="#000";
			ctx.fillText("PERDISTE",135,180)
			ctx.font="28px Coalition";
			ctx.fillStyle="#000";
			ctx.fillText("PUNTOS ALCANZADOS:"+puntos,135,220)
			ctx.font="28px Coalition";
			ctx.fillStyle="#000";
			ctx.fillText("VOLVER A JUGAR",220,260)
			
		
			
			}
			}
		
	},1000/25);

};

function Personaje(x,y,ancho,alto){
    this.x=x;
    this.y=y;
    this.ancho=ancho;
	this.alto=alto;

    this.arriba=function(){
        if(this.y> 0){
            this.y-=50;
        }
    }

    this.abajo=function(){
        if(this.y< 350){
            this.y+=50;
        }
    }

    this.derecha=function(){
        if(this.x<0){
        this.x+=50;

        }
    }

    this.izquierda=function(){
        if(this.x>200){
        this.x-=50;        
        }
    }

    this.dibujaPersonaje=function(){
        ctx.drawImage(imgExtraterrestre,this.x,this.y,60,60);
    }
}

function Elemento(x,y,tipo,ancho, alto){
	this.x=x;
	this.y=y;
	this.tipo=tipo;
	this.alto=alto;
	this.ancho=ancho;

	this.dibujaElemento=function(img){
		ctx.drawImage(img,this.x,this.y);
	}
	this.mover=function(){
		if(this.x>-100){
			this.x-=10;
		}else{
			this.sortear();
        }

	}
	this.sortear=function(){
		//sorteo en x
		//formula (maximo-minimo+1)+minimo
		//entre 900 y 1500
		this.x=Math.floor(
			Math.random()*(1500-900+1)
				)+900;
		//entre 340 y 500
		this.y=Math.floor(
				Math.random()*(340-150+1)
				)+150;
	}

	this.colision=function(){
		if(
			(this.y+this.alto)>extraterrestre.y
			&&(this.y)<(extraterrestre.y+extraterrestre.alto)
			&&(this.x+this.ancho)>extraterrestre.x
			&&(this.x)<(extraterrestre.x+extraterrestre.ancho)
			){
			this.sortear();
			if(this.tipo=="vaca"){
				puntos+=50;
				audioVaca.play()
			}else if(this.tipo=="meteorito"){
				vidas--;
				explosionMeteorito.play()
				colision.play()
			}else if(this.tipo=="satelite"){
				vidas--;
				colision.play()
				explosionSatelite.play()
				//ver que sucede acá
			}else if(this.tipo=="naveYanki"){
				vidas--;
				audioYanki.play()
				colision.play()
				//ver que sucede acá
			}
		}
	}
			
}
function borrar(){
    canvas.width=800;
    canvas.heigth=600;
}
function ganar (){
			borrar();
			ctx.font="80px Coalition";
			ctx.fillStyle="#FFFFFF";
			ctx.fillText("LLEGASTE!",115,180)
			ctx.font="28px Coalition";
			ctx.fillStyle="#FFFFFF";
			ctx.fillText("PUNTOS ALCANZADOS:"+puntos,150,220)
			ctx.font="28px Coalition";
			ctx.fillStyle="#FFFFFF";
			ctx.fillText("VOLVER A JUGAR",220,260)
}

function dibujaTexto(){
	ctx.font="15px Coalition"; //definia la fuente
	ctx.fillStyle="#000000";//definia el color
	//Dibuja un texto recibe 3 valores, el texto, posX, posY
	ctx.fillText("Vidas: "+vidas,680,40);
	ctx.fillText("Puntos: "+puntos,20,40);

}
document.addEventListener("keydown", function(e){
    switch(e.keyCode)
		{
			case 38:
			    extraterrestre.arriba();
			    movExtraterrestre.play()
			break;
			case 40:
                extraterrestre.abajo();
                movExtraterrestre.play()
			break;
			case 37:
			extraterrestre.izquierda();
			audioAcelerar.pause()
			posicionFondo+=15;
			canvas.style.backgroundPosition=posicionFondo+"px 0px"; 
                
			break;
			case 39:
			extraterrestre.derecha();
			audioAcelerar.play()
			posicionFondo-=15;
			canvas.style.backgroundPosition=posicionFondo+"px 0px"               
			break;
        }
       

        
})