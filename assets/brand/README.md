# Globe emblem preparation

The original globe-and-arrow artwork was supplied by the user and is retained as `globe-reference.png`.

The built-in Imagegen tool prepared `public/brand/globe-emblem.png` with `transparent_background: true`. This cutout keeps the original rust, orange, cream, and blue palette. It fills the lowercase `o` in `Global` in the shared header/footer wordmark, with its position reserved in the standard and light outlined SVG layers. The same PNG is the standalone browser favicon.

The active SVG wordmark layers use separate `Gl` and `bal` vector paths. There is no text `o` or outline underneath the globe image. Their new `linkqglobal-wordmark*.svg` filenames avoid earlier cached wordmark artwork.

Preparation prompt:

> Edit the supplied globe-and-arrow company emblem ONLY to extract a faithful transparent-background cutout for use as a small website logo. Preserve the exact existing silhouette, proportions, ribbon arrangement, arrow shape, and original rust, orange, cream and blue colors. Remove the white/off-white outside canvas and the pale gray cast shadow at the bottom. The white negative-space gaps separating the colored ribbons must also become transparent. Preserve all cream-colored ribbon regions as opaque cream; they are part of the emblem. Keep all colored edges clean and antialiased, with no white halo. Do not redesign, add, remove, recolor, rotate, distort or invent any logo features. No text, no background, no extra effects. Center the complete emblem with modest even transparent padding. Output a transparent PNG.
