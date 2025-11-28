import { createFileRoute } from '@tanstack/react-router';
import { Container, Grid, Group, SimpleGrid, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { CardsActivityGoal } from '~components/demo/activity-goal';
import { CardsCalendar } from '~components/demo/calendar';
import { CardsChat } from '~components/demo/chat';
import { CardsMetric } from '~components/demo/metric';
import { CardsStats } from '~components/demo/stats';
import { CardsTeamMembers } from '~components/demo/team-members';
import { CardsCookieSettings } from '~components/demo/cookie-settings';
import { CardsPaymentMethod } from '~components/demo/payment-method';
import { CardsCreateAccount } from '~components/demo/create-account';
import { CardsReportIssue } from '~components/demo/report-issue';
import { CardsDataTable } from '~components/demo/data-table';
import { CardsShare } from '~components/demo/share';
import { CardsNotifications } from '~components/demo/notifications';

export const Route = createFileRoute('/static')({
  component: RouteComponent,
});

function RouteComponent() {
  const isMobile = useMediaQuery('(max-width: 425px)');

  return (
    <Container size="xl" px="xl">
      <Grid py="xl">
        <Grid.Col span={{ sm: 6, md: 5.5, lg: 6.5 }}>
          <Stack gap="md">
            <CardsStats />
            <SimpleGrid cols={{ lg: 2 }} spacing="md">
              <Stack gap="md">
                <CardsTeamMembers />
                <CardsCookieSettings />
                <CardsPaymentMethod />
              </Stack>

              <Stack gap="md">
                <CardsChat />
                <CardsCreateAccount />
                <CardsReportIssue />
              </Stack>
            </SimpleGrid>
            <CardsNotifications />
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ sm: 6, md: 6.5, lg: 5.5 }}>
          <Stack gap="md">
            <Group
              gap="md"
              align="flex-start"
              wrap={isMobile ? 'wrap' : 'nowrap'}
            >
              <CardsCalendar />
              <CardsActivityGoal />
            </Group>
            <CardsMetric />
            <CardsDataTable />
            <CardsShare />
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
