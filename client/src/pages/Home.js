import Header from '../components/Header';
import Post from '../components/Post';
import './Home.scss';

function Home() {
  return (
    <div>
        <Header />
        <main>
          <Post />
          <Post />
          <Post />
        </main>
    </div>
  );
}

export default Home;
