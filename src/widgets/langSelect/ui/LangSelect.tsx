import { ChangeEvent } from 'react'

import { useRouter } from 'next/router'

export const LangSelectWidget = () => {
  const { locale, push, pathname, query, asPath, locales } = useRouter()

  const changeLangHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const locale = event.currentTarget.value

    push({ pathname, query }, asPath, { locale })
  }

  return (
    <select onChange={changeLangHandler} defaultValue={locale} className="bg-black">
      {locales?.map(l => {
        return (
          <option value={l} key={l}>
            {l}
          </option>
        )
      })}
    </select>
  )
}
