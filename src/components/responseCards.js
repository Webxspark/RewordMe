import { FaRegCopy } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { message } from "antd";
const ResponseCard = (props) => {
    const [messageApi, contextHolder] = message.useMessage();

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text);
        messageApi.success("Copied to clipboard!");
    }
    //comparing and highlighting new words by <b> tag
    function strip_punctuations(string) {
        return string.replace(/[?,!;,.]/g, '');
    }
    function highlightNewWords(response_text, req_text) {
        let response_text_arr = response_text.split(' ');
        let req_text_arr = req_text.split(' ');

        for (let i = 0; i < response_text_arr.length; i++) {
            let tc_str = response_text_arr[i];

            if (!req_text_arr.includes(tc_str)) {
                /*Changing the font style to bold if the response string contains new words*/
                response_text = response_text.replace(tc_str, '<b>' + tc_str + '</b>');

                /*Getting the last word of the response sentence*/
                let tmp_rs_txt_arr = response_text.split(' ');
                let arr_count_res = tmp_rs_txt_arr.length;
                let last_word_res = tmp_rs_txt_arr[--arr_count_res];

                /*Getting the last word of the original sentence*/
                let tmp_org_txt_arr = req_text.split(' ');
                let arr_count_org = tmp_org_txt_arr.length;
                let last_word_org = tmp_org_txt_arr[--arr_count_org];

                /*Removing bold text if the last word of the response matches the last word of the requested text*/
                if (last_word_org === strip_punctuations(last_word_res)) {
                    response_text = response_text.replace('<b>' + last_word_res + '</b>', '' + last_word_res + '');
                }
            }
        }
        return { __html: response_text };
    }
    const [showDivs, setShowDivs] = useState(false);

    useEffect(() => {
        setShowDivs(true);
    }, []);
    return (
        <>
            <div className={`w-full bg-white p-6 flex justify-between items-center rounded-lg transition-all ${showDivs ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
                <div dangerouslySetInnerHTML={highlightNewWords(props.newText, props.originalText)}></div>
                <div onClick={() => copyToClipboard(props.newText)} text={props.newText} className="cursor-pointer text-[#969696] text-xl p-2 hover:bg-[#faf3ff]"><FaRegCopy /></div>
            </div>
            {contextHolder}
        </>
    )
}
export default ResponseCard;