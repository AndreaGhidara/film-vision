export default function CardMovie({ lastPartOfPath }: { lastPartOfPath: string }) {
    return (
        <picture className="w-[180px] sm:h-[250px] rounded-md bg-slate-300 hover:opacity-80 hover:shadow-2xl ">
            <img src={`https://image.tmdb.org/t/p/original${lastPartOfPath}`} className="w-full h-full object-contain rounded-md hover:border-2 border-white" />
        </picture>
    )
}
