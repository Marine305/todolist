class PeopleView {
    #container;
    isInit = false;
    constructor() {
        this.#container = document.createElement('div');
    }
    init(data) {
        if (!this.isInit) {
            document.body.append(this.#container);
            this.nameInput = document.createElement('input');
            this.surnameInput = document.createElement('input');
            this.addButton = document.createElement('button');
            this.addButton.innerText = `Add`;
            this.addButton.addEventListener('click', () => {
                this.onAddbuttonClick()
            });
            this.#container.append(this.nameInput);
            this.#container.append(this.surnameInput);
            this.#container.append(this.addButton);

            data.forEach((person) => {
                this.appendCard(person);
            })

            document.body.append(this.#container);

            this.isInit = true
        }
    }
    appendCard(person) {
        const card = document.createElement('div');
        const cardId = person._id;
        card.id = cardId;

        const nameInput = document.createElement('input');
        nameInput.value = person.name
        nameInput.disabled = true;

        const surnameInput = document.createElement('input');
        surnameInput.value = person.name
        surnameInput.disabled = true;

        const deleteButton = document.createElement('button')
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => {
            this.onDeleteButtonClick(cardId);
        });

        const editButton = document.createElement('button')
        editButton.innerText = 'Edit';
        
        const saveButton = document.createElement('button')
        saveButton.innerText = 'Save';
        saveButton.hidden = true;

        editButton.addEventListener('click', () => {
            nameInput.disabled = false;
            surnameInput.disabled = false;
            editButton.hidden = true;
            saveButton.hidden = false;
        });

        saveButton.addEventListener('click', () => {
            nameInput.disabled = true;
            surnameInput.disabled = true;
            editButton.hidden = false;
            saveButton.hidden = true;
            this.onSaveButtonClick({name: nameInput.value, surname: surnameInput.value, cardId: cardId})
        });
        


        card.append(nameInput);
        card.append(surnameInput);
        card.append(editButton);
        card.append(saveButton);
        card.append(deleteButton);
        this.#container.append(card);
    }

    removeCard(id) {
        document.getElementById(id).remove();
    }
}

const peopleView = new PeopleView();

export default peopleView;
