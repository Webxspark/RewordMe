import Pfp from "../assets/pfp.png";
import { Modal, Checkbox, Button } from "@nextui-org/react";
import { useState } from "react";
import { message } from "antd";
const UserInfo = () => {
    var _loginDetails = localStorage.auth ? JSON.parse(localStorage.auth) : null;
    const [loginDetails, setLoginDetails] = useState(_loginDetails);
    const [Modalvisible, setModalVisible] = useState(false);
    const [signupForm, setSignupForm] = useState(false);
    const [messageApi, __contextHolder] = message.useMessage();

    const login = () => {
        // handleLoginAction();
        // setLoginDetails({ name: "Team Sparkeans", mention: "webxspark", pfp: Pfp });
        setModalVisible(true);
    }
    const closeHandler = () => {
        setModalVisible(false);
        console.log("closed");
    };
    function changeSignupForm() {
        setSignupForm(true)
    }
    function changeLoginForm() {
        setSignupForm(false)
    }
    const loginAction = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const email = data.get('email');
        const password = data.get('password');
        //validate form
        if (email === "" || password === "") {
            messageApi.info("Please fill all the fields");
            return;
        }
        //send data to server
        fetch("https://ai.webxspark.com/api/reword-me/userAuth", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `email=${email}&password=${password}&login=true`
        })
            .then(res => res.json())
            .then(data => {
                if (data.status == "200") {
                    messageApi.success('Logged in successfully!')
                    setLoginDetails({
                        username: data.context.content.username
                    })
                    localStorage.setItem('auth', JSON.stringify(data.context.content));
                    setModalVisible(false);
                } else {
                    messageApi.error(data.message);
                }
            })
            .catch(err => {
                console.log(err);
                messageApi.error("Something went wrong!");
            })
    }
    function signupAction(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const email = data.get('email');
        const password = data.get('password');
        const Cpassword = data.get('Cpassword');
        const username = data.get('username');
        //validate form
        if (email === "" || password === "" || Cpassword === "" || username === "") {
            messageApi.info("Please fill all the fields");
            return;
        } else if (password !== Cpassword) {
            messageApi.info("Passwords do not match");
            return;
        }
        //send data to server
        fetch("https://ai.webxspark.com/api/reword-me/userAuth", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `email=${email}&password=${password}&username=${username}&signup=true`
        })
            .then(res => res.json())
            .then(data => {
                if (data.status == "200") {
                    messageApi.success('Account created successfully!')
                    setLoginDetails({
                        username: data.context.content.username
                    })
                    localStorage.setItem('auth', JSON.stringify(data.context.content));
                    setModalVisible(false);
                } else {
                    messageApi.error(data.message);
                }
            })
            .catch(err => {
                console.log(err);
                messageApi.error("Something went wrong!");
            })

    }
    function logout() {
        localStorage.removeItem('auth');
        setLoginDetails(null);
        //send request to server to logout
        fetch("https://ai.webxspark.com/api/reword-me/userAuth", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `logout=true`
        })
    }
    //return the user info if logged in or Login button if not
    return (
        <>
            {loginDetails ? (
                <>
                    <a href="https://webxspark.com" rel="dofollow noreferrer noopener" className="hidden lg:block" target={'_blank'} >
                        <img alt="" src={Pfp} className="w-16 h-16 p-2 cursor-pointer hover:drop-shadow-md transition-300 rounded-full ease-in-out duration-200 " />
                    </a>
                    <span className="lg:flex flex-col hidden">
                        <span className="font-semibold text-md pt-2">{loginDetails.username}</span>
                        <div onClick={logout} ><p className="text-blue-700 text-sm cursor-pointer">Logout</p></div>
                    </span>
                </>
            ) : (
                <div className="hidden md:block">
                    <Button auto color="primary" id="login-btn" onPress={login} rounded shadow>
                        <p className="px-6">Login</p>
                    </Button>
                </div>
            )}
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={Modalvisible}
                onClose={closeHandler}
            >
                <Modal.Header>

                </Modal.Header>
                <Modal.Body>
                    {signupForm ? (
                        <>
                            <div>
                                <div className="w-full text-center">
                                    <h2 className="text-2xl">Signup</h2>
                                </div>
                                <form onSubmit={signupAction}>
                                    <div className="py-4">
                                        <input name="username" placeholder="User Name" type="text" className="w-full border-2 p-3 rounded-2xl" />
                                    </div>
                                    <div className="pb-4">
                                        <input name="email" placeholder="Email" type="email" className="w-full border-2 p-3 rounded-2xl" />
                                    </div>
                                    <div className="pb-4">
                                        <input name="password" placeholder="Password" type="password" className="w-full border-2 p-3 rounded-2xl" />
                                    </div>
                                    <div className="pb-4">
                                        <input name="Cpassword" placeholder="Confirm Password" type="password" className="w-full border-2 p-3 rounded-2xl" />
                                    </div>
                                    <div className="flex justify-between">
                                        <div></div>
                                        <div onClick={changeLoginForm} className="text-[15px]">Already an user? <span className="text-[#529ff7]">Login</span></div>
                                    </div>
                                    <div className="w-full flex justify-end gap-4 mt-3">
                                        <Button auto flat color="error" onPress={closeHandler}>
                                            Close
                                        </Button>
                                        <Button auto type="submit">
                                            Sign Up
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <div className="w-full text-center">
                                    <h2 className="text-2xl">Login</h2>
                                </div>
                                <form onSubmit={loginAction}>
                                    <div className="py-4">
                                        <input name="email" placeholder="Email" type="email" className="w-full border-2 p-3 rounded-2xl" />
                                    </div>
                                    <div className="pb-4">
                                        <input name="password" placeholder="Password" type="password" className="w-full border-2 p-3 rounded-2xl" />
                                    </div>
                                    <div className="flex justify-between">
                                        <Checkbox>
                                            <p className="">Remember me</p>
                                        </Checkbox>
                                        <div onClick={changeSignupForm} className="text-[15px]">New here? <span className="text-[#529ff7]">Signup</span></div>
                                    </div>
                                    <div className="w-full flex justify-end gap-4 mt-3">
                                        <Button auto flat color="error" onPress={closeHandler}>
                                            Close
                                        </Button>
                                        <Button auto type="submit">
                                            Sign in
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </>
                    )}
                    {__contextHolder}
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </>
    )
}
export default UserInfo;