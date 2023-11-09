import Title from "../components/Title";
import Header from "../components/Header";
import Center from "../components/Center";
import {signIn, signOut, useSession} from "next-auth/react";
import Button from "../components/Button";

export default function AccountPage(){
    const {data: session} = useSession()
    console.log(session)

    async function logout(){
        await signOut({
                callbackUrl: process.env.NEXT_PUBLIC_URL
            }
        )
    }

    async function login(){
        await signIn('google',{
            callbackUrl: process.env.NEXT_PUBLIC_URL
        })
    }

    return (
        <>
            <Header/>
            <Center>
                <Title>Account</Title>
                {session && (
                    <Button primary onClick={logout}>Logout</Button>
                )}
                { !session && (
                    <Button primary onClick={login}>Login</Button>
                )}
            </Center>
        </>
    )
}