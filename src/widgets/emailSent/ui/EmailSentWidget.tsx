import React, { FC } from 'react'

import { useRouter } from 'next/router'

import { CloseIcon } from '@/shared/assets'
import { useAppSelector, useTranslation } from '@/shared/model'

export const EmailSentWidget: FC = () => {
  const { t } = useTranslation()

  const { email } = useAppSelector(state => state.user)
  const router = useRouter()

  return (
    <div className="flex justify-center min-h-[calc(100vh-4rem)] w-screen items-center bg-dark-500 ">
      <div className="border border-dark-100 rounded-sm mx-auto sm:w-96 w-80 bg-dark-300 mb-10">
        <div>
          <div className="flex justify-between items-center px-3 sm:px-6 py-4">
            <h1 className=" text-light-100 font-bold text-xl ">{t.email.title}</h1>
            <button>
              <CloseIcon />
            </button>
          </div>
          <hr className="w full border-dark-100 " />
          <div className="px-8 mt-8">
            <p className="text-light-100 text-center mb-5">
              {t.email.message} {email}
            </p>
            <button
              onClick={() => router.push('/')}
              className="block px-10 mb-12  bg-primary-500   font-semibold text-light-100 p-2 rounded my-2 float-right"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
