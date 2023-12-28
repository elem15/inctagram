import React from 'react'

import { Button, Typography } from '@/shared/components'
import { Modal } from '@/shared/components/modals'

type Props = {
  openCloseCrop: boolean
  closeCrop: () => void
  onDiscard: () => void
}
export const CloseCrop = ({ openCloseCrop, closeCrop, onDiscard }: Props) => {
  return (
    <Modal open={openCloseCrop} size={'sm'} title={'Close'} onClose={closeCrop}>
      <>
        <Typography variant={'regular_text_16'}>
          Do you really want to close the creation of a publication? If you close everything will be
          deleted
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '18px' }}>
          <Button variant={'outline'} onClick={() => onDiscard()}>
            Discard
          </Button>
          <Button>Save draft</Button>
        </div>
      </>
    </Modal>
  )
}
