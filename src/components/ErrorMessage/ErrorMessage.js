import ErrorImg from '../ErrorMessage/error.gif'

const ErrorMessage = () =>{
  return(
    <img 
      style={{display: 'block', width: '250px', objectFit: 'contain', margin: '0 auto'}} src={ErrorImg}
      alt="error"/>
  )
}

export default ErrorMessage