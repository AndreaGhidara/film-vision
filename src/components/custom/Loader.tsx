import '@/styles/loader.css'

export default function Loader() {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className="cssloader">
                <div className="loader_triangle1"></div>
                <div className="loader_triangle2"></div>
                <p className="loader_text">Please Wait</p>
            </div>
        </div>
    )
}
