import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Layout from '@/components/Layout';

export default function Home() {
  return (
    <>
      <Hero />
      <Layout>
        <About />
        <Projects />
        <Skills />
        <Contact />
      </Layout>
    </>
  );
} 