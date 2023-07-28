const express = require('express');
const app = express();
const port = 3003;

app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
app.post('/login', (req, res) => {
  res.send({data: null});
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
});