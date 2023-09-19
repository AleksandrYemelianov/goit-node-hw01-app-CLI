const fs = require('fs').promises;
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.join(__dirname, "db/contacts.json");

const updateContacts = (contacts) => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))

const listContacts = async () => {
    const data = await fs.readFile(contactsPath)

    return JSON.parse(data);
};

const getContactById = async (contactId) => {
    const id = String(contactId)

    const contacts = await listContacts();
    const [result] = contacts.filter(contact => contact.id === id)
    return result || null;
};

const addContact = async ( name, email, phone ) => {
    const contacts = await listContacts();

    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    };
    contacts.push(newContact)

    await updateContacts(contacts);

    return newContact
};

const removeContact = async (contactId) => {
    const id = String(contactId)

    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === id)

    if (index === -1) {return null}

    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);

    return result || null;
};

const contactsAPI = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}

module.exports = contactsAPI;