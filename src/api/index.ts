import { OpenAPI } from './generated'

OpenAPI.BASE = import.meta.env.VITE_API_URL || 'http://localhost:4010'

export { OpenAPI }
export { OwnerService } from './generated/services/OwnerService'
export { GuestService } from './generated/services/GuestService'
export type { EventType, Booking, Slot, CreateBookingRequest, CreateEventTypeRequest, UpdateEventTypeRequest } from './generated'
