```rust
use solana_program::{
    account_info::AccountInfo,
    program_error::ProgramError,
    program_pack::{IsInitialized, Pack, Sealed},
    pubkey::Pubkey,
};

pub struct Course {
    pub is_initialized: bool,
    pub owner: Pubkey,
    pub access_amount: u64,
    pub resell_amount: u64,
    pub owner_profit_percentage: u8,
    pub platform_fee: u8,
}

impl Sealed for Course {}

impl IsInitialized for Course {
    fn is_initialized(&self) -> bool {
        self.is_initialized
    }
}

impl Pack for Course {
    const LEN: usize = 52;
    fn unpack_from_slice(src: &[u8]) -> Result<Self, ProgramError> {
        let src = array_ref![src, 0, Self::LEN];
        let (
            is_initialized,
            owner,
            access_amount,
            resell_amount,
            owner_profit_percentage,
            platform_fee,
        ) = array_refs![src, 1, 32, 8, 8, 1, 1];
        let is_initialized = match is_initialized {
            [0] => false,
            [1] => true,
            _ => return Err(ProgramError::InvalidAccountData),
        };
        Ok(Self {
            is_initialized,
            owner: Pubkey::new_from_array(*owner),
            access_amount: u64::from_le_bytes(*access_amount),
            resell_amount: u64::from_le_bytes(*resell_amount),
            owner_profit_percentage: owner_profit_percentage[0],
            platform_fee: platform_fee[0],
        })
    }

    fn pack_into_slice(&self, dst: &mut [u8]) {
        let dst = array_mut_ref![dst, 0, Self::LEN];
        let (
            is_initialized_dst,
            owner_dst,
            access_amount_dst,
            resell_amount_dst,
            owner_profit_percentage_dst,
            platform_fee_dst,
        ) = mut_array_refs![dst, 1, 32, 8, 8, 1, 1];
        let &Self {
            is_initialized,
            ref owner,
            access_amount,
            resell_amount,
            owner_profit_percentage,
            platform_fee,
        } = self;
        is_initialized_dst[0] = is_initialized as u8;
        owner_dst.copy_from_slice(owner.as_ref());
        *access_amount_dst = access_amount.to_le_bytes();
        *resell_amount_dst = resell_amount.to_le_bytes();
        owner_profit_percentage_dst[0] = owner_profit_percentage;
        platform_fee_dst[0] = platform_fee;
    }
}
```
