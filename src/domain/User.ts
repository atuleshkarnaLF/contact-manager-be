export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: number;
  photograph: string;
}

export type CreateContact = Omit<Contact, "id">;

export interface User {
  id: number;
  email: string;
  password: string;
}
export type UserToInsert = Omit<User, "id">;
