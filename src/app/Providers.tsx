import { Provider } from 'react-redux'

import store from './appStore'

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
