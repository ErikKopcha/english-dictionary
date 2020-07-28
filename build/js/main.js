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
      this.saveWrapper.innerHTML += `
        <p class="save-word">
          <span>${this.words[index].english}</span> - <span>${this.words[index].russian}</span>
          <button class="btn-del">&times;</button>
        </p>
      `;
    };

    this.words.forEach((el, i) => {
      addWordToSave(i);
    });

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

    const deleteWord = e => {
      let theTarget = e.target;
      let rowIndex = theTarget.rowIndex;
      theTarget.closest('.save-word').remove();

      this.words.splice(rowIndex, 1);
      localStorage.removeItem('words');
      localStorage.setItem('words', JSON.stringify(this.words));
    };

    const addEventDelete = () => {
      if (this.words.length > 0) {
        this.btnsDelete = document.querySelectorAll('.btn-del');

        for (let btn of this.btnsDelete) {
          btn.addEventListener('click', e => {
            deleteWord(e);
          });
        }
      }
    };

    addEventDelete();
  }
}

let dictionary = new englishDictionary();
