import { createSystem, defaultConfig, defineConfig, defineRecipe } from '@chakra-ui/react'

const inputRecipe = defineRecipe({
  variants: {
    variant: {
      subtle: {
        bg: 'gray.800',
        color: 'bg.muted',
        borderColor: 'transparent',
        _placeholder: { color: 'gray.500' },
        _focus: {
          borderColor: 'purple.500',
          boxShadow: '0 0 0 .25rem var(--shadow-color)',
          boxShadowColor: 'purple.600/25',
          _invalid: { outline: 'none' },
        },
        _motionSafe: {
          transitionProperty: 'border-color, box-shadow',
          transitionDuration: 'slow',
          transitionTimingFunction: 'ease-in-out',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'subtle',
  },
})

const customConfig = defineConfig({
  globalCss: {
    html: {
      colorScheme: 'dark',
      scrollbarWidth: 'thin',
    },
  },
  theme: {
    recipes: {
      input: inputRecipe,
    },
  },
})

const defaultSystem = createSystem(defaultConfig, customConfig)

export default defaultSystem
