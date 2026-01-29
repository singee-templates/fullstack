import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { MantineProvider } from '@mantine/core';

import { CardsShare } from './share';

test('CardsShare renders share card content', async () => {
  const screen = await render(
    <MantineProvider>
      <CardsShare />
    </MantineProvider>,
  );

  await expect
    .element(screen.getByRole('heading', { name: 'Share this document' }))
    .toBeVisible();

  await expect
    .element(screen.getByText('Anyone with the link can view this document.'))
    .toBeVisible();

  await expect
    .element(screen.getByRole('button', { name: 'Copy Link' }))
    .toBeVisible();

  await expect.element(screen.getByText('People with access')).toBeVisible();
  await expect.element(screen.getByText('Olivia Martin')).toBeVisible();
  await expect.element(screen.getByText('Isabella Nguyen')).toBeVisible();
  await expect.element(screen.getByText('Sofia Davis')).toBeVisible();
});
