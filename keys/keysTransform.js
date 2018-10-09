const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const csv = fs.readFileSync('./keys.csv', 'utf8');
const records = parse(csv);

// drop headers
records.shift();

let outArrayText = '[\n[ // 0\n';
let lastKeyNo = 0;
records.forEach(subkey => {
  if (lastKeyNo != subkey[0]) {
    lastKeyNo = subkey[0];
    outArrayText += '],\n[ // ' + lastKeyNo + '\n';
  }
  outArrayText += `['${subkey[2]}','${subkey[3]}','${subkey[4]}'],\n`;
});
outArrayText += ']\n]';

const out = `const keys = ${outArrayText};

// eslint-disable-next-line no-sparse-arrays
const output = [ , ];
keys.forEach((key, keyNo) => {
    if (keyNo === 0)
      return;

    // eslint-disable-next-line no-sparse-arrays
    const keyObj = { key: keyNo, subkeys: [ , ] };
    output.push(keyObj);

    key.forEach((subkey, subkeyArrayIndex) => {
      keyObj.subkeys.push({
        subkey: subkeyArrayIndex+1,
        enochianLatin: subkey[0],
        enochianTransliteration: subkey[1],
        english: subkey[2],
      });
    });
});

export default output;
`;

/*
// eslint-disable-next-line no-sparse-arrays
const keys = [ , ];

let lastKeyNo = 0, keyObj, subkeys;
records.forEach(subkey => {
  if (lastKeyNo != subkey.key) {
    lastKeyNo = subkey.key;

    // eslint-disable-next-line no-sparse-arrays
    keyObj = { key: lastKeyNo, subkeys: [ , ] };
    subkeys = keyObj.subkeys;
    keys.push(keyObj);
  }
  subkeys.push(subkey);
});
*/

fs.writeFileSync('./keys.data.js', out);
