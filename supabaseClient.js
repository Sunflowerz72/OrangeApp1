// supabaseClient.js
const SUPABASE_URL = 'https://vuoayslimvzwiztyfrba.supabase.co/rest/v1/';
const SUPABASE_ANON_KEY = 'sb_publishable_93LRAdZZCV2hAYGkhgUBpA_-G8QaSGO';

export class SupabaseClient {
  constructor() {
    this.headers = new Headers({
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    });
  }

  async fetch(table, options = {}) {
    const url = `${SUPABASE_URL}${table}?` + new URLSearchParams(options.params || {});
    const response = await fetch(url, { headers: this.headers, ...options });
    return response.json();
  }

  async insert(table, data) {
    const response = await fetch(`${SUPABASE_URL}${table}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify([data])
    });
    return response.json();
  }

  async upsert(table, data) {
    const response = await fetch(`${SUPABASE_URL}${table}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify([data])
    });
    return response.json();
  }
}

export const supabase = new SupabaseClient();

// Usage examples:
// supabase.fetch('stocks', { params: { select: '*', user_id: eq.uuid } })
// supabase.insert('trades', { symbol: 'AAPL', quantity: 1, price: 174.5, user_id: uuid })
// supabase.fetch('users', { params: { email: eq.email } })

