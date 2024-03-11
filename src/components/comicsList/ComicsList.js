import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './comicsList.scss';
import useMarvelServices from '../../services/MarvelService'
import Spinner from '../widgets/spiner/Spiner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const setContent = (process, Component, newItemLoading) =>{
    switch (process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newItemLoading ? <Component/> :  <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state');
    }
}


const ComicsList = () => {

    const [comicsList, setComicsList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(500);
    const [comicsEnded, setComicsEnded] = useState(false);

    useEffect(() => {
        onRequest(offset, true)
        // eslint-disable-next-line
    }, [])

    const {getAllComics, process, setProcess} = useMarvelServices();

    const onRequest = (offset, initial) =>{
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
            .then(onComicsLoaded)
            .then(() => setProcess('confirmed'))
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
    const renderItems = (arr) =>{

        const element = arr.map((item, i) =>{

            const {id, price, thumbnail, title} = item;
    
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

        return ( 
            <ul className='comics__grid'>
                {element}
            </ul>
        )
    }





    return (
        <div className="comics__list">

            {setContent(process, () => renderItems(comicsList), newItemLoading)}

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