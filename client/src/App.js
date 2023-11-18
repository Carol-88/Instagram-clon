import "./App.css";
import PostList from "./components/PostList";
import { usePosts } from "./hooks/usePosts";
import FooterApp from "./components/FooterApp";

function App(data) {
  const { posts, likePost, unlikePost } = usePosts();
  console.log(posts);
  return (
    <>
      <header>
        <h1>Instagrom</h1>
      </header>
      <main>
        <PostList photos={posts} likePost={likePost} unlikePost={unlikePost} />
      </main>
      <footer>
        <FooterApp />
      </footer>
    </>
  );
}

export default App;
