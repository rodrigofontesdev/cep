import { CloseButton, Dialog, Portal } from '@chakra-ui/react'
import { Address } from '../App'
import { DataListItem, DataListRoot } from './ui/data-list'

type ViewAddressDialogProps = {
  data: Address
}

export function ViewAddressDialog({ data }: ViewAddressDialogProps) {
  return (
    <Portal>
      <Dialog.Backdrop backdropFilter="blur(4px)" />

      <Dialog.Positioner>
        <Dialog.Content bg="gray.950">
          <Dialog.Header
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Dialog.Title color="bg.muted">Detalhes do endereço</Dialog.Title>

            <Dialog.CloseTrigger asChild>
              <CloseButton
                size="sm"
                color="bg.muted"
                _hover={{ color: 'gray.950' }}
              />
            </Dialog.CloseTrigger>
          </Dialog.Header>

          <Dialog.Body>
            <DataListRoot>
              <DataListItem
                label="CEP"
                value={data.zipcode}
              />
              <DataListItem
                label="Rua"
                value={data.street}
              />
              <DataListItem
                label="Número"
                value={data.streetNumber}
              />
              {data.complement && (
                <DataListItem
                  label="Complemento"
                  value={data.complement}
                />
              )}
              <DataListItem
                label="Bairro"
                value={data.neighborhood}
              />
              <DataListItem
                label="Cidade"
                value={data.city}
              />
              <DataListItem
                label="Estado"
                value={data.state}
              />
            </DataListRoot>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  )
}
