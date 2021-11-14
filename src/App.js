
import LoginPage from "./Pages/Login/Login";
import WriterPage from "./Pages/Writer/Writer";
import AdminPage from "./Pages/Admin/Admin";
import Header from "./Components/Header/Header";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Routes, Route} from "react-router-dom";
import blogReducer from "./Redux/blogReducer";
import "./App.css";
import BlogPost from "./Pages/BlogPost/BlogPost";
const store = createStore(blogReducer);
store.getState();
function App() {
  return (
    <Provider store={store}>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/writerhome" element={<WriterPage />} />
        <Route path="/adminhome" element={<AdminPage />} />
        <Route path="/posts/:postId" element={<BlogPost />} />
      </Routes>
    </Provider>
  );
}

export default App;
