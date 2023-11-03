const { PublicKey } = require('@solana/web3.js');
const { OwnerState } = require('./state.js');

class Owner {
  constructor(connection, ownerPublicKey) {
    this.connection = connection;
    this.ownerPublicKey = new PublicKey(ownerPublicKey);
  }

  async getDetails() {
    if (!this.ownerPublicKey) {
      throw new Error('Owner public key is not set');
    }

    // Fetch the account info
    const info = await this.connection.getAccountInfo(this.ownerPublicKey);

    // Decode the state
    const state = OwnerState.decode(info.data);

    return {
      ownerPublicKey: state.ownerPublicKey.toBase58(),
      profitPercentage: state.profitPercentage,
    };
  }
}

module.exports = Owner;
