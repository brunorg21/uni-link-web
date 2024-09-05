import { useLocation, useNavigate } from "react-router-dom";

import { icons } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface NavButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  name: keyof typeof icons;
  text: string;
  to: string;
}

export function NavButton({ name, text, to, ...props }: NavButtonProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const LucideIcon = icons[name];

  const currentPage = pathname === to;

  return (
    <>
      <Button
        variant={"ghost"}
        className={`flex gap-4 items-center text-white hover:text-primary text-md p-6 ${
          currentPage && "bg-white text-primary"
        }`}
        {...props}
        onClick={() => {
          navigate(to);
        }}
      >
        <LucideIcon size={25} />

        {text}
      </Button>
      <Separator className="opacity-30" />
    </>
  );
}
