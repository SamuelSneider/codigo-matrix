let selectedPoints = 0;
let matrix = [];


function generarMatrizAleatoria() {
    matrix = [];
    for (let i = 0; i < 10; i++) {
        const fila = [];
        for (let j = 0; j < 5; j++) {
            fila.push(""); 
        }
        matrix.push(fila);
    }
}


function mostrarMatriz() {
    const tablaMatriz = document.getElementById("matrix");
    tablaMatriz.innerHTML = "";
    matrix.forEach((fila, indiceFila) => {
        const tr = document.createElement("tr");
        fila.forEach((celda, indiceColumna) => {
            const td = document.createElement("td");
            if (celda === "X") {
                td.classList.add("disabled");
            } else if (celda === "selected") {
                td.classList.add("selected");
            } else {
                td.onclick = function() {
                    seleccionarCelda(td, indiceFila, indiceColumna);
                };
            }
            tr.appendChild(td);
        });
        tablaMatriz.appendChild(tr);
    });
}


function deshabilitarFilaYColumna(fila, columna) {
    for (let i = 0; i < 10; i++) {
        matrix[i][columna] = "X";
    }
    for (let j = 0; j < 5; j++) {
        matrix[fila][j] = "X";
    }
}


function seleccionarCelda(celda, fila, columna) {
    if (!celda || celda.classList.contains("disabled") || celda.classList.contains("selected")) {
        return; 
    }

    if (selectedPoints >= 5) {
        alert("Ya has seleccionado el máximo de 5 puntos.");
        return;
    }
    celda.textContent = "X";
    celda.classList.add("selected");
    selectedPoints++;
    deshabilitarFilaYColumna(fila, columna);
}


function selectRandom() {
    const availableCells = matrix.flatMap((row, rowIndex) =>
        row.map((cell, colIndex) => ({ rowIndex, colIndex, cell }))
    ).filter(({ cell }) => cell !== "X" && cell !== "selected");

    if (availableCells.length === 0) {
        alert("No hay celdas disponibles para seleccionar.");
        return;
    }

    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const { rowIndex, colIndex } = availableCells[randomIndex];
    const selectedCell = document.querySelector(`#matrix tr:nth-child(${rowIndex + 1}) td:nth-child(${colIndex + 1})`);
    seleccionarCelda(selectedCell, rowIndex, colIndex);
}


window.onload = function() {
    generarMatrizAleatoria();
    mostrarMatriz();
};

