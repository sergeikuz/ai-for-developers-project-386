import { Stack, Title, Text, Card, SimpleGrid, Loader, Center, Button } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useEventTypes } from '../api/hooks'

export default function HomePage() {
  const { data: eventTypes, isLoading, error } = useEventTypes()

  if (isLoading) {
    return (
      <Center style={{ height: '60vh' }}>
        <Loader size="lg" />
      </Center>
    )
  }

  if (error) {
    return <Text c="red">Failed to load event types. Please try again later.</Text>
  }

  return (
    <Stack gap="xl">
      <div>
        <Title order={2}>Book a Meeting</Title>
        <Text c="dimmed">Select an event type to get started</Text>
      </div>

      {eventTypes && eventTypes.length > 0 ? (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
          {eventTypes.map((et) => (
            <Card key={et.id} shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section withBorder inheritPadding py="xs">
                <Title order={4}>{et.title}</Title>
              </Card.Section>
              <Text size="sm" c="dimmed" mt="sm">
                {et.description}
              </Text>
              <Text size="sm" mt="sm" fw={500}>
                {et.duration} min
              </Text>
              <Button component={Link} to={`/book/${et.id}`} fullWidth mt="md" radius="md">
                Book Now
              </Button>
            </Card>
          ))}
        </SimpleGrid>
      ) : (
        <Text c="dimmed">No event types available.</Text>
      )}
    </Stack>
  )
}
