import logo from '../public/company-logo.png'
import facebook from '../public/Facebook.png'
import instagram from '../public/Instagram.png'
import linkedin from '../public/LinkedIn.png'
import youtube from '../public/Youtube.png'
import twitter from '../public/Twitter.png'

export const Footer = () =>{
    return <div className="flex justify-center items-center bg-gray-800 h-40">
        <div>
            <div className='flex justify-center'>
                <img className="w-44"  src={logo.src} alt="" />
            </div>
            <div className='flex justify-between mx-10'>
                <a href="https://www.facebook.com/BookMyShowIN/" target="_blank">
                    <img src={facebook.src} alt="" className='mx-2' />
                </a>
                <a href="https://twitter.com/bookmyshow" target="_blank">
                    <img src={twitter.src} alt="" className='mx-2' />
                </a>
                <a href="https://www.youtube.com/channel/UCV7DChRolW8-60g2053qi_A" target="_blank">
                    <img src={youtube.src} alt="" className='mx-2' />
                </a>
                <a href="https://www.linkedin.com/company/bookmyshow/" target="_blank">
                    <img src={linkedin.src} alt="" className='mx-2' />
                </a>
                <a href="https://www.instagram.com/bookmyshowin" target="_blank">
                    <img src={instagram.src} alt="" className='mx-2' />
                </a>
            </div>
        </div>
    </div>
}