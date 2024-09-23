class StringKeyboard {
  constructor(id, targetDOM) {
    this.id = id;
    this.saveKoreanData = '';
    this.saveEnglishData = '';
    this.printStringData = '';
    this.sendData = '';
    this.korean = true;
    this.shift = false;
    this.targetDOM = targetDOM
  }

  
  inputData() {
    class Deck {
      constructor(id) {
        this.id = id;
        this.storage = [];
        this.tempStorage = [];
        this.storageArray = [];
        this.storageLength = this.storage.length;
      }
      shiftItem() { return this.storage.shift(); }
      popItem() { return this.storage.pop(); }
      pushItem(item) { this.storage.push(item); }
      copyStorage() { this.storageArray = this.storage; }
      inputTempStorage() { return this.tempStorage = this.storage; }
      spreadArray() {
        this.copyStorage();
        let resultString = '';
        resultString = this.storageArray.join('');
        return resultString;
      }
      resetStorage() {
        this.storage = [];  
        this.tempStorage = [];
        this.storageArray = [];
      }
    }
    const deck = new Deck('deck');
    
    document.querySelectorAll(`.stringKeyboardBase button`).forEach(button => {
      button.addEventListener('click', (event) => {
        let dataValue = event.target.dataset.value;
          switch (dataValue) {
          case 'enter':
            // 입력 완료 시 처리
            this.sendData = this.printStringData
            deck.resetStorage();
            this.displayData(dataValue);
            break;
          case 'space':
            deck.pushItem(' ');
            if (this.korean) { tthis.saveKoreanData = deck.inputTempStorage(); } 
            else { this.saveEnglishData = deck.spreadArray(); }
            this.displayData(dataValue);
            break;
          case 'changeLanguege':
            this.changeLanguage();
            break;
          case 'shift':
            this.changeShift();
            break;
          case 'backspace':
            deck.popItem();
            if (this.korean) { this.saveKoreanData = deck.inputTempStorage(); }
            else { this.saveEnglishData = deck.spreadArray(); }
            this.displayData(dataValue);
            break;
          default:
            deck.pushItem(dataValue);
            if (this.korean) { this.saveKoreanData = deck.inputTempStorage(); }
            else { this.saveEnglishData = deck.spreadArray(); }
            this.displayData(dataValue);
            break;
        }
      });
    });
  }
  displayData(dataValue) {
    const stringOutput = document.querySelector(`.stringOutputArea`);
    switch (dataValue) {
      case 'enter':
        this.printStringData = '';
        this.saveKoreanData = '';
        this.saveEnglishData = '';
        document.querySelector(this.targetDOM).value = this.sendData;
        break;
      case 'backspace':
        if (this.korean) {
          this.printStringData = Hangul.assemble(this.saveKoreanData);
        } else {
          this.printStringData = this.saveEnglishData;
        }
        break;
      default:
        if (this.korean) {
          this.printStringData = Hangul.assemble(this.saveKoreanData);
        } else {
          this.printStringData = this.saveEnglishData;
        }
        break;
    }
    stringOutput.value = this.printStringData;
  }    
  changeLanguage() {
    if (this.korean) {
      this.korean = false;
      this.shift = false;
      document.querySelector(".stringKeyboardBase").innerHTML = `
        <div class="stringKeyboardLine">
          <button class="c1 keyfont" data-value="q">q</button>
          <button class="c1 keyfont" data-value="w">w</button>
          <button class="c1 keyfont" data-value="e">e</button>
          <button class="c1 keyfont" data-value="r">r</button>
          <button class="c1 keyfont" data-value="t">t</button>
          <button class="c1 keyfont" data-value="y">y</button>
          <button class="c1 keyfont" data-value="u">u</button>
          <button class="c1 keyfont" data-value="i">i</button>
          <button class="c1 keyfont" data-value="o">o</button>
          <button class="c1 keyfont" data-value="p">p</button>
        </div>
        <div class="stringKeyboardLine">
          <button class="c1 keyfont" data-value="a">a</button>
          <button class="c1 keyfont" data-value="s">s</button>
          <button class="c1 keyfont" data-value="d">d</button>
          <button class="c1 keyfont" data-value="f">f</button>
          <button class="c1 keyfont" data-value="g">g</button>
          <button class="c1 keyfont" data-value="h">h</button>
          <button class="c1 keyfont" data-value="j">j</button>
          <button class="c1 keyfont" data-value="k">k</button>
          <button class="c1 keyfont" data-value="l">l</button>
        </div>
        <div class="stringKeyboardLine">
          <button class="c2 keyfont" data-value="shift">&#8679;</button>
          <button class="c1 keyfont" data-value="z">z</button>
          <button class="c1 keyfont" data-value="x">x</button>
          <button class="c1 keyfont" data-value="c">c</button>
          <button class="c1 keyfont" data-value="v">v</button>
          <button class="c1 keyfont" data-value="b">b</button>
          <button class="c1 keyfont" data-value="n">n</button>
          <button class="c1 keyfont" data-value="m">m</button>
          <button class="c2 keyfont" data-value="backspace">&#8678;</button>
        </div>
        <div class="stringKeyboardLine">
          <button class="c2 keyfont" data-value="changeLanguege">한/영</button>
          <button class="c3 keyfont" data-value="space">Space</button>
          <button class="c2 keyfont" data-value="enter">완료</button>
        </div>
      `;
    } else {
      this.korean = true;
      this.shift = false;
      document.querySelector(".stringKeyboardBase").innerHTML = `
        <div class="stringKeyboardLine">
          <button class="c1 keyfont" data-value="ㅂ">ㅂ</button>
          <button class="c1 keyfont" data-value="ㅈ">ㅈ</button>
          <button class="c1 keyfont" data-value="ㄷ">ㄷ</button>
          <button class="c1 keyfont" data-value="ㄱ">ㄱ</button>
          <button class="c1 keyfont" data-value="ㅅ">ㅅ</button>
          <button class="c1 keyfont" data-value="ㅛ">ㅛ</button>
          <button class="c1 keyfont" data-value="ㅕ">ㅕ</button>
          <button class="c1 keyfont" data-value="ㅑ">ㅑ</button>
          <button class="c1 keyfont" data-value="ㅐ">ㅐ</button>
          <button class="c1 keyfont" data-value="ㅔ">ㅔ</button>
        </div>
        <div class="stringKeyboardLine">
          <button class="c1 keyfont" data-value="ㅁ">ㅁ</button>
          <button class="c1 keyfont" data-value="ㄴ">ㄴ</button>
          <button class="c1 keyfont" data-value="ㅇ">ㅇ</button>
          <button class="c1 keyfont" data-value="ㄹ">ㄹ</button>
          <button class="c1 keyfont" data-value="ㅎ">ㅎ</button>
          <button class="c1 keyfont" data-value="ㅗ">ㅗ</button>
          <button class="c1 keyfont" data-value="ㅓ">ㅓ</button>
          <button class="c1 keyfont" data-value="ㅏ">ㅏ</button>
          <button class="c1 keyfont" data-value="ㅣ">ㅣ</button>
        </div>
        <div class="stringKeyboardLine">
          <button class="c2 keyfont" data-value="shift">&#8679;</button>
          <button class="c1 keyfont" data-value="ㅋ">ㅋ</button>
          <button class="c1 keyfont" data-value="ㅌ">ㅌ</button>
          <button class="c1 keyfont" data-value="ㅊ">ㅊ</button>
          <button class="c1 keyfont" data-value="ㅍ">ㅍ</button>
          <button class="c1 keyfont" data-value="ㅠ">ㅠ</button>
          <button class="c1 keyfont" data-value="ㅜ">ㅜ</button>
          <button class="c1 keyfont" data-value="ㅡ">ㅡ</button>
          <button class="c2 keyfont" data-value="backspace">&#8678;</button>
        </div>
        <div class="stringKeyboardLine">
          <button class="c2 keyfont" data-value="changeLanguege">한/영</button>
          <button class="c3 keyfont" data-value="space">Space</button>
          <button class="c2 keyfont" data-value="enter">완료</button>
        </div>
      `;
    }
    this.inputData();
  }
  changeShift() {
    if (this.korean == false && this.shift == false) {
      this.korean = false;
      this.shift = true;
      document.querySelector(".stringKeyboardBase").innerHTML = `
        <div class="stringKeyboardLine">
          <button class="c1 keyfont" data-value="Q">Q</button>
          <button class="c1 keyfont" data-value="W">W</button>
          <button class="c1 keyfont" data-value="E">E</button>
          <button class="c1 keyfont" data-value="R">R</button>
          <button class="c1 keyfont" data-value="T">T</button>
          <button class="c1 keyfont" data-value="Y">Y</button>
          <button class="c1 keyfont" data-value="U">U</button>
          <button class="c1 keyfont" data-value="I">I</button>
          <button class="c1 keyfont" data-value="O">O</button>
          <button class="c1 keyfont" data-value="P">P</button>
        </div>
        <div class="stringKeyboardLine">
          <button class="c1 keyfont" data-value="A">A</button>
          <button class="c1 keyfont" data-value="S">S</button>
          <button class="c1 keyfont" data-value="D">D</button>
          <button class="c1 keyfont" data-value="F">F</button>
          <button class="c1 keyfont" data-value="G">G</button>
          <button class="c1 keyfont" data-value="H">H</button>
          <button class="c1 keyfont" data-value="J">J</button>
          <button class="c1 keyfont" data-value="K">K</button>
          <button class="c1 keyfont" data-value="L">L</button>
        </div>
        <div class="stringKeyboardLine">
          <button class="c2 keyfont" data-value="shift">&#8679;</button>
          <button class="c1 keyfont" data-value="Z">Z</button>
          <button class="c1 keyfont" data-value="X">X</button>
          <button class="c1 keyfont" data-value="C">C</button>
          <button class="c1 keyfont" data-value="V">V</button>
          <button class="c1 keyfont" data-value="B">B</button>
          <button class="c1 keyfont" data-value="N">N</button>
          <button class="c1 keyfont" data-value="M">M</button>
          <button class="c2 keyfont" data-value="backspace">&#8678;</button>
        </div>
        <div class="stringKeyboardLine">
          <button class="c2 keyfont" data-value="changeLanguege">한/영</button>
          <button class="c3 keyfont" data-value="space">Space</button>
          <button class="c2 keyfont" data-value="enter">완료</button>
        </div>
      `;
    } else if (this.korean == true && this.shift == false){
      this.korean = true;
      this.shift = true;
      document.querySelector(".stringKeyboardBase").innerHTML = `
        <div class="stringKeyboardLine">
          <button class="c1 keyfont" data-value="ㅃ">ㅃ</button>
          <button class="c1 keyfont" data-value="ㅉ">ㅉ</button>
          <button class="c1 keyfont" data-value="ㄸ">ㄸ</button>
          <button class="c1 keyfont" data-value="ㄲ">ㄲ</button>
          <button class="c1 keyfont" data-value="ㅆ">ㅆ</button>
          <button class="c1 keyfont" data-value="ㅛ">ㅛ</button>
          <button class="c1 keyfont" data-value="ㅕ">ㅕ</button>
          <button class="c1 keyfont" data-value="ㅑ">ㅑ</button>
          <button class="c1 keyfont" data-value="ㅒ">ㅒ</button>
          <button class="c1 keyfont" data-value="ㅖ">ㅖ</button>
        </div>
        <div class="stringKeyboardLine">
          <button class="c1 keyfont" data-value="ㅁ">ㅁ</button>
          <button class="c1 keyfont" data-value="ㄴ">ㄴ</button>
          <button class="c1 keyfont" data-value="ㅇ">ㅇ</button>
          <button class="c1 keyfont" data-value="ㄹ">ㄹ</button>
          <button class="c1 keyfont" data-value="ㅎ">ㅎ</button>
          <button class="c1 keyfont" data-value="ㅗ">ㅗ</button>
          <button class="c1 keyfont" data-value="ㅓ">ㅓ</button>
          <button class="c1 keyfont" data-value="ㅏ">ㅏ</button>
          <button class="c1 keyfont" data-value="ㅣ">ㅣ</button>
        </div>
        <div class="stringKeyboardLine">
          <button class="c2 keyfont" data-value="shift">&#8679;</button>
          <button class="c1 keyfont" data-value="ㅋ">ㅋ</button>
          <button class="c1 keyfont" data-value="ㅌ">ㅌ</button>
          <button class="c1 keyfont" data-value="ㅊ">ㅊ</button>
          <button class="c1 keyfont" data-value="ㅍ">ㅍ</button>
          <button class="c1 keyfont" data-value="ㅠ">ㅠ</button>
          <button class="c1 keyfont" data-value="ㅜ">ㅜ</button>
          <button class="c1 keyfont" data-value="ㅡ">ㅡ</button>
          <button class="c2 keyfont" data-value="backspace">&#8678;</button>
        </div>
        <div class="stringKeyboardLine">
          <button class="c2 keyfont" data-value="changeLanguege">한/영</button>
          <button class="c3 keyfont" data-value="space">Space</button>
          <button class="c2 keyfont" data-value="enter">완료</button>
        </div>
      `;
    } else if (this.korean == false && this.shift == true) {
      this.korean = false;
      this.shift = false;
      document.querySelector(".stringKeyboardBase").innerHTML = `
        <div class="stringKeyboardLine">
          <button class="c1 keyfont" data-value="q">q</button>
          <button class="c1 keyfont" data-value="w">w</button>
          <button class="c1 keyfont" data-value="e">e</button>
          <button class="c1 keyfont" data-value="r">r</button>
          <button class="c1 keyfont" data-value="t">t</button>
          <button class="c1 keyfont" data-value="y">y</button>
          <button class="c1 keyfont" data-value="u">u</button>
          <button class="c1 keyfont" data-value="i">i</button>
          <button class="c1 keyfont" data-value="o">o</button>
          <button class="c1 keyfont" data-value="p">p</button>
        </div>
        <div class="stringKeyboardLine">
          <button class="c1 keyfont" data-value="a">a</button>
          <button class="c1 keyfont" data-value="s">s</button>
          <button class="c1 keyfont" data-value="d">d</button>
          <button class="c1 keyfont" data-value="f">f</button>
          <button class="c1 keyfont" data-value="g">g</button>
          <button class="c1 keyfont" data-value="h">h</button>
          <button class="c1 keyfont" data-value="j">j</button>
          <button class="c1 keyfont" data-value="k">k</button>
          <button class="c1 keyfont" data-value="l">l</button>
        </div>
        <div class="stringKeyboardLine">
          <button class="c2 keyfont" data-value="shift">&#8679;</button>
          <button class="c1 keyfont" data-value="z">z</button>
          <button class="c1 keyfont" data-value="x">x</button>
          <button class="c1 keyfont" data-value="c">c</button>
          <button class="c1 keyfont" data-value="v">v</button>
          <button class="c1 keyfont" data-value="b">b</button>
          <button class="c1 keyfont" data-value="n">n</button>
          <button class="c1 keyfont" data-value="m">m</button>
          <button class="c2 keyfont" data-value="backspace">&#8678;</button>
        </div>
        <div class="stringKeyboardLine">
          <button class="c2 keyfont" data-value="changeLanguege">한/영</button>
          <button class="c3 keyfont" data-value="space">Space</button>
          <button class="c2 keyfont" data-value="enter">완료</button>
        </div>
      `;
    } else {
      this.korean = true;
      this.shift = false;
      document.querySelector(".stringKeyboardBase").innerHTML = `
        <div class="stringKeyboardLine">
          <button class="c1 keyfont" data-value="ㅂ">ㅂ</button>
          <button class="c1 keyfont" data-value="ㅈ">ㅈ</button>
          <button class="c1 keyfont" data-value="ㄷ">ㄷ</button>
          <button class="c1 keyfont" data-value="ㄱ">ㄱ</button>
          <button class="c1 keyfont" data-value="ㅅ">ㅅ</button>
          <button class="c1 keyfont" data-value="ㅛ">ㅛ</button>
          <button class="c1 keyfont" data-value="ㅕ">ㅕ</button>
          <button class="c1 keyfont" data-value="ㅑ">ㅑ</button>
          <button class="c1 keyfont" data-value="ㅐ">ㅐ</button>
          <button class="c1 keyfont" data-value="ㅔ">ㅔ</button>
        </div>
        <div class="stringKeyboardLine">
          <button class="c1 keyfont" data-value="ㅁ">ㅁ</button>
          <button class="c1 keyfont" data-value="ㄴ">ㄴ</button>
          <button class="c1 keyfont" data-value="ㅇ">ㅇ</button>
          <button class="c1 keyfont" data-value="ㄹ">ㄹ</button>
          <button class="c1 keyfont" data-value="ㅎ">ㅎ</button>
          <button class="c1 keyfont" data-value="ㅗ">ㅗ</button>
          <button class="c1 keyfont" data-value="ㅓ">ㅓ</button>
          <button class="c1 keyfont" data-value="ㅏ">ㅏ</button>
          <button class="c1 keyfont" data-value="ㅣ">ㅣ</button>
        </div>
        <div class="stringKeyboardLine">
          <button class="c2 keyfont" data-value="shift">&#8679;</button>
          <button class="c1 keyfont" data-value="ㅋ">ㅋ</button>
          <button class="c1 keyfont" data-value="ㅌ">ㅌ</button>
          <button class="c1 keyfont" data-value="ㅊ">ㅊ</button>
          <button class="c1 keyfont" data-value="ㅍ">ㅍ</button>
          <button class="c1 keyfont" data-value="ㅠ">ㅠ</button>
          <button class="c1 keyfont" data-value="ㅜ">ㅜ</button>
          <button class="c1 keyfont" data-value="ㅡ">ㅡ</button>
          <button class="c2 keyfont" data-value="backspace">&#8678;</button>
        </div>
        <div class="stringKeyboardLine">
          <button class="c2 keyfont" data-value="changeLanguege">한/영</button>
          <button class="c3 keyfont" data-value="space">Space</button>
          <button class="c2 keyfont" data-value="enter">완료</button>
        </div>
      `;
    }
    this.inputData();
  }
  control(){
    this.inputData();
    this.displayData();
  }
}



