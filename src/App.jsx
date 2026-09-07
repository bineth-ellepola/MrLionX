import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Process from './components/Process.jsx'
import Projects from './components/Projects.jsx'
import Pricing from './components/Pricing.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Process />
        <Projects />
        <Pricing />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
