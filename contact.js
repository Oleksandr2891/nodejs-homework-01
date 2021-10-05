const fs = require("fs").promises;

const path = require("path");

const contactsPath = path.join(__dirname, "./db/contact.json");

async function listContacts() {
  const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  const result = await contacts.map((item) => {
    return {
      Id: item.id,
      Name: item.name,
      Email: item.email,
      Phone: item.phone,
    };
  });
  return console.table(result);
}

// listContacts();

async function getContactById(contactId) {
  const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  const result = await contacts.find((item) => {
    if (item.id === +contactId)
      return {
        Id: item.id,
        Name: item.name,
        Email: item.email,
        Phone: item.phone,
      };
  });
  return console.table(result);
}

// getContactById(12);

async function removeContact(contactId) {
  const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));

  const result = await contacts.filter((item) => {
    if (item.id !== +contactId)
      return {
        Id: item.id,
        Name: item.name,
        Email: item.email,
        Phone: item.phone,
      };
  });
  fs.writeFile(contactsPath, JSON.stringify(result));
  return console.table(result);
}

// removeContact(12);

async function addContact(name, email, phone) {
  const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));

  const getId = () => {
    const arrId = contacts.map((item) => +item.id);
    const maxId = Math.max(...arrId);
    return maxId + 1;
  };

  const getContact = (name, email, phone) => {
    return {
      id: getId(),
      name,
      email,
      phone,
    };
  };

  const updateContacts = [...contacts, getContact(name, email, phone)];

  fs.writeFile(contactsPath, JSON.stringify(updateContacts));

  const result = await updateContacts.map((item) => {
    return {
      Id: item.id,
      Name: item.name,
      Email: item.email,
      Phone: item.phone,
    };
  });
  return console.table(result);
}

// addContact("Allen Raymond", "nulla.ante@vestibul.co.uk", "(992) 914-3792");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
