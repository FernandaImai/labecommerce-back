// Função para gerar número aleatório entre 0 e 5
function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * 6); // Gera um número entre 0 e 5
  }
  
  // Obtém a escolha do jogador a partir do primeiro argumento da linha de comando
  const escolhaJogador = process.argv[2];
  const numeroJogador = parseInt(process.argv[3]);
  
  if (escolhaJogador && (escolhaJogador === 'par' || escolhaJogador === 'impar') && !isNaN(numeroJogador)) {
    const escolhaComputador = escolhaJogador === 'par' ? 'impar' : 'par';
    const numeroComputador = gerarNumeroAleatorio();
    
    console.log(`Você escolheu ${escolhaJogador} e o computador escolheu ${escolhaComputador}.O resultado foi ${numeroJogador + numeroComputador}.`);
    
    if ((escolhaJogador === 'par' && (numeroJogador + numeroComputador) % 2 === 0) ||
        (escolhaJogador === 'impar' && (numeroJogador + numeroComputador) % 2 !== 0)) {
      console.log('Você ganhou!');
    } else {
      console.log('Você perdeu!');
    }
  } else {
    console.log('Por favor, escolha "par" ou "impar" como primeiro argumento e um número como segundo argumento.');
  }
  