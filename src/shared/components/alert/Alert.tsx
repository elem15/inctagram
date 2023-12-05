import { ComponentProps, FC } from 'react'

import { motion } from 'framer-motion'
import { createPortal } from 'react-dom'

import { CloseIcon } from '../../assets/icons/CloseIcon'

import s from './Alert.module.scss'

type Props = {
  message?: null | string
  onClose?: () => void
  variant?: 'error' | 'info'
} & ComponentProps<'div'>
export const Alert: FC<Props> = ({ message, onClose, variant = 'error', ...rest }) => {
  if (message) {
    return createPortal(
      <div className={s.box}>
        <div className={s[variant]} {...rest}>
          <div className={s.content}>
            <motion.span animate={{ opacity: 1 }} className={s.text} initial={{ opacity: 0 }}>
              {message}
            </motion.span>
          </div>
          <motion.div
            animate={{ opacity: 1 }}
            className={s.icon}
            initial={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div whileHover={{ scale: 1.1 }}>
              <CloseIcon />
            </motion.div>
          </motion.div>
        </div>
      </div>,
      document.body
    )
  }
}
