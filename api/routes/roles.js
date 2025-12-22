const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'roles endpoint' });
});

// DOĞRU EXPORT:
module.exports = router;