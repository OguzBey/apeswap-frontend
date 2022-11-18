/** @jsxImportSource theme-ui */
import { Button, Flex, Text } from '@ape.swap/uikit'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import { AVAILABLE_CHAINS_ON_PRODUCTS, CHAIN_PARAMS, NETWORK_LABEL } from 'config/constants/chains'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useSwitchNetwork from 'hooks/useSelectNetwork'
import React from 'react'
import MonkeyImage from 'views/Dex/Orders/components/OrderHistoryPanel/MonkeyImage'
import { BillsView } from '../../index'

export enum EmptyComponentType {
  USER_BILLS,
  AVAILABLE_BILLS,
  NO_RESULTS,
}

interface EmptyListComponentProps {
  type?: EmptyComponentType
  handleBillsViewChange?: (view: BillsView) => void
}

const EmptyListComponent: React.FC<EmptyListComponentProps> = ({ type, handleBillsViewChange }) => {
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const { switchNetwork } = useSwitchNetwork()
  const eligibleChains = AVAILABLE_CHAINS_ON_PRODUCTS['bills'].filter((chain) => chain !== chainId)

  return (
    <Flex
      sx={{
        width: '100%',
        background: 'white2',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
      }}
    >
      <Flex sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '50px 20px' }}>
        <MonkeyImage />
        <Flex sx={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
          <Text color="gray">
            {type === EmptyComponentType.AVAILABLE_BILLS &&
              t(`All Treasury Bills on ${NETWORK_LABEL[chainId]} are sold out.`)}
            {type === EmptyComponentType.USER_BILLS && t(`You don't have any bills`)}
            {type === EmptyComponentType.NO_RESULTS && t('No results found')}
          </Text>
        </Flex>
        <Text size="12px" sx={{ marginTop: '15px', opacity: '.5', textAlign: 'center' }}>
          {type === EmptyComponentType.AVAILABLE_BILLS && t('Switch to: ')}
          {type === EmptyComponentType.USER_BILLS && t('Click below to purchase your first bill')}
        </Text>
        <Flex sx={{ mt: '5px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
          {type === EmptyComponentType.AVAILABLE_BILLS &&
            eligibleChains.map((chainId) => {
              return (
                <Flex
                  key={chainId}
                  sx={{
                    padding: '5px 10px',
                    background: 'white3',
                    alignItems: 'center',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    margin: '5px 5px',
                  }}
                  onClick={() => switchNetwork(chainId)}
                >
                  <ServiceTokenDisplay token1={CHAIN_PARAMS[chainId].nativeCurrency.symbol} size={22.5} />
                  <Text ml="10px">{NETWORK_LABEL[chainId]}</Text>
                </Flex>
              )
            })}
          {type === EmptyComponentType.USER_BILLS && (
            <Button onClick={() => handleBillsViewChange(BillsView.AVAILABLE_BILLS)} sx={{ marginTop: '10px' }}>
              {t('See bills')}
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default EmptyListComponent
