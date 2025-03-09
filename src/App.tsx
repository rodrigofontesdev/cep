import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  createListCollection,
  Dialog,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  Presence,
  SelectValueText,
  Stack,
  Table,
  useDisclosure,
} from '@chakra-ui/react'
import { EmptyState } from '@components/ui/empty-state'
import { Field } from '@components/ui/field'
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
} from '@components/ui/select'
import { ViewAddressDialog } from '@components/view-address-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { STATES } from '@utils/data'
import { ArrowRight, ChevronDown, ChevronUp, MapPinned, Search } from 'lucide-react'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'
import { z } from 'zod'

const states = createListCollection({
  items: [...STATES],
})

export type Address = {
  id: string
  zipcode: string
  street: string
  streetNumber: string
  complement?: string
  neighborhood: string
  city: string
  state: string
}

const saveAddressSchema = z.object({
  zipcode: z
    .string()
    .trim()
    .min(8, { message: 'O campo CEP é obrigatório' })
    .regex(/^[0-9]{5}-[0-9]{3}$/i, {
      message: 'O formato do CEP é inválido',
    }),
  street: z.string().trim().min(1, { message: 'O campo rua é obrigatório' }),
  streetNumber: z.string().trim().min(1, { message: 'O campo número é obrigatório' }),
  complement: z.string().trim().optional(),
  neighborhood: z.string().trim().min(1, { message: 'O campo bairro é obrigatório' }),
  city: z.string().trim().min(1, { message: 'O campo cidade é obrigatório' }),
  state: z.string().array().nonempty({ message: 'O campo estado é obrigatório' }),
})

type AddressForm = z.infer<typeof saveAddressSchema>

