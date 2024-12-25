const express = require('express');
const router = express.Router();

// HealthCheck endpoint
router.get('/', (req, res) => {
    res.status(200).send('OK');
  });

module.exports = router;