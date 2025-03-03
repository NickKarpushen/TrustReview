const express = require('express');
const cors = require('cors');

const app = express();

const PORT = 8000;
app.use(cors());
app.use(express.json());

app.get ('/', (req, res) =>{
    res.status(200).json({message: "Hello world"})
});

app.listen(PORT, () => {
    console.log(`сервер працює за адресом: http://localhost:${PORT}`);
});