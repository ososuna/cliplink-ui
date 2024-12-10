import { AuthServiceImpl } from '@/infrastructure';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/presentation/components/ui/dropdown-menu';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/presentation/components/ui/avatar';

import { AuthViewService } from '@/presentation';

interface Props {
  name: string;
  lastName: string;
}

const onLogout = () => {
  new AuthViewService(new AuthServiceImpl()).logout();
}

const AuthDropdown = ({ name, lastName }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center cursor-pointer">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>{`${ name.charAt(0).toUpperCase() }${ lastName.charAt(0).toUpperCase() }`}</AvatarFallback>
          </Avatar>
          <span className="ml-2">{`${ name } ${ lastName }`}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={ onLogout }>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AuthDropdown;