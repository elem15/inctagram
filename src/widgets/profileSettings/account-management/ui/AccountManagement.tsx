import React, { MouseEventHandler, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import styles from './AccountManagement.module.scss'

import { useAppSelector } from '@/app/appStore'
import { selectSubscription, setTime } from '@/app/services/subscription-slice'
import { useSubscribeMutation } from '@/entities/subscription'
import { useGetPaymentsQuery } from '@/entities/subscription/api/subscriptionApi'
import { PayPal, Stripe } from '@/shared/assets'
import { Button, SuperCheckbox, Typography } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { RadioGr } from '@/shared/components/radio-group'
import { BASE_WORK_URL } from '@/shared/constants/ext-urls'
import { useAppDispatch, useFetchLoader, useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { calculateDates } from '@/shared/lib/utils/сalculateDates'
import { TabsLayout } from '@/widgets/layouts'

enum PERIOD {
  DAY = 1,
  WEEK = 7,
  MONTH = 30,
}

const Component = () => {
  const { t } = useTranslation()
  const [valueType, setValueType] = useState<ValueType>(t.account_type.personal as ValueType)
  const [valuePrice, setValuePrice] = useState<ValuePriceType>(t.subscription.day)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [isChecked, setChecked] = useState<boolean>(false)
  const [flag, setFlag] = useState<boolean>(false)
  const [periodDays, setPeriodDays] = useState<PERIOD>(PERIOD.DAY)
  const { accessToken } = useAuth()

  const [subscribe, { isLoading, isSuccess, isError }] = useSubscribeMutation()
  const { data: dataSub } = useGetPaymentsQuery({ accessToken } as UserAuthData)

  const router = useRouter()
  const dispatch = useAppDispatch()

  useFetchLoader(isLoading)

  const { subscriptionFrom, subscriptionTo } = useAppSelector(selectSubscription)

  const typeAccount = [
    { label: t.account_type.personal, value: t.account_type.personal },
    { label: t.account_type.business, value: t.account_type.business },
  ]

  const businessPrice = [
    { label: t.subscription.day, value: t.subscription.day },
    { label: t.subscription.week, value: t.subscription.week },
    { label: t.subscription.month, value: t.subscription.month },
  ]

  const data: DataType = {
    [t.subscription.day]: { amount: '10', period: 'DAY' },
    [t.subscription.week]: { amount: '50', period: 'WEEKLY' },
    [t.subscription.month]: { amount: '100', period: 'MONTHLY' },
  }

  const handlerSubscribe: MouseEventHandler<HTMLButtonElement> = async e => {
    const body = {
      typeSubscription: data[valuePrice].period,
      paymentType: e.currentTarget.name.toUpperCase(),
      amount: Number(data[valuePrice].amount),
      baseUrl: BASE_WORK_URL,
    }

    const result = await subscribe({
      body,
      accessToken,
    }).unwrap()

    window.open(result.url, '_blank')
    setOpenModal(true)
  }

  const onSuccess = () => {
    setOpenModal(false)
    setFlag(true)

    if (data[valuePrice].period === 'DAY') {
      setPeriodDays(PERIOD.DAY)
    } else if (data[valuePrice].period === 'WEEKLY') {
      setPeriodDays(PERIOD.WEEK)
    } else {
      setPeriodDays(PERIOD.MONTH)
    }

    dispatch(
      setTime({
        isSubscription: true,
        subscriptionFrom: new Date().toLocaleDateString(router.locale === 'en' ? 'en-EN' : 'ru-RU'),
        subscriptionTo: calculateDates(periodDays).toLocaleDateString(
          router.locale === 'en' ? 'en-EN' : 'ru-RU'
        ),
      })
    )
  }

  console.log(dataSub)

  useEffect(() => {
    setValueType(t.account_type.personal as ValueType)
    setValuePrice(t.subscription.day)
  }, [router.locale])

  return (
    <div className={styles.container}>
      {flag && (
        <div>
          <Typography variant={'h3'}>{t.current_subscription}:</Typography>
          <div className={`${styles.wrapper} ${styles.wrapperWithFlex}`}>
            <div className={styles.time}>
              <Typography className={styles.colorText}>{t.expire_at}</Typography>
              <Typography variant={'regular_text_16'}>{subscriptionFrom}</Typography>
            </div>
            <div className={styles.time}>
              <Typography className={styles.colorText}>{t.next_payment}</Typography>
              <Typography variant={'regular_text_16'}>{subscriptionTo}</Typography>
            </div>
          </div>
          <SuperCheckbox
            className={styles.checkbox}
            label={t.auto_renewal}
            checked={isChecked}
            onCheckedChange={() => setChecked(!isChecked)}
          />
        </div>
      )}
      <div>
        <Typography variant={'h3'}>{t.text_account}:</Typography>
        <div className={styles.wrapper}>
          <RadioGr
            onValueChange={value => setValueType(value as ValueType)}
            options={typeAccount}
            value={valueType}
          />
        </div>
      </div>

      {valueType === t.account_type.business && (
        <div className={styles.businessContainer}>
          <Typography variant={'h3'}>{t.text_subscription_costs}:</Typography>
          <div className={styles.wrapper}>
            <RadioGr
              onValueChange={value => setValuePrice(value as ValuePriceType)}
              options={businessPrice}
              value={valuePrice}
            />
          </div>
          <div className={styles.payPalAndStripe}>
            <Button onClick={handlerSubscribe} name="paypal">
              <PayPal className={styles.payPal} width={96} height={64} />
            </Button>
            <Typography>Or</Typography>
            <Button onClick={handlerSubscribe} name="stripe">
              <Stripe width={96} height={64} />
            </Button>
          </div>
        </div>
      )}
      {isSuccess && openModal ? (
        <Modal size={'sm'} open={openModal} title={t.text_success}>
          <Typography variant={'regular_text_16'}>{t.payment_success}</Typography>
          <Button className={styles.successButton} fullWidth onClick={onSuccess}>
            <Typography variant={'h3'}>{t.button_ok}</Typography>
          </Button>
        </Modal>
      ) : null}
      {isError && openModal ? (
        <Modal size={'sm'} open={openModal} title={t.text_error}>
          <Typography variant={'regular_text_16'}>{t.transaction_failed}</Typography>
          <Button className={styles.successButton} fullWidth onClick={onSuccess}>
            <Typography variant={'h3'}>{t.button_back}</Typography>
          </Button>
        </Modal>
      ) : null}
    </div>
  )
}

export const AccountManagement = () => {
  return (
    <TabsLayout>
      <Component />
    </TabsLayout>
  )
}
