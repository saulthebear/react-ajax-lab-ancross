import { useEffect, useState } from "react"
import DisplayCards from "./componets/DisplayCards"

function App() {
  const [data, setData] = useState({ villagers: [] })

  const [search, setSearch] = useState("")

  const [faves, setFaves] = useState([])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleAddFave = (villager) => {
    const faveIds = faves.map((fave) => fave.id)

    if (!faveIds.includes(villager.id)) {
      setFaves([...faves, villager])
    }
  }

  const handleRemoveFave = (villager) => {
    const idx = faves.indexOf(villager)
    const newFaves = [...faves]
    if (idx >= 0) {
      newFaves.splice(idx, 1)
      console.log(newFaves)
      setFaves(newFaves)
    }
  }

  const getFilteredVillagers = () => {
    const filteredVillagers = data.villagers.filter((villager) => {
      const name = villager.name["name-USen"].toLowerCase()
      return name.includes(search.toLowerCase())
    })

    return filteredVillagers
  }

  useEffect(() => {
    fetch("http://acnhapi.com/v1/villagers/")
      .then((reponse) => reponse.json())
      .then((rdata) => {
        rdata = Object.values(rdata)
        setData({ villagers: rdata })
      }, [])
  })

  return (
    <div style={{ paddingInline: "0.75rem" }}>
      <h1>Animal Crossing Villagers</h1>
      <label
        htmlFor="villager-search"
        style={{ display: "flex", flexDirection: "column", width: "50ch" }}
      >
        Search for a villager:
        <input
          type="text"
          id="villager-search"
          value={search}
          onChange={handleChange}
        />
      </label>

      <div style={{ display: "flex" }}>
        <div>
          <h2>Favorites:</h2>
          <div style={{ maxHeight: "90vh", overflowY: "scroll" }}>
            <DisplayCards
              villagers={faves}
              type="favorites"
              handleClick={handleRemoveFave}
            />
          </div>
        </div>
        <div>
          <h2>All:</h2>
          <div style={{ maxHeight: "90vh", overflowY: "scroll" }}>
            <DisplayCards
              villagers={getFilteredVillagers()}
              handleClick={handleAddFave}
              type="all"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
