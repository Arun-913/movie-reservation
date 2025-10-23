import { ReactNode } from "react"

export const PrimaryButton = ({ children, onClick, size = "small" }: {
    children: ReactNode,
    onClick: () => void,
    size?: "big" | "small"
}) => {
    return <div onClick={onClick} className={`${size === "small" ? "text-sm px-8 py-2" : "text-lg px-6 py-2"} cursor-pointer hover:shadow-md bg-amber-700 text-white rounded-xl text-center flex justify-center flex-col w-2/6`}>
        {children}
    </div>
}