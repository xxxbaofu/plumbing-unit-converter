# Plumbing Unit Converter

[Use the online converter](https://qualitysanitaryware.com/tools/plumbing-unit-converter)

Free browser-based conversions for plumbers, sanitary ware buyers, installers and engineers:

- bar ↔ psi
- L/min ↔ US or Imperial GPM (explicitly selectable)
- mm ↔ inch (actual length)
- Celsius ↔ Fahrenheit

English / Chinese interface, reversible inputs, adjustable display precision and copyable results. Calculations run locally, without an API, account, input storage or analytics. Copy writes only the equation after a click. The hosted website has its own [privacy policy](https://qualitysanitaryware.com/privacy).

## Run and build

Requires Node.js 22 or later.

```sh
npm install
npm test
npm run build
```

Serve `dist/` with any static web server, or deploy it as a static site. The website and standalone build share `src/core.mjs` and `src/Converter.tsx`. No environment variables or credentials are needed.

## Conversion basis

1 inch = 25.4 mm; 1 US liquid gallon = 3.785411784 L; 1 Imperial gallon = 4.54609 L. The psi factor derives from the international pound (0.45359237 kg), standard gravity (9.80665 m/s²) and international inch (0.0254 m). Temperature uses °F = °C × 9/5 + 32. The [NIST conversion tables](https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9) provide reference definitions and rounded conversion factors.

Do not use length conversion as a G/BSP/NPT/DN nominal pipe or thread-size chart. Unit conversion preserves the gauge/absolute reference of pressure. It does not certify a product rating or installation compatibility. Display rounding does not alter the internal value used when swapping.

## Project and contributions

Developed by [Quality Sanitary Ware](https://qualitysanitaryware.com/), a sanitary ware supplier. The [online tool and formulas](https://qualitysanitaryware.com/tools/plumbing-unit-converter) are available without registration. This repository contains the independent converter, not the company's website or private systems.

Bug reports and focused improvements are welcome. Include the input, direction, gallon definition and expected result for a calculation issue. Do not include private purchasing or contact information in public issues.

MIT licensed. No attribution link is required when reusing this code. Chrome Web Store publication is outside the current release scope.
