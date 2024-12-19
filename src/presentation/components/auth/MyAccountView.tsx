import { GithubIcon } from 'lucide-react';

import type { User } from '@/domain';

import { Avatar } from '@/presentation/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/card';
import { Badge } from '@/presentation/components/ui/badge';

interface Props {
  user: User;
  urlsCount: number;
}
const ProfileView = ({ user, urlsCount }: Props) => {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20 bg-zinc-100 text-3xl flex items-center justify-center">
            {user.lastName
              ? `${user.name.charAt(0).toUpperCase()}${user.lastName.charAt(0).toUpperCase()}`
              : `${user.name.charAt(0).toUpperCase()}`
            }
          </Avatar>
          <div>
            <div className="flex items-center space-x-2">
              {user.lastName
                ? <h2 className="text-2xl font-bold">{user.name} {user.lastName}</h2>
                : <h2 className="text-2xl font-bold">{user.name}</h2>
              }
              {user.githubId && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <GithubIcon className="h-3 w-3" /><span>GitHub</span>
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div>
          <p className="flex items-center">
            <span className="text-2xl font-bold mr-2">{urlsCount}</span>
            URLs shortened
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProfileView;