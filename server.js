const express = require('express')

const app = express()

app.use(express.static('./dist/task-board-front'));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/task-board-front'});
});

app.listen(process.env.PORT || 8080);
