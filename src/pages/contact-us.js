import {message } from "antd";
import { useState } from "react";
import { Button } from "@nextui-org/react";

const ContactUs = () => {
    const [BtnLoadingState, setBtnLoadingState] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const handleFormSubmission = (e) => {
        e.preventDefault();
        //validating form
        const name = e.target[0].value;
        const email = e.target[1].value;
        const subject = e.target[2].value;
        const message = e.target[3].value;

        if (name === "" || email === "" || subject === "" || message === "") {
            messageApi.info("Please fill all the fields");
            return;
        }
        const data = `name=${encodeURIComponent(name)}&email=${email}&message=${message}&subject=${subject}&sendMsg=true`;
        setBtnLoadingState(true);
        fetch("https://ai.webxspark.com/api/reword-me/contact", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: (data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.status == "200") {
                    messageApi.success('Message sent successfully!')
                    //clear all text fields
                    e.target[0].value = "";
                    e.target[1].value = "";
                    e.target[2].value = "";
                    e.target[3].value = "";
                } else {
                    messageApi.error(data.message);
                }
                setBtnLoadingState(false);
            })
            .catch(err => {
                console.log(err);
                messageApi.error("Message not sent");
                setBtnLoadingState(false);
            })
    }
    return (
        <>
            <div className=" mt-12 flex flex-col items-center w-screen">
                <div className="text-[#18113D] text-2xl lg:text-3xl md:text-2xl font-bold mt-12 lg:w-2/5 text-center">Discover the Future of Sentence Rephrasing with RewordMe and Webxspark!</div>
                <p className="text-md md:text-lg lg:text-xl lg:w-3/5 font-semibold lg:font-medium mx-8 md:mx-0 text-center mt-4">Interested in beta testing RewordMe or have questions about Webxspark? Contact us today to learn more and receive free beta testing credits for qualified applicants.</p>
                <form className="mb-24" onSubmit={handleFormSubmission}>
                    <div className="flex flex-col md:flex-row gap-5 mt-12">
                        <input name="name" value={localStorage.auth ? JSON.parse(localStorage.auth).username: ''} className="w-full lg:w-1/2 p-4 rounded-xl border-2 border-gray-200" type="text" placeholder="Name" />
                        <input name="email" value={localStorage.auth ? JSON.parse(localStorage.auth).email: ''} className="w-full lg:w-1/2 p-4 rounded-xl border-2 border-gray-200" type="email" placeholder="Email" />
                    </div>
                    <div className="flex flex-col lg:flex-row gap-5 mt-5">
                        <input name="subject" className="w-full p-4 rounded-xl border-2 border-gray-200" type="text" placeholder="Subject" />
                    </div>
                    <div className="flex flex-col mt-5">
                        <textarea name="message" className="w-full p-4 rounded-xl border-2 resize-none border-gray-200" placeholder="Message" />
                    </div>
                    {/* <Button htmlType="submit" type="null" loading={BtnLoadingState} className="bg-black border-2 p-4 border-black h-auto rounded-lg font-semibold text-white text-md mt-5">Send Message</Button> */}
                    <Button className="mt-5 text-md" type="submit" disabled={BtnLoadingState} auto>Send Message</Button>
                </form>
            </div>
            {contextHolder}
        </>
    )
}
export default ContactUs;