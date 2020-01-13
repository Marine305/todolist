import PeopleView from './PeopleView';
import PeopleModal from './PeopleModal';

class PeopleController {
    #modal;
    #view;

    constructor(PeopleView, PeopleModal) {
        this.#modal = PeopleModal
        this.#view = PeopleView
    }

    init() {
        this.#modal.init().then(() => {
            this.#view.init(this.#modal.data);
        });
        this.#view.onAddbuttonClick = this.addPerson.bind(this);
        this.#view.onDeleteButtonClick = this.deletePerson.bind(this);
        this.#view.onSaveButtonClick = this.updatePerson.bind(this);
    }

    addPerson() {
        const name = this.#view.nameInput.value;
        const surname = this.#view.surnameInput.value;
        const person = { name, surname };
        this.#modal.addPerson(person)
            .then((data) => {
                this.#view.appendCard(data);
            })
    }

    deletePerson(id) {
        this.#modal.deletePerson(id)
            .then(() => {
                // console.log(data)
                this.#view.removeCard(id);
            })

    }

    updatePerson(person) {
        this.#modal.updatePerson(person);
    }
}
const peopleController = new PeopleController(PeopleView, PeopleModal);

export default peopleController;