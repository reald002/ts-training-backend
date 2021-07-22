const app = require('./app.js');
const mongoose = require('mongoose');
const port = process.env.PORT || 3001;

const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true });

app.listen(port, () => {
  console.log(`Todo app listening at http://localhost:${port}`);
});
