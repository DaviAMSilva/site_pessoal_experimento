import React from "react";
import Sketch from "react-p5";
import "firacode/distr/ttf/FiraCode-Regular.ttf";



const maxSquareLength = 750;
const minSquareLength = 30;
const maxSquareNum = 200;
const minSquareNum = 1;
const maxSquareSpeed = 7;
const minSquareSpeed = 5;



class Square {
    constructor(sketch, cx, cy, size, color, speed) {
        this.sketch = sketch;
        this.cx = cx;
        this.cy = cy;
        this.size = size;
        this.color = color;
        this.speed = speed;
        
        this.finished = false;
    }

    draw() {
        let noise = this.sketch.noise(this.cx, this.cy, this.sketch.frameCount / 100);
        let scale = this.sketch.map(noise, 0, 1, 0.8, 1.2);

        this.sketch.noStroke();
        this.sketch.fill(this.color);
        this.sketch.rect(this.cx, this.cy, this.size * scale, this.size * scale);
    }

    increaseSize() {
        this.size += this.speed;
    }

    // Checa a colisão entre dois quadrados ou entre este quadrado e outro quadrado
    checkCollision(q1, q2) {
        if (this && q1 && !q2) {
            // Colisão deste com outro quadrado
            return (
                this.cx - this.size / 2 < q1.cx - q1.size / 2 + q1.size &&
                this.cx - this.size / 2 + this.size > q1.cx - q1.size / 2 &&
                this.cy - this.size / 2 < q1.cy - q1.size / 2 + q1.size &&
                this.cy - this.size / 2 + this.size > q1.cy - q1.size / 2
            );
        } else if (q1 && q2) {
            // Colisão entre dois quadrados
            return (
                q1.cx - q1.size / 2 < q2.cx - q2.size / 2 + q2.size &&
                q1.cx - q1.size / 2 + q1.size > q2.cx - q2.size / 2 &&
                q1.cy - q1.size / 2 < q2.cy - q2.size / 2 + q2.size &&
                q1.cy - q1.size / 2 + q1.size > q2.cy - q2.size / 2
            );
        }
    }
}



function addSquare(s, squares) {
    for (let i = 0; i < 50; i++) {
        let possibleSquare = new Square(
            s,
            s.random(s.width),
            s.random(s.height),
            minSquareLength,
            s.color(s.random(255), s.random(255), s.random(255)),
            s.random(minSquareSpeed, maxSquareSpeed)
        );
    
        // Checa se o quadrado criado colide com outros quadrados
        let colliding = false;
        for (const square of squares) {
            if (possibleSquare.checkCollision(square)) {
                colliding = true;
                break;
            }
        }
        
        if (!colliding) {
            squares.push(possibleSquare);
   
            return true;
        }
    }

    return false;
}



function setup(s, parentElement) {
    // É ideal carregar a imagem de background dentro de setup()
    s.lampImage = s.loadImage("/logo192.png");
    s.squares = [];

    s.createCanvas(s.windowWidth, s.windowHeight).parent(parentElement);
    s.background(0);

    // Isso é melhor do que usar hooks
    window.addEventListener("resize", () => {
        s.resizeCanvas(s.windowWidth, s.windowHeight);
    });

    // Inicializa os quadrados
    for (let i = 0; i < minSquareNum; i++) {
        addSquare(s, s.squares);
    }

    s.textFont("Fira Code");
    s.textSize(s.windowHeight / 15);
    s.textAlign(s.CENTER, s.CENTER);
    s.imageMode(s.CENTER);
    s.rectMode(s.CENTER);
    s.noiseDetail(5, 0.2);
}



function draw(s) {
    s.background(0);

    // Texto
    s.noStroke();
    s.fill(255);
    s.text("Hello World\nMeu nome é DaviAMSilva", s.width / 2, s.height / 2);

    // Desenha os quadrados
    for (const square1 of s.squares) {
        square1.draw();

        if (!square1.finished)
            square1.increaseSize();

        // Detecta colisão com outros quadrados
        let colliding = false;
        for (const square2 of s.squares) {
            if (square1 !== square2) {
                if (square1.checkCollision(square2)) {
                    colliding = true;
                    break;
                }
            }
        }

        // Se a animação acabou, cria um novo quadrado
        if (!square1.finished && (square1.size > maxSquareLength || colliding)) {
            square1.finished = true;

            if (s.squares.length < maxSquareNum) {
                addSquare(s, s.squares);
            }
        }
    }

    s.image(s.lampImage, s.mouseX, s.mouseY, 32, 32);
}



const Background = () => {
    return (
        <Sketch draw={draw} setup={setup} />
    );
}



export default Background;