// Definición del rompecabezas
const puzzlePieces = [
    { id: 1, top: 0, left: 0 },
    { id: 2, top: 0, left: 120 },
    { id: 3, top: 0, left: 240 },
    { id: 4, top: 120, left: 0 },
    { id: 5, top: 120, left: 120 },
    { id: 6, top: 120, left: 240 },
    { id: 7, top: 240, left: 0 },
    { id: 8, top: 240, left: 120 },
    { id: 0, top: 240, left: 240 } // Pieza vacía
];

// Función para mezclar las piezas del rompecabezas
function shufflePuzzle() {
    puzzlePieces.sort(() => Math.random() - 0.5);
    renderPuzzle();
}

// Función para renderizar el rompecabezas en el DOM
function renderPuzzle() {
    const puzzleContainer = document.getElementById('puzzle');
    puzzleContainer.innerHTML = '';

    puzzlePieces.forEach(piece => {
        const puzzlePiece = document.createElement('div');
        puzzlePiece.classList.add('puzzle-piece');
        puzzlePiece.textContent = piece.id !== 0 ? piece.id : ''; // Mostrar números en las piezas (excepto la vacía)
        puzzlePiece.style.top = `${piece.top}px`;
        puzzlePiece.style.left = `${piece.left}px`;

        puzzlePiece.addEventListener('click', () => {
            movePiece(piece);
            checkWin();
        });

        puzzleContainer.appendChild(puzzlePiece);
    });
}

// Función para intercambiar una pieza con la pieza vacía (si es posible)
// Función para intercambiar una pieza con la pieza vacía (si es posible)
function movePiece(piece) {
    const emptyPiece = puzzlePieces.find(p => p.id === 0);
    const emptyIndex = puzzlePieces.indexOf(emptyPiece);
    const pieceIndex = puzzlePieces.indexOf(piece);

    // Verificar si la pieza puede moverse
    const canMove =
        (Math.abs(emptyIndex - pieceIndex) === 1 && Math.floor(emptyIndex / 3) === Math.floor(pieceIndex / 3)) ||
        (Math.abs(emptyIndex - pieceIndex) === 3);

    if (canMove) {
        // Intercambiar las posiciones de las piezas en el array
        [puzzlePieces[emptyIndex], puzzlePieces[pieceIndex]] = [puzzlePieces[pieceIndex], puzzlePieces[emptyIndex]];

        renderPuzzle();
        checkWin(); // Verificar si se ha completado el rompecabezas después de mover una pieza
    }
}



// Función para verificar si una pieza está adyacente a la pieza vacía
function isAdjacent(piece, emptyPiece) {
    return (
        (Math.abs(piece.top - emptyPiece.top) === 120 && piece.left === emptyPiece.left) ||
        (Math.abs(piece.left - emptyPiece.left) === 120 && piece.top === emptyPiece.top)
    );
}

// Función para verificar si se ha completado el rompecabezas
// Función para verificar si se ha completado el rompecabezas
// Función para verificar si se ha completado el rompecabezas
// Función para verificar si se ha completado el rompecabezas
function checkWin() {
    const correctOrder = [1, 2, 3, 4, 5, 6, 7, 8, 0]; // Orden correcto de las piezas

    const currentOrder = puzzlePieces.map(piece => piece.id); // Obtener el orden actual de las piezas

    const isWin = JSON.stringify(correctOrder) === JSON.stringify(currentOrder);

    if (isWin) {
        alert('¡Felicidades! Has completado el rompecabezas.');
    }
}



// Mezclar y renderizar el rompecabezas al cargar la página
window.onload = () => {
    shufflePuzzle();
};
