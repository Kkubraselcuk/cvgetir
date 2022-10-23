import React, { useEffect, useState, useContext, useRef } from 'react';
import LoginContext from '../../context/LoginContext';
import axios from 'axios';
import "./Login.scss";
import keyImg from '../../img/key.png';
import userImg from '../../img/user.png';
import Swal from 'sweetalert2';

const Login = () => {
    const { setActiveUser, person, setPerson, setAuth } = useContext(LoginContext);
    const [users, setUsers] = useState([]); // kullanıcı listesi
    const [manager, setManager] = useState([]); // yönetici listesi

    const inputEMail = useRef(null);
    const inputPassword = useRef(null);

    const fetchUsers = async () => {
        try {
            const resUser = await axios.get('http://localhost:8080/users');
            setUsers(resUser.data);
            console.log(users);
        } catch (error) {
            console.log(error);
        }
    }
    const fetchManagers = async () => {
        try {
            const resManagers = await axios.get('http://localhost:8080/managers');
            setManager(resManagers.data);
            console.log(manager);
        } catch (error) {
            console.log(error);
        }
    }
    const setSignInUser = () => {
        setPerson(false);
        fetchUsers();
    }
    const setSignInManager = () => {
        setPerson(true);
        fetchManagers();

    }
    const SignIn = (event) => {
        event.preventDefault();
        if (person == true) {
            manager.map((item) => {
                if (item.eMail == inputEMail.current.value) {
                    if (item.password == inputPassword.current.value) {
                        setAuth(1);
                    }
                    else {
                        {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Try the password again',
                            })
                        }
                    }
                }
                else {
                    {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Try the email again',
                        })
                    }
                }
            })
        }
        else {
            users.map((item) => {
                if (item.eMail == inputEMail.current.value) {
                    if (item.password == inputPassword.current.value) {
                        setActiveUser(item);
                        setAuth(2);
                    }
                    else {
                        {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Try the password again',
                            })
                        }
                    }
                }
            })
        }
    };

    const SignUpModal = (e) => {
        e.preventDefault();
        
        Swal.fire({
            title: 'Create Form',
            html: `<input type="text" id="usurname" class="swal2-input" placeholder="Username">
            <input type="password" id="password" class="swal2-input" placeholder="Password">
            <input type="text" id="phoneNumber" class="swal2-input" placeholder="Phone Number">
            <input type="text" id="eMail" class="swal2-input" placeholder="E-Mail">`,
            confirmButtonText: 'Sign in',
            focusConfirm: false,
            preConfirm: () => {
                const usurname = Swal.getPopup().querySelector('#usurname').value
                const password = Swal.getPopup().querySelector('#password').value
                const phoneNumber = Swal.getPopup().querySelector('#phoneNumber').value
                const eMail = Swal.getPopup().querySelector('#eMail').value
                if (!usurname || !password || !phoneNumber || !eMail) {
                    Swal.showValidationMessage(`Please check info`)
                }
                return { usurname: usurname, password: password, phoneNumber:phoneNumber, eMail:eMail }
            }
        }).then((result) => {
            axios.post('http://localhost:8080/users', {
                usurname: result.value.usurname, 
                password: result.value.password, 
                phoneNumber:result.value.phoneNumber, 
                eMail:result.value.eMail
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        })

    }
    useEffect(() => {
        fetchUsers();
        fetchManagers();
        Swal.fire({
            width: 350,
            height: 200,
            position: 'top-end',
            title: 'Öncelikle kullanıcı / yönetici olduğunuzu seçiniz',
            showConfirmButton: false,
            timer: 2000
        })
    }, [])
    return (
        <>
            <div className="personSignIn">
                <button onClick={setSignInUser}>Kullanıcı</button>
                <button onClick={setSignInManager}>Yönetici</button>
            </div>

            <div className="loginDv">
                <p className="loginDvTitle">CV GETİR</p>
                <div className="loginDvComment"> {person ? ("Yönetici ") : ("Kullanıcı ")}girişi için kayıt olduğunuz e-mail ve password ile giriş yapınız</div>

                <div className="inputDv">
                    <img src={userImg} width="32"></img>
                    <input name="username" type="text" placeholder="E-Mail" ref={inputEMail}></input>
                </div>

                <div className="inputDv">
                    <img src={keyImg} width="32"></img>
                    <input name="password" type="password" placeholder="Password" ref={inputPassword}></input>
                </div>

                <button onClick={SignIn}>Sign In</button>
            </div>

            <div className="personelSignUp">
                <p>Don't have an Account?</p>
                {person ? (<button disabled>Sign Up</button>) : (<button onClick={SignUpModal} >Sign Up</button>)}
                
            </div>

        </>
    );
};
export default Login;