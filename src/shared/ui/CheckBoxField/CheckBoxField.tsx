import { FC } from 'react'

export const CheckBoxField: FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex justify-center items-center">
      <input type="checkbox" id="agree" className=" border-gray-400 rounded" />
      <label htmlFor="agree" className="ml-2 text-xs font-medium text-light-100">
        {text}
      </label>
    </div>
  )
}
