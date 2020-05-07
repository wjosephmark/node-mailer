require("dotenv").config()
const express = require("express")
const nodemailer = require("nodemailer")

const router = express.Router()

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    auth: {
        user: `${process.env.EMAIL_USER}`,
        pass: `${process.env.EMAIL_PASS}`
    }
})

router.post("/mailer", (req, res) => {
    const { email } = req.body

    const mailOptions = {
        from: "Some Dude <wjosephmark@gmail.com>",
        to: `${email}`,
        subject: "Testing Nodemailer",
        text:`
        Hello duder,
    
        This is looking like the mailer is working. Huzzah!!!
    
        sincerely,
    
        Some Dude
        `
    } 
    
    transporter.sendMail(mailOptions, (err, response) => {
        if(err){
            console.log(err)
            res.status(500).json({ message: "Mailer failed to send email", errors: true })
        } else {
            res.status(200).json({ message: "Email sent"})
        }
    })
})

module.exports = router