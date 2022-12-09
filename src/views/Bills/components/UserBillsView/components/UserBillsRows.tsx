/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, useMatchBreakpoints } from '@ape.swap/uikit'
import ListView from 'components/ListView'
import { getBalanceNumber } from 'utils/formatBalance'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import Claim from '../../Actions/Claim'
import VestedTimer from '../../VestedTimer'
import BillModal from '../../Modals'
import ListViewContentMobile from 'components/ListViewV2/ListViewContentMobile'
import { Box } from 'theme-ui'
import { LpTypeVariants } from 'components/ListViewV2/types'
import ListViewContent from 'components/ListViewV2/ListViewContent'
import { BillsToRender } from '../types'
import { ExtendedListViewProps } from 'components/ListView/types'

const UserBillsRows: React.FC<{ billsToRender: BillsToRender[] }> = ({ billsToRender }) => {
  const { isXl, isLg, isXxl } = useMatchBreakpoints()
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const isMobile = !isLg && !isXl && !isXxl

  const billsListView = billsToRender.map((billToRender) => {
    const { bill } = billToRender
    const { token, quoteToken, earnToken } = bill
    const pending = getBalanceNumber(new BigNumber(billToRender.payout), bill?.earnToken?.decimals[chainId])?.toFixed(4)
    const pendingRewards = getBalanceNumber(
      new BigNumber(billToRender.pendingRewards),
      bill?.earnToken?.decimals[chainId],
    )?.toFixed(4)
    return {
      tokens: { token1: token.symbol, token2: quoteToken.symbol, token3: earnToken.symbol },
      stakeLp: true,
      id: billToRender.id,
      billArrow: true,
      title: (
        <ListViewContent
          tag={LpTypeVariants.APE}
          value={bill.lpToken.symbol}
          style={{ width: '150px', height: '45px', ml: '10px' }}
        />
      ),
      titleContainerWidth: 255,
      cardContent: (
        <>
          {isMobile ? (
            <ListViewContentMobile
              title={'Claimable'}
              value={pendingRewards}
              toolTip={`This is the amount of tokens that have vested and available to claim.`}
              toolTipPlacement={'bottomLeft'}
              toolTipTransform={'translate(29%, 0%)'}
            />
          ) : (
            <>
              <ListViewContent
                title={t('Claimable')}
                value={pendingRewards}
                style={{ width: isMobile ? '120px' : '165px', ml: '20px', height: '52.5px' }}
                toolTip={t('This is the amount of tokens that have vested and available to claim.')}
                toolTipPlacement="bottomLeft"
                toolTipTransform="translate(29%, -4%)"
              />
              <ListViewContent
                title={t('Pending')}
                value={pending}
                style={{ width: isMobile ? '120px' : '160px', height: '52.5px' }}
                toolTip={t('This is the amount of unvested tokens that cannot be claimed yet.')}
                toolTipPlacement="bottomLeft"
                toolTipTransform="translate(22%, -4%)"
              />
              <VestedTimer lastBlockTimestamp={billToRender.lastBlockTimestamp} vesting={billToRender.vesting} />
              <Flex sx={{ minWidth: '220px', alignItems: 'center' }}>
                <Claim
                  billAddress={bill.contractAddress[chainId]}
                  billIds={[billToRender.id]}
                  buttonSize={'100px'}
                  pendingRewards={billToRender?.pendingRewards}
                  margin={'10px'}
                />
                <BillModal buttonText={t('VIEW')} bill={bill} billId={billToRender.id} buttonSize={'100px'} />
              </Flex>
            </>
          )}
        </>
      ),
      expandedContentSize: 185,
      expandedContent: isMobile && (
        <Flex sx={{ width: '100%', flexWrap: 'wrap', padding: '0 10px' }}>
          <Flex sx={{ width: '100%', flexDirection: 'column' }}>
            <ListViewContentMobile
              title={'Pending'}
              value={pending}
              toolTip={`This is the amount of unvested tokens that cannot be claimed yet.`}
              toolTipPlacement={'bottomLeft'}
              toolTipTransform={'translate(22%, 0%)'}
            />
            <VestedTimer
              lastBlockTimestamp={billToRender.lastBlockTimestamp}
              vesting={billToRender.vesting}
              mobileFlag
            />
          </Flex>
          <Flex sx={{ width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Box sx={{ width: '240px', margin: '10px 0' }}>
              <Claim
                billAddress={bill.contractAddress[chainId]}
                billIds={[billToRender.id]}
                pendingRewards={billToRender?.pendingRewards}
                margin={'0'}
              />
            </Box>
            <Box sx={{ width: '240px', mb: 6 }}>
              <BillModal buttonText={t('VIEW')} bill={bill} billId={billToRender.id} buttonSize={'240px'} />
            </Box>
          </Flex>
        </Flex>
      ),
    }
  }) as ExtendedListViewProps[]

  return <ListView listViews={billsListView} />
}

export default React.memo(UserBillsRows)
