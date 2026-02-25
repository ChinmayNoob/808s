"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <header className="mb-4 flex items-center justify-between">
                <span className="text-lg font-bold font-courier-prime tracking-wide text-orange-500/80">
                    808s
                </span>
                <div className="w-5 h-5" />
            </header>
        );
    }

    return (
        <header className="mb-4 flex items-center justify-between">
            <span className="text-lg font-bold font-courier-prime tracking-wide text-orange-500/80">
                808s
            </span>
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
        </header>
    )
}
