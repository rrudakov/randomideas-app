class IdeasApi {
  constructor() {
    this._apiUrl = 'http://localhost:5000/api/ideas';
  }

  async getIdeas() {
    const response = await fetch(this._apiUrl);
    return await response.json();
  }

  async createIdea(data) {
    const response = await fetch(this._apiUrl, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }

  async updateIdea(id, data) {
    const response = await fetch(`${this._apiUrl}/${id}`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }

  async deleteIdea(id) {
    const username = localStorage.getItem('username')
      ? localStorage.getItem('username')
      : '';
    const response = await fetch(`${this._apiUrl}/${id}`, {
      method: 'delete',
      body: JSON.stringify({
        username: username,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }
}

export default new IdeasApi();
