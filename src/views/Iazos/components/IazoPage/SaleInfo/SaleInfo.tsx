import React, { useState } from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import { Iazo } from 'state/types'
import Presale from './Presale'
import InfoTab from './InfoTab'
import About from './About'

interface SaleInfoProps {
  iazo: Iazo
}

const SaleInfoWrapper = styled.div`
  display: flex;
  height: 60px;
  width: 796px;
  margin-top: 25px;
  background: #333333;
  border-radius: 10px;
`

const Tab = styled.div<{ active: boolean; borderRadius?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 265.33px;
  height: 60px;
  font-size: 24px;
  color: white;
  cursor: pointer;
  border-bottom: ${(props) => props.active && '2.5px solid rgba(255, 179, 0, 1)'};
  background-color: ${(props) => (props.active ? 'rgba(65, 65, 65, 1)' : '#333333')};
  border-radius: ${(props) => props.borderRadius};
};
`

const SaleInfo: React.FC<SaleInfoProps> = ({ iazo }) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(1)
  const renderTabComponent = () => {
    if (currentTabIndex === 0) {
      return <Presale />
    }
    if (currentTabIndex === 1) {
      return <InfoTab iazo={iazo} />
    }
    return <About />
  }
  return (
    <>
      <SaleInfoWrapper>
        <Tab onClick={() => setCurrentTabIndex(0)} active={currentTabIndex === 0} borderRadius="10px 0px 0px 0px">
          Presale
        </Tab>
        <Tab onClick={() => setCurrentTabIndex(1)} active={currentTabIndex === 1}>
          Info
        </Tab>
        <Tab onClick={() => setCurrentTabIndex(2)} active={currentTabIndex === 2} borderRadius="0px 10px 0px 0px">
          About
        </Tab>
      </SaleInfoWrapper>
      {renderTabComponent()}
    </>
  )
}

export default SaleInfo
