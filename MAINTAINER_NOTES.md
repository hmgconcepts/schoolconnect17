# Maintainer Notes

## Generated `assets/js/app.js`

The repository does not store a root-level generated-school `assets/js/app.js`. Instead, `assets/js/generator.js` contains the `Generator.appJS(cfg)` method that writes `assets/js/app.js` into every school ZIP.

When fixing generated runtime bugs, edit `Generator.appJS(cfg)` in `assets/js/generator.js`, then regenerate the school ZIP. Existing deployed school sites must be rebuilt or have their generated `assets/js/app.js` replaced.

## Menu rendering fix

As of 2026-06-27, generated `App.applyRoleNav()` keeps all selected modules visible. Role-restricted links are styled as locked instead of being hidden. This prevents the previous flash-then-disappear menu bug.

Verification phrase: `assets/js/app.js` is generated output, not source-of-truth source code in this repository.
