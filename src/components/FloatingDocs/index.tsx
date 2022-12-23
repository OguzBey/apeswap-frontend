/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Svg } from '@ape.swap/uikit'
import { FloatingDocsProps } from './types'
import { useHistory } from 'react-router-dom'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { NETWORK_LABEL } from '../../config/constants/chains'
import { DOC_LINKS, Farms, routeNames } from '../../config/constants'
import useIsMobile from '../../hooks/useIsMobile'

export const FloatingDocs: React.FC<FloatingDocsProps> = ({ iconProps, ...props }) => {
  const isMobile = useIsMobile()
  const history = useHistory()
  const { chainId } = useActiveWeb3React()
  const getDocsLink = () => {
    const { pathname } = history.location
    const networkLabel = NETWORK_LABEL[chainId]
    const farmTypes = Farms[networkLabel]
    DOC_LINKS['FARMS'] = `https://apeswap.gitbook.io/apeswap-finance/product-and-features/stake/farms/${farmTypes}`
    return DOC_LINKS[routeNames[pathname]]
  }

  return (
    <Flex
      sx={{
        position: 'fixed',
        right: ['20px', '20px', '35px'],
        bottom: ['20px', '20px', '30px'],
        zIndex: 5,
        cursor: 'pointer',
      }}
      onClick={() => window.open(getDocsLink(), '_blank')}
      {...props}
    >
      <Svg icon="docs" width={isMobile ? 40 : 50} color="primaryBright" {...iconProps} />
    </Flex>
  )
}

export default FloatingDocs
