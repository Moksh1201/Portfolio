export const sections = [
  { id: 'launch', label: 'Launch' },
  { id: 'about', label: 'Station' },
  { id: 'skills', label: 'Belt' },
  { id: 'projects', label: 'Planets' },
  { id: 'experience', label: 'Galaxy' },
  { id: 'contact', label: 'Dock' }
];

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/Moksh1201/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/moksh-madan-607b692b2/' }
];

export const skills = [
  { name: 'React', group: 'Interface systems', power: 94 },
  { name: 'TypeScript', group: 'Reliable product code', power: 91 },
  { name: 'Node.js', group: 'API orchestration', power: 89 },
  { name: 'PostgreSQL', group: 'Data modeling', power: 86 },
  { name: 'Three.js', group: 'Spatial web', power: 84 },
  { name: 'AWS', group: 'Cloud delivery', power: 82 },
  { name: 'GraphQL', group: 'Service edges', power: 78 },
  { name: 'Docker', group: 'Portable runtimes', power: 80 },
  { name: 'GSAP', group: 'Cinematic motion', power: 76 },
  { name: 'Framer Motion', group: 'UI animation', power: 88 },
  { name: 'Python', group: 'Automation and AI', power: 81 },
  { name: 'CI/CD', group: 'Release confidence', power: 83 }
];

export const projects = [
  {
    id: 'nebula-ops',
    title: 'Nebula Ops',
    planetName: 'Astra-9',
    description:
      'An AI operations cockpit for live incidents, streaming telemetry, and decision support across distributed engineering teams.',
    tech: ['React', 'Node.js', 'WebSockets', 'LLM APIs', 'PostgreSQL'],
    features: ['Realtime event mesh', 'Predictive incident notes', 'Role-aware command center', 'Audit-ready activity stream'],
    status: 'Live beta',
    timeline: '2026 Q1',
    github: 'https://github.com/',
    demo: 'https://example.com/',
    colorA: '#45d9ff',
    colorB: '#7dffce',
    position: [-11, 2.2, -18],
    radius: 1.42,
    ring: true,
    screenshots: ['Command deck', 'Signal graph', 'Incident replay']
  },
  {
    id: 'pulse-commerce',
    title: 'Pulse Commerce',
    planetName: 'Veyra',
    description:
      'A headless marketplace with edge-rendered product surfaces, composable checkout, inventory sync, and analytics.',
    tech: ['Next.js', 'Stripe', 'GraphQL', 'Redis', 'AWS'],
    features: ['Edge storefront', 'Dynamic bundle engine', 'Inventory sync', 'Revenue intelligence'],
    status: 'Production',
    timeline: '2025 Q4',
    github: 'https://github.com/',
    demo: 'https://example.com/',
    colorA: '#a855f7',
    colorB: '#ff4fd8',
    position: [8, -1.3, -34],
    radius: 1.85,
    ring: false,
    screenshots: ['Storefront', 'Checkout orbit', 'Merchant console']
  },
  {
    id: 'vector-ledger',
    title: 'Vector Ledger',
    planetName: 'Kairo',
    description:
      'A secure financial intelligence portal for portfolio health, anomaly detection, executive reporting, and compliance exports.',
    tech: ['TypeScript', 'PostgreSQL', 'Python', 'Docker', 'AWS'],
    features: ['Anomaly detection', 'Executive reporting', 'Permission vault', 'Scenario modeling'],
    status: 'Private launch',
    timeline: '2025 Q2',
    github: 'https://github.com/',
    demo: 'https://example.com/',
    colorA: '#ffd166',
    colorB: '#45d9ff',
    position: [-7.5, 1.4, -52],
    radius: 1.62,
    ring: true,
    screenshots: ['Ledger map', 'Risk matrix', 'Report builder']
  },
  {
    id: 'orbital-ai',
    title: 'Orbital AI',
    planetName: 'Nocturne',
    description:
      'A multimodal assistant layer for product teams with task routing, source-grounded answers, and workspace automation.',
    tech: ['React', 'RAG', 'Vector DB', 'Node.js', 'Framer Motion'],
    features: ['Source-grounded chat', 'Task routing', 'Workspace automations', 'Interactive answer cards'],
    status: 'Prototype',
    timeline: '2024 Q4',
    github: 'https://github.com/',
    demo: 'https://example.com/',
    colorA: '#7dffce',
    colorB: '#a855f7',
    position: [10, 0.8, -69],
    radius: 1.25,
    ring: false,
    screenshots: ['Assistant flow', 'Source panel', 'Automation map']
  }
];

export const experience = [
  {
    year: '2026',
    title: 'Senior Full-Stack Developer',
    detail: 'Led immersive product architecture, AI workflows, cloud releases, and interaction systems for complex dashboards.'
  },
  {
    year: '2024',
    title: 'Frontend Systems Engineer',
    detail: 'Built design systems, animation languages, performance budgets, and reusable UI platforms for product teams.'
  },
  {
    year: '2022',
    title: 'Backend Developer',
    detail: 'Designed resilient APIs, data models, automation pipelines, and secure deployment foundations.'
  }
];
