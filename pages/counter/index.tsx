import Link from 'next/link'

import { increment, decrement, selectCount } from '@/entities/counter/counterSlice'
import { useAppDispatch, useAppSelector } from '@/shared/model'

export default function Counter() {
  const count = useAppSelector(selectCount)
  const dispatch = useAppDispatch()

  return (
    <div>
      <Link href={'./'}>Home</Link>
      <h1>Counter</h1>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <br />
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  )
}
