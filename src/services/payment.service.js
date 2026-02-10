const db = require('../db');
const { getProvider } = require('../providers/provider.factory');

async function initiatePayment({ token, phone, network }) {
  const FIXED_AMOUNT = 100; // fixed 100 GHS

  // Validate repayment link
  const repayment = await db.query(
    `SELECT id FROM repayments WHERE public_token = $1 AND status='ACTIVE'`,
    [token]
  );
  if (!repayment.rows.length) throw new Error('Invalid repayment link');

  const repaymentId = repayment.rows[0].id;

  const provider = getProvider(network);

  const reference = await provider.requestToPay({
    amount: FIXED_AMOUNT,
    phone,
    externalId: repaymentId
  });

  await db.query(
    `INSERT INTO payments (repayment_id, amount, phone, network, provider, provider_reference, payout_msisdn)
     VALUES ($1,$2,$3,$4,$5,$6,$7)`,
    [repaymentId, FIXED_AMOUNT, phone, network, network, reference, '0505210056']
  );

  return reference;
}

// Simulate payment confirmation
async function confirmPayment(reference, success=true) {
  const status = success ? 'SUCCESS' : 'FAILED';
  await db.query(
    `UPDATE payments SET status=$1, confirmed_at=NOW() WHERE provider_reference=$2`,
    [status, reference]
  );
  return status;
}

module.exports = { initiatePayment, confirmPayment };
