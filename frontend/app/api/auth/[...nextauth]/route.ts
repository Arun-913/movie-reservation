import { prismaClient } from "@/db";
import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import { PassThrough } from "stream";
import z from 'zod';
import bcrypt from 'bcrypt';

const UserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

const handler = NextAuth({
  providers: [
    CredentialsProvider({
        credentials: {
          username: { label: 'Username', type: 'text', placeholder: 'Username'},
          email: { label: 'Email', type: 'text', placeholder: 'Email' },
          password: { label: 'Password', type: 'password', placeholder: 'Password' },
        },
        async authorize(credentials: any): Promise<any>{
          try{
            UserSchema.parse({
              username: credentials.username,
              email: credentials.email,
              password: credentials.password,
            });

            const existingUser = await prismaClient.user.findFirst({
              where: {
                email: credentials.email
              }
            });
  
            if(!existingUser){
              const user = await prismaClient.user.create({
                data: {
                  username: credentials.username,
                  email: credentials.email,
                  password: credentials.password
                }
              });
  
              return {
                id: user.id,
                username: credentials.username,
                email: credentials.email
              }
            }
            else if(credentials.password == existingUser.password){
              return {
                id: existingUser.id,
                username: credentials.username,
                email: credentials.email
              };
            }
            return null;

          }catch(e){
            return null;
          }
        },
      })
  ],
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }