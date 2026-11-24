import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const leaders = [
  { id: 'leader-1', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=450&q=80' },
  { id: 'leader-2', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=450&q=80' },
  { id: 'leader-3', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=450&q=80' },
  { id: 'leader-4', url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&h=450&q=80' },
  { id: 'leader-5', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=450&q=80' },
  { id: 'leader-6', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=450&q=80' },
  { id: 'leader-7', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=450&q=80' },
  { id: 'leader-8', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=450&q=80' },
  { id: 'leader-9', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=450&q=80' },
  { id: 'leader-10', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=450&q=80' },
];

async function run() {
  const targetDir = path.resolve('public', 'images', 'leaders');
  if (!existsSync(targetDir)) {
    await mkdir(targetDir, { recursive: true });
  }

  for (const leader of leaders) {
    const dest = path.join(targetDir, `${leader.id}.webp`);
    try {
      console.log(`Downloading ${leader.id}...`);
      const res = await fetch(leader.url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      await writeFile(dest, buffer);
      console.log(`Saved ${dest}`);
    } catch (err) {
      console.error(`Error downloading ${leader.id}:`, err);
    }
  }
}

run();
