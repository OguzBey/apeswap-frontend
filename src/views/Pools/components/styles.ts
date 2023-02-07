import { ThemeUIStyleObject } from 'theme-ui'

export const poolStyles: Record<
  | 'buttonsContainer'
  | 'container'
  | 'farmInfo'
  | 'aprInfo'
  | 'earnedColumn'
  | 'cardContent'
  | 'actionContainer'
  | 'expandedContent'
  | 'styledBtn'
  | 'smallBtn'
  | 'depositContainer'
  | 'columnView'
  | 'stakeActions'
  | 'harvestAllBtn'
  | 'apeHarder'
  | 'fixedSizedBtn'
  | 'onlyBigScreen'
  | 'onlyDesktop'
  | 'onlyMobile',
  ThemeUIStyleObject
> = {
  buttonsContainer: {
    justifyContent: 'space-around',
    width: '100%',
    display: ['none', 'none', 'flex'],
    maxWidth: ['', '', '90px'],
  },
  container: {
    position: 'relative',
    width: '100%',
  },
  farmInfo: {
    width: '100%',
    justifyContent: 'space-between',
    '@media screen and (min-width: 852px)': {
      maxWidth: '110px',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
  },
  aprInfo: {
    width: '100%',
    justifyContent: 'space-between',
    '@media screen and (min-width: 852px)': {
      maxWidth: '80px',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
  },
  earnedColumn: {
    width: '100%',
    justifyContent: 'space-between',
    '@media screen and (min-width: 852px)': {
      maxWidth: '150px',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
  },
  cardContent: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
    maxWidth: 'unset',
    '@media screen and (min-width: 852px)': {
      flexDirection: 'row',
    },
  },
  actionContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    mt: '10px',
    flexWrap: 'wrap',
    '@media screen and (min-width: 852px)': {
      mt: '0',
      flexDirection: 'row-reverse',
      justifyContent: 'space-around',
      flexWrap: 'nowrap',
    },
  },
  expandedContent: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '0 10px',
    justifyContent: 'space-between',
    '@media screen and (min-width: 852px)': {
      flexWrap: 'nowrap',
    },
  },
  styledBtn: {
    fontSize: '16px',
    padding: '10px',
    width: '140px',
    minWidth: '100px',
    height: '44px',
    '@media screen and (max-width: 852px)': {
      minWidth: '130px',
      width: '130px',
    },
    '&:disabled': {
      background: 'white4',
    },
  },
  smallBtn: {
    maxWidth: '60px',
    width: '100%',
    minWidth: '44px',
    height: '44px',
    '&:disabled': {
      background: 'white4',
    },
  },
  depositContainer: {
    width: '100%',
    maxWidth: '130px',
    justifyContent: 'center',
    alignItems: 'center',
    '@media screen and (min-width: 852px)': {
      maxWidth: '140px',
    },
  },
  columnView: {
    maxWidth: '50%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  stakeActions: {
    maxWidth: ['', '', '94px'],
    alignItems: 'center',
    width: '100%',
  },
  harvestAllBtn: {
    height: '36px',
    lineHeight: '18px',
    justifyContent: 'center',
    width: '100%',
    fontSize: '16px',
    '@media screen and (min-width: 852px)': {
      width: '180px',
    },
  },
  apeHarder: {
    fontSize: '16px',
    padding: '10px',
    minWidth: '125px',
    width: '125px',
    height: '44px',
    '@media screen and (max-width: 852px)': {
      minWidth: '130px',
      width: '100%',
    },
    '&:disabled': {
      background: 'white4',
    },
  },
  fixedSizedBtn: {
    fontSize: '16px',
    padding: '10px',
    minWidth: '125px',
    width: '125px',
    height: '44px',
    '@media screen and (max-width: 852px)': {
      minWidth: '130px',
      width: '130px',
    },
    '&:disabled': {
      background: 'white4',
    },
  },
  onlyBigScreen: {
    display: ['none', 'none', 'none', 'flex'],
  },
  onlyDesktop: {
    justifyContent: 'space-around',
    display: ['none', 'none', 'flex'],
  },
  onlyMobile: {
    flexDirection: 'column',
    display: ['flex', 'flex', 'none'],
  },
}

export const dynamicStyles: Record<'actionContainer', (isBananaBanana: boolean) => ThemeUIStyleObject> = {
  actionContainer: (isBananaBanana) => ({
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    mt: '10px',
    flexWrap: 'wrap',
    '@media screen and (min-width: 852px)': {
      mt: '0',
      flexDirection: 'row-reverse',
      justifyContent: 'space-around',
      flexWrap: 'nowrap',
      minWidth: isBananaBanana && '380px',
    },
  }),
}
