/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import { Flex, Text } from '@ape.swap/uikit'
import { Select, SelectItem } from '@apeswapfinance/uikit'
import { ChainId } from '@ape.swap/sdk'

import { useTranslation } from 'contexts/Localization'

import useIsMobile from 'hooks/useIsMobile'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

import { useStats } from 'state/statsPage/hooks'
import { Chain } from 'state/statsPage/types'

import Page from 'components/layout/Page'
import ConnectButton from 'components/LiquidityWidget/ConnectButton'
import { NFT } from './components/NFT'
import Analytics from './components/Analytics'
import Portfolio from './components/Portfolio'
import PageLoader from '../../components/PageLoader'
import { BannerStats } from './components/BannerStats'
import { TabOption, TabNavStats } from './components/TabNavStats'
import { ShareButton } from './components/ShareButton'
import MigrationRequiredPopup from 'components/MigrationRequiredPopup'

import { Pacoca, PacocaCard, StatsContent, StyledFlex, TopContent } from './styles'
import { CHAIN_NAME } from 'state/statsPage/mappings'

const displayChainOptions = [
  {
    label: 'All Chains',
    chain: 0,
  },
  {
    label: CHAIN_NAME[ChainId.BSC],
    chain: ChainId.BSC,
  },
  {
    label: CHAIN_NAME[ChainId.MATIC],
    chain: ChainId.MATIC,
  },
  {
    label: CHAIN_NAME[ChainId.TLOS],
    chain: ChainId.TLOS,
  },
  {
    label: CHAIN_NAME[ChainId.ARBITRUM],
    chain: ChainId.ARBITRUM,
  },
]

const Stats: React.FC = () => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const { account } = useActiveWeb3React()
  const { selectedChain, handleChangeSelectedChain, loading, stats } = useStats()
  const [activeTab, setActiveTab] = useState<TabOption>(TabOption.ANALYTICS)

  const tabMenuMap = {
    Portfolio: <Portfolio />,
    Analytics: <Analytics />,
    NFT: <NFT />,
  }

  const handleChangeActiveTab = (tab: TabOption) => {
    setActiveTab(tab)
  }

  return (
    <>
      <MigrationRequiredPopup
        v2Farms={[]}
        farms={[]}
        vaults={[]}
        hasPositionsToMigrate={stats?.hasPositionsToMigrate}
      />
      <TopContent>
        <StyledFlex loading={loading}>
          <Select
            size="sm"
            width={isMobile ? '100%' : '122px'}
            height="36px"
            onChange={(e) => handleChangeSelectedChain(+e.target.value as Chain)}
            active={selectedChain}
          >
            {displayChainOptions.map((option) => {
              return (
                <SelectItem key={option.chain} value={option.chain} size="sm">
                  <Text style={{ lineHeight: 1.5, fontSize: 12, fontWeight: 500 }}>{t(option.label)}</Text>
                </SelectItem>
              )
            })}
          </Select>
          <ShareButton />
        </StyledFlex>
      </TopContent>

      <BannerStats />

      <Page width="1220px">
        <TabNavStats activeTab={activeTab} onChangeActiveTab={handleChangeActiveTab} />

        <StatsContent>
          {!account ? (
            <>
              <Flex sx={{ flexDirection: 'column', margin: '128px 0', gap: '16px' }}>
                <Text sx={{ textTransform: 'uppercase' }}>{t('You are not connected')}</Text>
                <ConnectButton />
              </Flex>
            </>
          ) : loading ? (
            <PageLoader />
          ) : (
            tabMenuMap[activeTab]
          )}
        </StatsContent>
        <PacocaCard href="https://pacoca.io/" target="_blank">
          <Text size="12px">Stats powered by</Text>
          <Pacoca width="83px" height="24px" />
        </PacocaCard>
      </Page>
    </>
  )
}

export default Stats
