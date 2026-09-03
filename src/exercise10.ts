import * as crypto from "node:crypto";

export type UserAccount = {
  id: string;
  createdAt: Date;
  email: string;
  passwordHash: string;
  profile: {
    bio: string;
    avatarUrl: string;
  };
};

export class UserRegistry {
  private users: Map<string, UserAccount> = new Map();

  public registerUser(
    data: Omit<UserAccount, "id" | "createdAt">,
  ): UserAccount {
    const id = crypto.randomUUID();

    const user: UserAccount = {
      ...data,
      id,
      createdAt: new Date(),
    };

    this.users.set(id, user);

    return user;
  }

  public getUserView(
    id: string,
  ): Readonly<
    Pick<UserAccount, "id" | "email" | "profile">
  > | undefined {
    const user = this.users.get(id);

    if (!user) {
      return undefined;
    }

    return {
      id: user.id,
      email: user.email,
      profile: user.profile,
    };
  }
}
