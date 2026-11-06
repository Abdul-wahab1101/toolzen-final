const JSON_HEADERS = { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" };

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get("Origin");
  const requestOrigin = new URL(request.url).origin;
  if (origin && origin !== requestOrigin) {
    return new Response(JSON.stringify({ error: "Request origin not allowed." }), { status: 403, headers: JSON_HEADERS });
  }
  if (!env.GROQ_API_KEY) {
    return new Response(JSON.stringify({ error: "AI CV is not connected yet. The site owner needs to add the GROQ_API_KEY secret in Cloudflare Pages settings." }), { status: 503, headers: JSON_HEADERS });
  }
  let body;
  try { body = await request.json(); } catch {
    return new Response(JSON.stringify({ error: "Please send valid CV details." }), { status: 400, headers: JSON_HEADERS });
  }
  const clean = value => String(value || "").trim().slice(0, 1800);
  const data = {
    name: clean(body.name), targetRole: clean(body.targetRole), title: clean(body.title),
    location: clean(body.location), education: clean(body.education), experience: clean(body.experience),
    skills: clean(body.skills), languages: clean(body.languages), extra: clean(body.extra)
  };
  if (!data.name || ![data.education, data.experience, data.skills, data.extra].some(Boolean)) {
    return new Response(JSON.stringify({ error: "Enter your name and at least one education, experience, skill or personal detail." }), { status: 400, headers: JSON_HEADERS });
  }
  const prompt = `Create concise, professional English CV wording from the candidate's real details below.
Return ONLY a valid JSON object with these string keys: role, summary, experience, skills, languages.
Rules:
- Never invent employers, job titles, dates, degrees, certificates, achievements, language fluency, numbers or skills.
- If the candidate has no work experience, keep experience as an empty string. Do not fabricate experience. You may write a suitable fresher summary.
- Preserve the meaning of the supplied facts. Translate Roman Urdu or Urdu-style wording into clear English without adding facts.
- Make the summary 2-4 sentences, tailored to the target role if supplied.
- Rephrase supplied experience into clear bullet-like lines, but only if actual experience was provided.
- Keep skills limited to skills explicitly supplied or clearly evidenced by the candidate's own details. If uncertain, leave skills empty.
- If no languages were provided, return an empty languages string.
- Do not include markdown fences or commentary.
Candidate details:
${JSON.stringify(data)}`;
  let upstream;
  try {
    upstream = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "authorization": `Bearer ${env.GROQ_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are a careful professional CV editor. Follow the user's facts exactly and never fabricate credentials or experience." },
          { role: "user", content: prompt }
        ],
        temperature: 0.25,
        max_completion_tokens: 900,
        response_format: { type: "json_object" }
      })
    });
  } catch {
    return new Response(JSON.stringify({ error: "Could not connect to the AI provider. Please try again." }), { status: 502, headers: JSON_HEADERS });
  }
  const result = await upstream.json().catch(() => ({}));
  if (!upstream.ok) {
    return new Response(JSON.stringify({ error: upstream.status === 429 ? "AI service is busy or its free usage limit has been reached. Try again later." : "AI provider could not complete this request. Please try again later." }), { status: upstream.status === 429 ? 429 : 502, headers: JSON_HEADERS });
  }
  const content = result.choices?.[0]?.message?.content;
  let draft;
  try { draft = JSON.parse(content); } catch {
    return new Response(JSON.stringify({ error: "AI returned an unreadable draft. Please try again." }), { status: 502, headers: JSON_HEADERS });
  }
  const output = {};
  for (const key of ["role", "summary", "experience", "skills", "languages"]) output[key] = typeof draft[key] === "string" ? draft[key].slice(0, 2400) : "";
  return new Response(JSON.stringify(output), { status: 200, headers: JSON_HEADERS });
}
