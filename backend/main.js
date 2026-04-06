// Servidor principal Express para Task List
const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { taskRoutes } = require('./src/routes/taskRoutes');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use(express.static(path.resolve(__dirname, '../frontend/src/pages')));
app.use('/assets', express.static(path.resolve(__dirname, '../frontend/assets')));
app.use('/components', express.static(path.resolve(__dirname, '../frontend/src/components')));
app.use('/services', express.static(path.resolve(__dirname, '../frontend/src/services')));

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
