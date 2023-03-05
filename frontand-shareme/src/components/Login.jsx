import React from 'react'
import GoogleLogin from 'react-google-login'
import Logo from '../assets/logowhite.png'
import LogoVideo from '../assets/share.mp4'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import {client} from '../client'
import {gapi} from 'gapi-script'
import { useEffect } from 'react'

const Login = () => {

    const navigate = useNavigate()
    
    const clientId = ""

    useEffect(() => {
        gapi.load('client:auth2', () => {
            gapi.auth2.init({clientId: clientId })
        })
    },[])
    
    const responseGoogle = (respons) => {
        localStorage.setItem('user', JSON.stringify(respons.profileObj))

        const {name, googleId, imageUrl} = respons.profileObj

        const doc = {
            _id: googleId,
            _type: 'user',
            userName: name,
            image: imageUrl
        }

        client.createIfNotExists(doc).then(() => {
            navigate('/', {replace: true})
        })
    }

    return (
        <div className='flex justify-start flex-col items-center h-screen'>
            <div className="w-full h-full relative">
                <video src={LogoVideo}
                    loop
                    type='video/mp4'
                    autoPlay
                    muted
                    controls={false}
                    className='object-cover h-full w-full'
                />
            </div>

            <div className="absolute justify-center flex flex-col top-0 left-0 right-0 bottom-0 bg-blackOverlay items-center">
                <div className="p-5 ">
                    {/* <img src={Logo} width='130px' /> */}
                    <h1 className=' font-bold text-[25px] text-red-500 '>Sepesial Team</h1>
                </div>

                <div className="shadow-2x1">
                    <GoogleLogin
                        clientId= {clientId}
                        render={(renderProps) => (
                            <button
                                type='button'
                                className='bg-mainColor flex items-center rounded-lg cursor-pointer p-3'
                                onClick={renderProps.onClick}
                                disabled= {renderProps.disabled}
                            >
                                <FcGoogle className='mr-4'/> Sig in with Google
                            </button>
                        )}

                        onSuccess= {responseGoogle}
                        onFailure= {responseGoogle}
                        cookiePolicy= "single_host_origin"
                    />
                </div>
            </div>
        </div>
    )
}

export default Login