import React, { FC } from 'react'

import { selectAuthUser } from '@/entities/auth/model/authSlice'
import { CloseIcon } from '@/shared/assets'
import { useAppSelector, useTranslation } from '@/shared/lib'

export const EmailSentPopUpWidget: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { t } = useTranslation()

  const { email } = useAppSelector(selectAuthUser)

  return (
    <div
      onClick={onClose}
      className="fixed left-0 top-0 flex justify-center h-screen w-screen items-center bg-dark-500 bg-opacity-60"
    >
      <div
        onClick={e => {
          e.stopPropagation()
        }}
        className="border border-dark-100 rounded-sm mx-auto sm:w-96 w-80 bg-dark-300 mb-10"
      >
        <div>
          <div className="flex justify-between items-center pl-3 sm:pl-6">
            <h1 className=" text-light-100 font-bold text-xl ">{t.email.title}</h1>
            <button className="m-6" onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <hr className="w full border-dark-100 " />
          <div className="px-2 sm:px-6 mt-8">
            <p className="text-light-100 text-center sm:text-left mb-5">
              {t.email.message} {email}
            </p>
            <div className="w-full flex justify-center sm:justify-end gap-5">
              <button
                onClick={onClose}
                className="px-10 mb-12 bg-primary-500 font-semibold text-light-100 p-2 rounded my-2"
              >
                {t.email.yes}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
