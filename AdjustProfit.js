const { PublicKey, TransactionInstruction } = require('@solana/web3.js');
const { createAdjustProfitInstruction } = require('./instruction.js');
const { OwnerState } = require('./state.js');

class AdjustProfit {
  constructor(connection, ownerPublicKey, newProfitPercentage) {
    this.connection = connection;
    this.ownerPublicKey = new PublicKey(ownerPublicKey);
    this.newProfitPercentage = newProfitPercentage;
  }

  async adjust() {
    if (!this.ownerPublicKey) {
      throw new Error('Owner public key is not set');
    }

    if (this.newProfitPercentage < 0 || this.newProfitPercentage > 100) {
      throw new Error('Profit percentage must be between 0 and 100');
    }

    // Fetch the owner details
    const owner = await this.connection.getAccountInfo(this.ownerPublicKey);
    const ownerState = OwnerState.decode(owner.data);

    // Create the transaction instruction
    const instruction = createAdjustProfitInstruction(
      this.ownerPublicKey,
      this.newProfitPercentage
    );

    // Send the transaction
    const transaction = new TransactionInstruction().add(instruction);
    await this.connection.sendTransaction(transaction, [this.ownerPublicKey]);

    return this.ownerPublicKey.toBase58();
  }
}

module.exports = AdjustProfit;
