import React from 'react'
import { useModal } from '@ape.swap/uikit'
import { Bills } from 'state/types'
import BuyBillModalView from './BuyBillModalView'
import { StyledButton } from '../styles'
import UserBillModalView from './UserBillModalView'
import { BillsImage } from '../UserBillsView/styles'
import WarningModal from './WarningModal'
import ReflectModal from './ReflectModal'

const REFLECT_BONDS = ['NOOT']

interface BillModalProps {
  bill: Bills
  buttonText?: string
  id?: number
  billId?: string
  buttonSize?: string
  buyFlag?: boolean
  billCardImage?: string
  disabled?: boolean
}

const BillModal: React.FC<BillModalProps> = ({
  buttonText,
  bill,
  id,
  buttonSize,
  buyFlag,
  billId,
  billCardImage,
  disabled,
}) => {
  const [onPresentBuyBillsModal] = useModal(
    <BuyBillModalView bill={bill} onDismiss={null} />,
    true,
    true,
    `billsModal${id}`,
  )
  const [onPresentUserBillModal] = useModal(
    <UserBillModalView bill={bill} billId={billId} onDismiss={null} />,
    true,
    true,
    `billsModal${bill.billNftAddress}-${billId}`,
  )
  const [onPresentBuyWarning] = useModal(
    <WarningModal bill={bill} onDismiss={null} />,
    true,
    true,
    `billsWarningModal${id}`,
  )
  const [onPresentReflectModal] = useModal(
    <ReflectModal bill={bill} onDismiss={null} />,
    true,
    true,
    `billsReflectWarningModal${id}`,
  )
  return !billCardImage ? (
    <StyledButton
      onClick={
        buyFlag
          ? REFLECT_BONDS.includes(bill?.earnToken.symbol)
            ? onPresentReflectModal
            : parseFloat(bill?.discount) < 0
            ? onPresentBuyWarning
            : onPresentBuyBillsModal
          : onPresentUserBillModal
      }
      buttonSize={buttonSize}
      disabled={disabled}
    >
      {buttonText}
    </StyledButton>
  ) : (
    <BillsImage image={billCardImage} onClick={onPresentUserBillModal} style={{ cursor: 'pointer' }} />
  )
}

export default React.memo(BillModal)
