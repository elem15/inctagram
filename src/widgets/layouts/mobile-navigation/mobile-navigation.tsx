import { clsx } from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './mobile-navigation.module.scss'

import {
  CreateIcon,
  CreatesIcon,
  HomesIcon,
  IconBxHomeAlt,
  IconUser,
  IconUser2,
  MessangersIcon,
  MessengerIcon,
  SearchIcon,
} from '@/shared/assets'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { AddPostModal, useGeneralInputRefForPost } from '@/widgets/addPostModal/AddPostModal'

export default function BottomNavigation() {
  const router = useRouter()
  const { isOpen, openModal, closeModal } = useModal()
  const { inputRef } = useGeneralInputRefForPost()

  const handleCLickCreate = () => {
    openModal()
  }
  const handleClosePostModal = () => {
    inputRef && closeModal()
  }

  return (
    <>
      <div className="lg:hidden fixed z-30 bg-dark-700 border-t-2 border-dark-300 -bottom-0.5 flex items-center justify-between shadow-bottomNavigation body-font bg-brand-light w-full h-20 px-12 text-brand-muted pb-0.5">
        <Link href={'/home'} className={s.content}>
          {router.pathname == '/home' ? <HomesIcon /> : <IconBxHomeAlt />}
        </Link>

        <AddPostModal closePostModal={handleClosePostModal} openPostModal={isOpen} />
        <div onClick={handleCLickCreate} className={s.content} style={{ cursor: 'pointer' }}>
          {isOpen ? <CreatesIcon /> : <CreateIcon />}
        </div>

        <Link href={'/messenger'} className={s.content}>
          {router.pathname === '/messenger' ? <MessangersIcon /> : <MessengerIcon />}
        </Link>
        <Link
          href={'/search'}
          className={
            router.pathname === '/search' ? clsx(s.activeLink, s.content) : clsx(s.content)
          }
        >
          <SearchIcon />
        </Link>
        <Link href={'/my-profile'} className={s.content}>
          {router.pathname === '/my-profile' && !isOpen ? <IconUser2 /> : <IconUser />}
        </Link>
      </div>
    </>
  )
}
