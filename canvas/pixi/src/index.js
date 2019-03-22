import * as PIXI from 'pixi.js'

const app = new PIXI.Application({ width: 256, height: 256 });
app.renderer.backgroundColor = 0xffffff;
document.body.appendChild(app.view);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

let curtain = new PIXI.Graphics();
curtain.beginFill(0xffb0cd);

curtain.drawPolygon([
    0, 0,
    800, 0,
    800, 50 ,
    0, 600
]);

//Fill shape's color
curtain.endFill();

//Position the curtain after you've drawn it.
//The curtain's x/y position is anchored to its first point in the path
// curtain.x = 180;
// curtain.y = 22;

app.stage.addChild(curtain);
