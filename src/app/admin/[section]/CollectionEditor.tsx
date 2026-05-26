"use client";

import { useEffect, useState } from "react";
import type { Collection } from "@/lib/cms";

type Props = {
  collection: Collection;
  title: string;
  file: string;
  initialData: unknown[];
};

type Status =
  | { kind: "idle" }
  | { kind: "saving" }
  | { kind: "saved"; revalidated: string[] }
  | { kind: "error"; message: string };

export default function CollectionEditor({ collection, title, file, initialData }: Props) {
  const [text, setText] = useState(() => JSON.stringify(initialData, null, 2));
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [valid, setValid] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch override (if any) so the editor reflects what's actually live.
    // Block edits until the fetch resolves so we don't overwrite the user.
    let cancelled = false;
    setLoading(true);
    fetch(`/api/admin/${collection}`)
      .then((r) => r.json())
      .then((res) => {
        if (cancelled) return;
        if (res.ok && res.data) setText(JSON.stringify(res.data, null, 2));
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [collection]);

  useEffect(() => {
    try { JSON.parse(text); setValid(true); } catch { setValid(false); }
  }, [text]);

  async function save() {
    setStatus({ kind: "saving" });
    try {
      const data = JSON.parse(text);
      const res = await fetch(`/api/admin/${collection}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      if (res.ok && body.persisted) {
        setStatus({ kind: "saved", revalidated: body.revalidated ?? [] });
      } else {
        setStatus({
          kind: "error",
          message: body.error ?? "The server could not write to disk. Edit the source file instead.",
        });
      }
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : "Invalid JSON.",
      });
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-s4 mb-s5">
        <div>
          <h1 className="font-serif font-light text-[clamp(32px,4vw,56px)] leading-[1.1] mb-s2">{title}.</h1>
          <p className="font-mono text-[10px] tracking-mono-up uppercase text-silver">Source · {file}</p>
        </div>
        <div className="flex items-center gap-s4">
          <span className={`font-mono text-[10px] tracking-mono-up uppercase ${valid ? "text-verdant" : "text-oxblood-tint"}`}>
            {valid ? "Valid JSON" : "Invalid JSON"}
          </span>
          <button
            type="button"
            disabled={!valid || status.kind === "saving"}
            onClick={save}
            className="px-s5 py-s3 bg-oxblood hover:bg-oxblood-tint text-bone font-sans text-[12px] tracking-kicker uppercase disabled:opacity-60 transition-colors"
          >
            {status.kind === "saving" ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        disabled={loading}
        aria-busy={loading}
        className="w-full h-[60vh] bg-ink-2 border border-bone/15 p-s4 font-mono text-[12px] leading-[1.6] text-bone resize-y focus:outline-none focus:border-oxblood-tint disabled:opacity-60"
      />

      <div className="mt-s4 min-h-[40px]">
        {status.kind === "saved" && (
          <p role="status" className="font-sans text-[13px] text-verdant">
            Saved
            {status.revalidated.length > 0
              ? ` — revalidated ${status.revalidated.length} route${status.revalidated.length === 1 ? "" : "s"}. Refresh the live site to confirm.`
              : ". Refresh the live site to confirm."}
          </p>
        )}
        {status.kind === "error" && (
          <p role="alert" className="font-sans text-[13px] text-oxblood-tint">
            {status.message} <span className="text-silver">— edit the source file at <code className="font-mono text-[12px]">{file}</code> for permanent changes.</span>
          </p>
        )}
        {status.kind === "idle" && (
          <p className="font-sans text-[12px] text-silver">
            Changes save to <code className="font-mono text-[11px] text-oxblood-tint">content-overrides/{collection}.json</code>. Source files remain the source of truth — commit them for permanent changes.
          </p>
        )}
      </div>
    </div>
  );
}
