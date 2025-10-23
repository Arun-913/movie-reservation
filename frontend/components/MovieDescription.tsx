
export const MovieDescription = ({ description}: {description: string}) =>{
    const theme = "Inspired by true events, Abhay Singh gets elected as the chief minister of UP and gets to work while facing issues within the state."

    return <div className='mx-20'>
        <div className='font-bold text-2xl mt-8 mb-2'>About the movie</div>
        <div className='mt-2 mb-8'>{theme}</div>
    </div>
}