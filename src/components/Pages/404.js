import ErrorMessage from "../ErrorMessage/ErrorMessage";
import {Link} from 'react-router-dom'
function Page404() {
  return (
    <div>
      <ErrorMessage/>
      <p style={{'fontSize': '24px', 'color': 'black'}}>Page doesn't exist</p>
      <Link style={{'fontSize': '34px', 'color': 'red'}} to='/'>Back to main page *click*</Link>
    </div>
  )
}
export default Page404