export function App() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const { open, onToggle } = useDisclosure({
    defaultOpen: true,
  })
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
    setFocus,
    setError,
    reset,
  } = useForm<AddressForm>({
    reValidateMode: 'onSubmit',
    resolver: zodResolver(saveAddressSchema),
    defaultValues: {
      zipcode: '',
      street: '',
      streetNumber: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: [],
    },
  })
  const registerWithMask = useHookFormMask(register)
  const [enableFieldEditing, setEnableFieldEditing] = useState(false)

  function saveAddress(data: AddressForm) {
    const { street, streetNumber, complement, neighborhood, city, state, zipcode } = data
    const stateName = STATES.find((item) => item.value === state[0])?.label

    setAddresses((prevState) => [
      {
        id: crypto.randomUUID(),
        street,
        streetNumber,
        complement,
        neighborhood,
        city,
        state: stateName ?? '',
        zipcode,
      },
      ...prevState,
    ])

    setEnableFieldEditing(false)
    reset()
  }

  async function getAddress(event: React.FocusEvent<HTMLInputElement>) {
    const zipcode = event.target.value.replace(/[^0-9]/g, '')

    if (zipcode === '' || zipcode.length < 8) return

    try {
      const response = await fetch(`https://viacep.com.br/ws/${zipcode}/json`)
      const data = await response.json()

      if ('erro' in data) {
        setError('zipcode', { message: 'O CEP informado não foi encontrado' })
        return
      }

      setValue('street', data.logradouro)
      setValue('neighborhood', data.bairro)
      setValue('city', data.localidade)
      setValue('state', [data.uf])
      setEnableFieldEditing(true)
      setFocus('street')
    } catch {
      setError('zipcode', {
        message: 'Não foi possível consultar o CEP, verifique a sua requisição',
      })
    }
  }

  return (
    <Box bg="gray.800">
      <Box
        data-state={open ? 'open' : 'closed'}
        position="fixed"
        bottom="0"
        insetX="0"
        zIndex="5"
        animationName={{
          _open: 'slide-from-bottom-full',
          _closed: 'slide-to-bottom-full',
        }}
        animationDuration="moderate"
      >
        <Presence
          bg="gray.900"
          present={open}
          animationName={{
            _open: 'slide-from-bottom-full',
            _closed: 'slide-to-bottom-full',
          }}
          animationDuration="moderate"
        >
          <Container py="6">
            <form onSubmit={handleSubmit(saveAddress)}>
              <Stack gap="3">
                <Field
                  label="CEP"
                  errorText={errors.zipcode?.message}
                  invalid={!!errors.zipcode}
                >
                  <Input
                    {...registerWithMask('zipcode', ['99999-999'])}
                    type="text"
                    placeholder="00000-000"
                    size="sm"
                    autoFocus
                    onBlur={getAddress}
                  />
                </Field>

                <Flex gap="3">
                  <Field
                    label="Rua"
                    errorText={errors.street?.message}
                    invalid={!!errors.street}
                  >
                    <Input
                      {...register('street')}
                      type="text"
                      placeholder="Av. Paulista"
                      disabled={!enableFieldEditing}
                      size="sm"
                    />
                  </Field>

                  <Field
                    label="Número"
                    errorText={errors.streetNumber?.message}
                    invalid={!!errors.streetNumber}
                  >
                    <Input
                      {...register('streetNumber')}
                      type="text"
                      placeholder="123"
                      disabled={!enableFieldEditing}
                      size="sm"
                    />
                  </Field>

                  <Field
                    label="Complemento"
                    optionalText={
                      <Badge
                        size="xs"
                        variant="subtle"
                      >
                        Opcional
                      </Badge>
                    }
                    errorText={errors.complement?.message}
                    invalid={!!errors.complement}
                  >
                    <Input
                      {...register('complement')}
                      type="text"
                      placeholder="apt. 100"
                      disabled={!enableFieldEditing}
                      size="sm"
                    />
                  </Field>
                </Flex>

                <Flex gap="3">
                  <Field
                    label="Bairro"
                    errorText={errors.neighborhood?.message}
                    invalid={!!errors.neighborhood}
                  >
                    <Input
                      {...register('neighborhood')}
                      type="text"
                      placeholder="Bela Vista"
                      disabled={!enableFieldEditing}
                      size="sm"
                    />
                  </Field>

                  <Field
                    label="Cidade"
                    errorText={errors.city?.message}
                    invalid={!!errors.city}
                  >
                    <Input
                      {...register('city')}
                      type="text"
                      placeholder="São Paulo"
                      disabled={!enableFieldEditing}
                      size="sm"
                    />
                  </Field>

                  <Field
                    errorText={errors.state?.message}
                    invalid={!!errors.state}
                  >
                    <Controller
                      control={control}
                      name="state"
                      render={({ field }) => (
                        <SelectRoot
                          name={field.name}
                          value={field.value}
                          collection={states}
                          variant="subtle"
                          size="sm"
                          disabled={!enableFieldEditing}
                          onValueChange={({ value }) => field.onChange(value)}
                          onInteractOutside={() => field.onBlur()}
                        >
                          <SelectLabel>Estado</SelectLabel>
                          <SelectTrigger>
                            <SelectValueText placeholder="Selecionar estado" />
                          </SelectTrigger>
                          <SelectContent>
                            {states.items.map((state) => (
                              <SelectItem
                                item={state}
                                key={state.value}
                              >
                                {state.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </SelectRoot>
                      )}
                    />
                  </Field>
                </Flex>
              </Stack>

              <Center mt="6">
                <Button
                  type="submit"
                  variant="solid"
                  size="lg"
                  colorPalette="purple"
                  loading={isSubmitting}
                  loadingText="Enviando"
                  spinnerPlacement="start"
                  disabled={!enableFieldEditing}
                >
                  Enviar <ArrowRight />
                </Button>
              </Center>
            </form>
          </Container>
        </Presence>
        <Button
          unstyled
          onClick={onToggle}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              onToggle()
            }
          }}
          position="absolute"
          top="-8"
          right="10"
          bg="gray.950"
          color="gray.500"
          w="24"
          h="8"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderTopRadius="md"
          cursor="pointer"
          _hover={{ bg: 'blackAlpha.700' }}
          _focusVisible={{ outlineWidth: '2px', outlineStyle: 'solid', outlineColor: 'purple.500' }}
          _motionSafe={{
            transitionProperty: 'background',
            transitionDuration: 'slow',
            transitionTimingFunction: 'ease-in-out',
          }}
        >
          {open ? <ChevronDown size={28} /> : <ChevronUp size={28} />}
        </Button>
      </Box>

      <Box
        py="20"
        minH="dvh"
      >
        <Container>
          <Flex
            justify="space-between"
            align="center"
            mb="5"
          >
            <Heading
              textStyle="2xl"
              color="bg.muted"
            >
              Endereços
            </Heading>
            <Badge
              bg="purple.solid"
              color="bg.muted"
            >
              {addresses.length === 1 ? `${addresses.length} item` : `${addresses.length} items`}
            </Badge>
          </Flex>

          {addresses.length > 0 ? (
            <Table.ScrollArea height="400px">
              <Table.Root stickyHeader>
                <Table.Header>
                  <Table.Row
                    bg="gray.900"
                    css={{
                      '& > th': { color: 'bg.muted', borderColor: 'gray.800' },
                    }}
                  >
                    <Table.ColumnHeader>#</Table.ColumnHeader>
                    <Table.ColumnHeader>Endereço</Table.ColumnHeader>
                    <Table.ColumnHeader>Bairro</Table.ColumnHeader>
                    <Table.ColumnHeader>Cidade</Table.ColumnHeader>
                    <Table.ColumnHeader>Estado</Table.ColumnHeader>
                    <Table.ColumnHeader>CEP</Table.ColumnHeader>
                    <Table.ColumnHeader>Ações</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {addresses.map((address) => (
                    <Table.Row
                      key={address.id}
                      bg="gray.900"
                      color="bg.muted"
                      css={{
                        '& > td': { borderColor: 'gray.800' },
                      }}
                    >
                      <Table.Cell>{address.id}</Table.Cell>
                      <Table.Cell>{`${address.street}, ${address.streetNumber}${address.complement ? `, ${address.complement}` : ''}`}</Table.Cell>
                      <Table.Cell>{address.neighborhood}</Table.Cell>
                      <Table.Cell>{address.city}</Table.Cell>
                      <Table.Cell>{address.state}</Table.Cell>
                      <Table.Cell>{address.zipcode}</Table.Cell>
                      <Table.Cell>
                        <Dialog.Root placement="center">
                          <Dialog.Trigger asChild>
                            <IconButton
                              aria-label="Ver endereço"
                              variant="solid"
                              size="xs"
                              colorPalette="purple"
                            >
                              <Search />
                            </IconButton>
                          </Dialog.Trigger>

                          <ViewAddressDialog data={address} />
                        </Dialog.Root>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Table.ScrollArea>
          ) : (
            <EmptyState
              title="Lista de endereços vazia"
              description="Utilize o formulário para cadastrar o seu primeiro endereço"
              icon={
                <Icon color="purple.400">
                  <MapPinned />
                </Icon>
              }
              pt="16"
            />
          )}
        </Container>
      </Box>
    </Box>
  )
}
