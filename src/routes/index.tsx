import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AlertTriangle, Check, KeyRound, ShieldCheck, ArrowUpRight, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "GitHub Demo · Phishing Awareness" },
    { name: "description", content: "An educational GitHub-themed phishing awareness simulation. Fake credentials only; no real authentication or credential collection." },
    { property: "og:title", content: "GitHub Demo · Phishing Awareness" },
    { property: "og:description", content: "A clearly labeled security-awareness demonstration. Learn to verify the domain before signing in." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Index() {
  const [message, setMessage] = useState("");
  const [completed, setCompleted] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Deliberately do not read any input values or construct a request.
    event.currentTarget.reset();
    setCompleted(true);
    setMessage("No credentials were captured, stored, or transmitted. Always verify the actual domain before signing in.");
  }
  function explain(text: string) {
    setCompleted(false);
    setMessage(text);
  }
  return (
    <div className="demo-page">
      <div className="demo-banner"><AlertTriangle size={16} aria-hidden="true" /><span><strong>SECURITY AWARENESS DEMO</strong><span className="banner-separator">—</span> Do not enter real credentials</span></div>
      <main className="demo-container">
        <header className="demo-heading">
          <svg className="github-mark" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="GitHub-themed educational demo">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2.14c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a11 11 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
          </svg>
          <h1>Sign in to GitHub</h1>
          <p>Educational simulation · Not affiliated with GitHub</p>
        </header>
        <div className="login-box">
          <form onSubmit={submit} autoComplete="off">
            <label htmlFor="username">Demo username</label>
            <input id="username" type="text" defaultValue="demo_user" readOnly aria-describedby="demo-note" />
            <div className="password-row"><label htmlFor="password">Demo password</label><Button type="button" variant="link" className="inline-link" onClick={() => explain("Password recovery is disabled in this educational demonstration. No real authentication is performed.")}>Forgot password?</Button></div>
            <input id="password" type="password" defaultValue="DEMO_PASSWORD_123" readOnly autoComplete="new-password" aria-describedby="demo-note" />
            <p id="demo-note" className="demo-note"><LockKeyhole size={12} aria-hidden="true" /> Fixed, fictional credentials for your safety.</p>
            <Button type="submit" className="signin w-full">Sign in</Button>
          </form>
          <div className="divider"><span>or</span></div>
          <Button type="button" variant="outline" className="passkey w-full" onClick={() => explain("This is a passkey demonstration. No passkey is requested and no real authentication is performed.")}><KeyRound size={16} />Sign in with a passkey</Button>
        </div>
        {message && <div className="simulation-message" role="status"><ShieldCheck size={20} aria-hidden="true" /><div><strong>{completed ? "Simulation complete." : "Educational demonstration"}</strong><p>{message}</p></div></div>}
        <div className="create-account">New to GitHub? <Button type="button" variant="link" className="inline-link" onClick={() => explain("Account creation is disabled in this demonstration. This page is not connected to GitHub.")}>Create an account</Button>.</div>
        <section className="security" aria-labelledby="awareness-title">
          <div className="security-title"><ShieldCheck size={21} aria-hidden="true" /><h2 id="awareness-title">Phishing Awareness Demo</h2></div>
          <p>This is a simulated login page created for cybersecurity education.</p>
          <p>No credentials are stored, transmitted, or logged. A familiar-looking page does not mean a website is genuine.</p>
          <h3>Before entering credentials, check:</h3>
          <ul>{["The complete website address.", "The actual domain name.", "Unexpected login links.", "Suspicious security messages."].map(item => <li key={item}><Check size={14} aria-hidden="true" />{item}</li>)}</ul>
          <a className="learn-link" href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure" target="_blank" rel="noopener noreferrer">GitHub’s account security guidance <ArrowUpRight size={14} aria-hidden="true" /></a>
        </section>
      </main>
      <footer className="demo-footer"><span>For education. Not authentication.</span><span>Not an official GitHub page.</span></footer>
    </div>
  );
}
