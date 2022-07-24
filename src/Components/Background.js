import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";





const backgroundSketch = (s) => {
    // Algumas constantes
    let squareSize = 40;            // Tamanho de cada quadrado
    let squareBorder = 10;          // Borda máxima entre os quadrados
    let gridMargin = 1;             // Quantidade de quadrados fora da tela em cada lado
    let maxSquareSize = 4;          // Lado do maior quadrado possível
    let gridX, gridY;               // Quantidade de quadrados na horizontal e na vertical

    let animationFinished = false;  // Se a animação já terminou
    let loadImageError = false;     // Se ocorreu um erro ao carregar a imagem
    let canvasIsLit = true;         // Se o canvas está aceso

    let litLampImage;               // Imagem da lâmpada acesa
    let unlitLampImage;             // Imagem da lâmpada apagada

    let rectangles = [];            // Guarda todos os retângulos
    let grid = [];                  // Guarda o estado (usado ou não) de cada quadrado

    // Direções
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
        constructor(left, right, top, bottom, isImage) {
            this.left = left;
            this.right = right;
            this.top = top;
            this.bottom = bottom;

            this.drawLeft = left;
            this.drawRight = right;
            this.drawTop = top;
            this.drawBottom = bottom;

            this.isImage = isImage || false;
        }

        growDirection(dir) {
            let [left, right, up, down] = dir;

            // Essa soma retorna o tamanho do lado do quadrado apenas da direção especificada
            if ((this.right - this.left + 1) * (left + right) + (this.bottom - this.top + 1) * (up + down) >= maxSquareSize) {
                return false;
            }

            this.left = this.left - left;
            this.right = this.right + right;
            this.top = this.top - up;
            this.bottom = this.bottom + down;

            return true;
        }

        shrinkDirection(dir) {
            let [left, right, up, down] = dir;

            this.left = this.left + left;
            this.right = this.right - right;
            this.top = this.top + up;
            this.bottom = this.bottom - down;
        }

        // Usa interpolação linear para criar uma transição suave entre a posição atual e a posição final
        smoothTransition() {
            this.drawLeft = this.drawLeft + (this.left - this.drawLeft) / 5;
            this.drawRight = this.drawRight + (this.right - this.drawRight) / 5;
            this.drawTop = this.drawTop + (this.top - this.drawTop) / 5;
            this.drawBottom = this.drawBottom + (this.bottom - this.drawBottom) / 5;
        }
    }





    // Separa todos os quadrados do grid que não estão usados e retorna um retângulo que ocupa um desses quadrados aleatórios
    function createValidRectangle() {
        let possibleSquares = [];

        for (let column of grid) {
            for (let square of column) {
                if (!square.used) {
                    possibleSquares.push(square);
                }
            }
        }

        // Se não houver quadrados disponíveis, a animação terminou
        if (possibleSquares.length === 0) {
            return null;
        }

        let resultSquare = possibleSquares[Math.floor(Math.random() * possibleSquares.length)];
        return new Rectangle(resultSquare.i, resultSquare.i, resultSquare.j, resultSquare.j);
    }



    // Tenta aumentar um retângulo em uma direção. Se não conseguir, o aumento é revertido 
    function tryGrowRectangle(rectangle, dir) {
        if (!rectangle.growDirection(dir)) {
            // Não foi possível expandir o retângulo
            return false;
        }

        // Verifica se o retângulo está dentro do grid
        if (rectangle.left < 0 || rectangle.right >= gridX || rectangle.top < 0 || rectangle.bottom >= gridY) {
            rectangle.shrinkDirection(dir);
            return false;
        }

        // Verifica se o retângulo está colidindo
        for (let other of rectangles) {
            if (rectangle === other) {
                continue;
            }

            // Retângulo está colidindo
            if (rectangle.left <= other.right && rectangle.right >= other.left && rectangle.top <= other.bottom && rectangle.bottom >= other.top) {
                rectangle.shrinkDirection(dir);
                return false;
            }
        }

        return true;
    }



    function drawRectangles() {
        for (let rectangle of rectangles) {
            // Transição suave da posição
            rectangle.smoothTransition();

            // É a distância entre o meio do retângulo e o mouse
            let distToMouse = s.dist(s.mouseX, s.mouseY, rectangle.left * squareSize + squareSize / 2, rectangle.top * squareSize + squareSize / 2);

            // O tamanho da borda é baseado na distância até mouse e na posição do retângulo
            // A distância até o mouse deixa a borda maior quanto mais próxima do mouse
            // A posição do retângulo passa por uma função de Perlin Noise que cria uma animação que evolui
            let border = squareBorder * Math.max(
                s.noise(rectangle.drawLeft / 25, rectangle.drawTop / 25, s.frameCount / 100),
                s.map(distToMouse, 0, Math.max(s.width / 2, s.height / 2), 0.6, 0, true)
            );

            // A cor do retângulo é baseada na proporção entre o comprimento e a altura do retângulo
            // Retângulos altos tem uma cor mais clara
            // Retângulos longos tem uma cor mais escura
            s.fill(s.lerpColor(
                s.color(0, 0, 100),
                s.color(25, 25, 255),
                s.map((rectangle.drawRight - rectangle.drawLeft + 1) / (rectangle.drawBottom - rectangle.drawTop + 1), 1 / maxSquareSize, maxSquareSize, 0, 1)
            ));
            s.noStroke();

            // Desenha o retângulo. Se o retângulo for uma imagem, ela é desenhada como uma imagem, senão, como um retângulo
            if (rectangle.isImage && !loadImageError) {
                s.image(
                    canvasIsLit ? litLampImage : unlitLampImage,
                    (rectangle.drawLeft - gridMargin) * squareSize + border,
                    (rectangle.drawTop - gridMargin) * squareSize + border,
                    (rectangle.drawRight - rectangle.drawLeft + 1) * squareSize - border * 2,
                    (rectangle.drawBottom - rectangle.drawTop + 1) * squareSize - border * 2
                );
            } else if (canvasIsLit) {
                s.rect(
                    (rectangle.drawLeft - gridMargin) * squareSize + border,
                    (rectangle.drawTop - gridMargin) * squareSize + border,
                    (rectangle.drawRight - rectangle.drawLeft + 1) * squareSize - border * 2,
                    (rectangle.drawBottom - rectangle.drawTop + 1) * squareSize - border * 2
                );
            }
        }
    }



    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
        s.background(10, 10, 20);
        s.noiseDetail(2, 0.5);



        // Carrega as imagens e trada das exceções
        litLampImage = s.loadImage("/images/lamp/lit192.png", () => { }, (e) => {
            loadImageError = loadImageError || true;
            console.error(e);
        });
        unlitLampImage = s.loadImage("/images/lamp/unlit192.png", () => { }, (e) => {
            loadImageError = loadImageError || true;
            console.error(e);
        });




        // Isso é melhor do que usar hooks
        window.addEventListener("resize", () => {
            s.resizeCanvas(s.windowWidth, s.windowHeight);
        });



        // Calcula o tamanho da grade
        gridX = Math.ceil((s.width + gridMargin * squareSize * 2) / squareSize);
        gridY = Math.ceil((s.height + gridMargin * squareSize * 2) / squareSize);



        // Inicializa a grade
        for (let i = 0; i < gridX; i++) {
            grid[i] = [];
            for (let j = 0; j < gridY; j++) {
                grid[i][j] = new Square(i, j, false);
            }
        }



        // Inicializa o primeiro retângulo em um local aleatório mais ou menos central
        let ii = Math.floor(s.random(0.40, 0.60) * gridX);
        let jj = Math.floor(s.random(0.40, 0.60) * gridY);
        rectangles.push(new Rectangle(ii, ii + maxSquareSize - 1, jj, jj + maxSquareSize - 1, true));
    }



    s.draw = () => {
        s.background(10, 10, 20);



        // Desenha os retângulos
        drawRectangles();





        // Nada a fazer daqui para baixo se tiver acabado
        if (animationFinished)
            return;

        let currentRectangle = rectangles[rectangles.length - 1];



        if (currentRectangle) {
            // Tenta expandir o retângulo. As vezes o retângulo não é expandido apesar de ser possível mas isso gera um efeito mais interessante
            tryGrowRectangle(currentRectangle, DIRS[Math.floor(Math.random() * DIRS.length)]);
            tryGrowRectangle(currentRectangle, DIRS[Math.floor(Math.random() * DIRS.length)]);
            let ableToGrow = tryGrowRectangle(currentRectangle, DIRS[Math.floor(Math.random() * DIRS.length)]);



            // Não foi possível expandir o retângulo
            if (!ableToGrow) {
                // Marca o espaço do retângulo criado como usado
                for (let i = currentRectangle.left; i <= currentRectangle.right; i++) {
                    for (let j = currentRectangle.top; j <= currentRectangle.bottom; j++) {
                        if (grid[i] && grid[i][j])
                            grid[i][j].used = true;
                    }
                }

                // Cria um novo retângulo
                let newRectangle = createValidRectangle();

                if (newRectangle === null) {
                    // Não há mais retângulos para criar
                    animationFinished = true;
                    return;
                }

                rectangles.push(newRectangle);
            }
        }
    }



    s.mouseReleased = s.touchEnded = () => {
        let rectangle = rectangles[0];

        // Troca o estado aceso do canvas quando o mouse/toque é solto em cima da lâmpada
        if (animationFinished &&
            s.mouseX > (rectangle.left - gridMargin) * squareSize &&
            s.mouseX < (rectangle.right - gridMargin + 1) * squareSize &&
            s.mouseY > (rectangle.top - gridMargin) * squareSize &&
            s.mouseY < (rectangle.bottom - gridMargin + 1) * squareSize
        ) {
            canvasIsLit = !canvasIsLit;
        }

        // Previne a ação padrão do mouse
        return false;
    }
}





const Background = () => {
    const backgroundStyle = {
        backgroundColor: "rgb(10, 10, 20)",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1
    };

    return (
        <div id="background" alt="Plano de fundo futurista com retângulos azuis e uma imagem de uma lâmpada" style={backgroundStyle}>
            <ReactP5Wrapper sketch={backgroundSketch} />
        </div>
    );
}





export default Background;