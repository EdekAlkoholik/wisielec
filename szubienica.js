var haslo = "Bez pracy nie ma kołaczy";
haslo = haslo.toUpperCase();

var ile_skuch = 0;
var dlugosc = haslo.length;
var haslo1 = "";

var yes = new Audio("green.mp3");
var nope = new Audio("red.mp3");
var zgon = new Audio("zgon.mp3");

for(i = 0; i < dlugosc; i++)
{
	if(haslo.charAt(i) == " ") haslo1 = haslo1+" ";
	else haslo1 = haslo1+ "-";
}

function wypisz_haslo()
{
	document.getElementById("plansza").innerHTML = haslo1; 
}

window.onload = start;

var litery = ["A", "Ą", "B", "C", "Ć", "D", "E", "Ę", "F", "G", "H", "I", "J", "K",
						"L", "Ł", "M", "N", "Ń", "O", "Ó", "U", "P", "R", "S","Ś", "T", "V","W","X","Y","Z","Ź","Ż","Q"];

function start()
{
	var tresc_diva = "";
	
	for(i = 0; i <= 34; i++)
	{
		var element = "lit" + i;
		tresc_diva = tresc_diva + '<div class="litera" onclick="sprawdz('+i+')" id="'+element+'">'+litery[i]+'</div>';
		if((i+1) % 7 == 0) tresc_diva =  tresc_diva +'<div style="clear:both;"></div>'
	}
	
	document.getElementById("alfabet").innerHTML=tresc_diva;
	
	wypisz_haslo();
}

String.prototype.zmienZnak = function(miejsce, znak)
{
	if(miejsce > this.length - 1)  return this.toString();
	else return this.substr(0,miejsce) + znak + this.substr(miejsce+1);
}

function sprawdz(numer)
{
	var trafiona = false;
	for(i=0;i<dlugosc;i++)
	{
		if(haslo.charAt(i) == litery[numer])
		{
			haslo1 = haslo1.zmienZnak(i,litery[numer]);
			trafiona = true;
		}
	}
	if(trafiona)
	{
		yes.play();
		var element = "lit" + numer;
		document.getElementById(element).style.background = "#003300";
		document.getElementById(element).style.color="#00C000";
		document.getElementById(element).style.border = "3px solid #00C000";
		document.getElementById(element).style.cursor="default";
		
		wypisz_haslo();
	}
	else
	{
		nope.play();
		var element = "lit" + numer;
		document.getElementById(element).style.background = "#330000";
		document.getElementById(element).style.color="#C00000";
		document.getElementById(element).style.border = "3px solid #C00000";
		document.getElementById(element).style.cursor="default";
		document.getElementById(element).setAttribute("onclick",";");
		
		
		ile_skuch++;
		var obraz = "img/s"+ile_skuch+".png";
		document.getElementById("szubienica").innerHTML = '<image src="'+obraz+'" alt="" />';
	}
	
	if(haslo == haslo1)
	document.getElementById("alfabet").innerHTML = "Podano Prawidłowe hasło: <br/>" + haslo+'<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';

	if(ile_skuch >= 7)
	{
		zgon.play();
		document.getElementById("alfabet").innerHTML = "Przegrana<br/> Prawidłowe hasło: <br/>" + haslo+'<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
	}
}