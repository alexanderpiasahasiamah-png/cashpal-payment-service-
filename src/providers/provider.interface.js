class PaymentProvider {
  async requestToPay({ amount, phone, externalId }) {
    throw new Error('requestToPay not implemented');
  }
}
module.exports = PaymentProvider;
