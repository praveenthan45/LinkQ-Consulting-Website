import { mkdir, writeFile, copyFile } from 'node:fs/promises';
const photos = {
  hero: 'photo-1521737711867-e3b97375f902',
  collaboration: 'photo-1497366811353-6870744d04b2',
  technology: 'photo-1553877522-43269d4ea984',
  manufacturing: 'photo-1777383975764-bec6f5cabf00',
  fmcg: 'photo-1586528116311-ad8dd3c8310d',
  education: 'photo-1524178232363-1fb2b075b655',
  automation: 'photo-1716191299980-a6e8827ba10b',
  architecture: 'photo-1486406146926-c627a92ad1ab',
  advisory: 'photo-1552664730-d307ca884978',
  'data-center': 'photo-1558494949-ef010cbdcc31',
  'software-engineering': 'photo-1461749280684-dccba630e2f6',
  'digital-workplace': 'photo-1519389950473-47ba0277781c',
  'engineering-planning': 'photo-1581092160562-40aa08e78837',
  'industrial-engineering': 'photo-1581092921461-eab62e97a780',
  'retail-distribution': 'photo-1542838132-92c53300491e',
  'global-logistics': 'photo-1494412685616-a5d310fbb07d',
  'university-library': 'photo-1507842217343-583bb7270b66',
  'university-campus': 'photo-1562774053-701939374585',
  'collaborative-learning': 'photo-1523240795612-9a054b0db644',
  'business-analytics': 'photo-1460925895917-afdab827c52f',
  'performance-reporting': 'photo-1551288049-bebda4e38f71',
  'it-advisory-cover': 'photo-1775519520461-6b6e068d9250',
  'manufacturing-cover': 'photo-1647427060118-4911c9821b82',
  'fmcg-cover': 'photo-1578916171728-46686eac8d58',
  'education-cover': 'photo-1758270704851-adff797a2010',
  'automation-cover': 'photo-1783419482520-2f8b80a40369',
};
await mkdir('public/images', { recursive: true });
await mkdir('public/fonts', { recursive: true });
for (const [name, id] of Object.entries(photos)) {
  if (process.argv.length > 2 && !process.argv.slice(2).includes(name)) continue;
  for (const [suffix, width] of [
    ['', name === 'architecture' ? 1920 : 1200],
    ['-small', 640],
  ]) {
    const height = name.endsWith('-cover') ? `&h=${Math.round((width * 2) / 3)}` : '';
    const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}${height}&q=82&fm=webp`;
    const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`${name}: ${response.status}`);
    await writeFile(
      `public/images/${name}${suffix}.webp`,
      Buffer.from(await response.arrayBuffer()),
    );
  }
  console.info(`Saved ${name}`);
}
for (const name of ['manrope', 'inter']) {
  await copyFile(
    `node_modules/@fontsource-variable/${name}/files/${name}-latin-wght-normal.woff2`,
    `public/fonts/${name}-latin.woff2`,
  );
  console.info(`Saved ${name} variable font`);
}
