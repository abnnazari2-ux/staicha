export default function Loading() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-bone">
      <div className="flex flex-col items-center gap-s4" aria-label="Loading" role="status">
        <span aria-hidden className="block w-[10px] h-[10px] rounded-full bg-oxblood animate-pulse" />
        <p className="font-mono text-[10px] tracking-mono-up uppercase text-pewter">Loading</p>
      </div>
    </section>
  );
}
