import React from "react";
import Sketch from "react-p5";
import "firacode/distr/ttf/FiraCode-Regular.ttf";





const squareSize = 50;      // Tamanho de cada quadrado
const squareBorder = 10;
const gridMargin = 1;       // Quantidade de quadrados fora da tela em cada lado
const maxSquareSize = 3;    // Lado do maior quadrado possível

let gridX, gridY;           // Precisam ser calculados dentro de setup()
let finished = false;
let lampImage;
const rectangles = [];
const grid = [];

const LEFT = [1, 0, 0, 0];
const RIGHT = [0, 1, 0, 0];
const UP = [0, 0, 1, 0];
const DOWN = [0, 0, 0, 1];
const DIRS = [LEFT, RIGHT, UP, DOWN];





class Square {
    constructor(i, j, used) {
        this.i = i;
        this.j = j;
        this.used = used || false;
    }
}

class Rectangle {
    constructor(fromI, toI, fromJ, toJ, isImage) {
        this.fromI = fromI;
        this.toI = toI;
        this.fromJ = fromJ;
        this.toJ = toJ;
        this.isImage = isImage || false;
    }

    growDirection(dir) {
        let [left, right, up, down] = dir;

        // Essa soma retorna o tamanho do lado do quadrado apenas da direção especificada
        if ((this.toI - this.fromI + 1) * (left + right) + (this.toJ - this.fromJ + 1) * (up + down) >= maxSquareSize) {
            return false;
        }

        this.fromI = this.fromI - left;
        this.toI = this.toI + right;
        this.fromJ = this.fromJ - up;
        this.toJ = this.toJ + down;

        return true;
    }

    shrinkDirection(dir) {
        let [left, right, up, down] = dir;

        this.fromI = this.fromI + left;
        this.toI = this.toI - right;
        this.fromJ = this.fromJ + up;
        this.toJ = this.toJ - down;
    }
}





function createValidRectangle() {
    let possibleSquares = [];

    for (let column of grid) {
        for (let square of column) {
            if (!square.used) {
                possibleSquares.push(square);
            }
        }
    }

    if (possibleSquares.length === 0) {
        return null;
    }

    let resultSquare = possibleSquares[Math.floor(Math.random() * possibleSquares.length)];
    return new Rectangle(resultSquare.i, resultSquare.i, resultSquare.j, resultSquare.j);
}



function tryGrowRectangle(rectangle, dir) {
    if (!rectangle.growDirection(dir)) {
        // Não foi possível expandir o retângulo
        return false;
    }

    // Verifica se o retângulo está dentro do grid
    if (rectangle.fromI < 0 || rectangle.toI >= gridX || rectangle.fromJ < 0 || rectangle.toJ >= gridY) {
        rectangle.shrinkDirection(dir);
        return false;
    }

    // Verifica se o retângulo está colidindo
    for (let other of rectangles) {
        if (rectangle === other) {
            continue;
        }

        // Retângulo está colidindo
        if (rectangle.fromI <= other.toI && rectangle.toI >= other.fromI && rectangle.fromJ <= other.toJ && rectangle.toJ >= other.fromJ) {
            rectangle.shrinkDirection(dir);
            return false;
        }
    }

    return true;
}





function setup(s, parentElement) {
    // É ideal carregar a imagem de background dentro de setup()
    lampImage = s.loadImage("/logo192.png");

    s.createCanvas(s.windowWidth, s.windowHeight).parent(parentElement);
    s.background(0);

    // Isso é melhor do que usar hooks
    window.addEventListener("resize", () => {
        s.resizeCanvas(s.windowWidth, s.windowHeight);
    });



    // Calcula o tamanho da grade
    gridX = Math.ceil((s.width + gridMargin * squareSize * 2) / squareSize);
    gridY = Math.ceil((s.height + gridMargin * squareSize * 2) / squareSize);



    s.textFont("Fira Code");
    s.textSize(s.windowHeight / 15);
    s.textAlign(s.CENTER, s.CENTER);
    s.noiseDetail(2, 0.5);



    // Inicializa a grade
    for (let i = 0; i < gridX; i++) {
        grid[i] = [];
        for (let j = 0; j < gridY; j++) {
            grid[i][j] = new Square(i, j, false);
        }
    }



    // Inicializa o primeiro retângulo em um local aleatório mais ou menos central
    let ii = Math.floor(s.random(0.25, 0.75) * gridX);
    let jj = Math.floor(s.random(0.25, 0.75) * gridY);
    rectangles.push(new Rectangle(ii, ii + maxSquareSize - 1, jj, jj + maxSquareSize - 1, true));
}



