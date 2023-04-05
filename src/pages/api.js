import { Fragment, useContext, useEffect, useState } from "react";
import Linkify from "../components/Linkify";
import { useLoadingContext } from "react-router-loading";
import { LoginStatusContext } from "../components/LoginContext";

const ApiInfo = () => {
    const Loading = useLoadingContext();
    const { isLoggedIn } = useContext(LoginStatusContext);
    Loading.done()
    const columns = [
        {
            key: "info",
            label: "INFO",
        },
        {
            key: "details",
            label: "Details",
        },
    ];
    // var apiKey = localStorage.auth ? JSON.parse(localStorage.auth).key : '';
    const [apiKey, setApiKey] = useState("com.beta.reword-me.webxspark.app");
    useEffect(() => {
        if (isLoggedIn) {
            setApiKey(localStorage.auth ? JSON.parse(localStorage.auth).key : 'com.beta.reword-me.webxspark.app');
        } else {
            setApiKey('com.beta.reword-me.webxspark.app');
        }
    }, [isLoggedIn])
    const rows = [
        {
            key: "1",
            info: "API Endpoint",
            details: "https://ai.webxspark.com/api/reword-me/rephrase",
        },

        {
            key: "2",
            info: "API Key",
            details: isLoggedIn ? apiKey : 'Login to get your API Key',
        },

        {
            key: "3",
            info: "Required Parameters",
            details: "sentence=<your sentence here [str]> (required)",
        },

        {
            key: "4",
            info: "",
            details: "key=<your api key here [str]> (required)",
        },

        {
            key: "5",
            info: "",
            details: "length=<response length [int]> (optional)",
        },

        {
            key: "6",
            info: "Supported Request Methods",
            details: "GET, POST",
        },

        {
            key: "7",
            info: "Example",
            details: `https://ai.webxspark.com/api/reword-me/rephrase?sentence=I%20am%20a%20good%20boy&key=${apiKey}`,
        },


    ];
    return (
        <>
            <div className="w-full flex justify-center my-12 font-[Inter]">
                <div className="bg-white shadow overflow-hidden md:mx-12 mx-4 lg:mx-24 sm:rounded-lg w-full">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            API Documentation
                        </h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            {rows.map((row) => (
                                <Fragment key={row.key}>
                                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            {columns[0].label}
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {row[columns[0].key]}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            {columns[1].label}
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <Linkify text={row[columns[1].key]} />
                                        </dd>
                                    </div>
                                </Fragment>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ApiInfo;