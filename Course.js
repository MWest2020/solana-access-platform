const { PublicKey, TransactionInstruction, SystemProgram } = require('@solana/web3.js');
const { createInstruction } = require('./instruction.js');
const { CourseState } = require('./state.js');

class Course {
  constructor(connection, courseName, ownerPublicKey, price, coursePublicKey = null) {
    this.connection = connection;
    this.courseName = courseName;
    this.ownerPublicKey = new PublicKey(ownerPublicKey);
    this.price = price;
    this.coursePublicKey = coursePublicKey ? new PublicKey(coursePublicKey) : null;
  }

  async mint() {
    // Generate a new public key for the course
    const newCoursePublicKey = await PublicKey.createWithSeed(
      this.ownerPublicKey,
      this.courseName,
      CourseState.programId
    );

    // Create the transaction instruction
    const instruction = createInstruction(
      this.ownerPublicKey,
      newCoursePublicKey,
      this.courseName,
      this.price
    );

    // Send the transaction
    const transaction = new TransactionInstruction().add(instruction);
    await this.connection.sendTransaction(transaction, [this.ownerPublicKey]);

    // Update the course public key
    this.coursePublicKey = newCoursePublicKey;

    return this.coursePublicKey.toBase58();
  }

  async getDetails() {
    if (!this.coursePublicKey) {
      throw new Error('Course public key is not set');
    }

    // Fetch the account info
    const info = await this.connection.getAccountInfo(this.coursePublicKey);

    // Decode the state
    const state = CourseState.decode(info.data);

    return {
      courseName: state.courseName,
      ownerPublicKey: state.ownerPublicKey.toBase58(),
      price: state.price,
      isSold: state.isSold,
      buyerPublicKey: state.buyerPublicKey ? state.buyerPublicKey.toBase58() : null,
    };
  }
}

module.exports = Course;
