import ideasApi from '../services/ideasApi';
import IdeaList from './IdeaList';

class IdeaForm {
  constructor() {
    this._formModal = document.querySelector('#form-modal');
    this._ideaList = new IdeaList();
  }

  addEventListeners() {
    this._form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  /**
   * @param {Event} e - submit event.
   */
  async handleSubmit(e) {
    e.preventDefault();
    const username = this._form.elements.username.value;

    if (
      !this._form.elements.text.value ||
      !this._form.elements.tag.value ||
      !username
    ) {
      alert('Please enter all fields');
      return;
    }

    // Save user to local storage
    localStorage.setItem('username', username);

    const idea = {
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
      username: username,
    };

    // Add idea to server
    const newIdea = await ideasApi.createIdea(idea);

    // Add idea to List
    this._ideaList.addIdeaToList(newIdea.data);

    // Clear fields
    this._form.elements.text.value = '';
    this._form.elements.tag.value = '';
    this._form.elements.username.value = '';

    this.render();

    document.dispatchEvent(new Event('closeModal'));
  }

  render() {
    this._formModal.innerHTML = `
    <form id="idea-form">
      <div class="form-control">
        <label for="idea-text">Enter a Username</label>
        <input type="text" name="username" id="username" value="${localStorage.getItem('username') ? localStorage.getItem('username') : ''}" />
      </div>
      <div class="form-control">
        <label for="idea-text">What's Your Idea?</label>
        <textarea name="text" id="idea-text"></textarea>
      </div>
      <div class="form-control">
        <label for="tag">Tag</label>
        <input type="text" name="tag" id="tag" />
      </div>
      <button class="btn" type="submit" id="submit">Submit</button>
    </form>`;

    this._form = document.querySelector('#idea-form');
    this.addEventListeners();
  }
}

export default IdeaForm;
