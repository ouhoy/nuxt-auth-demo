import {NuxtAuthHandler} from "#auth";
import Credentials from "next-auth/providers/credentials";
export default NuxtAuthHandler({
    secret: useRuntimeConfig().authSecret,

    pages: {
        signIn: '/login',
    }
    ,
    providers: [
        // @ts-expect-error
        Credentials.default({
        name: 'credentials',
        credentials: {

        },

        // @ts-ignore
        async authorize(credentials:{username:string, password:string} | undefined, req) {

            return {}
        },




    })],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({token, user, account, profile, isNewUser}) {

            if(user) {
                token = {
                    ...token,
                    ...user,
                }


            }

            return token

        },
        async session({session, token}) {
           session.user = {
               ...token,
               ...session.user
           }

           return session
        },

    }
})