let walkSprite; // 儲存走路精靈圖
let characterX; // 儲存角色的水平位置
let characterY; // 儲存角色的垂直位置
let facingLeft = false; // 記錄角色是否面向左側
const frameCountTotal = 7; // 設定精靈圖的動畫格數
const frameWidth = 450 / frameCountTotal; // 計算每一格精靈圖的寬度
const characterScale = 2; // 設定角色的顯示放大比例
const moveSpeed = 4; // 設定角色每幀的移動速度

function preload() { // 在畫面開始前載入角色圖片
  walkSprite = loadImage('libraries/1/走路.png'); // 載入七格走路精靈圖
} // 結束圖片載入設定

function setup() { // 設定畫布與角色初始位置
  createCanvas(windowWidth, windowHeight); // 建立符合視窗尺寸的畫布
  imageMode(CENTER); // 讓圖片以角色中心座標繪製
  characterX = width / 2; // 將角色放在畫布水平中央
  characterY = height / 2; // 將角色放在畫布垂直中央
  frameRate(60); // 設定畫面更新速率
} // 結束畫布初始化

function draw() { // 每一幀更新背景、位置與動畫
  background('#48cae4'); // 使用指定的青藍色填滿背景
  if (keyIsDown(RIGHT_ARROW)) { // 檢查是否按住鍵盤右方向鍵
    characterX += moveSpeed; // 讓角色向右移動
    facingLeft = false; // 讓角色面向右側
  } // 結束右方向鍵判斷
  if (keyIsDown(LEFT_ARROW)) { // 檢查是否按住鍵盤左方向鍵
    characterX -= moveSpeed; // 讓角色向左移動
    facingLeft = true; // 讓角色面向左側
  } // 結束左方向鍵判斷
  characterX = constrain(characterX, (frameWidth * characterScale) / 2, width - (frameWidth * characterScale) / 2); // 限制角色不超出畫布左右邊界
  const animationFrame = floor(frameCount / 8) % frameCountTotal; // 每八幀切換一次走路動畫格
  const sourceX = animationFrame * frameWidth; // 計算目前動畫格在精靈圖中的水平位置
  push(); // 暫存目前的繪圖狀態
  translate(characterX, characterY); // 將繪圖原點移至角色位置
  if (facingLeft) { // 檢查角色是否需要朝左
    scale(-1, 1); // 水平翻轉角色圖片
  } // 結束角色方向判斷
  image(walkSprite, 0, 0, frameWidth * characterScale, 128 * characterScale, sourceX, 0, frameWidth, 128); // 繪製目前的走路動畫格
  pop(); // 還原先前的繪圖狀態
} // 結束每幀畫面更新

function windowResized() { // 視窗尺寸改變時同步調整畫布
  resizeCanvas(windowWidth, windowHeight); // 將畫布調整為新的視窗尺寸
  characterX = constrain(characterX, (frameWidth * characterScale) / 2, width - (frameWidth * characterScale) / 2); // 保持角色在新畫布範圍內
  characterY = constrain(characterY, (128 * characterScale) / 2, height - (128 * characterScale) / 2); // 保持角色在新畫布高度範圍內
} // 結束視窗尺寸調整
