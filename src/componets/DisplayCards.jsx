export default function DisplayCards({ villagers, handleClick, type }) {
  const list = villagers.map((villager) => (
    <div
      key={`${type}-${villager.id}`}
      style={{
        backgroundColor: "#eee",
        borderRadius: "0.5rem",
        padding: "1rem",
        margin: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "30ch",
      }}
    >
      <h3>{villager.name["name-USen"]}</h3>
      <img
        src={villager.image_uri}
        alt={villager.name["name-USen"]}
        onClick={() => handleClick(villager)}
      />
    </div>
  ))

  return (
    <>
      <div>
        {list.length > 0 && list}
        {list.length === 0 && "No favorites"}
      </div>
    </>
  )
}
