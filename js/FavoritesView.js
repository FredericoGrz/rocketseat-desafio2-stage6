import { Favorites } from "./Favorites.js";

export class FavoritesView extends Favorites {
  constructor() {
    super()
    this.createButtonEvents()
    this.update()
  }

  createButtonEvents() {
    const buttonSearch = document.querySelector(".search button")
    buttonSearch.onclick = () => {
      const { value } = document.querySelector(".search input")
      this.add(value)
    }
  }

  update() {
    this.removeRows()
    const tbody = document.querySelector("table tbody")
    const thereIsFavorites = this.entries.length > 0
    if (thereIsFavorites) {
      this.hideEmptyListMessage(true)
      this.entries.forEach(entry => {
        const row = this.createRow(entry)
        const button = row.querySelector("button")

        button.onclick = () => {
          this.delete(entry.login)
        }
        tbody.append(row)
      })
    }
    else {
      this.hideEmptyListMessage(false)
    }
  }

  hideEmptyListMessage(hide) {
    const message = document.querySelector(".empty-list")
    if (hide) {
      message.classList.add("hidden")
    }
    else {
      message.classList.remove("hidden")
    }
  }

  createRow(entry) {
    const tr = document.createElement("tr")
    tr.innerHTML = `<tr>
    <td class="user">
      <img class="user-image" src="https://github.com/${entry.login}.png" alt="">
      <div class="user-info">
        <p class="user-name">${entry.name}</p>
        <p class="user-login">@${entry.login}</p>
      </div>
    </td>
    <td class="repositories">${entry.public_repos}</td>
    <td class="followers">${entry.followers}</td>
    <td class="action">
      <button>Remover</button>
    </td>
  </tr>`

    return tr
  }

  removeRows() {
    const tbody = document.querySelector("table tbody")
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }
}