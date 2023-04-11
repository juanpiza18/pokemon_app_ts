import WithFetchPaginated from "../../hoc/withFetchPaginated.hoc";
import PokemonList from "../card-list/cardList.component";
import PokemonContext from "../../context/pokemonContext";

export default WithFetchPaginated(PokemonList, PokemonContext);
