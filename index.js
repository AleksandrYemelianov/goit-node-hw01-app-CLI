const contactsAPI = require('./contacts')
const { Command } = require('commander');

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contactsAPI.listContacts();
      return console.table(allContacts);
   
    case 'get':
      const contact = await contactsAPI.getContactById(id)
      return console.log(contact);

    case 'add':
      const createContact = await contactsAPI.addContact(name, email, phone)
      return console.log(createContact);

    case 'remove':
      const deleteContact = await contactsAPI.removeContact(id)
      return console.log(deleteContact);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);