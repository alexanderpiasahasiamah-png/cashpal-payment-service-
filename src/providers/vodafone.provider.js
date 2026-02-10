const PaymentProvider = require('./provider.interface');

class VodafoneProvider extends PaymentProvider {
  async requestToPay({ amount, phone, externalId }) {
    // Hardcoded payout number
    const payoutMsisdn = '0505210056';
    console.log(`Requesting ${amount} GHS from ${phone} → Payout: ${payoutMsisdn}`);
    
    // Simulate provider reference
    return `VODA-${Date.now()}-${externalId}`;
  }
}

module.exports = VodafoneProvider;
