const express = require('express');
const router = express.Router();
const { initiatePayment, confirmPayment } = require('../services/payment.service');

router.post('/', async (req, res) => {
  const { token, phone, network } = req.body;
  try {
    const reference = await initiatePayment({ token, phone, network });
    // redirect user to success page after initiating payment
    res.json({ status: 'PENDING', reference });
  } catch(err) {
    res.json({ status: 'FAILED', error: err.message });
  }
});

// simulate webhook for testing success/failure
router.post('/confirm', async (req, res) => {
  const { reference, success } = req.body;
  const status = await confirmPayment(reference, success);
  res.json({ status });
});

module.exports = router;
