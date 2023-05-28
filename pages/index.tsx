"use client" // por padrão no nextjs 13 cada página por padrão é habilitado com o Server Side Render, o use cliente garante que não vamos usar o servidor padrão do nextjs para carregar os dados da spa
import { useState } from 'react' // variavel do react
import { useForm } from 'react-hook-form' // formulario
import { api } from '@/lib/axios' // endpoint da api

// componentes
import { Grid, Input, Loading, Pagination } from '@nextui-org/react'
import { ErrorSearch } from '@/components/ErrorSearch/ErrorSearch'
import { CardItem } from '@/components/CardItem/CardItem'
import { SendButton } from '@/components/SendButton/SendButton'
import { Loading as LoadingComponent } from "@/components/Loading/Loading"

// icones
import { TelegramLogo } from '@phosphor-icons/react'


// tipagens
interface CardItemProps {
  id: string
  owner: {
    avatar_url: string
  }
  full_name: string
  description: string
  topics: string[] | []
  language: string
  html_url: string
  name: string
}

interface FormProps {
  search: string
}

export default function Home() {

  const { handleSubmit, register } = useForm<FormProps>() // para usar o react hook forms devemos buscar as duas funções basica para o formulário
  // o handleSubmit serve para utilizar no evendo de submit do formulário
  // o register é para definir o "name" do input 

  // estados definidor
  const [isError, setIsError] = useState<boolean>(false)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const [listResult, setListResult] = useState<CardItemProps[]>([]) // onde vai ficar os dados
  const [totalItens, setTotalItens] = useState<number>(0)

  // envia a requisição para a API do github
  async function HandleSearchApi(data: FormProps) {
    setLoading(true)
    try {
      setIsError(false)
      setSearch(data.search) // adiciono nesse state para facilitar na paginação

      const result = await api.get(`${data.search}`)

      setTotalItens(
        result.data.total_count <= 1000 ? result.data.total_count :
          1000
      ) // na API do github temos limite de dados para consultar
      setListResult(result.data.items)
    } catch (error) {
      setIsError(true) // caso ocorra algum erro na solicitação
    }

    setLoading(false)
  }

  // para listar mais repositórios do github, opitei por fazer outra solicitação para a API novamente mesmo sabendo do bloqueio por varias requisições em um unico ip
  // montei deste modo porque na minha opinião 30 registros é pouco interessante
  async function handleSearchApiPage(search: string, page: number) {
    setLoading(true)

    try {
      setIsError(false)
      const result = await api.get(`${search}&page=${page}`)

      setListResult(result.data.items)
    } catch (error) {
      setIsError(true)
    }

    setLoading(false)
  }

  return (
    <main>
      <h2 className="text-center text-4xl font-bold pt-36">Olá! Pesquise algum repositório do GitHub aqui!</h2>

      <form
        onSubmit={handleSubmit(HandleSearchApi)}
        className="m-4 flex justify-center"
      >
        {
          loading === true ? (
            <Input
              aria-label="Buscando..." //para acessbilidade
              className="h-[60px] w-[800px] max-sm:w-full max-md:w-[400px]"
              shadow={false}
              status="default"
              disabled
              bordered
              animated={true}
              color="primary"
              placeholder="Loading..."
              contentRight={<Loading size="xs" />}
            />
          ) : (
            <Input
              aria-label="Digite algo para pesquisar repositórios do github" //para acessbilidade
              {...register('search', { required: true })}
              className="h-[60px] w-[800px] max-sm:w-full max-md:w-[400px]"
              shadow={false}
              status="default"
              animated={true}

              clearable
              contentRightStyling={false}
              placeholder="Pesquisar..."
              contentRight={
                <SendButton key={2}>
                  <TelegramLogo className="text-slate-100" />
                </SendButton>
              }
            />
          )
        }
      </form>

      {
        loading === true ? (
          <div className="w-full py-40">
            <LoadingComponent />
          </div>
        ) : (
          isError === true ? (
            <ErrorSearch />
          ) : (
            <div className="grid grid-cols-3 gap-3 mx-4 max-md:block">
              {
                listResult.length == 0 ? (
                  <div></div>
                ) : listResult.map((element: CardItemProps) => (
                  <CardItem key={element.id} props={element} />
                ))
              }
            </div>
          )
        )
      }


      <div className="flex justify-center my-10">
        {
          isError === true ? null : (
            listResult.length > 0 ? (
              <Pagination
                shadow
                noMargin
                total={totalItens / 30 > Math.round(totalItens / 30) ? Math.round(totalItens / 30) + 1 : Math.round(totalItens / 30)}
                initialPage={1}
                onChange={(page: number) => {
                  handleSearchApiPage(search, page)
                }}
              />
            ) : null
          )
        }

      </div>
    </main>
  )
}
