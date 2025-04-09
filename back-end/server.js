require('./db');
const express = require('express');
const cors = require('cors');
const UserRouter = require('./routes/UserRoutes');
const CategoryRoutes = require('./routes/CategoryRoutes');
const CompanyRoutes = require('./routes/CompanyRoutes');

const app = express();

const PORT = 4000;
app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true,
}));
app.use(express.json());
app.use('/api', UserRouter);
app.use('/api', CategoryRoutes);
app.use('/api', CompanyRoutes);

app.get ('/', (req, res) =>{
    res.status(200).json({message: "Hello world"})
});

app.listen(PORT, () => {
    console.log(`сервер працює за адресом: http://localhost:${PORT}`);
});