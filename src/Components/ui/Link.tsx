import { Link as RouterLink } from "@tanstack/react-router";
import type { AnchorHTMLAttributes, ReactNode } from "react";

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: ReactNode;
}

function isInternalRoute(href: string) {
  return href.startsWith("/") && !href.startsWith("//") && !href.includes("#");
}

export default function Link({ href, children, ...props }: LinkProps) {
  if (isInternalRoute(href)) {
    return (
      <RouterLink to={href} {...props}>
        {children}
      </RouterLink>
    );
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
