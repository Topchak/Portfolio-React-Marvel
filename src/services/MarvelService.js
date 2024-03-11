import useHttp from "../hooks/http.hook";

export const useMarvelServices = () => {

  const {
    request,
    clearError,
    process,
    setProcess
  } = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  const _apiKey = 'apikey=83246decca1738fab8d018671342f626'
  const _baseOffset = 160;

  const getCharacterByName2 = async (name) => {
    try {
      const res = await request(`${_apiBase}characters?nameStartsWith=${name}&${_apiKey}`);
      return res.data.results.map(_transformCharacter);
    } catch (error) {
      console.error('Error fetching characters:', error);
      throw error;
    }
  };

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  }

  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  }


  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  }

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const getAllComics = async (offset = 0) => {
    const res = await request(
      `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
    );
    console.log(res.data.results);
    return res.data.results.map(_transformComics);
  };

  const _transformComics = (comics) => {
    return {
      title: comics.title,
      id: comics.id,
      description: comics.description ? `${comics.description.slice(0,60)}... ` : 'There is no description for this character',
      price: comics.prices[0].price ?
        `${comics.prices[0].price}$` : "not available",
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      homepage: comics.urls[0].url,
    }
  }

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description ? `${char.description.slice(0, 150)}...` : 'There is no description for this character',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    }
  }

  return {
    process,
    getAllCharacters,
    getCharacter,
    getComic,
    clearError,
    getAllComics,
    getCharacterByName,
    getCharacterByName2,
    setProcess
  }
}

export default useMarvelServices;