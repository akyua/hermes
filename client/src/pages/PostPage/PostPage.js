import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import './PostPage.scss';
import { formatISO9075 } from 'date-fns';

export default function PostPage(){
    const [postInfo, setPostInfo] = useState(null);
    const {id} = useParams();
    
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
        .then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo);
            })
        })
    }, []);

    if(!postInfo) return '';

    return(
        <div>
            <Header />
            <div className='post-page'>            
                <h1>{postInfo.title}</h1>
                <div className='post-infos'>
                    <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
                    <div className="author">by {postInfo.author.username}</div>
                </div>
                <div className='image'>
                    <img src={`http://localhost:4000/${postInfo.cover}`} alt=''/>
                </div>
                <div dangerouslySetInnerHTML={{__html:postInfo.content}}></div>
            </div>
        </div>
    )
}