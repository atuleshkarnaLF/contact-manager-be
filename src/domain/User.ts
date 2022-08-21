export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: number;
  photograph: string;
}

export type CreateContact = Omit<Contact, "id">;
