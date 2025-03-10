import { Box, Button, Presence, useDisclosure } from '@chakra-ui/react'
import { ChevronDown, ChevronUp } from 'lucide-react'

type ShelfProps = {
  children: React.ReactNode
  defaultOpen?: boolean
}

export function Shelf({ children, defaultOpen = false }: ShelfProps) {
  const { open, onToggle } = useDisclosure({
    defaultOpen: defaultOpen,
  })

  return (
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
        {children}
      </Presence>

      <Button
        unstyled
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
      </Button>
    </Box>
  )
}
