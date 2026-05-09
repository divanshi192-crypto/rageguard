import json
import os
import re
import httpx
import anthropic
from dotenv import load_dotenv

load_dotenv()

ANTHROPIC_MODEL = "claude-haiku-4-5-20251001"
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.1-8b-instant")
GROQ_BASE_URL = os.getenv("GROQ_BASE_URL", "https://api.groq.com/openai/v1")


def _strip_json_fences(raw: str) -> str:
    cleaned = raw.strip()
    if cleaned.startswith("```"):
        lines = cleaned.split("\n")
        cleaned = "\n".join(lines[1:-1])
    return cleaned


def _call_groq(prompt: str, system: str = None, max_tokens: int = 1000) -> str:
    api_key = os.getenv("GROQ_API_KEY", "")
    if not api_key or api_key == "your_key_here":
        raise RuntimeError("GROQ_API_KEY is not set.")

    messages = []
    if system:
        messages.append({"role": "system", "content": system})
    messages.append({"role": "user", "content": prompt})

    payload = {
        "model": GROQ_MODEL,
        "messages": messages,
        "temperature": 0.2,
        "max_tokens": max_tokens,
    }

    with httpx.Client(timeout=45.0) as client:
        response = client.post(
            f"{GROQ_BASE_URL}/chat/completions",
            headers={"Authorization": f"Bearer {api_key}"},
            json=payload,
        )
        response.raise_for_status()
        data = response.json()
    return data["choices"][0]["message"]["content"]


def _call_claude(prompt: str, system: str = None, max_tokens: int = 1000) -> str:
    """
    Core function to call Claude API.
    Always returns a string. Raises exception on failure.
    """
    anthropic_key = os.getenv("ANTHROPIC_API_KEY", "")
    if not anthropic_key or anthropic_key == "your_key_here":
        raise RuntimeError("ANTHROPIC_API_KEY is not set.")

    client = anthropic.Anthropic(api_key=anthropic_key)
    kwargs = {
        "model": ANTHROPIC_MODEL,
        "max_tokens": max_tokens,
        "messages": [{"role": "user", "content": prompt}]
    }
    if system:
        kwargs["system"] = system

    response = client.messages.create(**kwargs)
    return response.content[0].text


def call_ai(prompt: str, system: str = None, max_tokens: int = 1000) -> str:
    """
    Provider priority:
    1) Groq (if GROQ_API_KEY exists)
    2) Claude (if ANTHROPIC_API_KEY exists)
    Raises if neither provider is configured.
    """
    groq_key = os.getenv("GROQ_API_KEY", "")
    if groq_key and groq_key != "your_key_here":
        return _call_groq(prompt=prompt, system=system, max_tokens=max_tokens)

    return _call_claude(prompt=prompt, system=system, max_tokens=max_tokens)


def call_ai_json(prompt: str, system: str = None, max_tokens: int = 1000) -> dict:
    """
    Call AI provider and parse response as JSON.
    Strips markdown code fences before parsing.
    """
    raw = call_ai(prompt, system, max_tokens)
    cleaned = _strip_json_fences(raw)
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        # Groq/Claude sometimes return prose around JSON; extract first JSON object.
        match = re.search(r"\{[\s\S]*\}", cleaned)
        if not match:
            raise
        return json.loads(match.group(0))


def call_claude(prompt: str, system: str = None, max_tokens: int = 1000) -> str:
    """Public name used by routes; uses Groq first, then Anthropic (same as call_ai)."""
    return call_ai(prompt, system, max_tokens)


def call_claude_json(prompt: str, system: str = None, max_tokens: int = 1000) -> dict:
    """Public name used by routes; parses JSON from model output (same as call_ai_json)."""
    return call_ai_json(prompt, system, max_tokens)


def call_claude(prompt: str, system: str = None, max_tokens: int = 1000) -> str:
    """Public name used by routes; uses Groq or Anthropic via call_ai."""
    return call_ai(prompt, system, max_tokens)


def call_claude_json(prompt: str, system: str = None, max_tokens: int = 1000) -> dict:
    """Public name used by routes; parses JSON from Groq or Anthropic."""
    return call_ai_json(prompt, system, max_tokens)
