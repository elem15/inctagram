import { FC } from 'react'

import s from './ProfileSettings.module.scss'

import { Button, TabsSwitcher, Typography } from '@/shared/components'
import { useTranslation } from '@/shared/lib'
import { GeneralInformation } from '@/widgets/profileSettings/generalInformation/GeneralInformation'

type Props = {}
export const ProfileSettings: FC<Props> = () => {
  const { t } = useTranslation()

  const tabsArgs = {
    tabs: [
      { label: 'General Information', value: '1' },
      { label: 'Devices', value: '2', disabled: true },
      { label: 'Account Managenment', value: '3', disabled: true },
      { label: 'My Payments', value: '4', disabled: true },
    ],
  }

  return (
    <div className={s.container}>
      <div className={s.tabsContainer}>
        <TabsSwitcher tabs={tabsArgs.tabs} />
      </div>
      <main className={s.mainContainer}>
        <div className={s.imagePicker}>
          <div>img</div>
          <Button variant={'outline'}>
            <Typography variant={'bold_text_14'}> Add a Profile Photo</Typography>
          </Button>
        </div>
        <GeneralInformation />
      </main>
      <div className={s.footerContainer}>
        <Button>
          <Typography variant={'bold_text_14'}>Save Changes</Typography>
        </Button>
      </div>
    </div>
  )
}
