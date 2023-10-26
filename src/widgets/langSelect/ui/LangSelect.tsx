import { useMemo } from 'react'

import { useRouter } from 'next/router'
import Select, { components, OptionProps, SingleValueProps, StylesConfig } from 'react-select'

import { FlagRu, FlagUK } from '@/shared/assets'
import { useClient } from '@/shared/lib/hooks/useClient'

const { SingleValue, Option } = components

// @ts-ignore
const IconSingleValue = (props: SingleValueProps<Option_19, IsMulti_19, Group_19>) => (
  <SingleValue {...props}>
    {props.data.value === 'en' ? <FlagUK /> : <FlagRu />}
    <span className="sm:block hidden">{props.data.label}</span>
  </SingleValue>
)
// @ts-ignore
const IconOption = (props: OptionProps<Option_16, IsMulti_16, Group_16>) => (
  <Option {...props}>
    {props.data.value === 'en' ? <FlagUK /> : <FlagRu />}
    <span className="sm:block hidden">{props.data.label}</span>
  </Option>
)

type MyOptionType = {
  value: string
  label: string
}
type IsMulti = boolean
const customStyles: StylesConfig<MyOptionType, IsMulti> = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? 'var(--color-dark-500)' : 'var(--color-dark-700)',
    borderColor: 'white',
    borderRadius: 0,
    height: '36px',
  }),
  valueContainer: () => ({
    padding: '0',
    height: '30px',
  }),
  indicatorSeparator: baseStyles => ({
    ...baseStyles,
    display: 'none',
  }),
  // @ts-ignore
  dropdownIndicator: (baseStyles, state) => ({
    ...baseStyles,
    transition: 'all .2s ease',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
    color: 'var(--color-light-100)',
    '&:hover': { color: 'var(--color-light-200)' },
  }),
  menu: baseStyles => ({
    ...baseStyles,
    backgroundColor: 'var(--bg-opacity-100)',
    margin: 0,
    border: 'solid 1px white',
    borderRadius: 0,
    color: 'var(--color-light-100)',
    '&:hover': { color: 'var(--color-light-900)' },
  }),
  menuList: (baseStyles, state) => ({
    ...baseStyles,
    border: 'solid 1px white',
    color: state.selectProps.menuIsOpen ? 'var(--color-light-100)' : 'var(--color-light-900)',
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? 'var(--color-dark-500)' : 'var(--color-dark-700)',
    display: 'flex',
    flexDirection: 'row',
    gap: '12px',
    alignItems: 'center',
    fontSize: '1rem',
    color: 'var(--color-light-900)',
    '&:hover': { color: 'var(--color-accent-500)' },
    height: '30px',
  }),
  singleValue: baseStyles => ({
    ...baseStyles,
    marginLeft: '12px',
    display: 'flex',
    flexDirection: 'row',
    gap: '12px',
    alignItems: 'center',
    fontSize: '1rem',
    color: 'var(--color-light-100)',
    '&:hover': { color: 'var(--color-light-900)' },
    height: '30px',
  }),
}

function LangSelectWidget() {
  const { locale, push, pathname, query, asPath, locales, reload, events } = useRouter()

  const options: MyOptionType[] = useMemo(
    () =>
      (locales as string[]).map(l => ({
        value: l,
        label: l === 'en' ? 'English' : 'Русский',
      })),
    [locales]
  )
  const defaultValue: MyOptionType = useMemo(
    () => ({ value: locale as string, label: locale === 'en' ? 'English' : 'Русский' }),
    [locale]
  )

  const { isClient } = useClient()
  const changeLangHandler = (selectedOption: { value: string; label: string }) => {
    push({ pathname, query }, asPath, { locale: selectedOption.value })
    events.on('routeChangeComplete', () => {
      reload()
    })
  }

  return (
    <div>
      {isClient && (
        <Select
          styles={customStyles}
          defaultValue={defaultValue}
          // @ts-ignore
          onChange={changeLangHandler}
          options={options}
          components={{ SingleValue: IconSingleValue, Option: IconOption }}
        />
      )}
    </div>
  )
}

export { LangSelectWidget }
