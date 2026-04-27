import Navbar from "@/components/Navbar";
import { loadWorks } from "@/lib/loadWorks";

export default function AboutPage() {
  const works = loadWorks();
  return (
    <main style={{ position: "relative", minHeight: "100vh" }}>
      <Navbar works={works} />
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 80px",
        }}
      >
        <div style={{ maxWidth: 520, width: "100%", textAlign: "left" }}>
          <h1
            style={{
              fontFamily: "var(--display)",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: 48,
              letterSpacing: "0.08em",
              margin: 0,
              marginBottom: 32,
              color: "var(--bone)",
            }}
          >
            Naabi Kage
          </h1>
          <p
            style={{
              fontFamily: "var(--body)",
              fontSize: 17,
              lineHeight: 1.8,
              color: "rgba(26,24,20,0.6)",
              margin: 0,
              marginBottom: 24,
            }}
          >
            Welcome to the world of Naabi Kage. Through the painterly, anime-inspired digital art, 
            Naabi creates characters and landscapes carrying nostalgia, depth, and a sense of peaceful reflections. 
            Each piece is created as an invitation to pause, wander, and find comfort in another world for a little while.
          </p>
          <p
            style={{
              fontFamily: "var(--body)",
              fontSize: 17,
              lineHeight: 1.8,
              color: "rgba(26,24,20,0.6)",
              margin: 0,
              marginBottom: 48,
            }}
          >
            Inspired by mythology, folklore, and the quiet beauty of nature, 
            a warm refuge where imagination can breathe, far from the noise of everyday life.
          </p>
          <a
            href="mailto:naabikage@gmail.com"
            className="text-reveal"
            aria-label="Email naabikage@gmail.com"
            style={{
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            <span className="text-reveal__ghost" style={{ color: "rgba(26,24,20,0.35)" }}>
              naabikage@gmail.com
            </span>
            <span aria-hidden className="text-reveal__clip">
              naabikage@gmail.com
            </span>
          </a>
        </div>
      </section>
    </main>
  );
}
