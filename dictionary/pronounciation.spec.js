import pronounciation from './pronounciation';

const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const _spec = {
  SOBHA:     'soh-beh-hah',        // practicalManual pg 14
  HABIORO:   'hah-bee-oh-roh',     // practicalManual pg 15
  IKZHIKAL:  'ee-keh-zod-hee-kal',  // practicalManual pg 15
  // Angel groups, pg 25
  ESE:       'eh-seh',              // book says 'es-seh'??  typo?
  IANA:      'ee-ah-nah',
  AZDOBN:    'ah-zod-doh-ben',

  ZLLRHIA:   'zod-el-lar-hee-ah',
};

function runTestsWithSpec(spec) {
  for (const [word, ideal] of Object.entries(spec)) {
    test(`${word} > ${ideal}`, () => {
      const debug = [];
      const result = pronounciation(word, debug);
      expect(result, debug.join('\n')).toBe(ideal);
    });
  }
}

describe('merge', () => {
  runTestsWithSpec({
    ATH: 'ah-teh',          // not ah-teh-heh
    FABOAN: 'fah-boh-an'    // not fah-boh-ah-en
  })
});

describe('F', () => {
  runTestsWithSpec({
    FAFEN: 'eff-aff-en',
    FABOAN: 'fah-boh-an',
    SONF: 'soh-en-eff',
    FIFALZ: 'fee-fal-zod',
    EFAFAFE: 'eff-aff-aff-eh',
  });
});

describe('U', () => {
  runTestsWithSpec({
    DLUGAR: 'deh-lu-gar',
    LUSD: 'luh-ess-deh',
  });
});

describe('L', () => {
  runTestsWithSpec({
    VRELP: 'var-el-peh',
    BALZ: 'bal-zod',
  })
});

describe('dictionary', () => {
  const spec = {};
  const exceptions = [
    '',
    'word',
    'ZIZOP'  // zodee-zodoh-pah and not -peh
  ];
  parse(fs.readFileSync('dictionary/dictionary.csv', 'utf8'))
    .forEach(([word, pronounciation]) => {
      if (pronounciation && !exceptions.includes(word))
        spec[word] = pronounciation.toLowerCase();
    });
  runTestsWithSpec(spec);
});
