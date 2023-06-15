export class Favorites {
  entries = []
  constructor() {
    this.load()
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem("@github-favorites:")) || []
    console.log(this.entries)
  }

  async add(username) {
    try {
      console.log(this.entries)
      const userAlreadyExists = this.entries.find(entry => entry.login.toUpperCase() === username.toUpperCase())

      if (userAlreadyExists)
        throw new Error("Usuario ja adicionado")

      const user = await this.buscarGithubUser(username)
      console.log(user)
      if (user.login === undefined)
        throw new Error("Usuario nao encontrado no github")

      this.entries = [user, ...this.entries]
      this.save()
      this.update()

    } catch (error) {
      alert(error.message)
    }
  }

  save() {
    localStorage.setItem("@github-favorites:", JSON.stringify(this.entries))
  }

  delete(username) {
    this.entries = this.entries.filter(entry => entry.login !== username)
    this.save()
    this.update()
  }

  buscarGithubUser(username) {
    const endpoint = `https://api.github.com/users/${username}`

    return fetch(endpoint).then(data => data.json()).then(({ login,
      name,
      public_repos,
      followers
    }) => {
      return {
        login,
        name,
        public_repos,
        followers
      }
    })
  }
}