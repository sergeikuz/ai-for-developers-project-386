import { AppShell, Group, Burger, Title, Anchor, Container } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
  const [opened, { toggle }] = useDisclosure()
  const location = useLocation()

  const navItems = [
    { label: 'Book a Meeting', path: '/' },
    { label: 'Admin', path: '/admin' },
  ]

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 200, breakpoint: 'sm', collapsed: { desktop: !opened, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Anchor component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Title order={3}>Calendar Booking</Title>
            </Anchor>
            <Group visibleFrom="sm">
              {navItems.map((item) => (
                <Anchor
                  key={item.path}
                  component={Link}
                  to={item.path}
                  c={location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path)) ? 'violet' : 'dimmed'}
                  fw={location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path)) ? 700 : 500}
                  style={{ textDecoration: 'none' }}
                >
                  {item.label}
                </Anchor>
              ))}
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {navItems.map((item) => (
          <Anchor
            key={item.path}
            component={Link}
            to={item.path}
            c={location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path)) ? 'violet' : 'text'}
            fw={location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path)) ? 700 : 500}
            style={{ textDecoration: 'none', display: 'block', padding: '8px 0' }}
            onClick={toggle}
          >
            {item.label}
          </Anchor>
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="lg">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}
