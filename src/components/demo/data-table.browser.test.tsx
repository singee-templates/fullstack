import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { MantineProvider } from '@mantine/core';

import { CardsDataTable } from './data-table';

async function renderPayments() {
  return render(
    <MantineProvider>
      <CardsDataTable />
    </MantineProvider>,
  );
}

test('filters emails without losing row selection and handles empty results', async () => {
  const screen = await renderPayments();
  const filter = screen.getByPlaceholder('Filter emails...');

  await filter.fill('GMAIL.COM');
  await expect.poll(() => screen.getByRole('row').all()).toHaveLength(4);
  await screen
    .getByRole('checkbox', { name: 'Select all', exact: true })
    .click();
  await expect
    .element(screen.getByText('3 of 3 row(s) selected.'))
    .toBeVisible();

  await filter.fill('');
  await expect.poll(() => screen.getByRole('row').all()).toHaveLength(6);
  await expect
    .element(screen.getByText('3 of 5 row(s) selected.'))
    .toBeVisible();

  await filter.fill('missing@example.com');
  await expect.element(screen.getByText('No results.')).toBeVisible();
  await expect
    .element(screen.getByText('0 of 0 row(s) selected.'))
    .toBeVisible();

  await filter.fill('KEN99');
  await screen
    .getByRole('checkbox', { name: 'Select row', exact: true })
    .click();
  await expect
    .element(screen.getByText('1 of 1 row(s) selected.'))
    .toBeVisible();
  await filter.fill('');
  await expect
    .element(screen.getByText('4 of 5 row(s) selected.'))
    .toBeVisible();
});

test('sorts emails in both directions and keeps pagination within its bounds', async () => {
  const screen = await renderPayments();

  await screen.getByRole('button', { name: 'Email', exact: true }).click();
  await expect
    .element(
      screen.getByRole('row').nth(1).getByRole('cell', {
        name: 'abe45@gmail.com',
        exact: true,
      }),
    )
    .toBeVisible();

  await screen.getByRole('button', { name: 'Email', exact: true }).click();
  await expect
    .element(
      screen.getByRole('row').nth(1).getByRole('cell', {
        name: 'silas22@gmail.com',
        exact: true,
      }),
    )
    .toBeVisible();

  await expect
    .element(screen.getByRole('button', { name: 'Previous' }))
    .toBeDisabled();
  await expect
    .element(screen.getByRole('button', { name: 'Next' }))
    .toBeDisabled();
});

test('hides and restores columns by their column IDs', async () => {
  const screen = await renderPayments();

  await screen.getByPlaceholder('Columns').click();
  await page.getByRole('option', { name: 'Amount', exact: true }).click();
  await expect
    .element(screen.getByRole('columnheader', { name: 'Amount' }))
    .not.toBeInTheDocument();

  await screen.getByPlaceholder('Columns').click();
  await page.getByRole('option', { name: 'Amount', exact: true }).click();
  await expect
    .element(screen.getByRole('columnheader', { name: 'Amount' }))
    .toBeVisible();
  await expect
    .element(screen.getByRole('cell', { name: '$316.00', exact: true }))
    .toBeVisible();
});
