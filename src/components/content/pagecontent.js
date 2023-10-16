import Parentmenu from "../menu/parentmenu";

export default function Pagecontent({ children }) {
    return (
        <>
            <Parentmenu />
            <div className="ml-0 lg:ml-[300px] max-w-[calc(1500px-300px)] mb-[90px] md:mb-0">
                {children}
            </div>
        </>
    )
}
