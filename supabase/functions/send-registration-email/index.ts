import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { createTransport } from 'npm:nodemailer';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { first_name, last_name, email, phone, club_id, source } = await req.json();

    // Insert using service role key — bypasses RLS
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { error: insertError } = await supabase.from('registrations').insert([{
      first_name,
      last_name: last_name || null,
      email,
      phone: phone || null,
      club_id: club_id || null,
      source: source ?? 'free_trial',
    }]);
    if (insertError) throw insertError;

    // Resolve club name for email
    let club_name: string | null = null;
    if (club_id) {
      const { data: clubRow } = await supabase.from('clubs').select('name').eq('id', club_id).single();
      club_name = clubRow?.name ?? null;
    }

    const transporter = createTransport({
      host: Deno.env.get('SMTP_HOST'),
      port: Number(Deno.env.get('SMTP_PORT') ?? '587'),
      secure: Deno.env.get('SMTP_SECURE') === 'true',
      auth: {
        user: Deno.env.get('SMTP_USER'),
        pass: Deno.env.get('SMTP_PASS'),
      },
      tls: { rejectUnauthorized: false },
    });

    const from = 'Red Fitness <halo@redfitness.co.id>';
    const fullName = [first_name, last_name].filter(Boolean).join(' ');
    const clubLabel = club_name ? ` – ${club_name}` : '';

    await transporter.sendMail({
      from,
      to: email,
      subject: 'Selamat datang di Red Fitness – Free Trial Terdaftar!',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:40px;">
          <div style="border-left:4px solid #DF2026;padding-left:20px;margin-bottom:30px;">
            <h1 style="color:#DF2026;margin:0;font-size:28px;font-weight:900;">RED FITNESS</h1>
            <p style="color:rgba(255,255,255,0.4);margin:4px 0 0;font-size:11px;letter-spacing:3px;text-transform:uppercase;">Free Trial Confirmation</p>
          </div>
          <p style="font-size:16px;margin-bottom:8px;">Hi <strong>${fullName}</strong>,</p>
          <p style="color:rgba(255,255,255,0.65);line-height:1.8;margin-top:0;">
            Terima kasih telah mendaftar free trial di <strong>Red Fitness${clubLabel}</strong>.
            Tim kami akan segera menghubungi kamu untuk konfirmasi jadwal sesi pertamamu.
          </p>
          <div style="margin:32px 0;padding:24px;border:1px solid rgba(223,32,38,0.3);background:rgba(223,32,38,0.05);">
            <h3 style="color:#DF2026;margin:0 0 16px;font-size:12px;text-transform:uppercase;letter-spacing:2px;">Detail Pendaftaran</h3>
            <table style="width:100%;border-collapse:collapse;font-size:14px;color:rgba(255,255,255,0.65);">
              <tr><td style="padding:6px 0;width:100px;">Nama</td><td style="color:#fff;font-weight:600;">${fullName}</td></tr>
              <tr><td style="padding:6px 0;">Email</td><td style="color:#fff;">${email}</td></tr>
              ${phone ? `<tr><td style="padding:6px 0;">Telepon</td><td style="color:#fff;">${phone}</td></tr>` : ''}
              ${club_name ? `<tr><td style="padding:6px 0;">Klub</td><td style="color:#fff;">${club_name}</td></tr>` : ''}
            </table>
          </div>
          <p style="color:rgba(255,255,255,0.4);font-size:13px;">
            Ada pertanyaan? Balas email ini atau hubungi kami langsung via WhatsApp.
          </p>
          <p style="color:rgba(255,255,255,0.2);font-size:11px;margin-top:32px;border-top:1px solid rgba(255,255,255,0.08);padding-top:20px;">
            © Red Fitness Indonesia. All rights reserved.
          </p>
        </div>
      `,
    });

    await transporter.sendMail({
      from,
      to: 'halo@redfitness.co.id',
      subject: `[Free Trial] ${fullName}${clubLabel}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#1a1a1a;color:#fff;padding:32px;">
          <h2 style="color:#DF2026;margin:0 0 20px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:16px;">New Registration</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
              <td style="padding:10px 0;color:rgba(255,255,255,0.45);width:110px;">Name</td>
              <td style="padding:10px 0;color:#fff;font-weight:700;">${fullName}</td>
            </tr>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
              <td style="padding:10px 0;color:rgba(255,255,255,0.45);">Email</td>
              <td style="padding:10px 0;"><a href="mailto:${email}" style="color:#DF2026;">${email}</a></td>
            </tr>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
              <td style="padding:10px 0;color:rgba(255,255,255,0.45);">Phone</td>
              <td style="padding:10px 0;color:#fff;">${phone || '—'}</td>
            </tr>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
              <td style="padding:10px 0;color:rgba(255,255,255,0.45);">Club</td>
              <td style="padding:10px 0;color:#fff;">${club_name || '—'}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:rgba(255,255,255,0.45);">Source</td>
              <td style="padding:10px 0;color:#fff;">${source ?? 'free_trial'}</td>
            </tr>
          </table>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
