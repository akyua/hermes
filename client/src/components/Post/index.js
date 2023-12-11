import './Post.scss';

function Post(){
    return(
        <div className='post'>
            <div className="image">
                <img src="https://miro.medium.com/v2/resize:fit:1116/1*jsib4jXQbvt-JKglw2an2g.png" alt="" />
            </div>
            <div className="texts">  
                <h2>Why You Should Go for ReactJS For Your Next Project.</h2>
                <p className='info'>
                    <span className='author'>Gabriel Silveira</span>
                    <time>2023-12-07 16:42</time>
                </p>
                <p className='summary'>React.js is the most popular front-end framework for Web applications. In this article, we will learn what React.js (or simply React or Reactjs) is and why we should use Reactjs instead of other JavaScript frameworks like Angular.</p>
            </div>
        </div>
    )
}

export default Post;