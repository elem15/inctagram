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

export const Sidebar = () => {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <div className={s.box}>
      <div className={s.contentBox}>
        <ul>
          <li>
            <Link href={'#'} className={s.content}>
              {router.pathname == '/home' ? <HomesIcon /> : <IconBxHomeAlt />}
              <span className={router.pathname === '/home' ? s.activeLink : ''}>
                {t.sidebar.home}
              </span>
            </Link>
          </li>
          <li>
            <Link href={'#'} className={s.content}>
              {router.pathname === '/create' ? <CreatesIcon /> : <CreateIcon />}
              <span className={router.pathname === '/create' ? s.activeLink : ''}>
                {t.sidebar.create}
              </span>
            </Link>
          </li>
          <li>
            <Link href={'my-profile'} className={s.content}>
              {router.pathname === '/my-profile' ? <IconUser2 /> : <IconUser />}
              <span className={router.pathname === '/my-profile' ? s.activeLink : ''}>
                {t.sidebar.my_profile}
              </span>
            </Link>
          </li>
          <li>
            <Link href={'#'} className={s.content}>
              {router.pathname === '/messenger' ? <MessangersIcon /> : <MessengerIcon />}
              <span className={router.pathname === '/messenger' ? s.activeLink : ''}>
                {t.sidebar.messenger}
              </span>
            </Link>
          </li>
          <li>
            <Link
              href={'#'}
              className={
                router.pathname === '/search'
                  ? clsx(s.activeLink, s.content, s.marginBox)
                  : clsx(s.content, s.marginBox)
              }
            >
              <SearchIcon />
              {t.sidebar.search}
            </Link>
          </li>
          <li>
            <Link
              href={'#'}
              className={
                router.pathname === '/statistics' ? clsx(s.activeLink, s.content) : s.content
              }
            >
              <StatisticsIcon /> {t.sidebar.statistics}
            </Link>
          </li>
          <li>
            <Link href={'#'} className={clsx(s.content, s.largeMargin)}>
              {router.pathname === '/favorite' ? <BookMarkIcon /> : <FavoritesIcon />}
              <span className={router.pathname === '/favorite' ? s.activeLink : ''}>
                {t.sidebar.favorites}
              </span>
            </Link>
          </li>

          <li className={s.content}>
            <Link href={'signin'} className={s.content}>
              <LogOutIcon /> {t.sidebar.log_out}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
