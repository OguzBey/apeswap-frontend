/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import { Flex, TooltipBubble, InfoIcon, Svg } from '@ape.swap/uikit'
import { AnimatePresence, motion } from 'framer-motion'
import { ListCardContainer, styles } from './styles'
import { ListCardProps } from './types'

const MobileListCard: React.FC<ListCardProps> = ({
  serviceTokenDisplay,
  title,
  cardContent,
  expandedContent,
  infoContent,
}) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <ListCardContainer onClick={() => setExpanded((prev) => !prev)}>
        <Flex sx={{ width: '100%', justifyContent: 'space-between', my: '5px' }}>
          <Flex sx={{ ...styles.titleContainer }}>
            {serviceTokenDisplay}
            <Flex sx={{ flexDirection: 'column', marginLeft: '10px' }}>{title}</Flex>
          </Flex>
          <Flex sx={{ alignItems: 'center' }}>
            {infoContent && (
              <div style={{ display: 'inline-block' }}>
                <TooltipBubble body={infoContent} transformTip="translate(11%, 0%)" width="200px">
                  <InfoIcon width={'18px'} />
                </TooltipBubble>
              </div>
            )}
            {expandedContent && (
              <span style={{ marginLeft: '20px', transform: 'translate(0, -3px)' }}>
                <Svg icon="caret" direction={expanded ? 'up' : 'down'} width="10px" />
              </span>
            )}
          </Flex>
        </Flex>
        {cardContent && <Flex sx={styles.cardContentContainer}>{cardContent}</Flex>}
      </ListCardContainer>
      <AnimatePresence>
        {expandedContent && expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'fit-content' }}
            transition={{ delay: 0.2 }}
            exit={{ opacity: 0 }}
            sx={styles.animationDiv}
          >
            <Flex sx={styles.expandedWrapper}>{expandedContent}</Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default React.memo(MobileListCard)
