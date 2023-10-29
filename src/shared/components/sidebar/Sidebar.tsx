import { clsx } from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import BookMarkIcon from '../../assets/icons/BookMarkIcon'
import CreateIcon from '../../assets/icons/CreateIcon'
import CreatesIcon from '../../assets/icons/CreateIcon2'
import FavoritesIcon from '../../assets/icons/FavoritesIcon'
import IconBxHomeAlt from '../../assets/icons/HomeIcon'
import Layer2 from '../../assets/icons/Layer2'
import LogOutIcon from '../../assets/icons/LogOut'
import MessengersIcon from '../../assets/icons/MessengerIcon'
import MessengerIcon from '../../assets/icons/MessengerIcon'
import IconUser from '../../assets/icons/MyProfileIcon'
import SearchsIcon from '../../assets/icons/SearchIcon'
import StatisticsIcon from '../../assets/icons/StatisticsIcon'
import IconUser2 from '../../assets/icons/UserIcon2'

import s from './Sidebar.module.scss'

export const Sidebar = () => {
  const router = useRouter()

  return (
    <div className={s.box} {...rest}>
      <div className={s.contentBox}>
        <ul>
          <li>
            <Link href={'#'} className={router.pathname === '/home' ? s.activeLink : s.content}>
              {router.pathname == '/home' ? <Layer2 /> : <IconBxHomeAlt />}
              <span className={router.pathname === '/home' ? s.activeLink : ''}>Home</span>
            </Link>
          </li>
          <li>
            <Link href={'#'} className={router.pathname === '/create' ? s.activeLink : s.content}>
              {router.pathname === '/create' ? <CreatesIcon /> : <CreateIcon />}
              <span className={router.pathname === '/create' ? s.activeLink : ''}> Create</span>
            </Link>
          </li>
          <li>
            <Link
              href={'my-profile'}
              className={
                router.pathname === '/my-profile' ? clsx(s.activeLink, s.content) : s.content
              }
            >
              {router.pathname === '/my-profile' ? <IconUser2 /> : <IconUser />}
              <span className={router.pathname === '/my-profile' ? s.activeLink : ''}>
                My Profile
              </span>
            </Link>
          </li>
          <li>
            <Link
              href={'#'}
              className={router.pathname === '/message' ? clsx(s.activeLink, s.content) : s.content}
            >
              {router.pathname === '/message' ? <MessengersIcon /> : <MessengerIcon />}
              <span className={router.pathname === 'message' ? s.activeLink : ''}>Messenger</span>
            </Link>
          </li>
          <li>
            <Link
              href={'#'}
              className={
                router.pathname === '/search'
                  ? clsx(s.activeLink, s.content, s.marginBox)
                  : s.content
              }
            >
              <SearchsIcon /> Search
            </Link>
          </li>
          <li>
            <Link
              href={'#'}
              className={
                router.pathname === '/statistics' ? clsx(s.activeLink, s.content) : s.content
              }
            >
              <StatisticsIcon /> Statistics
            </Link>
          </li>
          <li>
            <Link
              href={'#'}
              className={
                router.pathname === '/favorite'
                  ? clsx(s.activeLink, s.content, s.largeMargin)
                  : s.content
              }
            >
              {router.pathname === '/favorite' ? <BookMarkIcon /> : <FavoritesIcon />}
              <span className={router.pathname === '/favorite' ? s.activeLink : ''}>Favorites</span>
            </Link>
          </li>

          <li className={s.content}>
            <Link href={'signin'} className={s.content}>
              <LogOutIcon /> Log Out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
