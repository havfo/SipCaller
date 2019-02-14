export const NEW = Symbol('NEW'); // Session created (incoming/outgoing)
export const PROGRESS = Symbol('PROGRESS'); // Session progress (100-199, outgoing)
export const REJECTED = Symbol('REJECTED'); // Session rejected (300-699, outgoing)
export const IGNORED = Symbol('IGNORED'); // Session ignored (incoming)
export const ACCEPTED = Symbol('ACCEPTED'); // Session accepted (200-299, outgoing/incoming)
export const CANCELED = Symbol('CANCELED'); // Session canceled (outgoing)
export const FAILED = Symbol('FAILED'); // Session failed (incoming/outgoing)
export const TERMINATED = Symbol('TERMINATED'); // Session terminated (incoming/outgoing)

export const REFERRED = Symbol('REFERRED'); // Incoming REFER
export const REFER_REQUEST_ACCEPTED = Symbol('REFER_REQUEST_ACCEPTED'); // Refer accepted by remote party
export const REFER_REQUEST_REJECTED = Symbol('REFER_REQUEST_REJECTED'); // Refer rejected by remote party
export const REFER_PROGRESS = Symbol('REFER_PROGRESS'); // Refer progress from third party
export const REFER_ACCEPTED = Symbol('REFER_ACCEPTED'); // Refer answered by third party
export const REFER_REJECTED = Symbol('REFER_REJECTED'); // Refer rejected by third party

export const INCOMING = Symbol('INCOMING'); // Incoming session
export const OUTGOING = Symbol('OUTGOING'); // Outgoing session