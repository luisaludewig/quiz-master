import { motion } from "framer-motion";
import { Code2, Zap, Heart } from "lucide-react";

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      {/* Header */}
      <header className="border-b border-card-border">
        <nav className="flex justify-between items-center max-w-4xl mx-auto px-6 py-4">
        <h1 className="font-bold text-lg">
        <a href="#top">Luisa.dev</a>
        </h1>
          <div className="flex gap-6 text-sm">
          <a href="#top">Start</a>
          <a href="#about">Über mich</a>
          <a href="#projects">Projekte</a>
        </div>
      </nav>
        <div className="max-w-4xl mx-auto px-6 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-4">
              Willkommen auf meiner{" "}
              <span className="text-primary">Website</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ich beginne gerade Programmieren zu lernen und die Welt der
              Webentwicklung zu entdecken. Technologie fasziniert mich sehr und
              ich finde es spannend, Schritt für Schritt neue Dinge zu lernen.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* About Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-16 bg-card rounded-lg border border-card-border p-8 sm:p-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Heart className="w-8 h-8 text-primary" />
            Über mich
          </h2>
          <p className="text-lg text-card-foreground leading-relaxed mb-4">
            Hallo, ich bin Luisa. Ich beginne gerade damit, Programmieren zu
            lernen und interessiere mich sehr für die Welt der IT. Besonders
            spannend finde ich es herauszufinden, wie Programme, Apps und
            Websites funktionieren und entwickelt werden. Aktuell probiere ich
            erste kleine Projekte aus, um praktische Erfahrungen zu sammeln und
            meine Fähigkeiten weiterzuentwickeln.
          </p>
          <p className="text-lg text-card-foreground leading-relaxed">
            Ich bin gespannt, wohin mich meine Reise in der Welt der IT noch
            führen wird und freue mich auf die Herausforderungen und
            Endeckungen, die mich erwarten.
          </p>
        </motion.section>
        {/* Learning Programming Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-card rounded-lg border border-card-border p-8 sm:p-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Code2 className="w-8 h-8 text-accent" />
            Mein Weg in die Programmierung
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/20 text-primary">
                  <Zap className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Frontend Entwicklung
                </h3>
                <p className="text-card-foreground">
                  Ich lerne aktuell die Grundlagen der Webentwicklung mit HTML,
                  CSS, JavaScript und probiere aus, wie man Webseiten gestaltet
                  und interaktiv macht.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-secondary/20 text-secondary">
                  <Zap className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Backend Entwicklung
                </h3>
                <p className="text-card-foreground">
                  Außerdem interessiere ich mich dafür, wie Programme im
                  Hintergrund funktionieren und wie Datenbanken arbeiten. Ich
                  probiere gerade aus, wie man Server baut und Daten speichert.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accent/20 text-accent">
                  <Zap className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Erste Projekte
                </h3>
                <p className="text-card-foreground">
                  Zurzeit arbeite ich an kleinen Projekten, um praktische
                  Erfahrungen zu sammeln und meine Fähigkeiten schrittweise zu
                  verbessern.
                </p>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground mt-8 text-center italic">
            Ich freue mich drauf, noch viele neue Dinge zu lernen und eigene
            Projekte umzusetzen.
          </p>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-card rounded-lg border border-card-border p-8 sm:p-12 mt-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            Projekt: Quiz-Webanwendung
          </h2>
          <p className="text-muted-foreground mb-4">
            Ein kleines Quiz-Spiel, das ich entwickelt habe, um Programmierung und Webentwicklung praktisch zu üben.
          </p>
          <p className="text-card-foreground mb-4">
            Als erstes kleines Projekt habe ich ein Quiz entwickelt. Dabei probiere ich aus, wie man Fragen, Antworten und Auswertungen in einer Webanwendung umsetzt.
          </p>
          <p className="text-card-foreground mb-4">
            Das Projekt hilft mir, Programmierung praktisch zu üben und besser zu verstehen.
          </p>
          <p className="text-card-foreground mb-6">
            Technologien: React, TypeScript, TailwindCSS.
          </p>
          <div className="mt-6">
            <a href="/quiz">
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition">
                Quiz ausprobieren
              </button>
            </a>
          </div>
        </motion.section>
          
      </main>

      {/* Footer */}
      <footer className="border-t border-card-border mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center text-muted-foreground">
          <p>
            &copy; 2026 My Personal Website. Built with React and TypeScript.
          </p>
        </div>
      </footer>
    </div>
  );
}
