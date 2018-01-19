/*Jogo da memória
passos

- colocar as imagens nas cartas
- esconder as imagens nas cartas
- exibir a carta que for clicada
- quando tiver duas cartas expostas, conferir se elas sao iguais. se sim, deixa elas expostas, se não, esconde de novo
- quando acertar todos os pares, mensagem de parabens

*/

//verificar iguais


const iguais = function(c1,c2){
		let carta1 = document.getElementById(c1);
		let carta2 = document.getElementById(c2);

		if(carta1.style.backgroundImage === carta2.style.backgroundImage){
			return true;
		} else {
			return false;
	}
}



// embaralhar as cartas

// colocar as cartas na página
const posicao_das_cartas = ['01','02','03','04','05','06','07','08','09','10','11','12']

const numero_da_imagem_inicial = [1,2,3,4,5,6,1,2,3,4,5,6];

let numero_da_imagem = [];

while(numero_da_imagem_inicial.length>0){
	let aleatorio = Math.floor(Math.random()*numero_da_imagem_inicial.length);
	let aleatorioValor = numero_da_imagem_inicial.splice(aleatorio,1)[0];
	numero_da_imagem.push(aleatorioValor);
}



for(let cada_carta of posicao_das_cartas) {
	document.getElementById('carta'+cada_carta).style.backgroundImage = 'url("'+numero_da_imagem[Number(cada_carta)-1]+'.png")';
};





// cobrir as cartas
let mascaras = document.getElementsByClassName('mascara');

let cartas_expostas = {
	"contador": 0,
	"carta_exposta1": '',
	"carta_exposta2": ''
};

const clique = function() {




	this.style.display = 'none';
	cartas_expostas.contador++;


	if (cartas_expostas.contador === 1) {
		cartas_expostas.carta_exposta1 = this.className.substr(0,7);

	} else if (cartas_expostas.contador === 2) {
		cartas_expostas.carta_exposta2 = this.className.substr(0,7);

	};

	if(cartas_expostas.contador === 2) {
		if (iguais(cartas_expostas.carta_exposta1, cartas_expostas.carta_exposta2)) {
			//o par casou
			setTimeout(function(){
        let primeira_carta = document.getElementById(cartas_expostas.carta_exposta1);
        let segunda_carta = document.getElementById(cartas_expostas.carta_exposta2);
        primeira_carta.style.backgroundImage = '';
        segunda_carta.style.backgroundImage = '';	
      }, 500);
		} else {
			//vira as cartas de volta
			for(let mascara of document.getElementsByClassName('mascara')) {
				mascara.removeEventListener('click', clique);
			};
			setTimeout(function() {
				let primeira_carta = document.getElementsByClassName(cartas_expostas.carta_exposta1);
				let segunda_carta = document.getElementsByClassName(cartas_expostas.carta_exposta2);
				primeira_carta[0].style.display = '';
				segunda_carta[0].style.display = '';
				for(let mascara of document.getElementsByClassName('mascara')) {
					mascara.addEventListener('click', clique);
				};
			}, 750);

		};
		cartas_expostas.contador = 0;

	};



};

for(let mascara of mascaras) {
	mascara.addEventListener('click', clique);
};


//
