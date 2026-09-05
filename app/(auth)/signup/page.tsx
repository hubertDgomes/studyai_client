'use client'
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import {useRouter}  from "next/navigation";
import { useState } from "react";

const page = () => {
  const [name , setName] = useState("")
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [error, setError] = useState('')
  const {handleSignUp} = useAuth()
  const router = useRouter()

  const handleSignup = async (e : React.FormEvent) => {
    e.preventDefault()
    try{
      await handleSignUp({name , email , password})
      router.push("/dashboard")
    }
     catch (err: any) {
      const message = err.response?.data?.message || 'Signup failed'
      setError(message)
    }
  }


  return (
    <main className="min-h-screen overflow-hidden bg-[#f4efe4] text-[#28251f]">
      <div className="relative mx-auto flex min-h-screen w-full max-w-360 items-center px-5 py-8 sm:px-8 lg:px-14">
        <div className="pointer-events-none absolute -bottom-40 -right-32 h-120 w-120 rounded-full border border-[#d8cdbb] opacity-60" />
        <div className="pointer-events-none absolute -left-40 -top-48 h-112 w-md rounded-full bg-[#e7ddcb] opacity-60" />

        <section className="relative grid w-full overflow-hidden rounded-4xl border border-[#ded4c3] bg-[#fbf8f1] shadow-[0_28px_80px_rgba(76,63,44,0.12)] lg:min-h-175 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex items-center p-7 sm:p-12 lg:order-first lg:p-16 xl:p-20">
            <div className="mx-auto w-full max-w-107.5">
              <div className="mb-9">
                <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-[#8a7860] uppercase">Begin your practice</p>
                <h1 className="font-serif text-4xl leading-none tracking-[-0.035em] text-[#28251f] sm:text-5xl">Create your StudyAI account</h1>
                <p className="mt-5 text-sm leading-6 text-[#756d60]">A thoughtful place for your notes, questions, and next ideas.</p>
              </div>

              <form className="space-y-5">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-semibold tracking-[0.12em] text-[#514b40] uppercase">
                    Full name
                  </label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    className="h-14 w-full rounded-xl border border-[#d8cebd] bg-[#f6f1e8] px-4 text-sm text-[#28251f] outline-none transition placeholder:text-[#aaa092] focus:border-[#66745e] focus:ring-4 focus:ring-[#66745e]/10"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-semibold tracking-[0.12em] text-[#514b40] uppercase">
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

                <div className="  ">
                  <div>
                    <label htmlFor="password" className="mb-2 block text-xs font-semibold tracking-[0.12em] text-[#514b40] uppercase">
                      Password
                    </label>
                    <input
                     onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      placeholder="Create a password"
                      className="h-14 w-full rounded-xl border border-[#d8cebd] bg-[#f6f1e8] px-4 text-sm text-[#28251f] outline-none transition placeholder:text-[#aaa092] focus:border-[#66745e] focus:ring-4 focus:ring-[#66745e]/10"
                    />
                  </div>
                </div>

                
                {error && <p className="text-red-600">{error}</p>}
                <button onClick={handleSignup} type="submit" className="h-14 w-full rounded-xl bg-[#3d4938] px-5 text-sm font-semibold tracking-[0.08em] text-[#fbf8f1] uppercase transition hover:bg-[#2f392b] focus:outline-none focus:ring-4 focus:ring-[#66745e]/25">
                  Create account
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-[#756d60]">
                Already have an account? {" "}
                <Link href="/login" className="font-semibold text-[#52614c] underline decoration-[#aebaa2] underline-offset-4 transition hover:text-[#3d4938]">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          <div className="relative flex min-h-67.5 flex-col justify-between overflow-hidden bg-[#3d4938] p-7 text-[#f8f2e7] sm:p-10 lg:min-h-full lg:p-14">
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full border border-[#aebaa2]/40" />
            <div className="absolute -left-24 -top-32 h-80 w-80 rounded-full border border-[#aebaa2]/25" />

            <div className="relative z-10 flex items-center gap-3 text-sm font-semibold tracking-[0.2em] uppercase">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d9e0d1]/60 text-xs">S</span>
              StudyAI
            </div>

            <div className="relative z-10 mt-16 max-w-md lg:mt-0">
              <p className="mb-5 text-xs font-semibold tracking-[0.24em] text-[#d8e0d1] uppercase">A gentler way to learn</p>
              <h2 className="font-serif text-4xl leading-[0.98] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                Start with one good question.
              </h2>
              <p className="mt-7 max-w-sm text-sm leading-6 text-[#dbe2d5]">
                Build a learning rhythm that feels clear, curious, and entirely your own.
              </p>
            </div>

            <p className="relative z-10 mt-12 text-xs tracking-[0.12em] text-[#c2cfba] uppercase">Make space to grow</p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default page;