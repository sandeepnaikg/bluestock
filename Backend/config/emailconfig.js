import nodemailer from "nodemailer";
const transporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASS
    },
});

export async function sendEmail(to,subject,text,html) {
    try {
        const info=await transporter.sendMail({
            from:process.env.EMAIL,
            to,subject,text,html
        });
    
        return {Success:true,messageId:info.messageId};
    } catch (error) {
        console.error("Error sending email",error);
        return {Success:false,error:error.message}
        
    }
    
}