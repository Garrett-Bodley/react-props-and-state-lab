import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.rootPath = '/api/pets'

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleFilter = (e) => {
    this.setState(
      Object.assign({}, this.state, {
        filters: {
          type: e.target.value
        }
      })
    )
  }

  findPets = () => {
    const submitURL = this.state.filters.type === 'all' ? this.rootPath : this.rootPath + `?type=${this.state.filters.type}`
    fetch(submitURL).then(resp => resp.json()).then(json => this.setState({pets: json}))
  }

  onAdoptPet = (id) => {
    this.setState(prevState => {
      const index = prevState.pets.findIndex(pet => pet.id === id)
      return {pets: [...prevState.pets.slice(0, index), Object.assign({}, prevState.pets[index], {isAdopted: true}), ...prevState.pets.slice(index + 1)]}
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleFilter} onFindPetsClick={this.findPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
