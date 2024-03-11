let joueur_actuel = 'blue';
let score_bleu = 0;
let score_rouge = 0;

function resetPlateau() {
  gridSquares.forEach(square => {
    square.style.backgroundColor = '';
  });
  document.getElementById('vainqueur').textContent = '';
  joueur_actuel = 'blue';
  document.getElementById('gameGrid').style.borderColor = joueur_actuel;
  document.getElementById('scoreboard').style.backgroundColor = '#4CAF50';
}

function checkVainqueur() {
  const conditionDeVictoire = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // lignes
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // colonnes
    [0, 4, 8], [2, 4, 6] // diagonales
  ];

  for (let condition of conditionDeVictoire) {
    const [a, b, c] = condition;
    if (gridSquares[a].style.backgroundColor === joueur_actuel &&
      gridSquares[b].style.backgroundColor === joueur_actuel &&
      gridSquares[c].style.backgroundColor === joueur_actuel)
    {
      return true;
    }
  }
  return false;
}

function playerSwitch() {
  joueur_actuel = (joueur_actuel === 'blue') ? 'red' : 'blue';
  document.getElementById('gameGrid').style.borderColor = joueur_actuel;
}

function gestionClickSouris(event) {
  const caseclick = event.target;

  if (document.getElementById('vainqueur').textContent !== '') {
    alert("Le jeu est terminé. Veuillez commencer une nouvelle partie.");
    return;
  }

  if (caseclick.style.backgroundColor !== '') {
    alert("Cette case est déjà sélectionnée. Veuillez choisir une autre case.");
    return;
  }

  caseclick.style.backgroundColor = joueur_actuel;

  if (checkVainqueur()) {
    if (joueur_actuel === 'blue')
    {
      score_bleu++;
    }
    if (joueur_actuel === 'red')
    {
      score_rouge++;
    }
    document.getElementById('score_bleu').textContent = score_bleu;
    document.getElementById('score_rouge').textContent = score_rouge;

    document.getElementById('vainqueur').textContent = 'Le joueur ' + joueur_actuel + ' a gagné!';
    setCouleurBanniere(joueur_actuel);
  }
  else
  {
    if (toutesLesCasesSelect())
    {
      document.getElementById('vainqueur').textContent = 'Match nul !';
      setCouleurBanniere('aucun');
    }
    else
    {
      playerSwitch();
      alert("C'est au tour du joueur " + joueur_actuel + " de jouer.");
    }
  }
}


function toutesLesCasesSelect() {
  for (let square of gridSquares) {
    if (square.style.backgroundColor === '')
    {
      return false;
    }
  }
  return true;
}

function setCouleurBanniere(winner) {
  const scoreboard = document.getElementById('scoreboard');
  if (winner === 'blue')
  {
    scoreboard.style.backgroundColor = 'blue';
  }
  else if (winner === 'red')
  {
    scoreboard.style.backgroundColor = 'red';
  }
  else if(winner === 'aucun')
  {
    scoreboard.style.backgroundColor = '#f8a100'; // Couleur par défaut si aucun vainqueur
  }
}

const gridSquares = document.querySelectorAll('.gridSquare');

gridSquares.forEach(square => {
  square.addEventListener('click', gestionClickSouris);
});

const newGameButton = document.getElementById('newGameBtn');
newGameButton.addEventListener('click', resetPlateau);
