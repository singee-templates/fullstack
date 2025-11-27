# Enable SPA mode

To enable [SPA mode](https://tanstack.com/start/latest/docs/framework/react/guide/spa-mode), you need to update the `vite.config.ts` file:

```ts
export default defineConfig({
  plugins: [
    tanstackStart({
      spa: {
        enabled: true,
      },
    }),
  ],
});
```

But there's a bug (see [#5967](https://github.com/TanStack/router/issues/5967)) that's introduced in tanstack-router v1.138.0. So you need to downgrade the version to v1.137.0 or lower (and we recommend using 1.136.18) to make spa mode work:

```json
{
  "dependencies": {
    "@tanstack/react-router": "1.136.18",
    "@tanstack/react-router-ssr-query": "1.136.18",
    "@tanstack/react-start": "1.136.18",
    "@tanstack/router-plugin": "1.136.18"
  },
  "devDependencies": {
    "@tanstack/react-router-devtools": "1.136.18"
  }
}
```
