class englishDictionary {
  constructor() {

    this.init();
  }

  init() {
    this.getElements();
    this.dict();
  }

  getElements() {
    this.engWord = document.getElementById('eng');
    this.rusWord = document.getElementById('rus');
    this.inputs = document.querySelectorAll('.dictionary__input');
    this.buttonAdd = document.getElementById('dictionary__button');
    this.saveWrapper = document.getElementById('dictionary__save');

    this.words = [];
    this.btnsDelete = null;
  }

  dict() {
    localStorage.length < 1 ? this.words = [] : this.words = JSON.parse(localStorage.getItem('words'));

    const addWordToSave = index => {
      let p = document.createElement('p'),
        button = document.createElement('button');

      p.classList.add('save-word');
      p.innerHTML = `<span>${this.words[index].english}</span> - <span>${this.words[index].russian}</span>`;

      button.classList.add('btn-del');
      button.innerHTML = '&times;';
      button.addEventListener('click', (e) => {
        this.deleteWord(e);
      });

      p.appendChild(button);

      this.saveWrapper.appendChild(p);
    };

    try {
      this.words.forEach((el, i) => {
        addWordToSave(i);
      });
    } catch(e) {}

    this.buttonAdd.addEventListener('click', () => {
      if (
        this.engWord.value.length < 1 ||
        this.rusWord.value.length < 1 ||
        !isNaN(this.engWord.value) ||
        !isNaN(this.rusWord.value)
      ) {
        for (let key of this.inputs) {
          key.classList.add('error');
        }
      } else {
        for (let key of this.inputs) {
          key.classList.remove('error');
        }

        this.words.push(new createWord(this.engWord.value, this.rusWord.value));
        // записываем в localStorage массив в формате JSON
        localStorage.setItem('words', JSON.stringify(this.words));

        addWordToSave(this.words.length - 1);

        this.engWord.value = '';
        this.rusWord.value = '';
      }
    });

    function createWord(english, russian) {
      this.english = english;
      this.russian = russian;
    }
  }

  deleteWord (e) {
    let theTarget = e.target;
    let rowIndex = theTarget.rowIndex;
    theTarget.closest('.save-word').remove();

    this.words.splice(rowIndex, 1);
    localStorage.removeItem('words');
    localStorage.setItem('words', JSON.stringify(this.words));
  }
}

let dictionary = new englishDictionary();
