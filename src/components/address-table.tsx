import { Dialog, IconButton, Table } from '@chakra-ui/react'
import { Address } from '@hooks/useAddress'
import { Search } from 'lucide-react'
import { ViewAddressDialog } from './view-address-dialog'

type AddressTableProps = {
  entries: Address[]
}

export function AddressTable({ entries }: AddressTableProps) {
  return (
    <Table.ScrollArea>
      <Table.Root stickyHeader>
        <Table.Header>
          <Table.Row
            bg="gray.900"
            css={{
              '& > th': { color: 'bg.muted', borderColor: 'gray.800' },
            }}
          >
            <Table.ColumnHeader>Endereço</Table.ColumnHeader>
            <Table.ColumnHeader>Bairro</Table.ColumnHeader>
            <Table.ColumnHeader>Cidade</Table.ColumnHeader>
            <Table.ColumnHeader>Estado</Table.ColumnHeader>
            <Table.ColumnHeader>CEP</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Ações</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {entries.map((entry) => (
            <Table.Row
              key={entry.id}
              bg="gray.900"
              color="bg.muted"
              css={{
                '& > td': { borderColor: 'gray.800' },
              }}
            >
              <Table.Cell>{`${entry.street}, ${entry.streetNumber}${entry.complement ? `, ${entry.complement}` : ''}`}</Table.Cell>
              <Table.Cell>{entry.neighborhood}</Table.Cell>
              <Table.Cell>{entry.city}</Table.Cell>
              <Table.Cell>{entry.state}</Table.Cell>
              <Table.Cell>{entry.zipcode}</Table.Cell>
              <Table.Cell textAlign="end">
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

                  <ViewAddressDialog data={entry} />
                </Dialog.Root>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  )
}
