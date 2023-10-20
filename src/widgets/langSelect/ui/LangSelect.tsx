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
    backgroundColor: state.isFocused ? '#171717' : 'rgb(13 13 13)',
    borderColor: 'white',
    borderRadius: 0,
    height: '36px',
  }),
  valueContainer: () => ({
    background: 'rgba(0, 0, 0, 0)',
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
    color: 'white',
    '&:hover': { color: 'lightgray' },
  }),
  menu: (baseStyles, state) => ({
    ...baseStyles,
    // @ts-ignore
    backgroundColor: state.isFocused ? '#171717' : 'rgb(13 13 13)',
    margin: 0,
    border: 'solid 1px white',
    borderRadius: 0,
  }),
  menuList: (baseStyles, state) => ({
    ...baseStyles,
    border: 'solid 1px white',
    // @ts-ignore
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
  singleValue: baseStyles => ({
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

function LangSelectWidget() {
  const { locale, push, pathname, query, asPath, locales } = useRouter()

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
