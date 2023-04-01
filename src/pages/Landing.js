import { Button } from "@nextui-org/react";
import { FaArrowDown, FaMagic } from "react-icons/fa";
import ResponseCard from "../components/responseCards";
import SkeletonResponseCard from "../components/skeleton-responseCard";
const Landing = () => {
    return (
        <>
            <div className='h-[100dvh] grid grid-cols-2'>
                <div>
                    <div className='mx-8 flex pb-48 mt-24 pt-24 flex-col h-[100%]'>
                        <h1 className="text-[30px] font-bold text-[#18113D]">RewordMe - Sentence Rephraser AI</h1>
                        <span className='text-[15px] pt-0 font-bold text-[#4F4F4F]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam laoreet mi eros, eget lacinia massa pulvinar in. Sed luctus est sit amet volutpat dictum.</span>
                        <div>
                            <Button className='mt-6' color={"secondary"} shadow>TRY IT OUT</Button>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="my-24 mr-12 flex items-center justify-center flex-col bg-[#f6f5fa] p-10 rounded-lg">
                        <div className='font-semibold text-lg text-[#4F4F4F] flex items-center gap-3'>
                            <FaArrowDown />
                            Try it for free
                            <FaArrowDown />
                        </div>
                        <div className='pt-12 w-full'>
                            <textarea maxLength={200} className='w-full  drop-shadow-md p-4 font-[Inter] rounded-xl border-[1.2px] border-[#bdbdbd] resize-none' placeholder='Type something...' rows={5}></textarea>
                            <div className="pt-2 flex w-full justify-center">
                                <Button bordered color="primary" className="w-90 p-4">
                                    <div className="flex gap-2 items-center text-lg font-semibold">
                                        Rephrase
                                        <FaMagic />
                                    </div>
                                </Button>
                            </div>
                            <div className="pt-4 w-full flex flex-col gap-4">
                                {/* <ResponseCard originalText="I will keep you informed about how things go." newText="I'll keep you in the loop." /> */}
                                <SkeletonResponseCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Landing;