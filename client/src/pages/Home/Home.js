import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Post from '../../components/Post';
import './Home.scss';

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/post').then(response => {
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
            <Post  {...post}/>
          ))}
        </main>
    </div>
  );
}

export default Home;
