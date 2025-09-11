import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { request, Request_Get_Axios, Request_Post_Axios } from '../../API/index';
import { useDispatch, useSelector } from 'react-redux';
import { Login_Info_Apply_State_Func } from '../../Models/LoginInfoReducer/LoginInfoReduce';
import { Now_Path_Initial_Reducer_State_Func } from '../../Models/NowPathReducer/NowPathReduce';
import { useNavigate } from 'react-router-dom';
import { toast } from '../ToastMessage/ToastManager';
import LoginContent from './Contents/LoginContent';

const LoginMainPageDivBox = styled.div`
    .page-container {
        width: 100vw;
        height: 100vh;
        background: #eff0f2;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .shadow {
        -webkit-box-shadow: 27px 43px 43px -26px rgba(89, 89, 89, 0.39);
        -moz-box-shadow: 27px 43px 43px -26px rgba(89, 89, 89, 0.39);
        box-shadow: 27px 43px 43px -26px rgba(89, 89, 89, 0.39);
    }
    .login-form-container {
        background: #f5f5f5;
        width: 860px;
        height: 540px;
        display: flex;
        flex-direction: row;
        box-shadow: 10px black;
        border-radius: 10px;
    }
    .login-form-right-side {
        width: 50%;
        border-radius: 10px 0px 0px 10px;
        padding: 75px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        background-image: radial-gradient(ellipse farthest-corner at 0 140%, #5d9dff 0%, #2178ff 70%, #3585ff 70%);
    }
    .login-form-right-side h1 {
        color: white;
        width: 100%;
        text-align: right;
        opacity: 0.9;
    }
    .login-form-right-side p {
        padding-top: 50px;
        font-size: 12px;
        text-align: right;
        opacity: 1;
    }
    .login-form-left-side {
        width: 50%;
        border-radius: 0px 10px 10px 0px;
        display: flex;

        flex-direction: column;
        align-items: center;
        padding: 40px;
        background: rgb(255, 255, 255);
        background: linear-gradient(287deg, rgba(255, 255, 255, 1) 0%, rgba(243, 244, 244, 1) 0%, rgba(255, 255, 255, 1) 100%);
    }
    .login-form-left-side .login-top-wrap {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
    }
    .login-form-left-side .login-top-wrap span {
        color: gray;
        font-size: 11px;
        padding-right: 20px;
    }
    .login-form-left-side .login-top-wrap .create-account-btn {
        background: white;
        border: 0;
        width: 85px;
        height: 35px;
        font-size: 11px;
        color: #2178ff;
        border-radius: 3px;
    }
    .login-input-container {
        padding-top: 120px;
        width: 300px;
    }
    .login-input-container .login-input-wrap {
        width: 300px;
        height: 45px;
        margin-top: 20px;
        border-radius: 2px;
        border-bottom: solid 2px #2178ff;
    }
    .login-input-container .login-input-wrap i {
        color: #2178ff;
        line-height: 45px;
    }

    .login-input-container .login-input-wrap input {
        background: none;

        border: none;
        line-height: 45px;
        padding-left: 10px;
        width: 267px;
    }
    .login-input-container .login-input-wrap input:focus {
        outline: none;
    }
    .login-btn-wrap {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .login-btn-wrap .login-btn {
        width: 95px;
        height: 35px;
        color: white;
        border: 0;
        border-radius: 4px;

        background: rgb(105, 163, 255);
        background: linear-gradient(162deg, rgba(105, 163, 255, 1) 0%, rgba(43, 125, 254, 1) 50%, rgba(43, 125, 254, 1) 100%);
    }
    .login-btn-wrap a {
        margin-top: 10px;
        text-decoration: none;
        font-size: 11px;
        color: gray;
    }
`;

const LoginMainPage = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const LoginInfo = useSelector(state => state.Login_Info_Reducer_State.Login_Info);
    const NowPath = useSelector(state => state.Now_Path_Reducer_State.Path_Info);
    const [PasswordChangeStatus, setPasswordChangeStatus] = useState(false);
    const [LoginDataInfo, setLoginDataInfo] = useState({
        email: localStorage.getItem('userId') ? localStorage.getItem('userId') : '',
        password: '',
    });
    const [Change_password, setChange_password] = useState({
        email: '',
        password: '',
        passwordCheck: '',
    });

    useEffect(() => {
        //전에 로그인 했는지 확인 있으면 Home으로 이동
        if (localStorage.getItem('Token')) {
            before_Login_Checkig();
        } else {
            alert('토큰 없음');
        }
        setPasswordChangeStatus(false);
        setChange_password({
            email: '',
            password: '',
            passwordCheck: '',
        });
    }, []);
    const before_Login_Checkig = async () => {
        try {
            const Login_Checking = await Request_Get_Axios('/PLM_Route/PLM_Dashboard/Token_Checking');

            if (Login_Checking.status) {
                // Token이 살아 있어, Home으로 이동
                return Navigate(-1);
            } else {
                // Token이 없음
                // localStorage.removeItem('Token');
            }
        } catch (error) {
            console.log(error);
        }
    };

    // 로그인 API
    const handleClicksLogin = async e => {
        e.preventDefault();
        const before_path = NowPath.path;

        if (LoginDataInfo.email === '' || LoginDataInfo.password === '') {
            toast.show({
                title: `ID 또는 패스워드를 확인 해 주세요.`,
                successCheck: false,
                duration: 3000,
            });
            setLoginDataInfo({ ...LoginDataInfo, password: '' });
            return;
        }
        const Login_Check = await Request_Post_Axios('/PLM_Route/PLM_Dashboard/Login', LoginDataInfo);

        if (Login_Check.status) {
            if (Login_Check.data.LoginChecking) {
                localStorage.setItem('Token', Login_Check.data.CreateJWTToken.token);
                localStorage.setItem('userId', Login_Check.data.email);

                return Navigate(-1);
            } else {
                setLoginDataInfo({ ...LoginDataInfo, password: '' });
                alert('아이디 또는 비밀번호가 틀립니다.');
            }
        } else {
            alert('서버와의 연결이 끊어졌습니다.');
        }
    };

    return (
        <div>
            <LoginMainPageDivBox>
                <div className="page-container">
                    <div className="login-form-container shadow">
                        <div className="login-form-right-side">
                            <div className="top-logo-wrap"></div>
                            <h1>EIS 시스템</h1>
                            <p>* 문의사항은 EXICON-연구기획팀에게 문의바랍니다.</p>
                        </div>

                        <LoginContent
                            LoginDataInfo={LoginDataInfo}
                            setLoginDataInfo={data => setLoginDataInfo(data)}
                            handleClicksLogin={data => handleClicksLogin(data)}
                        ></LoginContent>
                    </div>
                </div>
            </LoginMainPageDivBox>
        </div>
    );
};

export default LoginMainPage;
