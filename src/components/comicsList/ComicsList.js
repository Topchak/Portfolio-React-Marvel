import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './comicsList.scss';
import useMarvelServices from '../../services/MarvelService'
import Spinner from '../widgets/spiner/Spiner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(500);
    const [comicsEnded, setComicsEnded] = useState(false);

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const {error, loading, getAllComics} = useMarvelServices();

    const onRequest = (offset, initial) =>{
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
            .then(onComicsLoaded)
    }

    
    const onComicsLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        
        setComicsList([...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset + 8);
        setComicsEnded(ended);
    }
         


    const myRefs = useRef([])

    const focusOnItem = (id) =>{
        myRefs.current.forEach(item => item.classList.remove('selected'));
        myRefs.current[id].classList.add('selected');
    }

    const element = comicsList.map((item, i) =>{

        const {id, description, price, thumbnail, title} = item;

        return(
            <li 
            className="comics__item" 
            key={i} 
            id={id}
            onClick={() => focusOnItem(i)}
            ref={el => myRefs.current[i] = el}
        >
            <Link to={`/comics/${item.id}`}>
                <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                <div className='comics__item-text-wrapper'>            
                    <div className="comics__item-name">{title}</div>
                    <div className="comics__item-price">{price}</div>
                </div>
            </Link>
        </li>
        )

    })
    
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;


    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            <ul className="comics__grid">
                {element}
            </ul>
            <button 
                disabled={newItemLoading}
                style={{'display' : comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
            
        </div>
    )
}

export default ComicsList;