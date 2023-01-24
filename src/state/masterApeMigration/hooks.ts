import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useRefresh from 'hooks/useRefresh'
import { delay } from 'lodash'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { useFarms } from 'state/farms/hooks'
import { useFarmsV2 } from 'state/farmsV2/hooks'
import { State } from 'state/types'
import { useVaultsV3 } from 'state/vaultsV3/hooks'
import track from 'utils/track'
import {
  fetchV1Products,
  fetchV2Products,
  setActiveIndex,
  setInitializeMigrateStatus,
  setMigrationLoading,
} from './reducer'
import { MigrateLpStatus } from './types'
import { activeIndexHelper } from './utils'

/**
 * Hook to get the users ApeSwap LPs for the migration
 */
export const useMergedV1Products = () => {
  const dispatch = useAppDispatch()
  const { chainId, account } = useActiveWeb3React()
  const { userDataLoaded } = useIsMigrationLoading()
  const { fastRefresh } = useRefresh()
  const transactions = useSelector((state: State) => state.masterApeMigration.transactions)
  useEffect(() => {
    if (userDataLoaded) {
      dispatch(fetchV1Products(chainId))
    }
  }, [chainId, userDataLoaded, account, transactions.length, fastRefresh, dispatch])
  return useSelector((state: State) => state.masterApeMigration.v1Products)
}

export const useMergedV2Products = () => {
  const dispatch = useAppDispatch()
  const { chainId, account } = useActiveWeb3React()
  const { fastRefresh } = useRefresh()
  const { userDataLoaded } = useIsMigrationLoading()
  const transactions = useSelector((state: State) => state.masterApeMigration.transactions)
  useEffect(() => {
    if (userDataLoaded) {
      dispatch(fetchV2Products(chainId))
    }
  }, [chainId, userDataLoaded, account, transactions.length, fastRefresh, dispatch])
  return useSelector((state: State) => state.masterApeMigration.v2Products)
}

export const useSetInitialMigrateStatus = () => {
  const dispatch = useAppDispatch()
  const { chainId, account } = useActiveWeb3React()
  const { mergedMigrationLoaded } = useIsMigrationLoading()
  const migrateMaximizers = useMigrateMaximizer()
  useEffect(() => {
    if (mergedMigrationLoaded) {
      dispatch(setInitializeMigrateStatus(chainId, migrateMaximizers))
    }
  }, [dispatch, mergedMigrationLoaded, migrateMaximizers, account, chainId])
}

export const useSetMigrationLoading = () => {
  const dispatch = useAppDispatch()
  const { account } = useActiveWeb3React()
  const farmsV2 = useFarmsV2(account)
  const farms = useFarms(account)
  const { vaults } = useVaultsV3()
  const userDataSetFlag = !!farms?.[0]?.userData && !!farmsV2?.[0]?.userData && !!vaults?.[0]?.userData
  // useEffect(() => {
  //   delay(() => {
  //     dispatch(setMigrationLoading({ mergedMigrationLoaded: false, userDataLoaded: false, allDataLoaded: false }))
  //   }, 3000)
  // }, [account, dispatch])
  useEffect(() => {
    dispatch(setMigrationLoading({ userDataLoaded: userDataSetFlag }))
  }, [userDataSetFlag, account, dispatch])
}

export const useMonitorActiveIndex = () => {
  const { chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const migrateStatus = useMigrateStatus()
  const newActiveIndex = activeIndexHelper(migrateStatus)
  const { allDataLoaded } = useIsMigrationLoading()
  useEffect(() => {
    if (allDataLoaded) {
      dispatch(setActiveIndex(newActiveIndex))
      track({
        event: 'masterApeMigration',
        chain: chainId,
        data: {
          cat: newActiveIndex,
        },
      })
    }
  }, [newActiveIndex, allDataLoaded, chainId, dispatch])
}

export const useIsMigrationLoading = () => {
  return useSelector((state: State) => state.masterApeMigration.migrationLoading)
}

export const useActiveIndex = () => {
  return useSelector((state: State) => state.masterApeMigration.activeIndex)
}

export const useMigrateStatus = (): MigrateLpStatus[] => {
  return useSelector((state: State) => state.masterApeMigration.migrateLpStatus)
}

export const useMigrateMaximizer = () => {
  return useSelector((state: State) => state.masterApeMigration.migrateMaximizers)
}

export const useMigrateCompletionLog = () => {
  return useSelector((state: State) => state.masterApeMigration.migrationCompleteLog)
}
