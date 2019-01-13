(function(){
// Start Modal
document.addEventListener('DOMContentLoaded', function () {
  const startModal = document.getElementById('startModal');
  const instanceStart = M.Modal.init(startModal);
  instanceStart.open();
});

const start = document.getElementById('start'); //開始按鈕
const view = document.getElementById('view'); // 遊戲畫面
const score = document.getElementById('score'); //分數
const time = document.getElementById('time'); //時間計時

let renderData = ''; 
let stopClick = false; // 如果為True 忽略 Click Event
let sec = 0; // 秒數
let match = []; // Save matched card
let tempClick = ''; // 防止針對單張卡片的連點

const cardData = [
  { 'id': '1', 'site': '中都愛河濕地公園', 'pic': './assets/img/1.jpg' },
  { 'id': '2', 'site': '檨仔林埤濕地公園', 'pic': './assets/img/2.jpg' },
  { 'id': '3', 'site': '玉皇宮(天公廟)', 'pic': './assets/img/3.png' },
  { 'id': '4', 'site': '義永寺', 'pic': './assets/img/4.jpg' },
  { 'id': '5', 'site': '金獅湖道德院', 'pic': './assets/img/5.jpg' },
  { 'id': '6', 'site': '褒忠義民廟', 'pic': './assets/img/6.jpg' },
  { 'id': '7', 'site': '愛河之心', 'pic': './assets/img/7.jpg' },
  { 'id': '8', 'site': '中都唐榮磚窯廠', 'pic': './assets/img/8.jpg' },
  { 'id': '9', 'site': '高雄巨蛋', 'pic': './assets/img/9.jpg' },
  { 'id': '1', 'site': '中都愛河濕地公園', 'pic': './assets/img/1.jpg' },
  { 'id': '2', 'site': '檨仔林埤濕地公園', 'pic': './assets/img/2.jpg' },
  { 'id': '3', 'site': '玉皇宮(天公廟)', 'pic': './assets/img/3.png' },
  { 'id': '4', 'site': '義永寺', 'pic': './assets/img/4.jpg' },
  { 'id': '5', 'site': '金獅湖道德院', 'pic': './assets/img/5.jpg' },
  { 'id': '6', 'site': '褒忠義民廟', 'pic': './assets/img/6.jpg' },
  { 'id': '7', 'site': '愛河之心', 'pic': './assets/img/7.jpg' },
  { 'id': '8', 'site': '中都唐榮磚窯廠', 'pic': './assets/img/8.jpg' },
  { 'id': '9', 'site': '高雄巨蛋', 'pic': './assets/img/9.jpg' },
];

// Random Card Array
function randomData() {
  for (let i = 0; i < cardData.length; i++) {
    let randomIndex = Math.round(Math.random() * 17);
    let tempData = cardData[randomIndex];
    cardData[randomIndex] = cardData[i];
    cardData[i] = tempData;
  }
}
randomData();

// Bind Card Data 
for (let i = 0; i < cardData.length; i++) {
  renderData += `
     <div class="card">
      <div class="card-body" data-key="${cardData[i].id}">
        <div class="card-style cover">All Pass</div>
        <div class="card-style content">
          <img src="${cardData[i].pic}" alt="${cardData[i].site}">
        </div>
      </div>
    </div>`
}
view.innerHTML = renderData;

start.onclick = (() => {
  startGame();
});

function startGame() {
  // Show all cards content
  cards.forEach((card) => {
    card.classList.toggle('flipped');
    setTimeout(() => {
      card.classList.toggle('flipped');
    }, 10000);
  });
  // 倒數10秒後 接受 Click Event
  setTimeout(() => {
    timer();
    startClick();
  }, 10000);
}

function timer() {
  // 當配對數量不等於 卡片數量除 2 時 停止計時
  if (match.length !== (cards.length / 2)) {
    setTimeout(() => {
      sec++;
      time.innerHTML = `花費時間: ${sec} 秒`;
      timer();
    }, 1000);
  } else {
    // 配對數量相同時 執行結束畫面
    const endModal = document.getElementById('endModal');
    const instanceEnd = M.Modal.init(endModal);
    instanceEnd.open();
  }
}

const cards = Array.from(document.getElementsByClassName('card-body'));
// 加上 Click事件監聽
function startClick() {
  cards.forEach((card, index) => {
    card.addEventListener('click', function () {
      // Click 事件接收
      if (!stopClick) {
        // 判斷點擊的卡片是否為同一張
        if (tempClick !== index) {
          // 如果點擊到已配對的卡片直接return
          if (match.includes(card.dataset.key)) {
            return;
          } else {
            // 顯示卡片 並執行判斷是否相同
            card.classList.toggle('flipped');
            isSame(card.dataset.key, index);
          }
          // 將 index 的值 給 tempClick
          tempClick = index;
        }
      }
    });
  });
}

let ans1 = {
  id: '',
  index: '',
};

let ans2 = {
  id: '',
  index: '',
};

let clickTimes = 1;

function isSame(id, index) {
  if (clickTimes % 2 !== 0) {
    ans1.id = id;
    ans1.index = index;
  } else if (clickTimes % 2 === 0) {
    ans2.id = id;
    ans2.index = index;

    // 當選擇兩張卡片時 防止點選其他的卡片
    stopClick = true;

    if (ans1.id === ans2.id) {
      match.push(ans1.id);
      score.innerHTML = `已配對：${match.length}`;
      setTimeout(()=> {
        stopClick = false;
      }, 800);

    } else {
      setTimeout(() => {
        cards[ans1.index].classList.toggle('flipped');
        cards[ans2.index].classList.toggle('flipped');
        stopClick = false;
      }, 800);
    }
  }
  clickTimes++;
}
})()