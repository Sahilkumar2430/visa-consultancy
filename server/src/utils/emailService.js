import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

if (!resend) {
  console.warn('⚠️  RESEND_API_KEY not set — email sending disabled');
}

/* ---------- Email wrapper (same as before) ---------- */
const baseWrapper = (content) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background:#f5f1ea;font-family:'Inter',Arial,sans-serif;color:#0f1e38;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f5f1ea;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px -4px rgba(15,30,56,0.08);">
        <tr><td style="background:#0f1e38;padding:24px 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="vertical-align:middle;">
              <div style="display:inline-block;width:36px;height:36px;background:linear-gradient(135deg,#2563eb,#14b8a6);border-radius:10px;text-align:center;line-height:36px;color:#fff;font-weight:bold;font-size:18px;">G</div>
            </td>
            <td style="padding-left:12px;vertical-align:middle;">
              <div style="color:#ffffff;font-size:16px;font-weight:800;letter-spacing:-0.3px;">GlobalPath</div>
              <div style="color:#8faad0;font-size:10px;letter-spacing:2px;text-transform:uppercase;margin-top:2px;">Visa Consultancy</div>
            </td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:32px;">${content}</td></tr>
        <tr><td style="background:#faf8f5;padding:20px 32px;border-top:1px solid #e2e8f0;">
          <p style="margin:0;font-size:11px;color:#8faad0;line-height:1.6;">
            GlobalPath Visa Consultancy<br/>
            Visa decisions are made solely by the relevant government and immigration authorities. We provide guidance but do not guarantee approval.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
`;

export async function sendLeadReplyEmail({ to, name, subject, message, adminName }) {
  if (!resend) {
    console.warn('Email not sent — Resend not configured');
    return { skipped: true };
  }

  const content = `
    <h2 style="margin:0 0 16px;font-size:22px;color:#0f1e38;font-weight:800;">Hi ${name || 'there'},</h2>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#3a619c;">Thank you for your interest in GlobalPath Visa Consultancy. Here is a response from our team:</p>
    <div style="background:#faf8f5;border-left:4px solid #2563eb;border-radius:8px;padding:20px;margin:20px 0;">
      <p style="margin:0;font-size:14px;line-height:1.8;color:#0f1e38;white-space:pre-line;">${String(message).replace(/</g, '&lt;')}</p>
    </div>
    <p style="margin:20px 0 8px;font-size:14px;line-height:1.7;color:#3a619c;">If you have any further questions, simply reply to this email or contact us directly.</p>
    <p style="margin:16px 0 0;font-size:14px;line-height:1.7;color:#0f1e38;">Best regards,<br/><strong>${adminName || 'GlobalPath Team'}</strong></p>
  `;

  const result = await resend.emails.send({
    from: process.env.SMTP_FROM || 'GlobalPath Visa Consultancy <onboarding@resend.dev>',
    to,
    subject: subject || 'Response from GlobalPath Visa Consultancy',
    html: baseWrapper(content),
  });

  if (result.error) {
    throw new Error(result.error.message || 'Resend API error');
  }

  return { messageId: result.data?.id };
}

export async function sendNewLeadNotificationToAdmin(lead) {
  if (!resend) return { skipped: true };

  const to = process.env.ADMIN_EMAIL;
  if (!to) return { skipped: true };

  const content = `
    <h2 style="margin:0 0 16px;font-size:20px;color:#0f1e38;font-weight:800;">New enquiry received</h2>
    <p style="margin:0 0 16px;font-size:14px;color:#3a619c;">A new lead has come in through the website.</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      ${[['Name', lead.name], ['Email', lead.email], ['Phone', lead.phone], ['Destination', lead.preferredDestination || '—'], ['Visa Type', lead.visaType || '—'], ['Source', lead.source || 'website']]
        .map(([k, v]) => `<tr><td style="padding:8px 0;color:#8faad0;width:120px;">${k}</td><td style="padding:8px 0;color:#0f1e38;font-weight:600;">${v || '—'}</td></tr>`)
        .join('')}
    </table>
    <div style="margin-top:24px;">
      <a href="${process.env.CLIENT_URL || 'https://visa-consultancy-two.vercel.app'}/admin/leads" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:12px 24px;border-radius:10px;font-weight:600;font-size:14px;">View in Admin Panel →</a>
    </div>
  `;

  const result = await resend.emails.send({
    from: process.env.SMTP_FROM || 'GlobalPath Visa Consultancy <onboarding@resend.dev>',
    to,
    subject: `New Lead: ${lead.name} — ${lead.preferredDestination || 'Enquiry'}`,
    html: baseWrapper(content),
  });

  if (result.error) {
    throw new Error(result.error.message || 'Resend API error');
  }

  return { messageId: result.data?.id };
}