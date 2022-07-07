import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// pages
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Lobby from "./pages/Lobby";
import KakaoRedirect from "./pages/KakaoRedirect";
// cookies
import { getCookie, deleteCookie } from "./shared/Cookies";
import WaitingRoom from "./pages/WaitingRoom";
import NotFound from "./pages/NotFound";
import Rule from "./pages/Rule";
// import Lobby from "./pages/Lobby";

function App() {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState(false);
  console.log(loginState);
  const token = getCookie("token");
  useEffect(() => {
    token ? setLoginState(true) : setLoginState(false);
  }, [token]);

  const logoutHandler = () => {
    deleteCookie("token");
    deleteCookie("id");
    deleteCookie("username");
    deleteCookie("nickname");
    alert("로그아웃 되었습니다!");
    navigate("/");
  };

  return (
    <>
      <Routes>
        {loginState ? (
          <Route path="/lobby" element={<Lobby />}></Route>
        ) : (
          <Route
            path="/login"
            element={<Login setLoginState={setLoginState} />}
          />
        )}
        <Route path="/" element={<Main />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route
          element={<KakaoRedirect setLoginState={setLoginState} />}
          path="/auth/kakao/callback"
        />
        <Route path="/rule" element={<Rule />}></Route>
        <Route path="/waiting/:roomid" element={<WaitingRoom />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
      <button onClick={logoutHandler}>로그아웃</button>
    </>
  );
}

export default App;
