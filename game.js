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
let gamePadIndex;

// ゲームパッドからの入力を保持する
let gameInput = {
  left: false,
  right: false,
  top: false,
  bottom: false,
  a: false,
  b: false,
};

addEventListener('gamepadconnected', (e) => {
  // パッドが接続されたらインデックスを保存
  gamePadIndex = e.gamepad.index;
});

function gameLoop() {
   const begin = Date.now();
   ctx.clearRect(0, 0, 320, 240); // 画面を消去
  if (gamePadIndex !== undefined) {
    // パッドが接続されていれば尿力を取得する
    const gamePad = navigator.getGamepads()[gamePadIndex];
    gameInput = {
      left: (gamePad.axes[0] < -0.5),
      right: (gamePad.axes[0] > 0.5),
      top: (gamePad.axes[1] < -0.5),
      bottom: (gamePad.axes[1] > 0.5),
      a: (gamePad.buttons[1].pressed),
      b: (gamePad.buttons[0].pressed)
    };
  }
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
