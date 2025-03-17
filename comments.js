// Create web server
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const comments = require('./comments.json');

// Set up the public folder
app.use(express.static('public'));
app.use(bodyParser.json());

// Set up the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Home page
app.get('/', (req, res) => {
  res.render('index', { comments });
});

// Post a comment
app.post('/comments', (req, res) => {
  const { name, comment } = req.body;
  comments.push({ name, comment });
  fs.writeFile('./comments.json', JSON.stringify(comments), 'utf8', err => {
    if (err) {
      res.status(500).send('Unable to write to file');
    } else {
      res.redirect('/');
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
 
//  In the code above, we have a simple web server that serves the  public  folder and uses the  EJS template engine to render the  index.ejs  file. The server listens on port 3000 and has two routes:  /  and  /comments . 
//  The  /  route renders the  index.ejs  file and passes the  comments  array to the template. The  /comments  route is a POST route that accepts form data, adds the data to the  comments  array, writes the array to a file, and redirects to the home page. 
//  Create the  index.ejs  file in the  views  folder: