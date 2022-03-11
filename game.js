const ctx = document.getElementById('screen').getContext('2d');

function gameLoop() {
  const begin = Date.now();

  //　画面を消去
  ctx.clearRect(0, 0, 320, 240);

  // ゲームロジック
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(10, 10);
  ctx.lineTo(20, 20);
  ctx.stroke();

  const end = Date.now();
  setTimeout(gameLoop, 33 - (end - begin)); // 0.33msから実際かかった時間を引いた秒数をまつ
}

gameLoop();
