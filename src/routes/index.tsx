import { createFileRoute, useRouter } from '@tanstack/react-router';
import { createServerFn, useServerFn } from '@tanstack/react-start';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import {
  ActionIcon,
  Button,
  Card,
  Container,
  Group,
  Stack,
  Table,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { toast } from 'sonner';
import { modals } from '@mantine/modals';
import { db, schema } from '~/db';

// Server Functions
const getDemoThings = createServerFn().handler(async () => {
  return db.query.demoThings.findMany({
    orderBy: (demoThings, { desc }) => [desc(demoThings.createdAt)],
  });
});

const CreateDemoThingSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
});

const createDemoThing = createServerFn({ method: 'POST' })
  .inputValidator(CreateDemoThingSchema)
  .handler(async ({ data }) => {
    const [newThing] = await db
      .insert(schema.demoThings)
      .values({
        name: data.name.trim(),
        description: data.description?.trim() || null,
      })
      .returning();
    return newThing;
  });

const deleteDemoThing = createServerFn({ method: 'POST' })
  .inputValidator(z.string())
  .handler(async ({ data: id }) => {
    const result = await db
      .delete(schema.demoThings)
      .where(eq(schema.demoThings.id, id))
      .returning();
    if (result.length === 0) {
      throw new Error('Not found');
    }
    return { success: true };
  });

// Route
export const Route = createFileRoute('/')({
  loader: () => getDemoThings(),
  component: DynamicPage,
});

function DynamicPage() {
  const things = Route.useLoaderData();
  const router = useRouter();
  const createThingFn = useServerFn(createDemoThing);
  const deleteThingFn = useServerFn(deleteDemoThing);

  const openCreateModal = () => {
    modals.open({
      title: 'Create New Item',
      children: <CreateForm onSuccess={() => modals.closeAll()} />,
    });
  };

  function CreateForm({ onSuccess }: { onSuccess: () => void }) {
    const form = useForm({
      initialValues: { name: '', description: '' },
      validate: {
        name: (v) => (v.trim() ? null : 'Name is required'),
      },
    });

    const handleSubmit = async (values: typeof form.values) => {
      try {
        await createThingFn({ data: values });
        toast.success('Item created');
        onSuccess();
        router.invalidate();
      } catch {
        toast.error('Failed to create item');
      }
    };

    return (
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Name"
            placeholder="Enter name"
            required
            data-autofocus
            {...form.getInputProps('name')}
          />
          <Textarea
            label="Description"
            placeholder="Enter description (optional)"
            minRows={3}
            {...form.getInputProps('description')}
          />
          <Group justify="flex-end">
            <Button variant="subtle" onClick={() => modals.closeAll()}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </Group>
        </Stack>
      </form>
    );
  }

  const handleDelete = (id: string, name: string) => {
    modals.openConfirmModal({
      title: 'Delete Item',
      children: (
        <Text size="sm">
          Are you sure you want to delete &quot;{name}&quot;?
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        try {
          await deleteThingFn({ data: id });
          toast.success('Item deleted');
          router.invalidate();
        } catch {
          toast.error('Failed to delete item');
        }
      },
    });
  };

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <Title order={2}>Dynamic Data Demo</Title>
        <Card withBorder>
          <Stack gap="md">
            <Group justify="space-between">
              <Text fw={500} size="lg">
                Demo Things
              </Text>
              <Button
                leftSection={<IconPlus size={16} />}
                onClick={openCreateModal}
              >
                Add New
              </Button>
            </Group>

            {things.length === 0 ? (
              <Text c="dimmed" ta="center" py="xl">
                No items yet. Create your first one!
              </Text>
            ) : (
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th>Created</Table.Th>
                    <Table.Th w={80}>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {things.map((thing) => (
                    <Table.Tr key={thing.id}>
                      <Table.Td>{thing.name}</Table.Td>
                      <Table.Td>
                        <Text lineClamp={1}>{thing.description || '-'}</Text>
                      </Table.Td>
                      <Table.Td>
                        {new Date(thing.createdAt).toLocaleDateString()}
                      </Table.Td>
                      <Table.Td>
                        <ActionIcon
                          variant="subtle"
                          color="red"
                          onClick={() => handleDelete(thing.id, thing.name)}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            )}
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
