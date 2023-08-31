// Função para gerar escolha aleatória do computador
function gerarEscolhaComputador() {
    const opcoes = ['pedra', 'papel', 'tesoura'];
    const indiceAleatorio = Math.floor(Math.random() * opcoes.length);
    return opcoes[indiceAleatorio];
  }
  
  // Obtém a escolha do jogador a partir do argumento da linha de comando
  const escolhaJogador = process.argv[2];
  
  if (escolhaJogador) {
    const escolhaDoComputador = gerarEscolhaComputador();
    
    console.log(`Você escolheu ${escolhaJogador} e o computador escolheu ${escolhaDoComputador}.`);
    
    if (escolhaJogador === escolhaDoComputador) {
      console.log('Empate!');
    } else if (
      (escolhaJogador === 'pedra' && escolhaDoComputador === 'tesoura') ||
      (escolhaJogador === 'papel' && escolhaDoComputador === 'pedra') ||
      (escolhaJogador === 'tesoura' && escolhaDoComputador === 'papel')
    ) {
      console.log('Você ganhou!');
    } else {
      console.log('Você perdeu!');
    }
  } else {
    console.log('Por favor, escolha pedra, papel ou tesoura como argumento.');
  }
  