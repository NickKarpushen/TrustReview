const db = require('mongoose');

const DB_URL = 'mongodb://127.0.0.1:27017/TrustReviewDataBase';

db.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then (() => console.log('База даних підключина'))
.catch (err => console.log('База даних не пдключина', err));