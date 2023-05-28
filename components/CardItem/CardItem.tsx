"use client";
import Image from 'next/image' // para usar imagem com o next

// componetes
import { Badge, Grid, Card, Text, Link } from '@nextui-org/react'
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
        <Card
            key={props.props.id}
            aria-label={props.props.description}
            css={{ p: "$6", mw: "400px" }}
            className="max-md:m-4"
        >
            <Card.Header>
                <Image
                    className="w-[30px] h-[30px] rounded-full"
                    width={30}
                    height={30}
                    src={props.props.owner.avatar_url}
                    alt={props.props.full_name}
                />
                <Grid.Container css={{ pl: "$6" }}>
                    <Grid xs={12}>
                        <Text className="text-2xl" b css={{ lineHeight: "$xs" }}>
                            {props.props.full_name}
                        </Text>
                    </Grid>
                </Grid.Container>
            </Card.Header>
            <Card.Body css={{ py: "$2" }}>
                <Text>
                    {props.props.description ? props.props.description.toString().substring(0, 300) : props.props.description}
                </Text>
            </Card.Body>
            <Card.Footer>
                <Link
                    color="primary"
                    target="_blank"
                    href={props.props.html_url}
                >
                    {props.props.name} <ArrowSquareOut weight="bold" className="mx-1"/>
                </Link>
            </Card.Footer>
        </Card>
    )
}