function draw(s) {
    s.background(0);



    // Desenha os retângulos
    for (let rectangle of rectangles) {
        // É a distância entre o meio do retângulo e o mouse
        let distToMouse = s.dist(s.mouseX, s.mouseY, rectangle.fromI * squareSize + squareSize / 2, rectangle.fromJ * squareSize + squareSize / 2);

        // O tamanho da borda é baseado na distância até mouse e na posição do retângulo
        // A distância até o mouse deixa a borda maior quanto mais próxima do mouse
        // A posição do retângulo passa por uma função de Perlin Noise que cria uma animação que evolui
        let border = squareBorder * Math.max(
            s.noise(rectangle.fromI / 25, rectangle.fromJ / 25, s.frameCount / 100),
            s.map(distToMouse, 0, Math.max(s.width / 2, s.height / 2), 0.6, 0, true)
        );

        // A cor do retângulo é baseada na proporção entre o comprimento e a altura do retângulo
        // Retângulos altos tem uma cor mais clara
        // Retângulos longos tem uma cor mais escura
        s.fill(s.lerpColor(
            s.color(0, 0, 100),
            s.color(25, 25, 255),
            s.map((rectangle.toI - rectangle.fromI + 1) / (rectangle.toJ - rectangle.fromJ + 1), 1 / maxSquareSize, maxSquareSize, 0, 1)
        ));
        s.noStroke();

        // Desenha o retângulo. Se o retângulo for uma imagem, ela é desenhada como uma imagem, senão, como um retângulo
        if (rectangle.isImage) {
            s.image(
                lampImage,
                (rectangle.fromI - gridMargin) * squareSize + border,
                (rectangle.fromJ - gridMargin) * squareSize + border,
                (rectangle.toI - rectangle.fromI + 1) * squareSize - border * 2,
                (rectangle.toJ - rectangle.fromJ + 1) * squareSize - border * 2
            );
        } else {
            s.rect(
                (rectangle.fromI - gridMargin) * squareSize + border,
                (rectangle.fromJ - gridMargin) * squareSize + border,
                (rectangle.toI - rectangle.fromI + 1) * squareSize - border * 2,
                (rectangle.toJ - rectangle.fromJ + 1) * squareSize - border * 2
            );
        }
    }



    // Texto
    s.noStroke();
    s.fill(255);
    s.text("Hello World\nMeu nome é DaviAMSilva", s.width / 2, s.height / 2);





    // Nada a fazer daqui para baixo se tiver acabado
    if (finished)
        return;

    let currentRectangle = rectangles[rectangles.length - 1];



    // Tenta expandir o retângulo. As vezes o retângulo não é expandido apesar de ser possível mas isso gera um efeito mais interessante
    tryGrowRectangle(currentRectangle, DIRS[Math.floor(Math.random() * DIRS.length)]);
    tryGrowRectangle(currentRectangle, DIRS[Math.floor(Math.random() * DIRS.length)]);
    let ableToGrow = tryGrowRectangle(currentRectangle, DIRS[Math.floor(Math.random() * DIRS.length)]);



    // Não foi possível expandir o retângulo
    if (!ableToGrow) {
        // Marca o espaço como usado
        for (let i = currentRectangle.fromI; i <= currentRectangle.toI; i++) {
            for (let j = currentRectangle.fromJ; j <= currentRectangle.toJ; j++) {
                grid[i][j].used = true;
            }
        }

        let newRectangle = createValidRectangle();

        if (newRectangle === null) {
            // Não há mais retângulos para criar
            finished = true;
            return;
        }

        rectangles.push(newRectangle);
    }
}



const Background = () => {
    return (
        <Sketch draw={draw} setup={setup} />
    );
}



export default Background;