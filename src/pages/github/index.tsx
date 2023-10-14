import {AppDispatch} from '@/app/appStore';
import {setLoginUser} from '@/entities/auth/AuthSlice';
import { useSearchParams } from 'next/navigation'
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

export function Github() {
  const searchParams = useSearchParams()

  const email = searchParams?.get('email') as string
  const accessToken = searchParams?.get('accessToken') as string

  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (email && accessToken) {      
      dispatch(setLoginUser({email, accessToken}))
    }
    router.push('/')
  },[email, accessToken])
     
  return (
    <div>
      <h1>Github email: {email}</h1>
      <p>{accessToken}</p>
    </div>
  )
}
