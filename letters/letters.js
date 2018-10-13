const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const csv = fs.readFileSync('./letters.csv', 'utf8');
const records = parse(csv, { cast: true });
const headers = records[0];
records.shift();

function transform(row, headers) {
  const out = {};
  headers.forEach((header, i) => out[header] = row[i]);
  return out;
}

const dict = {};
records.forEach(row => {
  row = transform(row, headers);
  dict[row.enochian] = row;
});

const out = JSON.stringify(dict, null, 2);
fs.writeFileSync('./letters.json', out);
