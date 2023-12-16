import { Helmet } from 'react-helmet';

import decoration from '../../resources/img/vision.png';
import ComicsList from "../comicsList/ComicsList";

function Comics() {
  return (
    <>
      <Helmet>
        <meta 
          name="description" 
          content="Page with list of our comics " 
        />
        <title>Comics Page</title>
      </Helmet>
      <ComicsList/>
      <img className="bg-decoration" src={decoration} alt="vision"/>
    </>

    )
}
export default Comics