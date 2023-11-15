import { clsx } from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  BookMarkIcon,
  CreateIcon,
  CreatesIcon,
  FavoritesIcon,
  HomesIcon,
  IconBxHomeAlt,
  IconUser,
  IconUser2,
  LogOutIcon,
  MessangersIcon,
  MessengerIcon,
  SearchIcon,
  StatisticsIcon,
} from '../../assets'

import s from './Sidebar.module.scss'

import { useTranslation } from '@/shared/lib'
import { LogOutButton } from '@/widgets/logOut'

export const Sidebar = () => {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <div className={s.box}>
      <div className={s.contentBox}>
        <div className={s.marginTop}></div>
        <ul>
          <li>
            <Link href={'/'} className={s.content}>
              {router.pathname == '/' ? <HomesIcon /> : <IconBxHomeAlt />}
              <span className={router.pathname === '/' ? s.activeLink : ''}>{t.sidebar.home}</span>
            </Link>
          </li>
          <li>
            <Link href={'/create'} className={s.content}>
              {router.pathname === '/create' ? <CreatesIcon /> : <CreateIcon />}
              <span className={router.pathname === '/create' ? s.activeLink : ''}>
                {t.sidebar.create}
              </span>
            </Link>
          </li>
          <li>
            <Link href={'my-profile/general-information'} className={s.content}>
              {router.pathname.includes('/my-profile') ? <IconUser2 /> : <IconUser />}
              <span className={router.pathname.includes('/my-profile') ? s.activeLink : ''}>
                {t.sidebar.my_profile}
              </span>
            </Link>
          </li>
          <li>
            <Link href={'/messenger'} className={s.content}>
              {router.pathname === '/messenger' ? <MessangersIcon /> : <MessengerIcon />}
              <span className={router.pathname === '/messenger' ? s.activeLink : ''}>
                {t.sidebar.messenger}
              </span>
            </Link>
          </li>
          <li>
            <Link
              href={'/search'}
              className={
                router.pathname === '/search' ? clsx(s.activeLink, s.content) : clsx(s.content)
              }
            >
              <SearchIcon />
              {t.sidebar.search}
            </Link>
          </li>
        </ul>
        <div className={s.marginBox}></div>
        <ul>
          <li>
            <Link
              href={'/statistics'}
              className={
                router.pathname === '/statistics' ? clsx(s.activeLink, s.content) : s.content
              }
            >
              <StatisticsIcon /> {t.sidebar.statistics}
            </Link>
          </li>
          <li>
            <Link href={'/favorites'} className={clsx(s.content)}>
              {router.pathname === '/favorite' ? <BookMarkIcon /> : <FavoritesIcon />}
              <span className={router.pathname === '/favorite' ? s.activeLink : ''}>
                {t.sidebar.favorites}
              </span>
            </Link>
          </li>
        </ul>
        <div className={s.largeMargin}></div>
        <ul>
          <LogOutButton>
            <li className={s.content}>
              <LogOutIcon /> {t.sidebar.log_out}
            </li>
          </LogOutButton>
        </ul>
      </div>
    </div>
  )
}
