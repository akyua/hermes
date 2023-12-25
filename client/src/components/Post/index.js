import './Post.scss';
import {format} from "date-fns";

function Post({title, summary, cover, content, createdAt, author}){
    return(
        <div className='post'>
            <div className="image">
                <img src="https://miro.medium.com/v2/resize:fit:1116/1*jsib4jXQbvt-JKglw2an2g.png" alt="" />
            </div>
            <div className="texts">  
                <h2>{title}</h2>
                <p className='info'>
                    <span className='author'>{author.username}</span>
                    <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
                </p>
                <p className='summary'>{summary}</p>
            </div>
        </div>
    )
}

export default Post;