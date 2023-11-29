# create a brand new project for your own.

**1. Create application using pnpm**
- create
```
pnpm create cloudflare sample
```
[![asciicast](https://asciinema.org/a/uWa9k8TZUJlHn69k2EFvNDHED.svg)](https://asciinema.org/a/uWa9k8TZUJlHn69k2EFvNDHED)

- install package
```
cd sample
pnpm install
```
- test(optional)
```
pnpm run dev
```

**2. Add tailwindcss**
- install tailwindcss
```
pnpm install tailwindcss postcss autoprefixer
```   
- generate tailwindcss.config.js
```
npx tailwindcss init
```
- modify tailwindcss.config.js
```
content: ["./src/**/*.{html,js}", "./assets/index.html"],
```

**3. Handling static resources**
- create assets fold and put all your static resource in it.
- modify wrangler.toml
```
main = "./src/index.ts"

[site]
bucket = "./assets"
```
- add code to index.ts to process the static resource.
```
import { serveStatic } from "hono/cloudflare-workers";
...
app.use("/*", serveStatic({ root: "./static" })); 
app.get("/", serveStatic({ path: "./index.html" }));
```

**4. Add the additional things you need, and then modify the package.json file to apply them.**
- add prettier\prettier-plugin-organize-imports\prettier-plugin-tailwindcss\npm-run-all
```
pnpm install prettier prettier-plugin-organize-imports prettier-plugin-tailwindcss
pnpm install npm-run-all
```
- modify package.json
```
{
  "scripts": {
    "dev": "run-p dev:*",
    "dev:wrangler": "wrangler dev src/index.ts",
    "dev:tailwind": "tailwindcss -i ./src/style/style.css -o ./assets/static/style/style.css --watch",
    "build:prettier": "npx prettier . --write",
    "deploy": "wrangler deploy --minify src/index.ts"
  },
  "dependencies": {
    "hono": "^3.10.2",
    "npm-run-all": "^4.1.5",
    "prettier": "^3.1.0",
    "prettier-plugin-organize-imports": "^3.2.4",
    "prettier-plugin-tailwindcss": "^0.5.7",
    "tailwindcss": "^3.3.5"
  },
  "devDependencies": {
    "@cloudflare/workers-types": "^4.20230914.0",
    "wrangler": "^3.15.0"
  }
}

```
