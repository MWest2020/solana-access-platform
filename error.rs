```rust
use thiserror::Error;

#[derive(Error, Debug, Clone, Copy)]
pub enum CourseError {
    #[error("Invalid Instruction")]
    InvalidInstruction,

    #[error("Not Authorized")]
    NotAuthorized,

    #[error("Course Not Found")]
    CourseNotFound,

    #[error("Insufficient Funds")]
    InsufficientFunds,

    #[error("Invalid State")]
    InvalidState,

    #[error("Invalid Amount")]
    InvalidAmount,

    #[error("Invalid Profit Percentage")]
    InvalidProfitPercentage,
}

impl From<CourseError> for solana_program::program_error::ProgramError {
    fn from(e: CourseError) -> Self {
        solana_program::program_error::ProgramError::Custom(e as u32)
    }
}

impl<T> DecodeError<T> for CourseError {
    fn type_of() -> &'static str {
        "Course Error"
    }
}
```
