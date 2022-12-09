import React from 'react'
import { CSSProperties } from 'theme-ui'

export interface ListViewProps {
  tokens?: { token1: string; token2: string; token3?: string; token4?: string }
  id?: string | number
  title: React.ReactNode //
  infoContent?: React.ReactNode //
  infoContentPosition?: string //
  cardContent: React.ReactNode //
  expandedContent?: React.ReactNode //
  expandedContentSize?: number //
  billArrow?: boolean //
  stakeLp?: boolean //
  earnLp?: boolean //
  titleContainerWidth?: number //
  toolTipIconWidth?: string //
  toolTipStyle?: CSSProperties //
  ttWidth?: string //
  noEarnToken?: boolean //
}

export interface ListCardProps extends ListViewProps {
  serviceTokenDisplay: React.ReactNode
}

export interface ListViewContentProps {
  tag?: LpTypeVariants
  title?: string
  value: string
  value2?: string
  value2Secondary?: boolean
  valueIcon?: React.ReactNode
  value2Icon?: React.ReactNode
  toolTip?: string
  aprCalculator?: React.ReactNode
  toolTipPlacement?: 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft'
  toolTipTransform?: string
  valueColor?: string
  style: any
  valuesDirection?: 'column' | 'row'
}

export enum LpTypeVariants {
  APE = 'ape',
  UNI = 'uni',
}
