import { Button } from "@nextui-org/react";
import { FaArrowDown, FaMagic } from "react-icons/fa";
import ResponseCard from "../components/responseCards";
import SkeletonResponseCard from "../components/skeleton-responseCard";
import { useState } from "react";
import { message } from "antd";


const Landing = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [result, setResult] = useState('');
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);
    function handleFormSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const text = data.get('sentence');
        //remove ' from text
        var sentence = text.replace(/'/g, "");
        if (sentence == "") {
            messageApi.error("Please enter a sentence!");
            return;
        }
        if (sentence.length > 200) {
            messageApi.error("Please enter a sentence with less than 200 characters!");
            return;
        }
        setResult(<SkeletonResponseCard />);
        setSubmitBtnDisabled(true);
        //scroll down
        document.getElementById('result').scrollIntoView({ behavior: 'smooth' });

        //endpoint request
        // #Production url: https://ai.webxspark.com/api/reword-me/rephrase
        const url = 'https://ai.webxspark.com/api/reword-me/rephrase';
        const formData = new URLSearchParams();
        formData.append('sentence', sentence);
        formData.append('key', localStorage.auth ? JSON.parse(localStorage.auth).key : 'com.beta.reword-me.webxspark.app');

        fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    messageApi.error(data.error, 5);
                    setResult('');
                    if (data.action) {
                        if (data.action == "auth.login") {
                            document.getElementById('login-btn').click();
                        }
                    }
                }
                if (data.response) {
                    var ndata = data.response;
                    if (ndata.error) {
                        messageApi.error(ndata.message, 5);
                        setResult('');
                    } else {
                        var respSentences = ndata.sentences;
                        var resp = [];
                        setResult(

                            respSentences.map((_sentence, index) => {
                                return (
                                    <ResponseCard originalText={sentence} newText={_sentence} />
                                )
                            })

                        )
                    }
                }
                setSubmitBtnDisabled(false);
            })
            .catch(error => {
                console.error(error)
                messageApi.error("Something went wrong! Plese try again later.");
                setResult('');
                setSubmitBtnDisabled(false);
            });

    }
    return (
        <>
            <div className='h-[100dvh] grid grid-cols-1 lg:grid-cols-2'>
                <div>
                    <div className='mx-8 flex lg:mt-24 pt-24 flex-col h-[100%]'>
                        <h1 className="text-[30px] font-bold text-[#18113D]">RewordMe - Sentence Rephraser AI</h1>
                        <span className='text-[15px] pt-0 font-bold text-[#4F4F4F]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam laoreet mi eros, eget lacinia massa pulvinar in. Sed luctus est sit amet volutpat dictum.</span>
                        <div>
                            <Button className='mt-6' onClick={() => {
                                //select all chars in textarea
                                document.querySelector('textarea').select();
                                //scroll to textarea
                                document.querySelector('textarea').scrollIntoView();
                            }} color={"secondary"} shadow>TRY IT OUT</Button>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="lg:my-24 my-12 lg:mx-12 mx-2 flex items-center justify-center flex-col bg-[#f6f5fa] py-10 w-auto px-4 lg:px-10 rounded-lg">
                        <div className='font-semibold text-lg text-[#4F4F4F] flex items-center gap-3'>
                            <FaArrowDown />
                            Try it for free
                            <FaArrowDown />
                        </div>
                        <div className='pt-12 w-full'>
                            <form method="POST" onSubmit={handleFormSubmit}>
                                <textarea maxLength={200} name="sentence" className='w-full drop-shadow-md p-4 font-[Inter] rounded-xl border-[1.2px] border-[#bdbdbd] resize-none' placeholder='Type something...' rows={5}></textarea>
                                <div className="pt-2 flex w-full justify-center">
                                    <Button disabled={submitBtnDisabled} type="submit" bordered color="primary" className="w-90 p-4">
                                        <div className="flex gap-2 items-center text-lg font-semibold">
                                            Rephrase
                                            <FaMagic />
                                        </div>
                                    </Button>
                                </div>
                            </form>
                            <div className="pt-4 w-full flex flex-col gap-4" id="result">
                                {result}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {contextHolder}
        </>
    )
}
export default Landing;