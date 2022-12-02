import BigNumber from 'bignumber.js'
import { VaultConfig } from 'config/constants/types'
import { FarmLpAprsType, TokenPrices, Vault } from 'state/types'
import { getFarmApr } from 'utils/apr'
import {
  getRoi,
  tokenEarnedPerThousandDollarsCompounding,
  tokenEarnedPerThousandDollarsCompoundingMax,
} from 'utils/compoundApyHelpers'
import { getBalanceNumber } from 'utils/formatBalance'

const cleanVaultData = (
  vaultIds: number[],
  chunkedVaults: any[],
  vaultSettingsV2: any[],
  vaultSettingsV3: any[],
  tokenPrices: TokenPrices[],
  farmLpAprs: FarmLpAprsType,
  chainId: number,
  vaultsConfig: Vault[],
) => {
  const keeperFeeV2 = parseFloat(vaultSettingsV2[1]) / 100
  const withdrawFeeV2 = parseFloat(vaultSettingsV2[5]) / 100
  const keeperFeeV3 = parseFloat(vaultSettingsV3[1]) / 100
  const withdrawFeeV3 = parseFloat(vaultSettingsV3[5]) / 100
  const data = chunkedVaults.map((chunk, index) => {
    const filteredVaults = vaultsConfig.filter((vault) => vault.availableChains.includes(chainId))
    const vaultConfig: VaultConfig = filteredVaults?.find((vault) => vault.id === vaultIds[index])
    const [totalAllocPoint, poolInfo, userInfo, stakeTokenMCBalance, bananaPoolInfo, bananaPoolTotalStaked] = chunk

    const rewardTokenPriceUsd = tokenPrices?.find(
      (token) =>
        token.address[chainId]?.toLowerCase() === vaultConfig.masterchef.rewardToken.address[chainId]?.toLowerCase(),
    )?.price
    const stakeTokenPriceUsd = tokenPrices?.find(
      (token) => token.address[chainId]?.toLowerCase() === vaultConfig.stakeToken.address[chainId]?.toLowerCase(),
    )?.price

    // Strat info
    const allocPoint = new BigNumber(poolInfo.allocPoint?._hex)
    const strategyPairBalance = userInfo.amount.toString()
    const weight = totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : new BigNumber(0)
    const totalTokensStaked = getBalanceNumber(new BigNumber(strategyPairBalance))
    const totalTokensStakedMC = getBalanceNumber(new BigNumber(stakeTokenMCBalance))
    const totalValueStakedInMCUsd = totalTokensStakedMC * stakeTokenPriceUsd

    // Banana pool info
    const bananaPoolAllocPoint = new BigNumber(bananaPoolInfo.allocPoint?._hex)
    const bananaPoolWeight = totalAllocPoint
      ? bananaPoolAllocPoint.div(new BigNumber(totalAllocPoint))
      : new BigNumber(0)
    const totalBananaStakedMC = getBalanceNumber(new BigNumber(bananaPoolTotalStaked))
    const totalBananaValueStakedInMCUsd = totalBananaStakedMC * rewardTokenPriceUsd

    // Calculate APR
    const poolWeight = totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : new BigNumber(0)

    // This only works for apeswap farms
    const lpApr = farmLpAprs?.lpAprs?.find((lp) => lp.pid === vaultConfig.masterchef.pid[chainId])?.lpApr * 100

    const oneThousandDollarsWorthOfToken = 1000 / rewardTokenPriceUsd

    const apr = getFarmApr(poolWeight, new BigNumber(rewardTokenPriceUsd), new BigNumber(totalValueStakedInMCUsd))
    const bananaPoolApr = getFarmApr(
      bananaPoolWeight,
      new BigNumber(rewardTokenPriceUsd),
      new BigNumber(totalBananaValueStakedInMCUsd),
    )

    let yearlyApy = 0
    let dailyApy = 0

    if (vaultConfig.version === 'V2' || vaultConfig.version === 'V3') {
      yearlyApy = tokenEarnedPerThousandDollarsCompoundingMax({
        numberOfDays: 365,
        farmApr: lpApr ? apr + lpApr : apr,
        bananaPoolApr,
        performanceFee: vaultConfig.version === 'V2' ? keeperFeeV2 : keeperFeeV3,
      })
      dailyApy = tokenEarnedPerThousandDollarsCompoundingMax({
        numberOfDays: 1,
        farmApr: lpApr ? apr + lpApr : apr,
        bananaPoolApr,
        performanceFee: vaultConfig.version === 'V2' ? keeperFeeV2 : keeperFeeV3,
      })
    } else {
      const amountEarnedYealry = tokenEarnedPerThousandDollarsCompounding({
        numberOfDays: 365,
        farmApr: lpApr ? apr + lpApr : apr,
        tokenPrice: rewardTokenPriceUsd,
        performanceFee: keeperFeeV2,
      })
      const amountEarnedDaily = tokenEarnedPerThousandDollarsCompounding({
        numberOfDays: 1,
        farmApr: lpApr ? apr + lpApr : apr,
        tokenPrice: rewardTokenPriceUsd,
        performanceFee: keeperFeeV2,
      })
      yearlyApy = getRoi({ amountEarned: amountEarnedYealry, amountInvested: oneThousandDollarsWorthOfToken })
      dailyApy = getRoi({ amountEarned: amountEarnedDaily, amountInvested: oneThousandDollarsWorthOfToken })
    }

    return {
      ...vaultConfig,
      keeperFee:
        vaultConfig.version === 'V2'
          ? keeperFeeV2.toString()
          : vaultConfig.version === 'V3'
          ? keeperFeeV3.toString()
          : '0.25',
      withdrawFee:
        vaultConfig.version === 'V2'
          ? withdrawFeeV2.toString()
          : vaultConfig.version === 'V3'
          ? withdrawFeeV3.toString()
          : vaultConfig?.fee
          ? vaultConfig.fee
          : '0',
      totalStaked: totalTokensStaked.toString(),
      totalAllocPoint: totalAllocPoint.toString(),
      allocPoint: allocPoint.toString(),
      weight: parseInt(weight.toString()),
      strategyPairBalance: strategyPairBalance.toString(),
      strategyPairBalanceFixed: null,
      stakeTokenPrice: stakeTokenPriceUsd,
      rewardTokenPrice: rewardTokenPriceUsd,
      masterChefPairBalance: stakeTokenMCBalance.toString(),
      apy: {
        daily: dailyApy,
        yearly: yearlyApy,
      },
    }
  })
  return data
}

export default cleanVaultData
