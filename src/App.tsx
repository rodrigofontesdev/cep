import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  createListCollection,
  Flex,
  Heading,
  Icon,
  Input,
  Presence,
  SelectValueText,
  Show,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import { AddressTable } from '@components/address-table'
import { EmptyState } from '@components/ui/empty-state'
import { Field } from '@components/ui/field'
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
} from '@components/ui/select'
import { useAddress } from '@hooks/useAddress'
import { STATES } from '@utils/data'
import { ArrowRight, ChevronDown, ChevronUp, MapPinned } from 'lucide-react'
import { Controller } from 'react-hook-form'

const states = createListCollection({
  items: [...STATES],
})

export function App() {
  const {
    addresses,
    getAddress,
    register,
    registerWithMask,
    handleSaveAddress,
    errors,
    enableFieldEditing,
    control,
    isSubmitting,
  } = useAddress()
  const { open: isSaveAddressFormOpen, onToggle } = useDisclosure({
    defaultOpen: true,
  })

  return (
    <Box bg="gray.800">
      <Box
        data-state={isSaveAddressFormOpen ? 'open' : 'closed'}
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
          present={isSaveAddressFormOpen}
          animationName={{
            _open: 'slide-from-bottom-full',
            _closed: 'slide-to-bottom-full',
          }}
          animationDuration="moderate"
        >
          <Container py="6">
            <form onSubmit={handleSaveAddress}>
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
          {isSaveAddressFormOpen ? <ChevronDown size={28} /> : <ChevronUp size={28} />}
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

          <Show
            when={addresses.length > 0}
            fallback={
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
            }
          >
            <AddressTable entries={addresses} />
          </Show>
        </Container>
      </Box>
    </Box>
  )
}
