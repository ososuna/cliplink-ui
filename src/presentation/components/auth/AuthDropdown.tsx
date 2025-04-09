import { useState } from 'react';
import { LogOut } from 'lucide-react';

import { AuthRepositoryImpl, AuthServiceImpl } from '@/infrastructure';

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

  const authService = useService(AuthRepositoryImpl, AuthServiceImpl);
  
  // Workaround for https://github.com/withastro/astro/issues/10863
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const onLogout = async () => {
    await authService?.logout();
  }

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={(val) => setDropdownOpen(val)}>
      <DropdownMenuTrigger asChild onClick={() => { setDropdownOpen((val) => !val); }}>
        <Avatar aria-label={lastName ? `${name} ${lastName}` : `${name}`}
          className="w-8 h-8 flex items-center justify-center bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100">
          { lastName
            ? `${name.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`
            : `${name.charAt(0).toUpperCase()}`
          }
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {lastName
          ? <DropdownMenuLabel>{`${name} ${lastName}`}</DropdownMenuLabel>
          : <DropdownMenuLabel>{`${name}`}</DropdownMenuLabel>
        }
        <DropdownMenuSeparator />
        <a href="/dashboard">
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
        </a>
        <a href="/my-account">
          <DropdownMenuItem>My Account</DropdownMenuItem>
        </a>
        <DropdownMenuItem onClick={onLogout}><LogOut /> Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AuthDropdown;