import { useState } from 'react';
import { LogOut } from 'lucide-react';
import useLogout from '@/auth/components/islands/hooks/use-logout';
import { useToast } from '@/hooks/use-toast';
import { Messages } from '@/config';
import { Avatar } from '@/styled-components';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/styled-components';

interface Props {
  name: string;
  lastName: string;
}

const AuthDropdown = ({ name, lastName }: Props) => {

  // Workaround for https://github.com/withastro/astro/issues/10863
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout } = useLogout();
  const { toast } = useToast();

  const onLogout = async () => {
    const result = await logout();
    if (result.ok) {
      window.location.href = '/';
    } else {
      toast({
        title: 'Error',
        description: result.error || Messages.INTERNAL_SERVER_ERROR,
        variant: 'destructive',
      });
    }
  }

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={(val: boolean) => setDropdownOpen(val)}>
      <DropdownMenuTrigger asChild onClick={() => { setDropdownOpen((val) => !val); }}>
        <Avatar aria-label={lastName ? `${name} ${lastName}` : `${name}`}
          className="w-8 h-8 flex items-center justify-center bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100">
          {lastName
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
