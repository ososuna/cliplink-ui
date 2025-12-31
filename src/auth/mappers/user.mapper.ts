import { User } from "@/auth/entities";
import { Messages } from "@/config";

// map user object to entity
export class UserMapper {
  static userFromObject(object: { [key: string]: any }): User {
    const { id, firstName, lastName, email, role, linkedProviders } = object;

    if (!id) throw new Error(Messages.REQUIRED_FIELD('id'));
    if (!firstName) throw new Error(Messages.REQUIRED_FIELD('first name'));
    if (!lastName) throw new Error(Messages.REQUIRED_FIELD('last name'));
    if (!email) throw new Error(Messages.REQUIRED_FIELD('email'));
    if (!role) throw new Error(Messages.REQUIRED_FIELD('role'));

    return new User(id, firstName, lastName, email, role, linkedProviders);
  }
}
