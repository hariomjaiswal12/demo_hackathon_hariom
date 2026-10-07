import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const publicResourcesDir = path.join(rootDir, 'public', 'resources');
const srcResourcesDir = path.join(rootDir, 'src', 'assets', 'resources');

[publicResourcesDir, srcResourcesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const resources = [
  {
    fileName: 'conference-room.jpg',
    title: 'Conference Room Alpha',
    category: 'SPACE • 10 Capacity',
    gradient: ['#0f172a', '#1e1b4b', '#312e81'],
    accent: '#6366f1',
    icon: `<rect x="120" y="140" width="560" height="170" rx="20" fill="none" stroke="#6366f1" stroke-width="4" opacity="0.6"/>
           <rect x="260" y="190" width="280" height="70" rx="35" fill="#6366f1" opacity="0.2"/>
           <circle cx="200" cy="180" r="16" fill="#818cf8"/>
           <circle cx="200" cy="270" r="16" fill="#818cf8"/>
           <circle cx="600" cy="180" r="16" fill="#818cf8"/>
           <circle cx="600" cy="270" r="16" fill="#818cf8"/>
           <circle cx="320" cy="150" r="14" fill="#a5b4fc"/>
           <circle cx="480" cy="150" r="14" fill="#a5b4fc"/>
           <circle cx="320" cy="300" r="14" fill="#a5b4fc"/>
           <circle cx="480" cy="300" r="14" fill="#a5b4fc"/>`
  },
  {
    fileName: 'meeting-room.jpg',
    title: 'Meeting Room Beta',
    category: 'SPACE • 6 Capacity',
    gradient: ['#0f172a', '#1e293b', '#334155'],
    accent: '#38bdf8',
    icon: `<rect x="200" y="160" width="400" height="140" rx="16" fill="none" stroke="#38bdf8" stroke-width="4" opacity="0.6"/>
           <rect x="280" y="195" width="240" height="70" rx="16" fill="#38bdf8" opacity="0.2"/>
           <circle cx="240" cy="230" r="18" fill="#7dd3fc"/>
           <circle cx="560" cy="230" r="18" fill="#7dd3fc"/>
           <circle cx="340" cy="130" r="16" fill="#38bdf8"/>
           <circle cx="460" cy="130" r="16" fill="#38bdf8"/>
           <circle cx="340" cy="330" r="16" fill="#38bdf8"/>
           <circle cx="460" cy="330" r="16" fill="#38bdf8"/>`
  },
  {
    fileName: 'podcast-studio.jpg',
    title: 'Podcast Studio',
    category: 'AUDIO • Studio Booth',
    gradient: ['#18181b', '#27272a', '#581c87'],
    accent: '#a855f7',
    icon: `<circle cx="400" cy="200" r="45" fill="none" stroke="#a855f7" stroke-width="6"/>
           <rect x="385" y="170" width="30" height="60" rx="15" fill="#c084fc"/>
           <path d="M360 210 a 40 40 0 0 0 80 0" fill="none" stroke="#a855f7" stroke-width="5" stroke-linecap="round"/>
           <line x1="400" y1="250" x2="400" y2="290" stroke="#a855f7" stroke-width="6"/>
           <line x1="360" y1="290" x2="440" y2="290" stroke="#a855f7" stroke-width="6" stroke-linecap="round"/>
           <path d="M220 220 Q 280 180 340 220 T 400 220 T 460 220 T 520 220 T 580 220" fill="none" stroke="#e9d5ff" stroke-width="3" opacity="0.5"/>`
  },
  {
    fileName: 'wireless-mic.jpg',
    title: 'Rode Wireless GO II',
    category: 'AUDIO • Dual Channel',
    gradient: ['#09090b', '#18181b', '#1c1917'],
    accent: '#f97316',
    icon: `<rect x="260" y="160" width="120" height="140" rx="16" fill="#27272a" stroke="#f97316" stroke-width="4"/>
           <rect x="420" y="160" width="120" height="140" rx="16" fill="#27272a" stroke="#f97316" stroke-width="4"/>
           <circle cx="320" cy="200" r="14" fill="#fb923c"/>
           <circle cx="480" cy="200" r="14" fill="#fb923c"/>
           <rect x="290" y="240" width="60" height="30" rx="6" fill="#f97316" opacity="0.4"/>
           <rect x="450" y="240" width="60" height="30" rx="6" fill="#f97316" opacity="0.4"/>`
  },
  {
    fileName: 'microphone.jpg',
    title: 'Shure SM7B',
    category: 'AUDIO • Studio Mic',
    gradient: ['#0f172a', '#1e1b4b', '#431407'],
    accent: '#f59e0b',
    icon: `<rect x="360" y="140" width="80" height="130" rx="12" fill="#334155" stroke="#f59e0b" stroke-width="4"/>
           <rect x="370" y="130" width="60" height="30" rx="8" fill="#f59e0b"/>
           <line x1="400" y1="270" x2="400" y2="330" stroke="#f59e0b" stroke-width="6"/>
           <path d="M310 210 Q 310 310 400 310 Q 490 310 490 210" fill="none" stroke="#fbbf24" stroke-width="5" opacity="0.7"/>`
  },
  {
    fileName: 'sony-fx3.jpg',
    title: 'Sony FX3 Cinema Camera',
    category: 'HARDWARE • 4K Cinema',
    gradient: ['#09090b', '#18181b', '#0f172a'],
    accent: '#ef4444',
    icon: `<rect x="240" y="160" width="220" height="140" rx="18" fill="#18181b" stroke="#64748b" stroke-width="4"/>
           <circle cx="350" cy="230" r="45" fill="#09090b" stroke="#ef4444" stroke-width="5"/>
           <circle cx="350" cy="230" r="25" fill="#1e293b"/>
           <rect x="440" y="140" width="120" height="180" rx="12" fill="#0f172a" stroke="#334155" stroke-width="3"/>
           <circle cx="280" cy="185" r="8" fill="#ef4444"/>`
  },
  {
    fileName: 'vr-kit.jpg',
    title: 'VR Testing Kit',
    category: 'HARDWARE • Meta Quest 3',
    gradient: ['#022c22', '#064e3b', '#0f172a'],
    accent: '#10b981',
    icon: `<rect x="240" y="170" width="320" height="110" rx="40" fill="#064e3b" stroke="#10b981" stroke-width="5"/>
           <circle cx="320" cy="225" r="22" fill="#022c22" stroke="#34d399" stroke-width="3"/>
           <circle cx="480" cy="225" r="22" fill="#022c22" stroke="#34d399" stroke-width="3"/>
           <path d="M380 235 Q 400 245 420 235" fill="none" stroke="#10b981" stroke-width="4"/>`
  },
  {
    fileName: 'macbook.jpg',
    title: 'MacBook Pro 14',
    category: 'HARDWARE • M3 Pro',
    gradient: ['#0f172a', '#1e293b', '#3b82f6'],
    accent: '#60a5fa',
    icon: `<rect x="260" y="140" width="280" height="170" rx="12" fill="#1e293b" stroke="#60a5fa" stroke-width="4"/>
           <path d="M220 310 L 580 310 L 560 330 L 240 330 Z" fill="#475569" stroke="#94a3b8" stroke-width="2"/>
           <circle cx="400" cy="225" r="24" fill="none" stroke="#60a5fa" stroke-width="3"/>
           <path d="M390 225 L 410 225 M 400 215 L 400 235" stroke="#60a5fa" stroke-width="3"/>`
  },
  {
    fileName: 'dell-monitor.jpg',
    title: 'Dell UltraSharp 32',
    category: 'DISPLAY • 4K IPS',
    gradient: ['#0f172a', '#0369a1', '#0284c7'],
    accent: '#38bdf8',
    icon: `<rect x="220" y="130" width="360" height="190" rx="10" fill="#0f172a" stroke="#38bdf8" stroke-width="5"/>
           <rect x="240" y="150" width="320" height="150" fill="#0284c7" opacity="0.3"/>
           <rect x="380" y="320" width="40" height="40" fill="#334155"/>
           <rect x="320" y="360" width="160" height="10" rx="5" fill="#64748b"/>`
  },
  {
    fileName: 'samsung-display.jpg',
    title: 'Samsung 55 Display',
    category: 'DISPLAY • 55 Commercial',
    gradient: ['#18181b', '#3f3f46', '#71717a'],
    accent: '#f59e0b',
    icon: `<rect x="200" y="140" width="400" height="200" rx="8" fill="#18181b" stroke="#f59e0b" stroke-width="5"/>
           <rect x="215" y="155" width="370" height="170" fill="#27272a"/>
           <path d="M370 210 L 430 210 M 400 180 L 400 240" stroke="#f59e0b" stroke-width="5"/>
           <rect x="240" y="280" width="120" height="24" rx="12" fill="#f59e0b" opacity="0.8"/>`
  },
  {
    fileName: 'testing-bench.jpg',
    title: 'Product Testing Bench',
    category: 'HARDWARE • Lab Station',
    gradient: ['#042f2e', '#115e59', '#0f172a'],
    accent: '#14b8a6',
    icon: `<rect x="200" y="240" width="400" height="20" rx="6" fill="#14b8a6"/>
           <rect x="240" y="160" width="100" height="80" rx="8" fill="#0f172a" stroke="#2dd4bf" stroke-width="3"/>
           <rect x="360" y="160" width="100" height="80" rx="8" fill="#0f172a" stroke="#2dd4bf" stroke-width="3"/>
           <rect x="480" y="160" width="80" height="80" rx="8" fill="#0f172a" stroke="#2dd4bf" stroke-width="3"/>
           <path d="M255 200 Q 275 180 295 200 T 325 200" fill="none" stroke="#2dd4bf" stroke-width="3"/>`
  },
  {
    fileName: 'training-room.jpg',
    title: 'Training Room',
    category: 'SPACE • 20 Capacity',
    gradient: ['#1e1b4b', '#312e81', '#4338ca'],
    accent: '#818cf8',
    icon: `<rect x="260" y="130" width="280" height="120" rx="12" fill="#1e1b4b" stroke="#818cf8" stroke-width="4"/>
           <rect x="200" y="270" width="400" height="15" rx="7" fill="#818cf8" opacity="0.7"/>
           <circle cx="250" cy="310" r="12" fill="#a5b4fc"/>
           <circle cx="350" cy="310" r="12" fill="#a5b4fc"/>
           <circle cx="450" cy="310" r="12" fill="#a5b4fc"/>
           <circle cx="550" cy="310" r="12" fill="#a5b4fc"/>`
  }
];

function generateSVG(res) {
  const [c1, c2, c3] = res.gradient;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="50%" stop-color="${c2}"/>
        <stop offset="100%" stop-color="${c3}"/>
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="1" opacity="0.05"/>
      </pattern>
    </defs>
    <rect width="800" height="450" fill="url(#bg)"/>
    <rect width="800" height="450" fill="url(#grid)"/>
    
    <g transform="translate(0, 0)">
      ${res.icon}
    </g>
    
    <rect x="0" y="350" width="800" height="100" fill="rgba(15, 23, 42, 0.75)"/>
    <text x="40" y="390" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="28" fill="#ffffff">${res.title}</text>
    <text x="40" y="420" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="16" fill="${res.accent}">${res.category}</text>
    <rect x="700" y="380" width="60" height="30" rx="15" fill="${res.accent}" opacity="0.9"/>
    <circle cx="730" cy="395" r="6" fill="#ffffff"/>
  </svg>`;
}

resources.forEach(res => {
  const svgContent = generateSVG(res);
  
  [publicResourcesDir, srcResourcesDir].forEach(dir => {
    const filePath = path.join(dir, res.fileName);
    fs.writeFileSync(filePath, svgContent, 'utf-8');
  });
});

console.log(' Successfully generated 12 resource images in public/resources and src/assets/resources!');
