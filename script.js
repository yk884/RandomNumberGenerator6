// DOM要素の取得
const numberDivs = document.querySelectorAll(".number");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const checkboxSequential = document.getElementById("sequentialNumbers");
let intervalId;

// 1～43のランダムな数字を生成する関数
const getRandomNumber = () => Math.floor(Math.random() * 43) + 1;

// 画面に表示されている数字をアップデートする関数
const updateDisplay = () => {
  numberDivs.forEach((div) => {
    div.textContent = String(getRandomNumber()).padStart(2, "0");
  });
};

// 7つのユニークな数字を取得する関数
const getUniqueNumbers = () => {
  const numbers = [];
  while (numbers.length < 7) {
    const num = getRandomNumber();
    if (numbers.indexOf(num) === -1) numbers.push(num);
  }
  return numbers;
};

// 連続する2つの数を生成する関数
const generateSequentialNumbers = () => {
  const firstNum = Math.floor(Math.random() * 42) + 1;
  return [firstNum, firstNum + 1];
};

// 数字群が連続する2つの数を含むかチェックする関数
const containsSequentialNumbers = (numbers) => {
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (Math.abs(numbers[i] - numbers[j]) === 1) {
        return true;
      }
    }
  }
  return false;
};

// 数字の自動更新を止め、その時点での数字を確定する関数
const stopUpdating = () => {
  clearInterval(intervalId);
  let uniqueNumbers;
  if (checkboxSequential.checked) {
    do {
      uniqueNumbers = getUniqueNumbers();
    } while (!containsSequentialNumbers(uniqueNumbers.slice(0, 6)));
  } else {
    uniqueNumbers = getUniqueNumbers();
  }

  // 主な変更点: ここで uniqueNumbers をソートします
  // ただし、bonus の数字（最後の数字）はソートから除外します
  const sortedNumbers = uniqueNumbers.slice(0, 6).sort((a, b) => a - b);
  const bonusNumber = uniqueNumbers[6];

  numberDivs.forEach((div, index) => {
    // bonus 用の数字は除外して、それ以外を昇順に表示
    div.textContent = String(
      index < 6 ? sortedNumbers[index] : bonusNumber
    ).padStart(2, "0");
  });
  startButton.disabled = false;
  stopButton.disabled = true;
};

// スタートボタンがクリックされた時の処理をセットアップ
startButton.addEventListener("click", () => {
  intervalId = setInterval(updateDisplay, 10);
  startButton.disabled = true;
  stopButton.disabled = false;
});

// ストップボタンがクリックされた時の処理をセットアップ
stopButton.addEventListener("click", stopUpdating);
