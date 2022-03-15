const ctx = document.getElementById('screen').getContext('2d');
let prevFps = 0;
let fps = 0;
let prevTime = Date.now();

const gameObjects = [{ type: 'player', x: 30, y: 50 },{type: 'fps'}];

const functions = {
  player: (obj) => {
    obj.x += 0.2;

    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(obj.x, obj.y);
    ctx.lineTo(obj.x, obj.y + 20);
    ctx.stroke();
  },
  fps: (obj) =>{
    // FPSを画面に描画する
    ctx.fillText('fps: ' + prevFps.toString(), 10, 15);
  }
};

function gameLoop() {
   const begin = Date.now();
   ctx.clearRect(0, 0, 320, 240); // 画面を消去
  // ゲームオブジェクトを処理
  gameObjects.forEach((obj) => {
    functions[obj.type](obj);
  });
  const end = Date.now();
  setTimeout(gameLoop, 33 - (end - begin)); // 0.33msから実際かかった時間を引いた秒数待つ
  if (begin - prevTime > 1000){
    prevFps = fps;
    fps = 1;
    prevTime = begin;
  } else {
    fps++;
  }
}

gameLoop();
