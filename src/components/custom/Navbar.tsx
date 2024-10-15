import {
    CircleUser,
    Clapperboard,
    Menu,
    Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link } from "react-router-dom"

const navLinks = [
    {
        name: "Home",
        path: "/",
        icon: ""
    },
    {
        name: "Movies",
        path: "/movies",
        icon: ""
    },
    {
        name: "Favorites",
        path: "/favorites",
        icon: ""
    },
]

export default function Navbar() {
    return (
        <>
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    to="#"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <Clapperboard className="h-6 w-6" />
                    <span className="sr-only">Film Vision</span>
                </Link>
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        to={link.path}
                        className="text-foreground transition-colors hover:text-foreground"
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            to="#"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <Clapperboard className="h-6 w-6" />
                            <span className="sr-only">Film Vision</span>
                        </Link>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-foreground transition-colors hover:text-foreground"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">

                <form className="ml-auto flex-1 sm:flex-initial">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            onClick={() => { console.log('click'); }}
                            placeholder="Search film..."
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                        />
                    </div>
                </form>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <CircleUser className="h-5 w-5" />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}
