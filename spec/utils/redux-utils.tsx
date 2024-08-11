import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'

import { setupStore, type AppStore, type RootState } from '../../src/store/configureStore'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

export function renderWithReduxProviders(
    ui: React.ReactElement,
    {
      preloadedState = {},
      store = setupStore(preloadedState),
      ...renderOptions
    }: ExtendedRenderOptions = {}
  ) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
      return <Provider store={store}>{children}</Provider>
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
  }