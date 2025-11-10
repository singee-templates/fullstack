import { Button, Container, Stack, Text, Title, rem } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import type { NotFoundRouteProps } from '@tanstack/react-router';

export function NotFoundElement(_props: NotFoundRouteProps) {
  return (
    <Container
      fluid
      size="md"
      pt={rem(80)}
      pb={rem(80)}
      mih="100vh"
      strategy="grid"
      style={{ placeContent: 'center' }}
    >
      <Stack align="center" gap="xl">
        <Text size={rem(220)} fw={900} lh={1} c="gray.2">
          404
        </Text>

        <Title order={1} size="h1" fw={900} ta="center">
          You have found a secret place.
        </Title>

        <Text size="lg" c="dimmed" ta="center" maw={500}>
          Unfortunately, this is only a 404 page. You may have mistyped the
          address, or the page has been moved to another URL.
        </Text>

        <Button component={Link} to="/" size="md" variant="default">
          Take me back to home page
        </Button>
      </Stack>
    </Container>
  );
}
