import {BrowserRouter, Route, Routes} from "react-router-dom";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Mypage from "./pages/MyPage/Mypage";
import Rank from "./pages/Rank";
import QuizOne from "./pages/QuizOne/QuizOne";
import QuizRequest from "./pages/QuizRequest";
import QuizModify from "./pages/QuizModify";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import LoginRedirect from "./pages/LoginRedirect";
import {useEffect} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {isLoginSelector, UserInfoAtom} from "./recoil/loginState";
import ProtectedRoute from "./Routes/ProtectedRoute";
import {getCookie} from "./util/cookie";
import QuizBoard from "./pages/QuizBoard";

function App() {

    console.log('App 컴포넌트 실행');
    const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);
    const isLogin = useRecoilValue(isLoginSelector);

    useEffect(() => {
        const storedUserInfo = sessionStorage.getItem('user-info')
        if (storedUserInfo !== null) {
            console.log("Load user-info from Session Storage");
            const parsedUserInfoJson = JSON.parse(storedUserInfo);
            setUserInfo(parsedUserInfoJson);
        }
    }, [])

    const DevTools = () => {
        const isLocal = process.env.REACT_APP_TRUE_ONLY_ON_LOCAL;

        return (
            <div
                className={`space-y-2 text-xs m-2 ${isLocal !== "true" && "hidden"}`}>
                <div className="border-2 flex space-x-4 w-fit cursor-pointer">
                    <div onClick={() => {
                        alert(userInfo);
                    }}>쿠키 체크 : {getCookie("Authorization") && "Exist"}</div>
                    <div>로그인 상태 : {isLogin ? "On" : "Off"}</div>
                </div>
                <div className="border-2">user-info : {JSON.stringify(userInfo)}</div>
            </div>
        )
    }

    return (
        <div className="max-w-[1000px] m-auto pb-10">
            <BrowserRouter basename="/foohaha">
                {/*Routes 영향 받지 않는 페이지는 태그 바깥으로*/}
                <Header/>
                <DevTools/>
                <div className="w-[1000px] mx-auto">
                    <Routes>
                        {/*<Route path="/" element={<Home/>}/>*/}
                        <Route path="/" element={<QuizBoard/>}/>
                        <Route path="/quizzes" element={<QuizBoard/>}/>
                        <Route path="/quizzes/:id" element={<QuizOne/>}/>
                        <Route path="/rank" element={<Rank/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/api/users/kakao/callback" element={<LoginRedirect/>}/>
                        <Route path="/sign-up" element={<SignUp/>}/>
                        <Route path="/*" element={<NotFound/>}/>
                        {/*  유저 전용 페이지  */}
                        <Route element={<ProtectedRoute/>}>
                            <Route path="/quizzes/create" element={<QuizRequest/>}/>
                            <Route path="/quizzes/modify/:id" element={<QuizModify/>}/>
                            <Route path="/my-page" element={<Mypage/>}/>
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;
