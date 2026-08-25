import type { APIRoute } from 'astro';

export const prerender = false;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readString(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

export const POST: APIRoute = async ({ request }) => {
  if (!request.headers.get('content-type')?.includes('multipart/form-data') &&
      !request.headers.get('content-type')?.includes('application/x-www-form-urlencoded')) {
    return json({ ok: false, message: 'Unsupported content type.' }, 415);
  }

  const form = await request.formData();
  if (readString(form, 'website')) {
    return json({ ok: true, message: 'Thank you. We have received your message.' });
  }

  const name = readString(form, 'name');
  const email = readString(form, 'email');
  const message = readString(form, 'message');
  const organisation = readString(form, 'organisation');
  const telephone = readString(form, 'telephone');
  const service = readString(form, 'service');

  if (name.length < 2) {
    return json({ ok: false, message: 'Please provide a name.' }, 400);
  }
  if (!EMAIL.test(email)) {
    return json({ ok: false, message: 'Please provide a valid email address.' }, 400);
  }
  if (message.length < 10) {
    return json({ ok: false, message: 'Please include a short message.' }, 400);
  }

  const enquiry = {
    name,
    email,
    organisation,
    telephone,
    service,
    message,
    receivedAt: new Date().toISOString(),
  };

  console.info('CONTACT_ENQUIRY', JSON.stringify(enquiry));

  return json({
    ok: true,
    delivered: Boolean(import.meta.env.CONTACT_TO_EMAIL),
    message: 'Thank you. We have received your message.',
  });
};

export const GET: APIRoute = () => json({ ok: false, message: 'Method not allowed.' }, 405);

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
