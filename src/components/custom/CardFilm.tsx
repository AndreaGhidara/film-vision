import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { Link } from "react-router-dom"
import { MovieInterface } from "@/types"


export default function CardFilm({ id, title, release_date, overview, vote_average, poster_path }: MovieInterface) {
    return (
        <Card className="flex justify-center items-center">
            <div className="p-2 min-w-[200px] max-w-[200px] h-full">
                <img src={`https://image.tmdb.org/t/p/original${poster_path}`} className="rounded-lg object-cover border-2 border-black shadow-xl" />
            </div>
            <div className="flex flex-col justify-between flex-1">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-sm flex gap-5">
                        {release_date.split("-")[0]}
                    </CardDescription>
                    <div className="flex gap-2">
                        <Star className="h-6 w-6 fill-yellow-500" /><span> {Math.round(vote_average) / 2}</span>
                    </div>
                </CardHeader>
                <CardContent className="text-sm min-h-[140px] max-h-[140px] text-ellipsis overflow-hidden text-wrap">
                    {overview}
                </CardContent>
                <CardFooter>
                    <Link to={`/film/${id}`}>
                        <Button>
                            More info {id}
                        </Button>
                    </Link>
                </CardFooter>
            </div>
        </Card>
    )
}
