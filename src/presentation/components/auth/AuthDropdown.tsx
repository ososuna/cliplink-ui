import { LogOut } from 'lucide-react';

import { AuthServiceImpl, AuthViewServiceImpl } from '@/infrastructure';

import { useService } from '@/presentation/hooks/use-service';
import { Avatar } from '@/presentation/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/presentation/components/ui/dropdown-menu';

interface Props {
  name: string;
  lastName: string;
}

const AuthDropdown = ({ name, lastName }: Props) => {

  const authService = useService(AuthServiceImpl, AuthViewServiceImpl);

  const onLogout = async () => {
    await authService?.logout();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-8 h-8 bg-zinc-100 flex items-center justify-center">
          {`${name.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{`${name} ${lastName}`}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => window.location.href='/dashboard'}>Dashboard</DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.location.href='/my-account'}>My Account</DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout}><LogOut /> Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AuthDropdown;