import ideasApi from '../services/ideasApi';

class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector('#idea-list');
    this._ideas = [];
    this.getIdeas();
    this._validTags = new Set();
    this._validTags.add('business');
    this._validTags.add('technology');
    this._validTags.add('software');
    this._validTags.add('education');
    this._validTags.add('health');
    this._validTags.add('inventions');
  }

  addEventListeners() {
    this._ideaListEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-times')) {
        e.stopImmediatePropagation();
        const ideaId = e.target.parentElement.parentElement.dataset.id;
        this.deleteIdea(ideaId);
      }
    });
  }

  async getIdeas() {
    try {
      const response = await ideasApi.getIdeas();
      this._ideas = response.data;
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteIdea(ideaId) {
    try {
      // Delete from server
      await ideasApi.deleteIdea(ideaId);
      this.getIdeas();
    } catch (error) {
      alert('You cannot delete this resource');
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  getTagClass(tag) {
    const tagLowerCase = tag.toLowerCase();

    if (this._validTags.has(tagLowerCase)) {
      return `tag-${tagLowerCase}`;
    } else {
      return '';
    }
  }

  render() {
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        const deleteBtn =
          idea.username === localStorage.getItem('username')
            ? '<button class="delete"><i class="fas fa-times"></i></button>'
            : '';
        return `
          <div class="card" data-id="${idea._id}">
            ${deleteBtn}
            <h3>
              ${idea.text}
            </h3>
            <p class="tag ${this.getTagClass(idea.tag)}">${idea.tag.toUpperCase()}</p>
            <p>
              Posted on <span class="date">${idea.date}</span> by
              <span class="author">${idea.username}</span>
            </p>
          </div>`;
      })
      .join('');

    this.addEventListeners();
  }
}

export default IdeaList;
