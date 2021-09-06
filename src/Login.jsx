import './Login.css';

import { signInWithGoogle, auth } from './firebase'
import { useContext, useEffect } from 'react';
import { authContext } from './AuthProvider';
import { Redirect } from 'react-router-dom'

let Login = ()=>{

    let user = useContext(authContext);
    // console.log(user)

    return(
        <div>
            {user ? <Redirect to="/" /> : ""}

            <button type="button" class="btn btn-primary mt-0 p-3" onClick = {()=>{
                signInWithGoogle()
            }}>Login With Google</button>

            
        </div>
    )
}

export default Login