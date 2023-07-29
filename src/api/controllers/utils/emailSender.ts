import { Request, Response, Router } from 'express';
import nodemailer from 'nodemailer';
import { EMAIL_ADMIN, EMAIL_ORG, EMAIL_PASSWORD } from '../../../../consts';
import EmailDTO from '../../dto/email.dto';


const utilsRouter = Router()

const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_ADMIN,
      pass: EMAIL_PASSWORD,
    },
  };
  
  const transporter = nodemailer.createTransport(smtpConfig);
  

  utilsRouter.post('/send-email', async (req: Request, res: Response) => {
    try {
        const payload: EmailDTO = req.body.email;
        const { email, firstName, lastName, emailBody } = payload;
    
        if (!email || !firstName || !lastName || !emailBody) {
          return res.status(400).json({ error: 'All fields must be filled!' });
        }
    
        const mailOptions = {
          from: EMAIL_ADMIN,
          to: EMAIL_ORG,
          subject: `Message from ${firstName} ${lastName}. Email ${email}`,
          text: emailBody,
        };
    
        await transporter.sendMail(mailOptions);
    
        res.status(200).json({ message: 'Email sent successfully!' });
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'An error occurred while sending the email' });
      }
  });


  export default utilsRouter;