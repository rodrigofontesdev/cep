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
import { DataListItem, DataListRoot } from '@components/ui/data-list'
import { EmptyState } from '@components/ui/empty-state'
import { Field } from '@components/ui/field'
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
} from '@components/ui/select'
import { ADDRESSES, STATES } from '@utils/data'
import { ArrowRight, ChevronDown, ChevronUp, MapPinned, Search, X } from 'lucide-react'
import { useState } from 'react'
import { withMask } from 'use-mask-input'

const states = createListCollection({
  items: [...STATES],
})

type Address = {
  id: string
  zipcode: string
  street: string
  streetNumber: string
  complement?: string
  neighborhood: string
  city: string
  state: string
}

export function App() {
  const [addresses, setAddresses] = useState<Address[]>([...ADDRESSES])
  const { open, onToggle } = useDisclosure({
    defaultOpen: true,
  })

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
            <form>
              <Stack gap="3">
                <Field
                  label="CEP"
                  errorText="O campo é obrigatório"
                  required
                  invalid={false}
                >
                  <Input
                    type="text"
                    placeholder="00000-000"
                    ref={withMask('99999-999')}
                    autoFocus
                    variant="subtle"
                    size="sm"
                    bg="gray.800"
                    color="bg.muted"
                    _placeholder={{ color: 'gray.500' }}
                    _focus={{
                      borderColor: 'purple.500',
                      boxShadow: '0 0 0 .25rem var(--shadow-color)',
                      boxShadowColor: 'purple.600/25',
                      _invalid: { outline: 'none' },
                    }}
                    _motionSafe={{
                      transitionProperty: 'border-color, box-shadow',
                      transitionDuration: 'slow',
                      transitionTimingFunction: 'ease-in-out',
                    }}
                  />
                </Field>

                <Flex gap="3">
                  <Field
                    label="Rua"
                    errorText="O campo é obrigatório"
                    required
                    invalid={false}
                  >
                    <Input
                      type="text"
                      placeholder="Av. Paulista"
                      disabled={true}
                      variant="subtle"
                      size="sm"
                      bg="gray.800"
                      color="bg.muted"
                      _placeholder={{ color: 'gray.500' }}
                      _focus={{
                        borderColor: 'purple.500',
                        boxShadow: '0 0 0 .25rem var(--shadow-color)',
                        boxShadowColor: 'purple.600/25',
                        _invalid: { outline: 'none' },
                      }}
                      _motionSafe={{
                        transitionProperty: 'border-color, box-shadow',
                        transitionDuration: 'slow',
                        transitionTimingFunction: 'ease-in-out',
                      }}
                    />
                  </Field>

                  <Field
                    label="Número"
                    errorText="O campo é obrigatório"
                    required
                    invalid={false}
                  >
                    <Input
                      type="text"
                      placeholder="123"
                      disabled={true}
                      variant="subtle"
                      size="sm"
                      bg="gray.800"
                      color="bg.muted"
                      _placeholder={{ color: 'gray.500' }}
                      _focus={{
                        borderColor: 'purple.500',
                        boxShadow: '0 0 0 .25rem var(--shadow-color)',
                        boxShadowColor: 'purple.600/25',
                        _invalid: { outline: 'none' },
                      }}
                      _motionSafe={{
                        transitionProperty: 'border-color, box-shadow',
                        transitionDuration: 'slow',
                        transitionTimingFunction: 'ease-in-out',
                      }}
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
                    errorText="O campo é obrigatório"
                    invalid={false}
                  >
                    <Input
                      type="text"
                      placeholder="apt. 100"
                      disabled={true}
                      variant="subtle"
                      size="sm"
                      bg="gray.800"
                      color="bg.muted"
                      _placeholder={{ color: 'gray.500' }}
                      _focus={{
                        borderColor: 'purple.500',
                        boxShadow: '0 0 0 .25rem var(--shadow-color)',
                        boxShadowColor: 'purple.600/25',
                        _invalid: { outline: 'none' },
                      }}
                      _motionSafe={{
                        transitionProperty: 'border-color, box-shadow',
                        transitionDuration: 'slow',
                        transitionTimingFunction: 'ease-in-out',
                      }}
                    />
                  </Field>
                </Flex>

                <Flex gap="3">
                  <Field
                    label="Bairro"
                    errorText="O campo é obrigatório"
                    required
                    invalid={false}
                  >
                    <Input
                      type="text"
                      placeholder="Bela Vista"
                      disabled={true}
                      variant="subtle"
                      size="sm"
                      bg="gray.800"
                      color="bg.muted"
                      _placeholder={{ color: 'gray.500' }}
                      _focus={{
                        borderColor: 'purple.500',
                        boxShadow: '0 0 0 .25rem var(--shadow-color)',
                        boxShadowColor: 'purple.600/25',
                        _invalid: { outline: 'none' },
                      }}
                      _motionSafe={{
                        transitionProperty: 'border-color, box-shadow',
                        transitionDuration: 'slow',
                        transitionTimingFunction: 'ease-in-out',
                      }}
                    />
                  </Field>

                  <Field
                    label="Cidade"
                    errorText="O campo é obrigatório"
                    required
                    invalid={false}
                  >
                    <Input
                      type="text"
                      placeholder="São Paulo"
                      disabled={true}
                      variant="subtle"
                      size="sm"
                      bg="gray.800"
                      color="bg.muted"
                      _placeholder={{ color: 'gray.500' }}
                      _focus={{
                        borderColor: 'purple.500',
                        boxShadow: '0 0 0 .25rem var(--shadow-color)',
                        boxShadowColor: 'purple.600/25',
                        _invalid: { outline: 'none' },
                      }}
                      _motionSafe={{
                        transitionProperty: 'border-color, box-shadow',
                        transitionDuration: 'slow',
                        transitionTimingFunction: 'ease-in-out',
                      }}
                    />
                  </Field>

                  <Field
                    errorText="O campo é obrigatório"
                    invalid={false}
                  >
                    <SelectRoot
                      variant="subtle"
                      size="sm"
                      collection={states}
                      required
                      disabled={true}
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
                  </Field>
                </Flex>
              </Stack>

              <Center mt="6">
                <Button
                  type="submit"
                  variant="solid"
                  size="lg"
                  colorPalette="purple"
                  loading={false}
                  loadingText="Enviando"
                  spinnerPlacement="start"
                  disabled={true}
                >
                  Enviar <ArrowRight />
                </Button>
              </Center>
            </form>
          </Container>
        </Presence>
        <Box
          tabIndex={0}
          onClick={onToggle}
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
        </Box>
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
            <Dialog.Root placement="center">
              <Dialog.Backdrop backdropFilter="blur(4px)" />

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
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Table.ScrollArea>

              <Dialog.Positioner>
                <Dialog.Content bg="gray.950">
                  <Dialog.Header
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Dialog.Title color="bg.muted">Endereço</Dialog.Title>

                    <Dialog.CloseTrigger cursor="pointer">
                      <Icon
                        color="bg.muted"
                        _hover={{ color: 'purple.500' }}
                      >
                        <X />
                      </Icon>
                    </Dialog.CloseTrigger>
                  </Dialog.Header>

                  <Dialog.Body>
                    <DataListRoot>
                      <DataListItem
                        label="Rua"
                        value="Rua Zumbi"
                      />
                      <DataListItem
                        label="Número"
                        value="2"
                      />
                      <DataListItem
                        label="Bairro"
                        value="Côlonia"
                      />
                      <DataListItem
                        label="Cidade"
                        value="Ribeirão Pires"
                      />
                      <DataListItem
                        label="Estado"
                        value="São Paulo"
                      />

                      <DataListItem
                        label="CEP"
                        value="09405-400"
                      />
                    </DataListRoot>
                  </Dialog.Body>
                </Dialog.Content>
              </Dialog.Positioner>
            </Dialog.Root>
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
