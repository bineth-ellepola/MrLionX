import nodemailer from 'nodemailer'
import { config } from '../config.js'

const { host, port, user, pass, notifyTo } = config.mail
const enabled = Boolean(host && user && pass && notifyTo)

const transporter = enabled
  ? nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } })
  : null

const escapeHtml = (str = '') =>
  str.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

// Sends a notification for a new contact message. Failures are logged, never thrown,
// so a mail outage doesn't lose the saved enquiry.
export async function notifyNewMessage(msg) {
  if (!enabled) return
  try {
    await transporter.sendMail({
      from: `"MrLionX Website" <${user}>`,
      to: notifyTo,
      replyTo: msg.email,
      subject: `New enquiry from ${msg.name}`,
      text: `Name: ${msg.name}\nEmail: ${msg.email}\nBudget: ${msg.budget || '-'}\n\n${msg.message}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(msg.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(msg.email)}</p>
        <p><strong>Budget:</strong> ${escapeHtml(msg.budget || '-')}</p>
        <p style="white-space:pre-wrap">${escapeHtml(msg.message)}</p>
      `,
    })
  } catch (err) {
    console.error('Failed to send notification email:', err.message)
  }
}
