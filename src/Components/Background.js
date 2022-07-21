import React from "react";
import Sketch from "react-p5";
import "firacode/distr/ttf/FiraCode-Regular.ttf";

const Background = () => {
    const setup = (s, canvasParentRef) => {
        // Carregar 
        s.lampImage = s.loadImage("/logo192.png");

        s.createCanvas(s.windowWidth, s.windowHeight).parent(canvasParentRef);
        s.background(0);

        // Isso é melhor do que usar hooks
        window.addEventListener("resize", () => {
            s.resizeCanvas(s.windowWidth, s.windowHeight);
        });

        s.textFont("Fira Code");
        s.textSize(s.windowHeight / 15);
        s.textAlign(s.CENTER, s.CENTER);
        s.imageMode(s.CENTER);
    };
    
    const draw = (s) => {
        const circleInitialSize = 100;
        const circleOffset = 75;
        const numCircles = 15;

        s.background(0);

        s.noStroke();
        s.fill(255);
        s.text("Hello World\nMeu nome é DaviAMSilva", s.width / 2, s.height / 2);
        
        s.noFill();
        for (let i = 0; i < numCircles; i += 1) {
            s.strokeWeight(s.width);
            s.stroke(0, 0, 0, i / numCircles * 127);
            s.ellipse(s.mouseX, s.mouseY, s.width + circleInitialSize + i * circleOffset, s.width + circleInitialSize + i * circleOffset);
        }

        s.image(s.lampImage, s.mouseX, s.mouseY, 32, 32);

        // console.log(s.frameRate());
    };

    return (
        <Sketch draw={draw} setup={setup} />
    );
}

export default Background;