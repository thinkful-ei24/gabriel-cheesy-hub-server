'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

// app.use('/api/cheeses', (req, res, next) => {
//   const cheeses = [
//     'Bath Blue',
//     'Barkham Blue',
//     'Buxton Blue',
//     'Cheshire Blue',
//     'Devon Blue',
//     'Dorset Blue Vinney',
//     'Dovedale',
//     'Exmoor Blue',
//     'Harbourne Blue',
//     'Lanark Blue',
//     'Lymeswold',
//     'Oxford Blue',
//     'Shropshire Blue',
//     'Stichelton',
//     'Stilton',
//     'Blue Wensleydale',
//     'Yorkshire Blue'
//   ];

//   res.json(cheeses);
// });

app.use('/api/diary', (req, res, next) => {
  const a = {
    error: null,
    diaryFilms: [
      {
        diaryID: '12345',
        imdbID: 'tt3896198',
        title: 'Guardians of the Galaxy Vol. 2',
        plot:
          'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
        actors: ['Jessica Chastain', 'Joaquin Phoenix']
      },
      {
        diaryID: '22345',
        imdbID: 'tt3896198',
        title: 'Guardians of the Galaxy Vol. 2',
        plot:
          'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
        actors: ['Jessica Chastain', 'Joaquin Phoenix']
      },
      {
        diaryID: '32345',
        imdbID: 'tt3896198',
        title: 'Guardians of the Galaxy Vol. 2',
        plot:
          'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
        actors: ['Jessica Chastain', 'Joaquin Phoenix']
      }
    ],
    searchFilms: [
      {
        imdbID: 'tt3896198',
        title: 'Guardians of the Galaxy Vol. 2'
      }
    ]
  };
  res.json(a);
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
