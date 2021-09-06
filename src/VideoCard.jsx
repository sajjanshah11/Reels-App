import { useContext, useEffect, useState } from "react";
import "./VideoCard.css";
import { authContext } from "./AuthProvider";
import { firestore } from "./firebase";

let VideoCard = (props) => {

    let user = useContext(authContext)

    let [playing, setplaying] = useState(false);
    let [commentBoxOpen, setcommentBoxOpen] = useState(false);
    let [currCommentData, setcurrCommentData] = useState("");
    let [comment, setcomment] = useState([]);

    useEffect(() => {

        let f = async () => {
            let commentsIDArr = props.data.comments;
            let arr = [];
            for (let i = 0; i < commentsIDArr.length; i++) {

                let commentDoc = await firestore.collection("comments")
                    .doc(commentsIDArr[i])
                    .get()


                arr.push(commentDoc.data())

            }
            console.log(arr);
            setcomment(arr);

        }

        f();

    }, [props])

    return (
        <>
            <div className="video-card">
                <p>{props.data.name}</p>
                <span className="music-player">
                    <marquee>
                        <span class="material-icons-outlined">
                            music_note
                        </span>
                        Song is being tested
                    </marquee>
                </span>


                <span class="material-icons-outlined chat-icon" onClick={() => {
                    if (commentBoxOpen) {
                        setcommentBoxOpen(false)
                    } else {
                        setcommentBoxOpen(true)
                    }
                }}>
                    chat
                </span>

                <span class="material-icons-outlined like-icon">
                    favorite_border
                </span>

                {commentBoxOpen ? <div className="comment-box">
                    <div className="actual-comment">
                        {console.log(comment)}
                            {comment.map((el) => {

                            return (

                                <div className="image-user">
                                    <img src={el.photo} />
                                    <h2> {el.name} </h2>
                                    <p>{el.comment}</p>
                                </div>

                            )



                        })}
                    </div>

                    <div className="comment-form">
                        <input type="text" value={currCommentData} onChange={(e) => {
                            setcurrCommentData(e.currentTarget.value)
                        }} />
                        <button onClick={async () => {

                            let docRef = await firestore.collection("comments").add({
                                name: user.displayName,
                                comment: currCommentData,
                                photo: user.photoURL
                            })

                            setcurrCommentData("")

                            // console.log(docRef);

                            // console.log(docRef.id);

                            // let doc = docRef.get();


                            let commentID = docRef.id;



                            let postDoc = await firestore
                                .collection("posts")
                                .doc(props.data.id)
                                .get()

                            let postCommentsArr = postDoc.data().comments;



                            postCommentsArr.push(commentID);

                            // console.log(postCommentsArr);

                            await firestore
                                .collection("posts")
                                .doc(props.data.id)
                                .update({
                                    comments: postCommentsArr
                                })

                        }}>Post</button>
                    </div>
                </div> : ""}

                <video className="video-tag"
                    src={props.data.url}
                    onClick={(e) => {
                        if (playing) {
                            e.currentTarget.pause();
                            playing = false;
                        } else {
                            e.currentTarget.play();
                            playing = true
                        }
                    }}>

                </video>

            </div>
        </>
    )

}

export default VideoCard;