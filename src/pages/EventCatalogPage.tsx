import { Title, Text, Card, SimpleGrid, Badge, Avatar, Box, Group } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useEventTypes } from '../api/hooks'

export default function EventCatalogPage() {
  const { data: eventTypes, isLoading, error } = useEventTypes()

  if (isLoading) {
    return (
      <Box style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
        <Text c="dimmed">Загрузка...</Text>
      </Box>
    )
  }

  if (error) {
    return (
      <Box style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
        <Text c="red">Не удалось загрузить типы событий.</Text>
      </Box>
    )
  }

  return (
    <Box style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
      <Card shadow="sm" padding="xl" radius="lg" withBorder mb="xl">
        <Group gap="md" mb="md">
          <Avatar size={56} radius="xl" color="orange">
            <span style={{ fontSize: 28 }}>👤</span>
          </Avatar>
          <div>
            <Text fw={700} size="lg">Tota</Text>
            <Text size="sm" c="dimmed">Host</Text>
          </div>
        </Group>
        <Title order={2} mb={4}>Выберите тип события</Title>
        <Text size="sm" c="dimmed">
          Нажмите на карточку, чтобы открыть календарь и выбрать удобный слот.
        </Text>
      </Card>

      {eventTypes && eventTypes.length > 0 ? (
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          {eventTypes.map((et) => (
            <Card
              key={et.id}
              component={Link}
              to={`/book/${et.id}`}
              shadow="sm"
              padding="lg"
              radius="lg"
              withBorder
              style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
            >
              <Group justify="space-between" align="flex-start">
                <div>
                  <Text fw={700} size="lg">{et.title}</Text>
                  <Text size="sm" c="dimmed" mt={4}>{et.description}</Text>
                </div>
                <Badge variant="light" color="gray" size="sm">
                  {et.duration} мин
                </Badge>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      ) : (
        <Text c="dimmed">Нет доступных типов событий.</Text>
      )}
    </Box>
  )
}
