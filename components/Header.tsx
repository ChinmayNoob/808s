"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function Header() {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <header className="mb-4 flex items-center justify-between">
                <span className="text-lg font-bold font-courier-prime tracking-wide text-orange-500/80">
                    808s
                </span>
                <div className="flex items-center gap-1">
                    <div className="size-9" />
                    <div className="size-9" />
                </div>
            </header>
        );
    }

    return (
        <header className="mb-4 flex items-center justify-between">
            <span className="text-lg font-bold font-courier-prime tracking-wide text-orange-500/80">
                808s
            </span>
            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
                <Link
                    href={"https://github.com/chinmaynoob"}
                    target="_blank"
                    className={
                        cn(
                            buttonVariants({
                                variant: "ghost",
                                size: "icon",
                            }),
                        )
                    }
                >
                    {resolvedTheme === "dark" ? (
                        <Image src={"/github_dark.svg"} alt="github" width={20} height={20} />
                    ) : (
                        <Image
                            src={"/github_light.svg"}
                            alt="github"
                            width={20}
                            height={20}
                        />
                    )}
                </Link>
            </div>
        </header>
    )
}
