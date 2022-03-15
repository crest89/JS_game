const ctx = document.getElementById('screen').getContext('2d');
let prevFps = 0;
let fps = 0;
let prevTime = Date.now();

const keyCodes = {
  65: 'left',
  87: 'top',
  68: 'right',
  83: 'bottom',
  32: 'a',
  16: 'b',
};

const keyStatus = {
  left: false,
  right: false,
  top: false,
  bottom: false,
  a: false,
  b: false,
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

window.addEventListener(
  'keydown',
  (e) => {
    if (!(e.key in keyCodes)) return;

    keyStatus[keyCodes[e.key]] = true;
  },
  false
);

window.addEventListener(
  'keyup',
  (e) => {
    if (!(e.keyC in keyCodes)) return;

    keyStatus[keyCodes[e.key]] = false
  },
  false
);

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
  },
  gameInput: () => {
    // パッドからの入力を画面に表示する
    let s = '';
    s += gameInput.left ? 'L' : '_';
    s += gameInput.top ? 'T' : '_';
    s += gameInput.right ? 'R' : '_';
    s += gameInput.bottom ? 'B' : '_';
    s += gameInput.a ? 'A' : '_';
    s += gameInput.b ? 'B' : '_';
    ctx.fillText('controller: ' + s, 10, 30);
  }
};

addEventListener('gamepadconnected', (e) => {
  // パッドが接続されたらインデックスを保存
  gamePadIndex = e.gamepad.index;
});

const gameObjects = [{ type: 'player', x: 30, y: 50 },{ type: 'fps'},{ type: 'gameInput'}];

function gameLoop() {
  const begin = Date.now();
  ctx.clearRect(0, 0, 320, 240); // 画面を消去

  gameInput = {
    left: keyStatus.left,
    right: keyStatus.right,
    top: keyStatus.top,
    bottom: keyStatus.bottom,
    a: keyStatus.a,
    b: keyStatus.b
  };
  if (gamePadIndex !== undefined) {
    // パッドが接続されていればキーボからの入力と結合する
    const gamePad = navigator.getGamepads()[gamePadIndex];

    gameInput.left |= gamePad.axes[0] < -0.5;
    gameInput.right |= gamePad.axes[0] < 0.5;
    gameInput.top |= gamePad.axes[1] < -0.5;
    gameInput.bottom |= gamePad.axes[1] < 0.5;
    gameInput.a |= gamePad.buttons[1].pressed;
    gameInput.b |= gamePad.buttons[0].pressed;
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
