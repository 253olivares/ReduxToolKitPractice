import * as React from 'react';
import { useGetPokemonByNameQuery,
        useGetAllPokemonQuery
} from './services';

function App() {
  // create a state that keeps track if our current pokemon name
  const [currentPokemonName, setPokemonName] = React.useState<string>('bulbasaur');
  const pokemonList = React.useRef<string[]|undefined>([]);
  // create a data of all our pokemon
  const {data:allPokemon} = useGetAllPokemonQuery();
console.log("page reload")
  // 
  React.useEffect(()=> {
    // when we mount run query to grab our pokemon
    allPokemon?.results.map ((x:{name:string, url:string}) => {
      pokemonList.current?.push(x.name);
    });
    console.log(pokemonList);
    () => {
      // reset our list if our component unmounts
      pokemonList.current = [];
    }
  },[allPokemon])

  const userinput = (e:React.ChangeEvent<HTMLInputElement>) => {

    let currentFocus;


    console.log(e);
    setPokemonName(e.target.value);
  }

  const {data, error, isLoading, refetch} = useGetPokemonByNameQuery(currentPokemonName)

  console.log(error);
  return (
    <div className='App'>
      {error ? 
      
        <p>Oh no, a problem has occurred!</p>
       : isLoading ? 
        <p>Loading...</p>
       : data ? 
        <div>
          <h3>{data.species.name}</h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />

          {/* change pokemon name */}

          <div className='userInput'>
            <label htmlFor="pokemonInput">Input a random pokemon name</label>
            <br />
            <input type="text" value={currentPokemonName} onChange={userinput} onClick={refetch} placeholder='Enter pokemon name...' />
          </div>
        </div>
       : null }
    </div>
  )
}

export default App
