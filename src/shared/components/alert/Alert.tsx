import { ComponentProps, FC, ReactNode, useState } from 'react'

import { motion } from 'framer-motion'

import { CloseIcon } from '../../assets/icons/CloseIcon'

import s from './Alert.module.scss'

type Props = {
  children: ReactNode
  variant: 'error' | 'info'
} & ComponentProps<'div'>
export const Alert: FC<Props> = ({ children, variant, ...rest }) => {
  const [open, setOpen] = useState(true)

  if (open) {
    return (
      <div className={s.box}>
        <div className={s[variant]} {...rest}>
          <div className={s.content}>
            <motion.span animate={{ opacity: 1 }} className={s.text} initial={{ opacity: 0 }}>
              {children}
            </motion.span>
          </div>
          <motion.div
            animate={{ opacity: 1 }}
            className={s.icon}
            initial={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div whileHover={{ scale: 1.1 }}>
              <CloseIcon />
            </motion.div>
          </motion.div>
        </div>
      </div>
    )
  }
}
