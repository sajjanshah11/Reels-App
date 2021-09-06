import { useContext, useEffect, useState } from "react";
import { auth, firestore, storage } from "./firebase"
import { authContext } from './AuthProvider'
import { Redirect } from "react-router-dom";
import "./Home.css"
import VideoCard from './VideoCard'

let Home = ()=>{
    let user = useContext(authContext);

    let [posts,setPosts] = useState([]);

    useEffect(()=>{
        let unsub = firestore.collection("posts").onSnapshot((querySnapshot)=>{

            let docArr = querySnapshot.docs;

            let arr = [];
            for(let i = 0; i < docArr.length; i++){
                arr.push({
                    id:docArr[i].id,
                    ...docArr[i].data()
                })
            }

            setPosts(arr)

        })

        return ()=>{
            unsub();
        }
    },[])

    return(
        <>
            {user ? "" : <Redirect to="/login" />}
            <div className="video-container">
                {posts.map((el)=>{
                    return <VideoCard key = {el.id} data = {el}/>
                })}
            </div>
            <button className = "logout-btn" onClick = {()=>{
                    auth.signOut();
                }}>Logout
            </button>

            <input type="file" onChange = {(e)=>{
                let videoObj = e.currentTarget.files[0];
                // console.log(videoObj)
                let {name , size , type} = videoObj;
                
                size = size/1000000

                if(size > 10){
                    alert("please upload file less than 10 MB");
                    return;
                }

                type = type.split("/")[0];

                if(type != "video"){
                    alert("please upload video only");
                    return;
                }

                let uploadTask = storage.ref(`/posts/${user.uid}/${Date.now() + "-" + name}`).put(videoObj);

                uploadTask.on("state_changed",null,null,()=>{
                    uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                        console.log(url)
                        firestore.collection("posts").add({
                            name:user.displayName,
                            url,
                            likes:[],
                            comments:[]
                        })
                    })
                })
                
            }}/>

        </>
    )
}

export default Home;