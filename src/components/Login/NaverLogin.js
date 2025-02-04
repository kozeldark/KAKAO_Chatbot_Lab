import { useLocation} from "react-router-dom";
import React, { useEffect } from "react"; 
import '../../css/LoginPage.css'

const NaverLogin = ()=> {
    const Login=() => {
        const naverScript = document.createElement("script");
        naverScript.src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js";
        naverScript.type="text/javascript";
        document.head.appendChild(naverScript);

        naverScript.onload=()=>{
            const naverLogin=new window.naver.LoginWithNaverId({
                clientId: "lYaASbDuslwwC_tbOgvi",
                callbackUrl: "http://localhost:3000/Login",
                callbackHandle: true,
                isPopup: false,
                loginButton: {
                    color: "green",
                    type: 3,
                    height: 45,
                },
            
            });

            naverLogin.init();
            naverLogin.logout();

            naverLogin.getLoginStatus((status)=>{
                if(status) {
                    console.log("Naver 로그인 상태",naverLogin.user);
                    const {id,email,gender}= naverLogin.user;

                    /*if(gender==undefined){
                        alert("성별 필수 동의");
                        naverLogin.reprompt();
                        return;
                    }*/
                } 
                else {
                    console.log("비로그인 상태");
                }
            });
        };

        
    }

    const location = useLocation();  

    const getNaverToken = () => {
        if (!location.hash) return;
        const token = location.hash.split('=')[1].split('&')[0];
        console.log(token);
    };

    useEffect(() => {
        Login();
        getNaverToken();
    });

    return (
        <div>
    <div id="naverIdLogin" display="none" className="naverLoginBtn"/>
    </div>
    );
}

export default NaverLogin;