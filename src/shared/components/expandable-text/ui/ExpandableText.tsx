import { FC } from 'react'

import s from './ExpandableText.module.scss'

export type ExpandableTextProps = {
  children: string
  descriptionLength?: number
  isExpanded: boolean
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

export const ExpandableText: FC<ExpandableTextProps> = ({
  children,
  descriptionLength,
  setIsExpanded,
  isExpanded,
}) => {
  const fullText = children

  const toggleText = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <p className={s.text}>
      {isExpanded ? fullText : `${fullText?.slice(0, descriptionLength)}...`}
      <span onClick={toggleText} className={s.toggleButton}>
        {isExpanded ? 'Hide' : 'Show more'}
      </span>
    </p>
  )
}
