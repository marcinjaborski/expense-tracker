import { ComponentProps } from "react";
import { IconType } from "react-icons";

import { Link } from "@/navigation";

type OtherLinkProps = {
  title: string;
  Icon: IconType;
  href: ComponentProps<typeof Link>["href"];
};

export function OtherLink({ title, href, Icon }: OtherLinkProps) {
  return (
    <Link href={href} className="btn flex aspect-square h-20 flex-col p-3">
      <Icon className="text-2xl" />
      <div>{title}</div>
    </Link>
  );
}
