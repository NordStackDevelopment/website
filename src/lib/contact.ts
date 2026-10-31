// Contact form. The front end is ready; Phase 5 connects sendMessage to Supabase.

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactMessage, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validate(m: ContactMessage): ContactErrors {
  const errors: ContactErrors = {};
  if (!m.email.trim()) errors.email = 'Add your email so I can reply.';
  else if (!EMAIL.test(m.email.trim())) errors.email = 'That email doesn’t look right.';
  if (!m.message.trim()) errors.message = 'Write a message first.';
  else if (m.message.length > 5000) errors.message = 'Keep it under 5000 characters.';
  if (m.name.length > 200) errors.name = 'Keep the name under 200 characters.';
  return errors;
}

export class NotConnectedError extends Error {}

/** Placeholder until Phase 5: nothing is sent yet. */
export async function sendMessage(_m: ContactMessage): Promise<void> {
  throw new NotConnectedError('The contact form is not connected yet.');
}
