"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { BackToHomeButton } from "@/components/BackToHomeButton"
import { supabase, getPublicUrl } from "@/lib/supabaseClient"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Calendar,
  User,
  Book,
  CheckCircle,
  Edit,
  ArrowLeft,
  Facebook,
  Instagram,
  Mail,
  Globe,
} from "lucide-react"

export default function PerfilPresbitero() {
  const { id } = useParams()
  const router = useRouter()
  const [presbitero, setPresbitero] = useState(null)
  const [loading, setLoading] = useState(true)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    async function fetchPresbitero() {
      setLoading(true)
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
        if (sessionError) throw sessionError

        if (sessionData.session) {
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", sessionData.session.user.id)
            .single()
          if (profileError) throw profileError
          setIsAdmin(profileData.role === "administrador")
        }

        const { data, error } = await supabase.from("presbiteros").select("*").eq("id", id).single()

        if (error) throw error

        setPresbitero(data)
        if (data.foto_perfil) {
          const url = getPublicUrl(data.foto_perfil)
          console.log("Profile photo URL:", url) // Debug log
          setImageUrl(url)
        }
      } catch (error) {
        console.error("Erro ao buscar dados do presbítero:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPresbitero()
  }, [id])

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!presbitero) {
    return <div>Presbítero não encontrado</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <BackToHomeButton />
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-semibold flex items-center">Perfil do Religioso</CardTitle>
            {isAdmin && (
              <div className="space-x-2">
                <Link href={`/editar/${id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                </Link>
                <Link href="/painel-de-controle">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Painel
                  </Button>
                </Link>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={imageUrl || ""}
                  alt={presbitero.nome_completo}
                  onError={(e) => {
                    console.error("Error loading image:", e)
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(presbitero.nome_completo)}&size=96`
                  }}
                />
                <AvatarFallback>{presbitero.nome_completo.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold flex items-center">
                  {presbitero.nome_completo}
                  {presbitero.aprovado && (
                    <span className="ml-2 cursor-help" title="Religioso Verificado">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </span>
                  )}
                </h2>
                <p className="text-gray-500">{presbitero.grau_ordem}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="flex items-center">
                  <User className="mr-2" /> Grau de Ordem: {presbitero.grau_ordem}
                </p>
                <p className="flex items-center">
                  <User className="mr-2" /> Diocese: {presbitero.diocese}
                </p>
                <p className="flex items-center">
                  <Calendar className="mr-2" /> Data de ordenação:{" "}
                  {new Date(presbitero.data_ordenacao).toLocaleDateString()}
                </p>
                <p className="flex items-center">
                  <User className="mr-2" /> Bispo ordenante: {presbitero.bispo_ordenante}
                </p>
                <p className="flex items-center">
                  <Book className="mr-2" /> Ocupação Canônica: {presbitero.ocupacao_canonica}
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex items-center">
                  <MapPin className="mr-2" /> Paróquia: {presbitero.nome_paroquia}
                </p>
                {presbitero.facebook && (
                  <p className="flex items-center">
                    <Facebook className="mr-2" />
                    <a
                      href={`https://facebook.com/${presbitero.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {presbitero.facebook}
                    </a>
                  </p>
                )}
                {presbitero.instagram && (
                  <p className="flex items-center">
                    <Instagram className="mr-2" />
                    <a
                      href={`https://instagram.com/${presbitero.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {presbitero.instagram}
                    </a>
                  </p>
                )}
                {presbitero.email && (
                  <p className="flex items-center">
                    <Mail className="mr-2" />
                    <a href={`mailto:${presbitero.email}`} className="text-blue-600 hover:underline">
                      {presbitero.email}
                    </a>
                  </p>
                )}
                {presbitero.website && (
                  <p className="flex items-center">
                    <Globe className="mr-2" />
                    <a
                      href={presbitero.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Website
                    </a>
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

