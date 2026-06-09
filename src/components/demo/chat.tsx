import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Divider,
  Group,
  Modal,
  Space,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { IconPlus, IconSearch, IconSend } from '@tabler/icons-react';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';

const users = [
  {
    name: 'Olivia Martin',
    email: 'm@example.com',
    avatar: '/avatars/01.png',
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    avatar: '/avatars/03.png',
  },
  {
    name: 'Emma Wilson',
    email: 'emma@example.com',
    avatar: '/avatars/05.png',
  },
  {
    name: 'Jackson Lee',
    email: 'lee@example.com',
    avatar: '/avatars/02.png',
  },
  {
    name: 'William Kim',
    email: 'will@email.com',
    avatar: '/avatars/04.png',
  },
] as const;

type User = (typeof users)[number];

export function CardsChat() {
  const [query, setQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Array<User>>([]);
  const [messages, setMessages] = useState([
    {
      role: 'agent',
      content: 'Hi, how can I help you today?',
    },
    {
      role: 'user',
      content: "Hey, I'm having trouble with my account.",
    },
    {
      role: 'agent',
      content: 'What seems to be the problem?',
    },
    {
      role: 'user',
      content: "I can't log in.",
    },
  ]);

  const [input, setInput] = useState('');
  const inputLength = input.trim().length;
  const [opened, { open, close }] = useDisclosure(false);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase().trim()),
  );

  return (
    <>
      <Card>
        <Group align="center" justify="space-between">
          <Group>
            <Avatar
              src="https://ui.shadcn.com/avatars/01.png"
              alt="Sofia Davis"
              radius="xl"
            />
            <div>
              <Text fw={500} size="sm">
                Sofia Davis
              </Text>
              <Text size="xs" c="dimmed">
                m@example.com
              </Text>
            </div>
          </Group>
          <Tooltip label="New message">
            <ActionIcon variant="default" radius="50%" onClick={open}>
              <IconPlus size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>

        <Space my="sm" />

        <Stack gap="md" style={{ maxHeight: 250 }}>
          {messages.map((message, index) => (
            <Card
              p="xs"
              key={index}
              style={{
                alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor:
                  message.role === 'user'
                    ? 'var(--mantine-primary-color-filled)'
                    : 'light-dark(var(--mantine-color-dark-1), var(--mantine-color-dark-5))',
              }}
              c={
                message.role === 'user'
                  ? 'var(--mantine-primary-color-contrast)'
                  : 'var(--mantine-color-text)'
              }
              withBorder={false}
              shadow="none"
            >
              <Text size="sm">{message.content}</Text>
            </Card>
          ))}
        </Stack>

        <Space my="sm" />

        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (inputLength === 0) return;
            setMessages([
              ...messages,
              {
                role: 'user',
                content: input,
              },
            ]);
            setInput('');
          }}
        >
          <Group>
            <TextInput
              value={input}
              onChange={(event) => setInput(event.currentTarget.value)}
              placeholder="Type your message..."
              style={{ flex: 1 }}
            />
            <Button
              type="submit"
              variant="primary"
              disabled={inputLength === 0}
              p="xs"
            >
              <IconSend size={16} style={{ transform: 'rotate(-45deg)' }} />
            </Button>
          </Group>
        </form>
      </Card>

      <Modal opened={opened} onClose={close} size="lg" title="New message">
        <Text c="dimmed" size="sm" mb="md">
          Invite a user to this thread. This will create a new group message.
        </Text>

        <TextInput
          size="sm"
          placeholder="Search users..."
          leftSection={<IconSearch size={20} />}
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          mb="md"
        />

        <Divider />

        <Stack gap="xs" my="md">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <Group
                key={user.email}
                p="xs"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (!selectedUsers.find((u) => u.email === user.email)) {
                    setSelectedUsers([...selectedUsers, user]);
                  }
                }}
              >
                <Avatar src={user.avatar} radius="xl" />
                <div>
                  <Text size="sm" fw={500}>
                    {user.name}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {user.email}
                  </Text>
                </div>
              </Group>
            ))
          ) : (
            <Text c="dimmed" size="sm" ta="center" py="md">
              No users found
            </Text>
          )}
        </Stack>

        <Divider />

        <Group gap="xs" justify="space-between" mt="md">
          {selectedUsers.length > 0 ? (
            <Group gap="xs">
              {selectedUsers.map((user) => (
                <Avatar key={user.email} src={user.avatar} radius="xl" />
              ))}
            </Group>
          ) : (
            <Text c="dimmed" size="sm">
              Select users to add to this thread.
            </Text>
          )}
          <Button onClick={close} disabled={selectedUsers.length < 2}>
            Continue
          </Button>
        </Group>
      </Modal>
    </>
  );
}
