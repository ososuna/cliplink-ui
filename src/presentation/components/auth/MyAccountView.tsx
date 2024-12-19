import type { User } from '@/domain'

import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/card'
import { Avatar } from '@/presentation/components/ui/avatar'

interface Props {
  user: User
}
const ProfileView = ({ user }: Props) => {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20 bg-zinc-100 text-3xl flex items-center justify-center">
            {`${user.name.charAt(0).toUpperCase()}${user.lastName.charAt(0).toUpperCase()}`}
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{user.name} {user.lastName}</h2>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div>
          <p className="flex items-center">
            <span className="text-2xl font-bold mr-2">42</span>
            URLs shortened
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProfileView;