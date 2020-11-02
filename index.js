require('dotenv').config();
const server = require('./server');


const PORT = process.env.PORT || 4002;

server.listen(PORT, () => console.log(`server runnint in port ${PORT}`));