"use client";
import Image from 'next/image' // para usar imagem com o next

// componetes
import { Badge, Grid } from '@nextui-org/react'
import { ArrowSquareOut } from '@phosphor-icons/react' // icone

// tipagens
interface Props {
    props: {
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
}

export function CardItem(props: Props) {
    return (
        <div
            key={props.props.id}
            aria-label={props.props.description}
            aria-labelledby={props.props.description}
            className="h-fit bg-zinc-900 border-2 border-zinc-800 p-4 m-2 rounded-xl max-md:my-5 text-slate-100"
        >
            <div className="flex flex-1 items-center">
                <Image
                    className="w-[30px] h-[30px] rounded-full"
                    width={30}
                    height={30}
                    src={props.props.owner.avatar_url}
                    alt={props.props.full_name}
                />
                <h2 className="mx-2 text-xl">{props.props.full_name}</h2>

            </div>

            <p className="text-base py-4">{props.props.description ? props.props.description.toString().substring(0,300): props.props.description}</p>
            {
                props.props.topics.length == 0 ? (
                    <div></div>
                ) : (
                    <Grid.Container gap={1}>
                        {
                            props.props.topics.map((element: string) => (
                                <Grid key={element}>
                                    <Badge
                                        key={element}
                                        color={"default"}
                                        disableOutline
                                        variant="flat"
                                    >
                                        {element}
                                    </Badge>
                                </Grid>
                            ))
                        }
                    </Grid.Container>
                )
            }
            <p className="text-base">{props.props.language}</p>
            <a
                className="text-gray-500 flex py-2"
                href={props.props.html_url}
                target="_blank"
            >
                <ArrowSquareOut weight="bold" /> {props.props.name}
            </a>
        </div>
    )
}