const fs = require('fs');
const parse = require('csv-parse/lib/sync');

function transform(row, headers) {
  const out = {};
  headers.forEach((header, i) => out[header] = row[i]);
  return out;
}

function rowRef(word) {
  if (!words[word])
    words[word] = { gematria: [], meanings: [], pronounciations: [] };
  return words[word];
}

const words = {};
const csv = fs.readFileSync('./dictionary.csv', 'utf8');
const records = parse(csv, { cast: true });
const headers = records[0];
records.shift();

records.forEach(row => {
  row = transform(row, headers);
  if (!row.word) return;

  const entry = rowRef(row.word);

  if (row.gematria && !entry.gematria.includes(row.gematria))
    entry.gematria.push(row.gematria);

  if (row.meaning) {
    obj = { meaning: row.meaning, source: row.source };
    if (row.source2) obj.source2 = row.source2;
    if (row.note) obj.note = row.note;
    entry.meanings.push(obj);
  }

  if (row.pronounciation) {
    obj = { pronounciation: row.pronounciation, source: row.source };
    if (row.source2) obj.source2 = row.source2;
    if (row.note) obj.note = row.note;
    entry.pronounciations.push(obj);
  } else {
    // auto
  }
});

const out = JSON.stringify(words, null, 2);

fs.writeFileSync('./dictionary.json', out);
