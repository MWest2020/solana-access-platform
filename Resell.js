const { PublicKey, TransactionInstruction, SystemProgram } = require('@solana/web3.js');
const { createResellInstruction } = require('./instruction.js');
const { CourseState } = require('./state.js');

class Resell {
  constructor(connection, coursePublicKey, buyerPublicKey) {
    this.connection = connection;
    this.coursePublicKey = new PublicKey(coursePublicKey);
    this.buyerPublicKey = new PublicKey(buyerPublicKey);
  }

  async buy() {
    if (!this.coursePublicKey) {
      throw new Error('Course public key is not set');
    }

    if (!this.buyerPublicKey) {
      throw new Error('Buyer public key is not set');
    }

    // Fetch the course details
    const course = await this.connection.getAccountInfo(this.coursePublicKey);
    const courseState = CourseState.decode(course.data);

    // Check if the course is already sold
    if (courseState.isSold) {
      throw new Error('Course is already sold');
    }

    // Create the transaction instruction
    const instruction = createResellInstruction(
      this.coursePublicKey,
      this.buyerPublicKey,
      courseState.price
    );

    // Send the transaction
    const transaction = new TransactionInstruction().add(instruction);
    await this.connection.sendTransaction(transaction, [this.buyerPublicKey]);

    return this.coursePublicKey.toBase58();
  }
}

module.exports = Resell;
