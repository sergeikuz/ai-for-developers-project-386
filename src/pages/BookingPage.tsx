import { useState } from 'react'
import { Stack, Title, Text, Card, Group, Button, Loader, Center, TextInput, Divider, SegmentedControl } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { notifications } from '@mantine/notifications'
import { useSlots, useCreateBooking, useEventTypes } from '../api/hooks'

export default function BookingPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<{ startAt: string; endAt: string } | null>(null)

  const { data: eventTypes } = useEventTypes()
  const eventType = eventTypes?.find((et) => et.id === id)
  const { data: slots, isLoading: slotsLoading } = useSlots(id || '')
  const createBooking = useCreateBooking()

  const form = useForm({
    initialValues: {
      guestName: '',
      guestEmail: '',
    },
    validate: {
      guestName: (val) => (val.length > 0 ? null : 'Name is required'),
      guestEmail: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
    },
  })

  if (!eventType) {
    return slotsLoading ? (
      <Center style={{ height: '60vh' }}><Loader size="lg" /></Center>
    ) : (
      <Text c="red">Event type not found.</Text>
    )
  }

  const groupedSlots = slots?.reduce<Record<string, typeof slots>>((acc, slot) => {
    const dateKey = dayjs(slot.startAt).format('YYYY-MM-DD')
    if (!acc[dateKey]) acc[dateKey] = []
    acc[dateKey].push(slot)
    return acc
  }, {}) || {}

  const dates = Object.keys(groupedSlots).sort()
  const availableSlots = selectedDate && groupedSlots[selectedDate]
    ? groupedSlots[selectedDate].filter((s) => s.isAvailable)
    : []

  const handleSubmit = form.onSubmit((values) => {
    if (!selectedDate || !id || !selectedSlot) {
      notifications.show({ title: 'Error', message: 'Please select a time slot', color: 'red' })
      return
    }

    createBooking.mutate(
      {
        eventTypeId: id,
        startAt: selectedSlot.startAt,
        guestName: values.guestName,
        guestEmail: values.guestEmail,
      },
      {
        onSuccess: () => {
          notifications.show({ title: 'Success', message: 'Booking created successfully!' })
          navigate('/')
        },
        onError: (err: Error) => {
          notifications.show({
            title: 'Booking failed',
            message: err.message || 'Something went wrong',
            color: 'red',
          })
        },
      },
    )
  })

  return (
    <Stack gap="xl">
      <div>
        <Title order={2}>Book: {eventType.title}</Title>
        <Text c="dimmed">{eventType.description} ({eventType.duration} min)</Text>
      </div>

      {slotsLoading ? (
        <Center style={{ height: '40vh' }}><Loader size="lg" /></Center>
      ) : (
        <>
          {dates.length > 0 && (
            <SegmentedControl
              value={selectedDate || ''}
              onChange={(d) => { setSelectedDate(d); setSelectedSlot(null) }}
              data={dates.map((d) => ({
                label: dayjs(d).format('ddd, MMM D'),
                value: d,
              }))}
              fullWidth
            />
          )}

          {selectedDate && (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={4} mb="md">Available Times</Title>
              {availableSlots.length > 0 ? (
                <Group>
                  {availableSlots.map((slot) => (
                    <Button
                      key={slot.startAt}
                      variant={selectedSlot?.startAt === slot.startAt ? 'filled' : 'outline'}
                      onClick={() => setSelectedSlot({ startAt: slot.startAt, endAt: slot.endAt })}
                    >
                      {dayjs(slot.startAt).format('HH:mm')}
                    </Button>
                  ))}
                </Group>
              ) : (
                <Text c="dimmed">No available slots for this date.</Text>
              )}
            </Card>
          )}

          <Divider />

          <form onSubmit={handleSubmit}>
            <Stack>
              <TextInput
                label="Your Name"
                placeholder="John Doe"
                {...form.getInputProps('guestName')}
              />
              <TextInput
                label="Email"
                placeholder="john@example.com"
                {...form.getInputProps('guestEmail')}
              />
              <Button type="submit" loading={createBooking.isPending} fullWidth>
                Confirm Booking
              </Button>
            </Stack>
          </form>
        </>
      )}
    </Stack>
  )
}
