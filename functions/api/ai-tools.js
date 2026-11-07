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
  const allowed = ["writing", "grammar", "cover", "summarize", "interview", "translate"];
  if (!allowed.includes(tool)) {
    return new Response(JSON.stringify({ error: "Unknown AI tool." }), { status: 400, headers: JSON_HEADERS });
  }
  const raw = body.fields && typeof body.fields === "object" ? body.fields : {};
  const clean = value => String(value || "").trim().slice(0, 5000);
  const fields = {};
  for (const key of ["type", "tone", "details", "text", "mode", "name", "role", "company", "experience", "job", "style", "length", "level", "answer", "language", "source", "target"]) {
    fields[key] = clean(raw[key]);
  }

  let instructions = "";
  if (tool === "writing") {
    if (!fields.details) return new Response(JSON.stringify({ error: "Describe what you want the AI to write." }), { status: 400, headers: JSON_HEADERS });
    instructions = `Write a useful, polished ${fields.type || "piece of content"} in a ${fields.tone || "clear"} tone using the user's instructions. Do not invent personal facts, dates, credentials, events, statistics or promises. If essential details are missing, use clearly marked neutral placeholders such as [Your Name] rather than making them up. Return the finished draft only, with no preamble. User instructions:\\n${fields.details}`;
  } else if (tool === "grammar") {
    if (!fields.text) return new Response(JSON.stringify({ error: "Paste the text you want to improve." }), { status: 400, headers: JSON_HEADERS });
    instructions = `Task: ${fields.mode || "Fix grammar and spelling"}. Tone: ${fields.tone || "Keep original tone"}. Preserve the original meaning, facts, names, numbers and intent. Do not add new claims or remove important information. Return only the improved text, without explanations or quotation marks. Text:\\n${fields.text}`;
  } else if (tool === "cover") {
    if (!fields.name || !fields.role || !fields.experience) return new Response(JSON.stringify({ error: "Enter your name, job title and real skills or experience." }), { status: 400, headers: JSON_HEADERS });
    instructions = `Write a concise, professional job application cover letter in English. Candidate name: ${fields.name}. Target job: ${fields.role}. Company: ${fields.company || "[Company Name]"}. Candidate's actual skills/experience: ${fields.experience}. Job requirements: ${fields.job || "Not provided"}. Only use facts explicitly supplied. Never invent employers, qualifications, years of experience, achievements, metrics or company facts. Connect the supplied skills to the role honestly. If a detail is missing, omit it or use a clear placeholder. Use a professional greeting and sign-off. Return the complete editable letter only.`;
  } else if (tool === "summarize") {
    if (!fields.text) return new Response(JSON.stringify({ error: "Paste the text you want summarized." }), { status: 400, headers: JSON_HEADERS });
    instructions = `Summarize the supplied text as ${fields.style || "a short paragraph"} with a ${fields.length || "short"} level of detail. Preserve the source's key facts, names, numbers, caveats and meaning. Do not add information that is not in the source. If the source contains uncertainty, keep it. Use clear headings or bullets when appropriate. Return only the summary. Source text:\\n${fields.text}`;
  } else if (tool === "interview") {
    if (!fields.role) return new Response(JSON.stringify({ error: "Enter the job role you are preparing for." }), { status: 400, headers: JSON_HEADERS });
    if (fields.mode === "Review my answer" && !fields.answer) return new Response(JSON.stringify({ error: "Paste your interview answer so it can be reviewed." }), { status: 400, headers: JSON_HEADERS });
    if (fields.mode === "Review my answer") {
      instructions = `Act as a supportive interview coach. Job role: ${fields.role}. Candidate level: ${fields.level || "Beginner / Fresher"}. Respond in ${fields.language || "English"}. Review this answer: ${fields.answer}. Give a brief assessment, what was good, what could improve, a stronger example answer that does not invent the candidate's experience, and one practical tip. Be kind, specific and constructive. Clearly label any sample wording as an example.`;
    } else {
      instructions = `Create 8 realistic interview practice questions for the role ${fields.role}. Candidate level: ${fields.level || "Beginner / Fresher"}. Respond in ${fields.language || "English"}. Include a mix of common, role-specific and situational questions. For each, add a short note about what the interviewer wants to learn. Do not claim these are guaranteed or actual questions from a specific employer. Finish with 2 practical preparation tips.`;
    }
  } else if (tool === "translate") {
    if (!fields.text || !fields.target) return new Response(JSON.stringify({ error: "Enter text and choose the target language." }), { status: 400, headers: JSON_HEADERS });
    instructions = `Translate the text from ${fields.source || "Auto-detect"} into ${fields.target}. Style: ${fields.style || "Natural and conversational"}. Preserve meaning, names, numbers, paragraph breaks and formatting as much as possible. For Roman Urdu, use natural Latin-script Urdu rather than Devanagari. Do not summarize, explain or add commentary. If the source is ambiguous, choose the most likely meaning without inventing details. Return only the translation. Text:\\n${fields.text}`;
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
