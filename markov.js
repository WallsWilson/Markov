/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

// This was my try at making this work. I was very far off from it actually working. This was implemeted from a article I was reading about it. 

//   makeChains(text) {
//     const textArr = text.split(' ');
//     const chain = {};

//   for(let i = 0; i < textArr.length; i++) {
//     let word = textArr[i].toLowerCase().replace(/[\W_]/,"")
//     if(!chain[word]) {
//       chain[word] = []
//     }
//     if(textArr[i + 1]) {
//       chain[word].push(textArr[i + 1].toLowerCase().replace(/[\W_]/,""));
//     }
//   }
//   return chain
//   }


//   /** return random text from chains */

//   makeText(numWords = 100) {
//     // TODO
//   }
// }

makeChains() {
  let chains = new Map();

  for (let i = 0; i < this.words.length; i += 1) {
    let word = this.words[i];
    let nextWord = this.words[i + 1] || null;

    if (chains.has(word)) chains.get(word).push(nextWord);
    else chains.set(word, [nextWord]);
  }

  this.chains = chains;
}


/** Pick random choice from array */

static choice(ar) {
  return ar[Math.floor(Math.random() * ar.length)];
}


/** return random text from chains */

makeText(numWords = 100) {
  // pick a random key to begin
  let keys = Array.from(this.chains.keys());
  let key = MarkovMachine.choice(keys);
  let out = [];

  // produce markov chain until reaching termination word
  while (out.length < numWords && key !== null) {
    out.push(key);
    key = MarkovMachine.choice(this.chains.get(key));
  }

  return out.join(" ");
}
}


module.exports = {
MarkovMachine,
};