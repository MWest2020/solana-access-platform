```rust
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
    rent::Rent,
    sysvar::Sysvar,
};

use crate::instruction::Instruction;
use crate::state::State;
use crate::error::CourseError;

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let instruction = Instruction::unpack(instruction_data)?;

    match instruction {
        Instruction::MintAccess { amount } => {
            msg!("Instruction: MintAccess");
            mint_access(program_id, accounts, amount)
        }
        Instruction::Resell { amount } => {
            msg!("Instruction: Resell");
            resell(program_id, accounts, amount)
        }
        Instruction::AdjustProfit { percentage } => {
            msg!("Instruction: AdjustProfit");
            adjust_profit(program_id, accounts, percentage)
        }
    }
}

fn mint_access(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    amount: u64,
) -> ProgramResult {
    // Your logic for minting access to courses goes here
}

fn resell(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    amount: u64,
) -> ProgramResult {
    // Your logic for reselling courses goes here
}

fn adjust_profit(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    percentage: u8,
) -> ProgramResult {
    // Your logic for adjusting profit percentage goes here
}
```
