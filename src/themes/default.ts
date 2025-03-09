import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const customConfig = defineConfig({
  globalCss: {
    html: {
      colorScheme: 'dark',
      scrollbarWidth: 'thin',
    },
  },
})

const defaultSystem = createSystem(defaultConfig, customConfig)

export default defaultSystem
