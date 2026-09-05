"use client";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { handleLogin } = useAuth();

  const handlelogin = async (e : React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await handleLogin({ email, password });
      router.push("/dashboard");
    } catch (err: any) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4efe4] text-[#28251f]">
      <div className="relative mx-auto flex min-h-screen w-full max-w-360 items-center px-5 py-8 sm:px-8 lg:px-14">
        <div className="pointer-events-none absolute -right-32 -top-40 h-120 w-120 rounded-full border border-[#d8cdbb] opacity-60" />
        <div className="pointer-events-none absolute -bottom-48 -left-40 h-112 w-md rounded-full bg-[#e7ddcb] opacity-60" />

        <section className="relative grid w-full overflow-hidden rounded-4xl border border-[#ded4c3] bg-[#fbf8f1] shadow-[0_28px_80px_rgba(76,63,44,0.12)] lg:min-h-175 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative flex min-h-67.5 flex-col justify-between overflow-hidden bg-[#3d4938] p-7 text-[#f8f2e7] sm:p-10 lg:min-h-full lg:p-14">
            <div className="absolute -right-20 top-20 h-64 w-64 rounded-full border border-[#aebaa2]/40" />
            <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full border border-[#aebaa2]/25" />

            <div className="relative z-10 flex items-center gap-3 text-sm font-semibold tracking-[0.2em] uppercase">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d9e0d1]/60 text-xs">
                S
              </span>
              StudyAI
            </div>

            <div className="relative z-10 mt-16 max-w-md lg:mt-0">
              <p className="mb-5 text-xs font-semibold tracking-[0.24em] text-[#d8e0d1] uppercase">
                Your quiet study space
              </p>
              <h2 className="font-serif text-4xl leading-[0.98] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                Make room for better thinking.
              </h2>
              <p className="mt-7 max-w-sm text-sm leading-6 text-[#dbe2d5]">
                Return to your notes, ideas, and the small rituals that move
                learning forward.
              </p>
            </div>

            <p className="relative z-10 mt-12 text-xs tracking-[0.12em] text-[#c2cfba] uppercase">
              Learn at your own pace
            </p>
          </div>

          <div className="flex items-center p-7 sm:p-12 lg:p-16 xl:p-20">
            <div className="mx-auto w-full max-w-107.5">
              <div className="mb-10">
                <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-[#8a7860] uppercase">
                  Welcome back
                </p>
                <h1 className="font-serif text-4xl leading-none tracking-[-0.035em] text-[#28251f] sm:text-5xl">
                  Sign in to StudyAI
                </h1>
                <p className="mt-5 text-sm leading-6 text-[#756d60]">
                  Pick up exactly where your curiosity left off.
                </p>
              </div>

              <form className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-semibold tracking-[0.12em] text-[#514b40] uppercase"
                  >
                    Email address
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="h-14 w-full rounded-xl border border-[#d8cebd] bg-[#f6f1e8] px-4 text-sm text-[#28251f] outline-none transition placeholder:text-[#aaa092] focus:border-[#66745e] focus:ring-4 focus:ring-[#66745e]/10"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <label
                      htmlFor="password"
                      className="block text-xs font-semibold tracking-[0.12em] text-[#514b40] uppercase"
                    >
                      Password
                    </label>
                  </div>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="h-14 w-full rounded-xl border border-[#d8cebd] bg-[#f6f1e8] px-4 text-sm text-[#28251f] outline-none transition placeholder:text-[#aaa092] focus:border-[#66745e] focus:ring-4 focus:ring-[#66745e]/10"
                  />
                </div>
                {error && <p className="text-red-600">{error}</p>}
                <button
                  onClick={handlelogin}
                  type="submit"
                  className="h-14 w-full rounded-xl bg-[#3d4938] px-5 text-sm font-semibold tracking-[0.08em] text-[#fbf8f1] uppercase transition hover:bg-[#2f392b] focus:outline-none focus:ring-4 focus:ring-[#66745e]/25"
                >
                  Sign in
                </button>
              </form>

              <div className="my-8 flex items-center gap-4 text-xs text-[#aaa092]">
                <span className="h-px flex-1 bg-[#e2d9ca]" />
                or
                <span className="h-px flex-1 bg-[#e2d9ca]" />
              </div>
              <p className="mt-8 text-center text-sm text-[#756d60]">
                New to StudyAI?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-[#52614c] underline decoration-[#aebaa2] underline-offset-4 transition hover:text-[#3d4938]"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default page;
