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
    test(word, () => {
      const debug = [];
      const result = pronounciation(word, debug);
      expect(result, debug.join('\n')).toBe(ideal);
    });
  }
}

describe('L', () => {
  runTestsWithSpec({
    VRELP: 'var-el-peh',
    BALZ: 'bal-zod'
  })
});

describe('dictionary', () => {
  const spec = {};
  parse(fs.readFileSync('dictionary/practicalManual.csv', 'utf8'))
    .forEach(([_, word, pronounciation]) => spec[word]=pronounciation);
  delete spec['word'];
  delete spec[''];
  runTestsWithSpec(spec);
});
