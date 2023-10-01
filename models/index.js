import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");
const updateContact = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));


export const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

export const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === id)
  return result || null;

};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId)
  if (index === -1) return null;

  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;

};

export const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContacts = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContacts;

};

export const updateContactById = async (contactId, body) => {
const { name, email, phone } = body;
 const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
 if(index === -1) {
        return null;
  }
   contacts[index] = { id: contactId, name, email, phone};
   await updateContact(contacts);
    return contacts[index];

}


