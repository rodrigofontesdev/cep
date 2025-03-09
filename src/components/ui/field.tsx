import { Field as ChakraField } from '@chakra-ui/react'
import { forwardRef } from 'react'

export interface FieldProps extends Omit<ChakraField.RootProps, 'label'> {
  label?: React.ReactNode
  errorText?: React.ReactNode
  optionalText?: React.ReactNode
}

export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(props, ref) {
  const { label, children, errorText, optionalText, ...rest } = props

  return (
    <ChakraField.Root
      ref={ref}
      {...rest}
    >
      {label && (
        <ChakraField.Label color="bg.muted">
          {label}
          {optionalText && <ChakraField.RequiredIndicator fallback={optionalText} />}
        </ChakraField.Label>
      )}

      {children}

      {errorText && <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>}
    </ChakraField.Root>
  )
})
