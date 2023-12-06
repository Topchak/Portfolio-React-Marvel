import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import './charList.scss';
import MarvelServices from '../../services/MarvelService';
import Spinner from '../widgets/spiner/Spiner';


class CharList extends Component {

    myRef = React.createRef();


    
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 109,
        charEnded: false,
    }



    marvelService = new MarvelServices();

    componentDidMount(){
        this.onRequest();
    }

    onRequest = (offset) =>{
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
        .then(this.onCharListLoaded)
        .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }


    onCharListLoaded = (newCharList) => {

        let ended = false;
        if(newCharList.length < 9){
            ended = true;
        }
         

        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList ],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }

    focusOnItem = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
    }


    render (){
        const { charList, offset, newItemLoading, charEnded } = this.state;
        const { onCharSelected } = this.props;

        const element = charList.map((item, i) => { 
            const { id, name, thumbnail } = item;
            const thumbnailStyle = {objectFit: 'contain'};

            return (
                <li
                   className="char__item"
                   key={id}
                   tabIndex={0}
                   onClick={() => {
                        onCharSelected(item.id); 
                        this.focusOnItem(i)
                   }}  
                   ref={this.setRef}
                   >
                    <img src={thumbnail} alt={name} style={thumbnailStyle}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })

        return (
            <div className="char__list">
                    {this.state.loading ? <Spinner/> : null}

                <ul className="char__grid" tabIndex={0}>
                    {element}
                </ul>
                
                
                <button 
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)} className="button button__main button__long"
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;