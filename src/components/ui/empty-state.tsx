import { EmptyState as ChakraEmptyState, VStack } from '@chakra-ui/react'
import { forwardRef } from 'react'

export interface EmptyStateProps extends ChakraEmptyState.RootProps {
  title: string
  description?: string
  icon?: React.ReactNode
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState(props, ref) {
    const { title, description, icon, children, ...rest } = props

    return (
      <ChakraEmptyState.Root
        {...rest}
        ref={ref}
      >
        <ChakraEmptyState.Content>
          {icon && <ChakraEmptyState.Indicator>{icon}</ChakraEmptyState.Indicator>}
          {description ? (
            <VStack textAlign="center">
              <ChakraEmptyState.Title color="bg.muted">{title}</ChakraEmptyState.Title>
              <ChakraEmptyState.Description color="gray.400">
                {description}
              </ChakraEmptyState.Description>
            </VStack>
          ) : (
            <ChakraEmptyState.Title color="bg.muted">{title}</ChakraEmptyState.Title>
          )}
          {children}
        </ChakraEmptyState.Content>
      </ChakraEmptyState.Root>
    )
  },
)
