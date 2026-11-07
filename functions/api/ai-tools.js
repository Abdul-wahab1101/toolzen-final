const JSON_HEADERS = { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" };

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get("Origin");
  const requestOrigin = new URL(request.url).origin;
  if (origin && origin !== requestOrigin) {
    return new Response(JSON.stringify({ error: "Request origin not allowed." }), { status: 403, headers: JSON_HEADERS });
  }
  if (!env.GROQ_API_KEY) {
    return new Response(JSON.stringify({ error: "AI is not connected yet. Please try again later." }), { status: 503, headers: JSON_HEADERS });
  }

  let body;
  try { body = await request.json(); } catch {
    return new Response(JSON.stringify({ error: "Please submit valid text and instructions." }), { status: 400, headers: JSON_HEADERS });
  }

  const tool = String(body.tool || "");
  const allowed = ["writing", "grammar", "cover"];
  if (!allowed.includes(tool)) {
    return new Response(JSON.stringify({ error: "Unknown AI tool." }), { status: 400, headers: JSON_HEADERS });
  }
  const raw = body.fields && typeof body.fields === "object" ? body.fields : {};
  const clean = value => String(value || "").trim().slice(0, 5000);
  const fields = {};
  for (const key of ["type", "tone", "details", "text", "mode", "name", "role", "company", "experience", "job"]) {
    fields[key] = clean(raw[key]);
  }

  let instructions = "";
  if (tool === "writing") {
    if (!fields.details) return new Response(JSON.stringify({ error: "Describe what you want the AI to write." }), { status: 400, headers: JSON_HEADERS });
    instructions = `Write a useful, polished ${fields.type || "piece of content"} in a ${fields.tone || "clear"} tone using the user's instructions. Do not invent personal facts, dates, credentials, events, statistics or promises. If essential details are missing, use clearly marked neutral placeholders such as [Your Name] rather than making them up. Return the finished draft only, with no preamble. User instructions:\\n${fields.details}`;
  } else if (tool === "grammar") {
    if (!fields.text) return new Response(JSON.stringify({ error: "Paste the text you want to improve." }), { status: 400, headers: JSON_HEADERS });
    instructions = `Task: ${fields.mode || "Fix grammar and spelling"}. Tone: ${fields.tone || "Keep original tone"}. Preserve the original meaning, facts, names, numbers and intent. Do not add new claims or remove important information. Return only the improved text, without explanations or quotation marks. Text:\\n${fields.text}`;
  } else {
    if (!fields.name || !fields.role || !fields.experience) return new Response(JSON.stringify({ error: "Enter your name, job title and real skills or experience." }), { status: 400, headers: JSON_HEADERS });
    instructions = `Write a concise, professional job application cover letter in English. Candidate name: ${fields.name}. Target job: ${fields.role}. Company: ${fields.company || "[Company Name]"}. Candidate's actual skills/experience: ${fields.experience}. Job requirements: ${fields.job || "Not provided"}. Only use facts explicitly supplied. Never invent employers, qualifications, years of experience, achievements, metrics or company facts. Connect the supplied skills to the role honestly. If a detail is missing, omit it or use a clear placeholder. Use a professional greeting and sign-off. Return the complete editable letter only.`;
  }

  let upstream;
  try {
    upstream = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "authorization": `Bearer ${env.GROQ_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({
        model: "qwen/qwen3.8-27b",
        reasoning_effort: "none",
        messages: [
          { role: "system", content: "You are ToolZen's careful writing assistant. Follow the user's request, preserve factual accuracy, and never fabricate personal details." },
          { role: "user", content: instructions }
        ],
        temperature: 0.35,
        max_completion_tokens: 1600
      })
    });
  } catch {
    return new Response(JSON.stringify({ error: "Could not connect to the AI provider. Please try again." }), { status: 502, headers: JSON_HEADERS });
  }

  const result = await upstream.json().catch(() => ({}));
  if (!upstream.ok) {
    const providerMessage = String(result.error?.message || "").toLowerCase();
    let message = "AI service could not complete this request. Please try again.";
    if (upstream.status === 401 || upstream.status === 403) message = "AI key is invalid or not active. Please contact the site owner.";
    else if (upstream.status === 429) message = "AI free usage limit is reached or the service is busy. Please wait and try again.";
    else if (upstream.status === 400 && (providerMessage.includes("model") || providerMessage.includes("decommission") || providerMessage.includes("retired"))) message = "AI model configuration needs an update. Please contact the site owner.";
    return new Response(JSON.stringify({ error: message }), { status: upstream.status === 429 ? 429 : 502, headers: JSON_HEADERS });
  }

  const text = result.choices?.[0]?.message?.content;
  if (typeof text !== "string" || !text.trim()) {
    return new Response(JSON.stringify({ error: "AI returned an empty draft. Please try again." }), { status: 502, headers: JSON_HEADERS });
  }
  return new Response(JSON.stringify({ text: text.trim().slice(0, 12000) }), { status: 200, headers: JSON_HEADERS });
}
