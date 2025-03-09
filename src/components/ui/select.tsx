import { Select as ChakraSelect } from '@chakra-ui/react'
import { forwardRef } from 'react'

export const SelectTrigger = forwardRef<HTMLButtonElement, ChakraSelect.ControlProps>(
  function SelectTrigger(props, ref) {
    const { children, ...rest } = props

    return (
      <ChakraSelect.Control {...rest}>
        <ChakraSelect.Trigger
          bg="gray.800"
          color="bg.muted"
          _placeholderShown={{ color: 'gray.500' }}
          _focus={{
            borderColor: 'purple.500',
            boxShadow: '0 0 0 .25rem var(--shadow-color)',
            boxShadowColor: 'purple.600/25',
            _invalid: { outline: 'none' },
          }}
          _open={{
            borderColor: 'purple.500',
            boxShadow: '0 0 0 .25rem var(--shadow-color)',
            boxShadowColor: 'purple.600/25',
            _invalid: { outline: 'none' },
          }}
          ref={ref}
        >
          {children}
        </ChakraSelect.Trigger>
        <ChakraSelect.IndicatorGroup>
          <ChakraSelect.Indicator _invalid={{ color: 'fg.muted' }} />
        </ChakraSelect.IndicatorGroup>
      </ChakraSelect.Control>
    )
  },
)

export const SelectLabel = forwardRef<HTMLLabelElement, ChakraSelect.LabelProps>(
  function SelectLabel(props, ref) {
    const { children, ...rest } = props

    return (
      <ChakraSelect.Label
        color="bg.muted"
        _disabled={{ opacity: '1', cursor: 'auto' }}
        {...rest}
        ref={ref}
      >
        {children}
      </ChakraSelect.Label>
    )
  },
)

export const SelectRoot = forwardRef<HTMLDivElement, ChakraSelect.RootProps>(
  function SelectRoot(props, ref) {
    const { positioning, ...rest } = props

    return (
      <ChakraSelect.Root
        positioning={{ sameWidth: true, ...positioning }}
        {...rest}
        ref={ref}
      >
        {props.asChild ? (
          props.children
        ) : (
          <>
            <ChakraSelect.HiddenSelect />
            {props.children}
          </>
        )}
      </ChakraSelect.Root>
    )
  },
) as ChakraSelect.RootComponent

export const SelectContent = forwardRef<HTMLDivElement, ChakraSelect.ContentProps>(
  function SelectContent(props, ref) {
    return (
      <ChakraSelect.Positioner>
        <ChakraSelect.Content
          bg="gray.950"
          color="bg.muted"
          borderColor="gray.700"
          scrollbarWidth="thin"
          {...props}
          ref={ref}
        />
      </ChakraSelect.Positioner>
    )
  },
)

export const SelectItem = forwardRef<HTMLDivElement, ChakraSelect.ItemProps>(
  function SelectItem(props, ref) {
    const { item, children, ...rest } = props

    return (
      <ChakraSelect.Item
        key={item.value}
        item={item}
        _hover={{ bg: 'gray.800' }}
        _highlighted={{ bg: 'gray.800' }}
        {...rest}
        ref={ref}
      >
        {children}
        <ChakraSelect.ItemIndicator />
      </ChakraSelect.Item>
    )
  },
)

export const SelectValueText = ChakraSelect.ValueText
export const SelectItemText = ChakraSelect.ItemText
