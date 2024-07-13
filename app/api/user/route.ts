import { NextResponse } from "next/server";
import {db} from "@/lib/db";
import {hash} from "bcrypt";
import * as z from 'zod'

const userSchema =z.object({
    username:z.string().min(1,'Username is required').max(100),
    email:z.string().min(1,'Email is required').email('Invaild email'),
    passwd:z
        .string()
        .min(1,'Password is required')
        .min(8,'Password must have 8 characters'),
    confirmPassword: z.string().min(1,"Password Confirmation is required"),    
});
// .refine((data)=>data.passwd===data.confirmPassword,{
//     path:['confirmPassword'],
//     message:'Password do not match',
// }); 

export async function POST(req:Request) {
    try{
        const body= await req.json();
        const {username,email,passwd}=userSchema.parse(body);
        // if check email is already exist
        const existingUserByEamil=await db.zuser.findUnique({
            where:{email:email}
        })
        if(existingUserByEamil){
            return NextResponse.json({user:null,message:" User With this email already exists"},{status:409})
        }
        // if check username is already exist
        const existingUserByUsername=await db.zuser.findUnique({
            where:{username:username}
        })
        if(existingUserByUsername){
            return NextResponse.json({user:null,message:" User With this email already exists"},{status:409})
        }
        // newUsr
        const hashedPassword=await hash(passwd,10)
        const newUser=await db.zuser.create({
            data:{
                username,
                passwd:hashedPassword,
                email
            }
        })
        const{passwd:newUserPassword, ...rest}=newUser
        return NextResponse.json({user:rest,message:"User Created successfully"},{status:201});

    }catch(error){
        return NextResponse.json({message:"Something went wrong!"},{status:500});
    }
    
}