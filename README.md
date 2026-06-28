# RWA Documentation

## Running locally

Install dependencies:

```bash
python -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install zensical
```

Run the development server:

```bash
zensical serve
```

## Publishing

The main branch is built and deployed by [GitHub Actions](./.github/workflows/ci.yml),
publishing the documentation to GitHub Pages, which can be accessed at <https://rwa-doc.github.io/rwa-doc/>.
