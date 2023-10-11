import React, { FC } from 'react'

import { useRouter } from 'next/router'

import { CloseIcon } from '@/shared/assets'
import { useAppSelector, useTranslation } from '@/shared/model'

export const EmailSentWidget: FC = () => {
  const { t } = useTranslation()

  const { email } = useAppSelector(state => state.user)
  const router = useRouter()

  return (
    <div className=" border border-dark-100 rounded-sm mx-auto w-96 bg-dark-300">
      <div>
        <div className="flex justify-between items-center px-8 py-4">
          <h3 className=" text-light-100 font-bold text-xl ">{t.email.title}</h3>
          <button>
            <CloseIcon />
          </button>
        </div>
        <hr className="w full border-dark-100 " />
        <div className="px-8 mt-8">
          <p className="text-light-100">We have sent a link to confirm your email to {email}</p>
          <button
            onClick={() => router.push('/')}
            className="block px-10 mb-12  bg-primary-500   font-semibold text-light-100 p-2 rounded  my-2 float-right"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}
