
const ApiInfo = () => {
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
    var apiKey = localStorage.auth ? JSON.parse(localStorage.auth).key : 'com.beta.reword-me.webxspark.app';
    const rows = [
        {
            key: "1",
            info: "API Endpoint",
            details: "https://ai.webxspark.com/api/reword-me/rephrase",
        },

        {
            key: "2",
            info: "API Key",
            details: localStorage.auth ? JSON.parse(localStorage.auth).key : 'Login to get your API Key',
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
            key: "6",
            info: "Example",
            details: `https://ai.webxspark.com/api/reword-me/rephrase?sentence=I am a good boy&key=${apiKey}`,
        },


    ];
    return (
        <>
            <div className="w-full flex justify-center my-24">
                <div className="bg-white drop-shadow-lg py-12 px-24 rounded-lg">
                    <div className="w-full text-center text-xl font-semibold">API Documentation</div>
                    <div className="w-full mt-4 px-12">
                        {/* responsive tailwind table with the data */}
                        <div className="w-full overflow-x-auto">
                            <table className="w-full whitespace-no-wrap">
                                <thead>
                                    <tr
                                        className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-100"
                                    >
                                        {columns.map((column) => (
                                            <th
                                                key={column.key}
                                                className="px-4 py-3"
                                            >
                                                {column.label}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody
                                    className="bg-white divide-y"
                                >
                                    {rows.map((row) => (
                                        <tr
                                            key={row.key}
                                            className="text-gray-700"
                                        >
                                            {columns.map((column) => (
                                                <td
                                                    key={column.key}
                                                    className="px-4 py-3"
                                                >
                                                    {row[column.key]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ApiInfo;