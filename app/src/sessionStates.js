export const NEW = Symbol('NEW');               // Session created (incoming/outgoing)
export const PROGRESS = Symbol('PROGRESS');     // Session progress (100-199, outgoing)
export const REJECTED = Symbol('REJECTED');     // Session rejected (300-699, outgoing)
export const ACCEPTED = Symbol('ACCEPTED');     // Session accepted (200-299, outgoing/incoming)
export const CANCELED = Symbol('CANCELED');     // Session canceled (outgoing)
export const FAILED = Symbol('FAILED');         // Session failed (incoming/outgoing)
export const TERMINATED = Symbol('TERMINATED'); // Session terminated (incoming/outgoing)

export const INCOMING = Symbol('INCOMING');     // Incoming session
export const OUTGOING = Symbol('OUTGOING');     // Outgoing session