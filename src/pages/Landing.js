import { Button } from "@nextui-org/react";
const Landing = () => {
    return (
        <>
            <div className='h-[100dvh] grid grid-cols-2'>
                <div>
                    <div className='mx-8 flex pb-48 justify-center flex-col h-[100%]'>
                        <h1 className="text-[30px] font-bold text-[#18113D]">RewordMe - Sentence Rephraser AI</h1>
                        <span className='text-[15px] pt-0 font-bold text-[#4F4F4F]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam laoreet mi eros, eget lacinia massa pulvinar in. Sed luctus est sit amet volutpat dictum.</span>
                        <div>
                            <Button className='mt-6' color={"secondary"} shadow>TRY IT OUT</Button>
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex items-center justify-center h-48'>Try it for free</div>
                    <div className=''><textarea className='drop-shadow-md resize-none' placeholder='Type something...' rows={5}></textarea></div>
                </div>
            </div>
        </>
    )
}
export default Landing;