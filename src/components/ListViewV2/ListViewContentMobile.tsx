/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, HelpIcon, ListTag, ListTagVariants, Skeleton, Text } from '@ape.swap/uikit'
import { TooltipBubble } from '@ape.swap/uikit'
import { TitleText, ValueSkeleton } from '../ListViewContent/styles'
import { useTranslation } from '../../contexts/Localization'
import { styles } from './styles'

interface ListViewContentMobileProps {
  tag?: ListTagVariants
  title?: string
  value: string
  valueColor?: string
  toolTip?: string
  toolTipPlacement?: 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft'
  toolTipTransform?: string
  value2?: string
  value2Secondary?: boolean
  aprCalculator?: React.ReactNode
  style?: any
  flexDirection?: 'column' | 'row'
}

const ListViewContentMobile: React.FC<ListViewContentMobileProps> = ({
  tag,
  title,
  value,
  valueColor,
  toolTip,
  toolTipPlacement,
  toolTipTransform,
  value2,
  value2Secondary,
  style,
  flexDirection = 'column',
  aprCalculator,
}) => {
  const { t } = useTranslation()
  return (
    <Flex style={{ ...style, ...styles.listViewContainer }}>
      <>
        {toolTip ? (
          <TooltipBubble
            placement={toolTipPlacement}
            transformTip={toolTipTransform}
            body={<Flex>{t(`${toolTip}`)}</Flex>}
            width="180px"
          >
            <TitleText lineHeight={null} sx={{ display: 'flex' }}>
              {t(`${title}`)}
              <HelpIcon width="12px" ml="5px" />
            </TitleText>
          </TooltipBubble>
        ) : (
          <Flex sx={{ alignItems: 'center' }}>
            {tag ? <ListTag variant={tag} {...{ sx: { mr: '5px' } }} /> : <Text sx={styles.titleText}>{title}</Text>}
            {aprCalculator}
          </Flex>
        )}
      </>
      <Flex>
        <Text sx={{ ...styles.valueText, color: valueColor, mr: '5px' }}>
          {value.includes('NaN') || value.includes('undefined') || value.includes('null') ? <ValueSkeleton /> : value}
        </Text>
        {value2 && (
          <Text sx={value2Secondary ? styles.secondaryText : styles.valueText}>
            {value2.includes('NaN') || value2.includes('undefined') || value.includes('null') ? (
              <Skeleton sx={styles.skeleton} />
            ) : (
              value2
            )}
          </Text>
        )}
      </Flex>
    </Flex>
  )
}

export default React.memo(ListViewContentMobile)
