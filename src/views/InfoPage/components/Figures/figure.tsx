/** @jsxImportSource theme-ui */
import { Flex } from '@ape.swap/uikit'
import React from 'react'
import useTheme from '../../../../hooks/useTheme'
import { FigureWrapper, IconBox, CenteredImage } from '../styles'
import { Text } from '@apeswapfinance/uikit'

interface FigureProps {
  label: string
  icon: string
  value: string
  highlighted?: boolean
  onClick?: () => void
  clickable?: boolean
}

const Icon = ({ name }: { name: string }) => {
  const { isDark } = useTheme()

  return (
    <IconBox>
      <CenteredImage src={`/images/info/${name}-${isDark ? 'dark' : 'light'}.svg`} alt={name} />
    </IconBox>
  )
}

const Figure: React.FC<FigureProps> = (props) => {
  return (
    <Flex
      sx={{
        flex: '1 0 30%',
      }}
    >
      <FigureWrapper
        className={
          props.highlighted === true
            ? props.clickable === true
              ? 'highlighted clickable'
              : 'highlighted'
            : props.clickable === true
            ? 'clickable'
            : ''
        }
        onClick={props.onClick}
      >
        <Icon name={props.icon} />
        <Text className="value">{props.value}</Text>
        <Text fontSize="12px"> {props.label}</Text>
      </FigureWrapper>
    </Flex>
  )
}

export default Figure
