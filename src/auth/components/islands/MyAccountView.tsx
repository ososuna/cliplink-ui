import { Provider, type User } from '@/auth/entities/user.entity';
import { Avatar, Badge } from '@/styled-components';
import GithubIcon from '@/assets/icons/GithubIcon';
import GoogleIcon from '@/assets/icons/GoogleIcon';

interface Props {
  user: User;
}
const MyAccountView = ({ user }: Props) => {

  return (
    <>
      <div className="flex items-center space-x-4">
        <Avatar className="w-20 h-20 text-3xl flex items-center justify-center bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100">
          {user.lastName
            ? `${user.firstName.charAt(0).toUpperCase()}${user.lastName.charAt(0).toUpperCase()}`
            : `${user.firstName.charAt(0).toUpperCase()}`
          }
        </Avatar>
        <div>
          <div className="flex items-center space-x-2">
            {user.lastName
              ? <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
              : <h2 className="text-2xl font-bold">{user.firstName}</h2>
            }
            {user.linkedProviders.includes(Provider.GITHUB) && (
              <Badge variant="secondary" className="flex items-center space-x-1">
                <GithubIcon className="h-3 w-3" /><span>GitHub</span>
              </Badge>
            )}
            {user.linkedProviders.includes(Provider.GOOGLE) && (
              <Badge variant="secondary" className="flex items-center space-x-1">
                <GoogleIcon className="h-3 w-3" /><span>Google</span>
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>
    </>
  );
}

export default MyAccountView;