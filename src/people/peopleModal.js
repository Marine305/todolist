const baseURL = 'https://crudcrud.com/api/bd9a3369fd2e4a0e8561b5c6a27e9a05';
const defaultOptions = {
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
}
class PeopleModal {
  constructor() {
    this.data = [];
  }

  getData() {
    return this.data;
  }

  init() {
    return fetch(`${baseURL}/people`)
      .then(response => response.json())
      .then(data => {
        this.data = data;
      });
  }

  addPerson(person) {
    return fetch(`${baseURL}/people`, {
      method: 'POST',
      body: JSON.stringify(person),
      ...defaultOptions
    })
      .then(response => response.json())
      .then(person => {
        this.data.push(person);
        return Promise.resolve(person);
      });
  }

  deletePerson(id) {
    return fetch(`${baseURL}/people/${id}`, {
      method: 'DELETE',
      ...defaultOptions
    })
      .then(response => {
        if (response.status === 200) {
          const index = this.data.findIndex(person => person._id === id);
          console.log(this.data);
          this.data.splice(index, 1);
          console.log(this.data);
          return response.text();
        }
      });
  }

  updatePerson(newPerson) {
    return fetch(`${baseURL}/people/${newPerson.cardId}`, {
      method: 'PUT',
      body: JSON.stringify({ name: newPerson.name, surname: newPerson.surname }),
      ...defaultOptions
    })
      .then(response => {
        if (response.status === 200) {
          const index = this.data.findIndex(person => person._id === newPerson.cardId);
          this.data.splice(index, 1, newPerson);
          console.log(this.data);
          return response.text();
        }
      });
  }
}

const peopleModal = new PeopleModal();

export default peopleModal;
