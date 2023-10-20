import { FC } from 'react'

import s from './TermsOfService.module.scss'

import { BackIcon } from '@/shared/assets/icons/BackIcon'
import { Button, Typography } from '@/shared/components'
type Props = {
  onBackToSignUpClick: () => void
}
export const TermsOfService: FC<Props> = ({ onBackToSignUpClick }) => {
  return (
    <div>
      <div className={s.backButtonContainer}>
        <Button variant={'link'} onClick={onBackToSignUpClick} style={{ color: '#FFF' }}>
          <BackIcon /> Back to Sign Up
        </Button>
      </div>

      <div>
        <div className={s.title}>
          <Typography variant={'h1'}>Terms of Service</Typography>
        </div>
        <div className={s.textContainer}>
          <Typography variant={'regular_text_14'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Fames ac turpis egestas integer eget
            aliquet nibh. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Tortor
            vitae purus faucibus ornare suspendisse sed nisi. Dolor sit amet consectetur adipiscing.
            Massa enim nec dui nunc mattis enim ut tellus. Scelerisque eleifend donec pretium
            vulputate sapien nec sagittis. Feugiat nisl pretium fusce id velit ut tortor pretium
            viverra. Tortor aliquam nulla facilisi cras. Elit pellentesque habitant morbi tristique
            senectus et netus. Nulla facilisi nullam vehicula ipsum a arcu cursus. Ut lectus arcu
            bibendum at varius vel pharetra. Etiam erat velit scelerisque in dictum non consectetur.
            Quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Id diam maecenas
            ultricies mi eget mauris pharetra. Tincidunt lobortis feugiat vivamus at augue. Non odio
            euismod lacinia at. Aliquet eget sit amet tellus. Auctor neque vitae tempus quam. Tellus
            in hac habitasse platea dictumst vestibulum rhoncus est. Nisl pretium fusce id velit ut
            tortor pretium. Eget arcu dictum varius duis at consectetur. Est placerat in egestas
            erat imperdiet sed euismod nisi porta. Scelerisque felis imperdiet proin fermentum.
            Tellus in hac habitasse platea dictumst vestibulum rhoncus. Proin nibh nisl condimentum
            id venenatis a condimentum vitae. Massa tincidunt dui ut ornare lectus sit amet est
            placerat. Vel turpis nunc eget lorem dolor sed viverra ipsum. Enim ut tellus elementum
            sagittis. At consectetur lorem donec massa sapien faucibus et molestie. Enim sit amet
            venenatis urna cursus. Id velit ut tortor pretium viverra suspendisse potenti. Et magnis
            dis parturient montes nascetur ridiculus. Donec ultrices tincidunt arcu non sodales
            neque. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere. Consequat
            mauris nunc congue nisi vitae. Ut tellus elementum sagittis vitae et leo duis. Dignissim
            sodales ut eu sem. Cras semper auctor neque vitae tempus quam pellentesque nec nam. Et
            magnis dis parturient montes nascetur ridiculus mus mauris. Morbi tempus iaculis urna
            id. Tristique nulla aliquet enim tortor. Libero nunc consequat interdum varius sit. Sed
            adipiscing diam donec adipiscing tristique risus nec feugiat. Facilisi nullam vehicula
            ipsum a arcu cursus vitae. Arcu odio ut sem nulla pharetra. Tincidunt praesent semper
            feugiat nibh sed pulvinar proin. Morbi non arcu risus quis varius quam quisque id diam.
            Ac turpis egestas sed tempus urna. Sit amet venenatis urna cursus eget nunc. Amet
            consectetur adipiscing elit ut aliquam purus sit. Nisl nunc mi ipsum faucibus vitae
            aliquet nec ullamcorper. Et egestas quis ipsum suspendisse ultrices gravida dictum.
            Ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit. Pretium
            viverra suspendisse potenti nullam ac tortor vitae. Lobortis elementum nibh tellus
            molestie nunc non blandit. Eget nunc lobortis mattis aliquam. Quam adipiscing vitae
            proin sagittis nisl rhoncus mattis rhoncus. Quis commodo odio aenean sed adipiscing
            diam. Pharetra massa massa ultricies mi quis hendrerit. Et magnis dis parturient montes.
            Cursus metus aliquam eleifend mi in nulla posuere. Tristique senectus et netus et. A
            lacus vestibulum sed arcu non odio. Sed elementum tempus egestas sed. Faucibus et
            molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Gravida rutrum quisque non
            tellus orci ac. Turpis tincidunt id aliquet risus feugiat in ante metus dictum. Dolor
            morbi non arcu risus quis varius quam quisque. Bibendum at varius vel pharetra vel
            turpis nunc. A cras semper auctor neque. Aenean vel elit scelerisque mauris pellentesque
            pulvinar pellentesque habitant. Erat nam at lectus urna duis. Mauris pharetra et
            ultrices neque. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque
            fermentum. Justo nec ultrices dui sapien eget mi proin sed libero. Pellentesque sit amet
            porttitor eget dolor. A diam maecenas sed enim ut. Fermentum et sollicitudin ac orci
            phasellus. Tincidunt vitae semper quis lectus nulla. Tincidunt dui ut ornare lectus sit
            amet est. Sed enim ut sem viverra aliquet eget sit. Eu augue ut lectus arcu bibendum at
            varius. Suspendisse sed nisi lacus sed viverra tellus in hac habitasse. Donec ultrices
            tincidunt arcu non sodales neque sodales ut etiam. Varius vel pharetra vel turpis nunc
            eget lorem dolor. Arcu odio ut sem nulla pharetra. Bibendum neque egestas congue
            quisque. Facilisis volutpat est velit egestas dui. Orci nulla pellentesque dignissim
            enim sit amet. Mauris vitae ultricies leo integer malesuada nunc vel risus commodo. Odio
            ut enim blandit volutpat maecenas volutpat blandit. Eu mi bibendum neque egestas congue
            quisque egestas diam in. Neque viverra justo nec ultrices dui sapien. Congue mauris
            rhoncus aenean vel elit. Vitae aliquet nec ullamcorper sit. Tempus imperdiet nulla
            malesuada pellentesque. Sed lectus vestibulum mattis ullamcorper velit. Commodo odio
            aenean sed adipiscing diam. Viverra nam libero justo laoreet. Id neque aliquam
            vestibulum morbi blandit cursus. Vel facilisis volutpat est velit egestas dui id ornare.
            Feugiat nibh sed pulvinar proin.
          </Typography>
        </div>
      </div>
    </div>
  )
}
