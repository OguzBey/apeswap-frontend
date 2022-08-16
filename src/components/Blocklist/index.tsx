import { Flex, Text } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React, { ReactNode, useMemo } from 'react'

const BLOCKED_ADDRESSES: string[] = [
  '0x7Db418b5D567A4e0E8c59Ad71BE1FcE48f3E6107',
  '0x72a5843cc08275C8171E582972Aa4fDa8C397B2A',
  '0x7F19720A857F834887FC9A7bC0a0fBe7Fc7f8102',
  '0xA7e5d5A720f06526557c513402f2e6B5fA20b008',
  '0x1da5821544e25c636c1417Ba96Ade4Cf6D2f9B5A',
  '0x9F4cda013E354b8fC285BF4b9A60460cEe7f7Ea9',
  '0x19Aa5Fe80D33a56D56c78e82eA5E50E5d80b4Dff',
  '0x2f389cE8bD8ff92De3402FFCe4691d17fC4f6535',
  '0xe7aa314c77F4233C18C6CC84384A9247c0cf367B',
  '0x7F367cC41522cE07553e823bf3be79A889DEbe1B',
  '0xd882cFc20F52f2599D84b8e8D58C7FB62cfE344b',
  '0x901bb9583b24D97e995513C6778dc6888AB6870e',
  '0x8576aCC5C05D6Ce88f4e49bf65BdF0C62F91353C',
  '0xC8a65Fadf0e0dDAf421F28FEAb69Bf6E2E589963',
  '0x308eD4B7b49797e1A98D3818bFF6fe5385410370',
  '0x67d40EE1A85bf4a4Bb7Ffae16De985e8427B',
  '0x6f1ca141a28907f78ebaa64fb83a9088b02a83',
  '0x6acdfba02d390b97ac2b2d42a63e85293bcc1',
  '0x48549a34ae37b12f6a30566245176994e17c6',
  '0x5512d943ed1f7c8a43f3435c85f7ab68b30121',
  '0xC455f7fd3e0e12afd51fba5c106909934D8A0e4a',
  '0x3CBdeD43EFdAf0FC77b9C55F6fC9988fCC9b757d',
  '0x67d40EE1A85bf4a4Bb7Ffae16De985e8427B6b45',
  '0x6F1cA141A28907F78Ebaa64fb83A9088b02A8352',
  '0x6aCDFBA02D390b97Ac2b2d42A63E85293BCc160e',
  '0x48549a34ae37b12f6a30566245176994e17c6b4a',
  '0x5512d943ed1f7c8a43f3435c85f7ab68b30121b0',
  '0xC455f7fd3e0e12afd51fba5c106909934D8A0e4a',
  '0x629e7Da20197a5429d30da36E77d06CdF796b71A',
  '0x7FF9cFad3877F21d41Da833E2F775dB0569eE3D9',
  '0x098B716B8Aaf21512996dC57EB0615e2383E2f96',
  '0xfEC8A60023265364D066a1212fDE3930F6Ae8da7',
  '0xf681Bd57804a83c0FA37F773e37e78FAc229f783',
]

export default function Blocklist({ children }: { children: ReactNode }) {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const blocked: boolean = useMemo(() => Boolean(account && BLOCKED_ADDRESSES.indexOf(account) !== -1), [account])
  if (blocked) {
    return (
      <Flex>
        <Text>{t('Blocked address')}</Text>
      </Flex>
    )
  }
  return <>{children}</>
}
