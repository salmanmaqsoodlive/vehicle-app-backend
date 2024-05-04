const nodemailer = require("nodemailer");

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_SECRET_KEY,
      },
    });
  }

  async sendEmail(to, subject, text) {
    try {
      const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject: subject,
        text: text,
      };

      await this.transporter.sendMail(mailOptions);
      console.log("Email sent");
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }
}

module.exports = new EmailService();
