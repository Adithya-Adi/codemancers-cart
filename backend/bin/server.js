const dotenv = require('dotenv');
const app = require('../app');
dotenv.config();

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  try {
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
});
