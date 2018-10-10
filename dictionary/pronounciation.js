function isVowel(letter) {
  return ['a','e','i','o','u'].includes(letter);
}

function isVowelish(letter) {
  // 'eff', 'em'
  return ['a','e','i','o','u','f','m','n'].includes(letter);
}

function pronounciation(word, logArray) {
  word = word.toLowerCase();

  const log = logArray ? (...args) => logArray.push(args.join(', ')) : () => {};

  let out = '';
  let newSyllable = true;
  let syllableEnd = false;

  for (let i=0; i < word.length; i++) {
    newSyllable = out.length ? syllableEnd : true;

    if (syllableEnd) {
      out += '-';
      syllableEnd = false;
    }

    const prev = i > 0 ? word[i-1] : null;
    const current = word[i];
    const next = i < word.length-1 ? word[i+1] : null;
    const nextNext = i < word.length-2 ? word[i+2] : null;

    /*
    if (out.length && out[out.length-1] !== '-'
        && (!isVowel(prev) && !isVowel(current))
        || (isVowel(prev) && isVowel(current))
        || (isVowel(prev) && !isVowel(current))
        || out.substr(out.length-2)==='ar') {
      out += '-';
    }
    */


    let currentOut = current;

    // Rule 9: 'Z' is pronounced as 'zod'
    if (current === 'z') currentOut = 'zod';

    // Inferred "Q" rule
    if (current === 'q') {
      currentOut = 'qu';

      if (next === 'u') {
        // Turn 'QU' into 'Q' and treat as one character
        word = word.substr(0, i) + 'q' + word.substr(i+2);
        out += currentOut;
        continue;
      }
    }

    // Inferred: Some consonants can end a syllable
    if (newSyllable && isVowel(current) && ['h','n','f'].includes(next)) {
      out += currentOut + (next==='f'?'ff':next);
      i++;
      syllableEnd = true;
      continue;
    }

    if (current === 'f' && next==='a' && nextNext === 'f') {
      out += 'eff';
      syllableEnd = true;
      continue;
    }
    /*
    // Inferred: F at start of word, or after consonant, is pronounced 'eff'
    if (word === 'fafen' && current==='f')
      log(current, next, !isVowel(next), isVowel(next), isVowelish(next))
    if (current === 'f' &&
        (!isVowel(next) || (isVowel(next) && isVowelish(nextNext)))) {
      if (!prev)
        out += 'eff';
      else
        out += 'ef';
      syllableEnd = true;
      continue;
    }
    */

    /*
   if (isVowel(current) && !isVowel(next)) {
     out += currentOut + next;
     i++;
     continue;
   }
   */

    // Rule 3: The word is divided into syllables
    if (newSyllable && !isVowel(current) && isVowel(next)) {
      // TODO, something, 3 letters, depends on next?
      out += currentOut;
      continue;
    }

    // Inferred: 'R' can behave like a vowel as 'ar'
    if (!isVowel(current) && current!=='z' && next==='r') {
      out += currentOut + 'ar';
      i++;
      syllableEnd = true;
      continue;
    }

    // Inferred: 'F','L','M','N' on it's own is 'ef','el','em','en',etc.
    if (['f','l','m','n'].includes(current) && !isVowel(next)) {
      out += 'e' + currentOut + (current==='f'?'f':'');
      syllableEnd = true;
      continue;
    }

    // Inferred "Ball" Rule:
    // L can end a syllable after a vowel if before a consonant (or end of word)
    // after some vowels (not o or u)
    if (['a','e'].includes(current) && ['l','h'].includes(next) && (!nextNext || !isVowel(nextNext))) {
      out += currentOut + next;
      i++;
      // Inferred: before a 't' it becomes 'll' (ball-teh)
      if (next === 'l' && (!nextNext || nextNext === 't')) {
        log('t');
        out += 'l';
      }
      syllableEnd = true;
      continue;
    }

    /*
    // Inferred: Some consonants can end a word (without an 'eh')
    if (i==word.length-2 && isVowel(current) && ['l'].includes(next)) {
      out += current + next;
      break;
    }
    */

    // Rule 2: Most vowels (not 'i') have an 'h' added
    if (isVowel(current)) {
      if (current == 'i')
        out += 'ee';
      else
        out += currentOut + 'h';
      syllableEnd = true;
      continue;
    }

    // Rule 1: Most consonants have an 'eh' added
    if (current === 'z') {
      out += currentOut;
    } else {
      out += currentOut + 'eh';

      // Inferred "H" Rule
      // H after a vowel ends syllable, or after a consontant that will be 'eh'
      // i.e. eh-heh becomes eh, so skip the 'h'
      if (next === 'h') i++;
    }

    syllableEnd = true;
  }

  return out;
}

// Rule 4: 'g' can be hard g (gimmel) or soft g (jimmel).  So it's still 'g'.  j?

export default pronounciation;
