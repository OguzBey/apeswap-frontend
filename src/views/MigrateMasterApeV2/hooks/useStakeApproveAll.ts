import { Erc20 } from 'config/abi/types'
import { Contract, ethers } from 'ethers'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { useCallback } from 'react'
import { getProviderOrSigner } from 'utils'
import { useVaults } from 'state/vaults/hooks'
import { useMasterChefV2Address, useVaultApeAddressV3 } from 'hooks/useAddress'
import { useAppDispatch } from 'state'
import { useFarmsV2 } from 'state/farmsV2/hooks'
import { setAddTransactions, updateMigrateStatus } from 'state/masterApeMigration/reducer'
import { MasterApeV2ProductsInterface, MigrateStatus, MigrateTransaction } from 'state/masterApeMigration/types'
import useIsMobile from 'hooks/useIsMobile'
import { useMigrateMaximizer } from 'state/masterApeMigration/hooks'

const useStakeApproveAll = () => {
  const isMobile = useIsMobile()
  const migrateMaximizers = useMigrateMaximizer()
  const dispatch = useAppDispatch()
  const { library, account, chainId } = useActiveWeb3React()
  const masterChefV2Address = useMasterChefV2Address()
  // TODO: Update vaults when ready
  const vaultAddress = useVaultApeAddressV3()
  const { vaults: fetchedVaults } = useVaults()
  const farms = useFarmsV2(null)
  const vaults = fetchedVaults.filter((vault) => !vault.inactive)

  const handleApproveAll = useCallback(
    (apeswapWalletLps: MasterApeV2ProductsInterface[]) => {
      apeswapWalletLps.map(async ({ lp, id }) => {
        try {
          // If maximizers is selected we need to check if one exists first. Otherwise approve the farm
          const matchedVault = vaults.find((vault) => vault.stakeToken.address[chainId].toLowerCase() === lp)
          const farmPid = farms.find((farm) => farm.lpAddresses[chainId].toLowerCase() === lp).pid
          const lpContract = new Contract(lp, IUniswapV2PairABI, getProviderOrSigner(library, account)) as Erc20
          dispatch(
            updateMigrateStatus(
              id,
              'approveStake',
              MigrateStatus.PENDING,
              `Pending ${migrateMaximizers && matchedVault ? 'Maximizer' : 'Farm'} Approval`,
            ),
          )
          lpContract
            .approve(
              migrateMaximizers && matchedVault ? vaultAddress : masterChefV2Address,
              ethers.constants.MaxUint256,
            )
            .then((tx) => {
              const transaction: MigrateTransaction = {
                hash: tx.hash,
                id,
                type: 'approveStake',
                v3VaultPid: matchedVault.pid,
                v2FarmPid: farmPid,
                lpAddress: lp,
              }
              dispatch(setAddTransactions(transaction))
              if (isMobile) {
                return handleApproveAll(apeswapWalletLps.slice(1, apeswapWalletLps.length))
              }
            })
            .catch((e) => {
              dispatch(
                updateMigrateStatus(
                  id,
                  'approveStake',
                  MigrateStatus.INVALID,
                  e.message === 'MetaMask Tx Signature: User denied transaction signature.'
                    ? 'Transaction rejected in wallet'
                    : e.message,
                ),
              )
              if (isMobile) {
                return handleApproveAll(apeswapWalletLps.slice(1, apeswapWalletLps.length))
              }
            })
          if (!isMobile) {
            return handleApproveAll(apeswapWalletLps.slice(1, apeswapWalletLps.length))
          }
        } catch {
          dispatch(
            updateMigrateStatus(
              id,
              'approveStake',
              MigrateStatus.INVALID,
              'Something went wrong please try refreshing',
            ),
          )
        }
      })
    },
    [
      account,
      isMobile,
      library,
      farms,
      dispatch,
      chainId,
      masterChefV2Address,
      vaults,
      vaultAddress,
      migrateMaximizers,
    ],
  )
  return handleApproveAll
}

export default useStakeApproveAll
