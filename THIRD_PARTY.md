# Third-party assets and component provenance

The interface was informed by UI/UX Pro Max guidance and two components retrieved through the connected 21st.dev tools. The final site uses custom responsive CSS and original consulting content. The LinkqGlobal Consulting wordmark follows the user-supplied reference's italic Linkq, Global, orbital swooshes, and Consulting caption, adapted to the site's brown and terracotta palette. Standard and light SVG assets contain locally authored vector paths, including outlined lettering, with no embedded font files or runtime font dependency. The reference image is not bundled as a raster logo.

The globe-and-arrow emblem was supplied by the user. A transparent cutout, prepared with the built-in Imagegen editing tool, is stored at `public/brand/globe-emblem.png`. It fills the lowercase `o` in `Global` in the shared header/footer wordmark and is also used independently as the browser favicon. Original artwork and the preparation prompt are retained in `assets/brand/`.

- **Facts Hero**, by sajad: https://21st.dev/@sajad/components/facts-hero. The photo-panel composition and restrained Motion pattern were adapted in `src/components/Hero21.tsx`. Fictional metrics, rolling counters, and sample company content were removed. The LinkqGlobal adaptation uses capability-focused copy.
- **Accordion**, by ddoemonn: https://21st.dev/@ddoemonn/components/accordion. Source is retained in `src/components/Accordion21.tsx` and restyled with the site's CSS. It provides keyboard controls, measured expansion, inert closed panels, and reduced-motion support. Retain any upstream notices supplied with a future source update.

## Photography

Photographs are locally stored WebP derivatives of images served by Unsplash. They illustrate work environments; pictured people are not presented as LinkqGlobal staff, clients, or endorsers. The Unsplash copyright license permits commercial use: https://unsplash.com/license. Copyright permission does not by itself resolve every release or trademark issue; verify final image selection for the intended commercial use.

- Hero collaboration: https://images.unsplash.com/photo-1521737711867-e3b97375f902
- Office workspace: https://images.unsplash.com/photo-1497366811353-6870744d04b2
- Technology collaboration: https://images.unsplash.com/photo-1553877522-43269d4ea984
- Manufacturing line, Lilian Do Khac: https://unsplash.com/photos/robotic-arms-assembling-a-car-chassis-on-a-factory-line-EyqUxJuOb1Q
- Distribution facility: https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d
- Education environment: https://images.unsplash.com/photo-1524178232363-1fb2b075b655
- Automation equipment, Homa Appliances: https://unsplash.com/photos/blue-industrial-robot-arm-in-factory-sz1CHL7Pky0

## Additional photography in the editorial redesign

The service pages use the following additional locally optimized Unsplash photographs. All are illustrative environment photographs, not representations of LinkqGlobal staff, clients, or completed projects. Responsive 640px and 1200px derivatives are created by `scripts/download-assets.mjs`.

- Business architecture: https://images.unsplash.com/photo-1486406146926-c627a92ad1ab
- Collaborative advisory discussion: https://images.unsplash.com/photo-1552664730-d307ca884978
- Enterprise data center: https://images.unsplash.com/photo-1558494949-ef010cbdcc31
- Software engineering: https://images.unsplash.com/photo-1461749280684-dccba630e2f6
- Digital workplace: https://images.unsplash.com/photo-1519389950473-47ba0277781c
- Engineering planning: https://images.unsplash.com/photo-1581092160562-40aa08e78837
- Industrial engineering: https://images.unsplash.com/photo-1581092921461-eab62e97a780
- Retail distribution: https://images.unsplash.com/photo-1542838132-92c53300491e
- Logistics coordination: https://images.unsplash.com/photo-1494412685616-a5d310fbb07d
- University library: https://images.unsplash.com/photo-1507842217343-583bb7270b66
- University campus: https://images.unsplash.com/photo-1562774053-701939374585
- Collaborative learning: https://images.unsplash.com/photo-1523240795612-9a054b0db644
- Business analytics: https://images.unsplash.com/photo-1460925895917-afdab827c52f
- Performance reporting: https://images.unsplash.com/photo-1551288049-bebda4e38f71

The new scroll-depth components are authored locally with Motion. Additional 21st.dev metadata references consulted were Parallax Image by pulkitxm and 3D Parallax Unfurling Gallery by piyushxdev; no additional component source was retrieved or copied.

## Dedicated service covers

The service-detail hero photographs below are distinct from catalog, homepage, industry, article, and chapter images. Optimized 640px and 1200px WebP crops are stored locally; social previews use the matching cover.

- IT advisory — Eric Stoynov: https://unsplash.com/photos/two-server-racks-filled-with-electronic-components-and-wires-k27hkqXuveo ; source: https://images.unsplash.com/photo-1775519520461-6b6e068d9250
- Manufacturing — Simon Kadula: https://unsplash.com/photos/8gr6bObQLOI ; source: https://images.unsplash.com/photo-1647427060118-4911c9821b82
- FMCG — Nathália Rosa: https://unsplash.com/photos/grocery-store-aisle-with-stocked-shelves-rWMIbqmOxrY ; source: https://images.unsplash.com/photo-1578916171728-46686eac8d58
- Education — Vitaly Gariev: https://unsplash.com/photos/professor-lecturing-to-students-in-a-classroom-setting-vyuiyIyboc0 ; source: https://images.unsplash.com/photo-1758270704851-adff797a2010
- Automation — Aleksandr Lyaptsev: https://unsplash.com/photos/lTAh5dGmN-8 ; source: https://images.unsplash.com/photo-1783419482520-2f8b80a40369

### Font and icon licenses

Manrope and Inter variable fonts are copied from the `@fontsource-variable` packages and served locally. Both use the SIL Open Font License; copies are kept in `public/fonts/`. Lucide icons are provided by `lucide-react` under the ISC license. Runtime packages retain their license notices in `node_modules`.
