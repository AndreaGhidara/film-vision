import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { decrement, increment } from "@/stores/counter/counterSlice"
import { RootState } from "@/store"

export default function FavoritesFilmPage() {

    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()
    return (
        <>
            <div>
                <div>
                    <Button
                        aria-label="Increment value"
                        onClick={() => dispatch(increment())}
                    >
                        Increment
                    </Button>
                    <span>{count}</span>
                    <Button
                        aria-label="Decrement value"
                        onClick={() => dispatch(decrement())}
                    >
                        Decrement
                    </Button>
                </div>
            </div>
        </>
    )
}
