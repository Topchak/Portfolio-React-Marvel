import { useState } from "react";
import { Helmet } from "react-helmet";

import decoration from '../../resources/img/vision.png';

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../ErrorBoundary/ErrorBoudary";
import CharSearchForm  from '../FindChar/FindChar';



function Main() {

  const [selectedChar, setSelectedChar] = useState(null);

  const onCharSelected = (id) => {
    setSelectedChar(id)
  }

  return (
    <>
    <Helmet>
      <meta 
        name="description" 
        content="Marvel information" 
      />
      <title>Marvel information</title>
    </Helmet>

    <ErrorBoundary>
      <RandomChar/>
    </ErrorBoundary>
    <div className="char__content">
      <ErrorBoundary>
        <CharList onCharSelected={onCharSelected}/>
      </ErrorBoundary>
      <div>
        <ErrorBoundary>
            <CharInfo charId ={selectedChar}/>
        </ErrorBoundary> 
        <ErrorBoundary>
            <CharSearchForm />
        </ErrorBoundary> 
      </div>
    </div>
      <img className="bg-decoration" src={decoration} alt="vision"/>
    </>
  )
}
export default Main