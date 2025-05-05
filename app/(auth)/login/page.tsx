"use client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChangeEvent, FormEvent, useState } from "react"
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation"

const Login = () => {
  const router = useRouter();

  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    setCredenciales({
      ...credenciales,
      [e.target.name]:[e.target.value]
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    const result = await signIn('credentials', {
      redirect: false,
      email: credenciales.email,
      password: credenciales.password,
    });

    if(result) {
      if (result.error) {
        setError("Credenciales incorrectas");
      } else {
        router.push('/');
      }
    }
    
  }

  return (
    <div className="grid place-content-center min-h-screen">
      <Card className="w-[380px] p-6">
        <CardHeader >
          <CardTitle >Iniciar sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={credenciales.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={credenciales.password}
                onChange={handleInputChange}
                required
              />
            </div>
            {error && <p >{error}</p>}
            <Button type="submit">
              Ingresar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login;