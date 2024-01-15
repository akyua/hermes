import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Post from '../../components/Post';
import './Home.scss';

function Home() {
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`${apiUrl}/post`).then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    })
  }, []);
  return (
    <div>
        <Header/>
        <main>
          {posts.length > 0 && posts.map(post => (
            <Post key={post._id} {...post}/>
          ))}
        </main>
    </div>
  );
}

export default Home;
