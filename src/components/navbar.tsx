"use client"

import { Menu, Sparkles } from "lucide-react"
import { Poppins } from "next/font/google";
import Link from "next/link";


import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import * as React from "react"



const font = Poppins({
    weight: "600",
    subsets: ["latin"]
})


export const Navbar = () => {


    return (
        <div className="fixed  w-full z-50 flex justify-between
        items-center py-2 px-4 border-b border-primary/10 
        bg-secondary h-16">
            <div className="flex items-center px-5">
                <Link href="/" >
                    <h1 className={cn("hidden md:block text-xl md:text-3xl font-bold text-primary",
                    font.className)}>
                        YOROZAYA
                    </h1>
                </Link>

            </div>
            <div className="flex items-center gap-x-3">
                <Button size="sm">
                    Upgrade
                    <Sparkles className="h4 w-4 fill-white text-white ml2"/>
                </Button>
            </div>
        </div>
    )
}
