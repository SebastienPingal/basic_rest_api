import { Request } from 'express';

export interface RequestWithUser extends  Request {
    user?: User | null
}

interface User {
    id: number
    email: string
    token: string
    created_at: Date
    word_count: number
    word_cap: number
}