# Enochian Dictionaries

The dataset is compiled from a number of sources, detailed below.

## Usage

See the [dictionary.json](./dictionary.json) file.  In brief, you have a
JSON dictionary as follows:

```js
{
  ...,
  "IAD": {
    "gematria": [ 70 ],
    "meanings": [
      {
        "meaning": "a god, God",
        "source": "practicalManual"
      },
      {
        "meaning": "GOD, THE GOD",
        "source": "wholeEnochian"
      }
    ],
    "pronounciations": [
      {
        "pronounciation": "ee-ah-doh",
        "source": "practicalManual"
      }
    ]
  },
  ...
}
```

There may sometimes be a `note` or ``



## Sources

* [practicalManual.csv](./practicalManual.csv)
  Enochian Magic, A Practical Manual Paperback (1987) by Gerald J. Schueler
  This includes pronounciation for each word.

* [wholeEnochian.csv](./wholeEnochian.csv)
  There is a PDF floating around the internet called "`The Whole Enochian
  Dictionary.pdf`", that includes a tabled lexicon.  Authorship is unclear.
  The lexicon itself seems to have been copied and pasted from somewhere else -
  in same cases English was inadvertently pasted into Enochian cells, etc.
  The coloured rows (indicating source) seem to be more recent additions.

* [completeEnochian.csv](./completeEnochian.csv)
  The Complete Enochian Dictionary by Donald C Laycock.

* unchecked - http://www.angelfire.com/empire/serpentis666/Letters.html
