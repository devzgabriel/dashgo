import { Button, Flex, Stack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../components/Form/Input'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

type SignInFormData = {
  email: string
  password: string
}
const signInFormSchema = yup.object().shape({
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup.string().required('Password is required'),
})

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  })

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log(values)
  }

  return (
    <Flex align='center' h='100vh' justify='center' w='100vw'>
      <Flex
        as='form'
        w='100%'
        maxWidth={360}
        bg='gray.800'
        p='8'
        borderRadius={8}
        flexDir='column'
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing='4'>
          <Input
            type='email'
            name='email'
            label='E-mail'
            error={formState.errors.email}
            {...register('email')}
          />
          <Input
            type='password'
            name='password'
            label='Senha'
            error={formState.errors.password}
            {...register('password')}
          />
        </Stack>

        <Button
          type='submit'
          mt='6'
          colorScheme='pink'
          size='lg'
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
