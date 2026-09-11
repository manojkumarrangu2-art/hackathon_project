import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { provider, apiKey } = body;

    const key = String(apiKey || '').trim();
    if (!key) {
      return NextResponse.json({ success: false, error: 'API key is required for testing.' }, { status: 400 });
    }

    const start = Date.now();

    if (provider === 'gemini') {
      const models = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'];
      let lastErr = 'Connection failed';

      for (const model of models) {
        try {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: 'Respond with: "OK"' }] }],
                generationConfig: { maxOutputTokens: 10 },
              }),
            }
          );

          if (res.ok) {
            const latency = Date.now() - start;
            return NextResponse.json({
              success: true,
              provider: 'gemini',
              model,
              latencyMs: latency,
              message: `Successfully connected to Google Gemini (${model}) in ${latency}ms!`,
            });
          } else {
            const err = await res.json().catch(() => ({}));
            lastErr = err?.error?.message || `HTTP ${res.status}: ${res.statusText}`;
          }
        } catch (fetchErr: any) {
          lastErr = fetchErr?.message || 'Network error';
        }
      }

      return NextResponse.json({ success: false, error: `Gemini API test failed: ${lastErr}` });
    }

    if (provider === 'openai') {
      try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${key}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: 'Respond with: OK' }],
            max_tokens: 10,
          }),
        });

        if (res.ok) {
          const latency = Date.now() - start;
          return NextResponse.json({
            success: true,
            provider: 'openai',
            model: 'gpt-4o-mini',
            latencyMs: latency,
            message: `Successfully connected to OpenAI (gpt-4o-mini) in ${latency}ms!`,
          });
        } else {
          const err = await res.json().catch(() => ({}));
          const msg = err?.error?.message || `HTTP ${res.status}: ${res.statusText}`;
          return NextResponse.json({ success: false, error: `OpenAI API test failed: ${msg}` });
        }
      } catch (fetchErr: any) {
        return NextResponse.json({ success: false, error: `OpenAI network error: ${fetchErr?.message}` });
      }
    }

    return NextResponse.json({ success: false, error: `Unsupported provider: ${provider}` }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}
