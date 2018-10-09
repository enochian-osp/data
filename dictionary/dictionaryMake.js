const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const words = {};
let csv, records, obj;

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

function process(headers, records, source) {
  records.forEach(row => {
    row = transform(row, headers);
    if (!row.word) return;

    const entry = rowRef(row.word);

    if (row.gematria && !entry.gematria.includes(row.gematria))
      entry.gematria.push(row.gematria);

    if (row.meaning) {
      obj = { meaning: row.meaning, source };
      if (row.source) obj.source2 = row.source;
      if (row.note) obj.note = row.note;
      entry.meanings.push(obj);
    }

    if (row.pronounciation) {
      obj = { pronounciation: row.pronounciation, source };
      if (row.source) obj.source2 = row.source;
      if (row.note) obj.note = row.note;
      entry.pronounciations.push(obj);
    } else {
      // auto
    }
  });
}

csv = fs.readFileSync('./practicalManual.csv', 'utf8');
records = parse(csv, { cast: true });
process(records[0], records.slice(1), 'practicalManual');

csv = fs.readFileSync('./wholeEnochian.csv', 'utf8');
records = parse(csv, { cast: true });
process(records[0], records.slice(1), 'wholeEnochian');

const out = JSON.stringify(words, null, 2);

fs.writeFileSync('./dictionary.json', out);
