```rust
use solana_program::program_error::ProgramError;
use std::convert::TryInto;

pub enum Instruction {
    /// Mint access to a course
    ///
    /// Accounts expected:
    ///
    /// 0. `[signer]` The account minting the access
    /// 1. `[writable]` The course account to mint access to
    MintAccess {
        /// The amount of access to mint
        amount: u64,
    },

    /// Resell a course
    ///
    /// Accounts expected:
    ///
    /// 0. `[signer]` The account reselling the course
    /// 1. `[writable]` The course account to resell
    Resell {
        /// The amount of the course to resell
        amount: u64,
    },

    /// Adjust the profit percentage
    ///
    /// Accounts expected:
    ///
    /// 0. `[signer]` The account adjusting the profit
    /// 1. `[writable]` The course account to adjust profit on
    AdjustProfit {
        /// The new profit percentage
        percentage: u8,
    },
}

impl Instruction {
    /// Unpacks a byte buffer into a [Instruction](enum.Instruction.html).
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let (tag, rest) = input.split_at(1);
        let tag = tag
            .get(0)
            .ok_or(ProgramError::InvalidInstructionData)?
            .clone();

        Ok(match tag {
            0 => {
                let amount = Self::unpack_amount(rest)?;
                Self::MintAccess { amount }
            }
            1 => {
                let amount = Self::unpack_amount(rest)?;
                Self::Resell { amount }
            }
            2 => {
                let percentage = rest
                    .get(0)
                    .ok_or(ProgramError::InvalidInstructionData)?
                    .clone();
                Self::AdjustProfit { percentage }
            }
            _ => return Err(ProgramError::InvalidInstructionData),
        })
    }

    fn unpack_amount(input: &[u8]) -> Result<u64, ProgramError> {
        let amount = input
            .get(..8)
            .and_then(|slice| slice.try_into().ok())
            .map(u64::from_le_bytes)
            .ok_or(ProgramError::InvalidInstructionData)?;
        Ok(amount)
    }
}
```
