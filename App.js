import { useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

const Form = () => {
    const [text, setText] = useState('');

    return (
        <Container>
            <form className="w-50 border mt-5 p-3 m-auto">
                <div className="mb-3">
                    <input value={text} type="text" className="form-control" readOnly/>
                    <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Email address</label>
                    <input onChange={(e) => setText(e.target.value)} type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
            </form>
        </Container>
    )
}

function App() {
    return (
        <Form/>
    );
}

export default App;
