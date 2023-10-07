'use client'
import { useEffect, useMemo, useState } from 'react'

import { useRouter } from 'next/router'
import Select, { components } from 'react-select'

const { SingleValue, Option } = components

import { FlagRu, FlagUK } from '@/shared/assets'

const IconSingleValue = props => (
  <SingleValue {...props}>
    {props.data.value === 'en' ? <FlagUK /> : <FlagRu />}
    {props.data.label}
  </SingleValue>
)
const IconOption = props => (
  <Option {...props}>
    {props.data.value === 'en' ? <FlagUK /> : <FlagRu />}
    {props.data.label}
  </Option>
)

const customStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? '#171717' : 'rgb(13 13 13)',
    borderColor: 'white',
    borderRadius: 0,
    width: '163px',
    height: '36px',
  }),
  valueContainer: (baseStyles, state) => ({
    background: 'rgba(0, 0, 0, 0)',
    padding: '0',
    height: '30px',
  }),
  indicatorSeparator: (baseStyles, state) => ({
    ...baseStyles,
    display: 'none',
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    transition: 'all .2s ease',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
  }),
  menu: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? '#171717' : 'rgb(13 13 13)',
    margin: 0,
    border: 'solid 1px white',
    borderRadius: 0,
  }),
  menuList: (baseStyles, state) => ({
    ...baseStyles,
    border: 'solid 1px white',
    backgroundColor: state.isFocused ? '#171717' : 'rgb(13 13 13)',
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? '#171717' : 'rgb(13 13 13)',
    display: 'flex',
    flexDirection: 'row',
    gap: '12px',
    alignItems: 'center',
    fontSize: '1rem',
    color: 'white',
    height: '30px',
  }),
  singleValue: (baseStyles, state) => ({
    ...baseStyles,
    background: 'rgba(0, 0, 0, 0)',
    marginLeft: '12px',
    display: 'flex',
    flexDirection: 'row',
    gap: '12px',
    alignItems: 'center',
    fontSize: '1rem',
    color: 'white',
    height: '30px',
  }),
}

export const LangSelectWidget = () => {
  const { locale, push, pathname, query, asPath, locales } = useRouter()

  const options = useMemo(
    () =>
      (locales as string[]).map(l => ({
        value: l,
        label: l === 'en' ? 'English' : 'Русский',
      })),
    [locales]
  )
  const defaultValue = useMemo(
    () => ({ value: locale as string, label: locale === 'en' ? 'English' : 'Русский' }),
    [locale]
  )

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const changeLangHandler = (selectedOption: { value: string; label: string }) => {
    push({ pathname, query }, asPath, { locale: selectedOption.value })
  }

  return (
    <div>
      {isClient && (
        <Select
          style={{ backgroundColor: 'black' }}
          styles={customStyles}
          defaultValue={defaultValue}
          onChange={changeLangHandler}
          options={options}
          components={{ SingleValue: IconSingleValue, Option: IconOption }}
        />
      )}
    </div>
  )
}
