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
