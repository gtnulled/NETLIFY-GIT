"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function CadastroSucesso() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <Card className="w-full max-w-lg">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </motion.div>
              </div>
              <CardTitle className="text-2xl text-center">Cadastro Enviado com Sucesso!</CardTitle>
              <CardDescription className="text-center">
                Seu cadastro foi recebido e está em análise. Em breve, entraremos em contato através do e-mail fornecido.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <p className="text-center text-gray-600">
                Após a aprovação, seu perfil estará disponível para consulta pública no sistema.
              </p>
              <Link href="/">
                <Button className="mt-4">Voltar para a Página Inicial</Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}