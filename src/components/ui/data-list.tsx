import { DataList as ChakraDataList } from '@chakra-ui/react'
import { forwardRef } from 'react'

interface ItemProps extends Omit<ChakraDataList.ItemProps, 'info'> {
  label: React.ReactNode
  value: React.ReactNode
  grow?: boolean
}

export const DataListItem = forwardRef<HTMLDivElement, ItemProps>(
  function DataListItem(props, ref) {
    const { label, value, grow, ...rest } = props

    return (
      <ChakraDataList.Item
        {...rest}
        ref={ref}
      >
        <ChakraDataList.ItemLabel
          flex={grow ? '1' : undefined}
          color="bg.muted"
        >
          {label}
        </ChakraDataList.ItemLabel>
        <ChakraDataList.ItemValue
          flex={grow ? '1' : undefined}
          color="gray.400"
        >
          {value}
        </ChakraDataList.ItemValue>
      </ChakraDataList.Item>
    )
  },
)

export const DataListRoot = ChakraDataList.Root
