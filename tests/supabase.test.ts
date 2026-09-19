import { describe, expect, it, vi } from "vitest";

describe("getSupabase", () => {
  it("devuelve la misma instancia en llamadas sucesivas (singleton)", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://x.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-test";
    vi.resetModules();
    const { getSupabase } = await import("@/lib/supabase");
    const a = getSupabase();
    const b = getSupabase();
    expect(a).not.toBeNull();
    expect(b).toBe(a);
  });

  it("devuelve null sin configuración", async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    vi.resetModules();
    const { getSupabase, supabaseConfigurado } = await import("@/lib/supabase");
    expect(supabaseConfigurado).toBe(false);
    expect(getSupabase()).toBeNull();
  });
});
