import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [data, setData] = useState(null)
  const [page, setPage] = useState(1);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [imgNo, setimgNo] = useState(1)
  const [search, setSearch] = useState("")

  const getPokemons = async () => {
    await axios.get(url).then(res => setData(res.data)).catch(err => console.log(err));
  }
  useEffect(() => {
    const getPokemons = async () => {
      await axios.get(url).then(res => setData(res.data)).catch(err => console.log(err));
    }
    getPokemons()
  }, [data])

  return (
    <>
      <h1 className="text-secondary fw-bold text-center my-3">Pokemons</h1>
      <input
        style={{ width: "300px" }}
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className="form-control mx-3"
        placeholder="search"
        aria-label="Recipient's username"
        aria-describedby="button-addon2" />

      {!data && <h3 className="text-center my-5">Loading...</h3>}  

      <div className="d-flex justify-content-evenly align-items-center flex-wrap m-2">
        {data &&
          data.results.map((poke, i) => {
            if (search) {
              if (poke.name === search) {
                return (
                  <div
                    key={i}
                    className=" m-2 border rounded-1 text-center bg-body-secondary shadow-sm">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${imgNo + i}.png`} />
                    <br />
                    <h3>{poke.name.toUpperCase()}</h3>
                  </div>
                )
              }
            }
            else {
              return (
                <div
                  key={i}
                  style={{ width: "300px" }}
                  className="m-2 border rounded-1 text-center bg-body-secondary shadow-sm">
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${imgNo + i}.png`} />
                  <br />
                  <h3>{poke.name.toUpperCase()}</h3>
                </div>
              )
            }

          })
        }
      </div>

      {
        data &&
        <div className="btn-group mx-3 my-5" role="group" aria-label="Basic example">
          <button
            type="button"
            className="btn btn-primary"
            disabled={!data.previous}
            onClick={() => {
              setPage(page - 1)
              setUrl(data.previous)
              getPokemons()
              setimgNo(imgNo - 20)
            }}>
            Prev
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled>
            {page}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={!data.next}
            onClick={() => {
              setPage(page + 1)
              setUrl(data.next)
              getPokemons()
              setimgNo(imgNo + 20)
            }}>
            Next
          </button>
        </div>

      }

    </>
  );
}

export default App;
