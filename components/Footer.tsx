import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-16 font-courier-prime">
      <p className="text-center text-muted-foreground text-xs">
        Copyright-{new Date().getFullYear()}@808s
      </p>
      <p className="text-center text-muted-foreground text-xs">
        Create with 💙 by{" "}
        <Link
          href={"https://github.com/chinmaynoob"}
          target="_blank"
          className="text-blue-500 "
        >
          Chinmay
        </Link>
      </p>
    </footer>
  );
}
