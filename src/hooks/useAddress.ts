import { zodResolver } from '@hookform/resolvers/zod'
import { STATES } from '@utils/data'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'
import { z } from 'zod'

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

export function useAddress() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [enableFieldEditing, setEnableFieldEditing] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setFocus,
    setError,
    reset,
    formState: { errors, isSubmitting },
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

  function saveAddress(data: AddressForm) {
    const { street, streetNumber, complement, neighborhood, city, state, zipcode } = data
    const stateFullName = STATES.find((item) => item.value === state[0])?.label
    const newAddress = {
      id: crypto.randomUUID(),
      zipcode,
      street,
      streetNumber,
      complement,
      neighborhood,
      city,
      state: stateFullName ?? '',
    }

    setAddresses((prevState) => [newAddress, ...prevState])
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
      setFocus('street')
      setEnableFieldEditing(true)
    } catch {
      setError('zipcode', {
        message: 'Não foi possível consultar o CEP, verifique a sua requisição',
      })
    }
  }

  const handleSaveAddress = handleSubmit(saveAddress)

  return {
    addresses,
    getAddress,
    register,
    registerWithMask,
    handleSaveAddress,
    control,
    enableFieldEditing,
    setEnableFieldEditing,
    errors,
    isSubmitting,
    setValue,
    setFocus,
    setError,
  }
}
