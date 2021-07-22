import app from './app';
import mongoose from 'mongoose';
const port = process.env.PORT || 3001;

const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true });

app.listen(port, () => {
  console.log(`Todo app listening at http://localhost:${port}`);
});
