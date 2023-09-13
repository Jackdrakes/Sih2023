"use client"
//Navbar for settings
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"


export const SettingsNav = () => {
    const pathname = usePathname()
    const router = useRouter()

    const routes = [
        {
            href: "/settings/profile",
            label: "Account",
            pro: false
        },
        {
            href: "",
            label: "Notifications",
            pro: true
        },
        {
            href: "",
            label: "Billing",
            pro: false
        },
    ]

    const onNavigate = (url: string,pro: boolean ) =>{
        //TODO: check if pro

        return router.push(url)
    }

    return (

        <div className="w-full z-50 flex justify-between items-center py-2 px-4 border-b border-neutral-800
        bg-secondary h-10">
            <div className="flex items-center">
                    {routes.map((route) => (
                        <div 
                        onClick={() => onNavigate(route.href, route.pro)}
                        key = {route.href}
                        className={cn(
                            "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-gray-300/20 rounded-lg transition",
                            pathname === route.href && "bg-primary/10 text-primary"
                        )}>
                            <div className="flex flex-row gap-x-2 items-center flex-1">
                                {route.label}
                            </div>
                            
                        </div>
                    ))}
            </div>
        </div>
    )
}