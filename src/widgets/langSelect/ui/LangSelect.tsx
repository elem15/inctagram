'use client'
import { ChangeEvent, useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import { FlagRu, FlagUK } from '@/shared/assets'

export const English = () => {
  return (
    <div className="flex text-base justify-items-center items-baseline">
      <Image src="/icons/FlagUnitedKingdom.png" alt="" width={20} height={20} />
      {/* <FlagUK /> */}
      <span>English</span>
    </div>
  )
}
export const Russian = () => {
  return (
    <div className="flex text-base justify-items-center items-baseline">
      {/* <Image src="/icons/FlagUnitedKingdom.png" alt="" width={20} height={20} /> */}
      <FlagRu />
      <span>Русский</span>
    </div>
  )
}

export const LangSelectWidget = () => {
  const { locale, push, pathname, query, asPath, locales } = useRouter()

  const changeLangHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const locale = event.currentTarget.value

    push({ pathname, query }, asPath, { locale })
  }
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="flex text-base justify-between items-center w-40 h-8 border border-light-500 px-2 py-2">
      {locale === 'en' ? <FlagUK /> : <FlagRu />}
      {isClient && (
        <select
          onChange={changeLangHandler}
          defaultValue={locale}
          className="bg-black text-base border-collapse w-28"
        >
          {locales?.map(l => {
            return (
              <option value={l} key={l}>
                {l === 'en' ? <English /> : <Russian />}
              </option>
            )
          })}
        </select>
      )}
    </div>
  )
}
