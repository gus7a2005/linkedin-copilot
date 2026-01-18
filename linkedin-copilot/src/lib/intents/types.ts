export type IntentType = 
    | 'CREATE_POST'
    | 'OPEN_NEW_POST'
    | 'SEARCH_PROFILE'
    | 'UNKNOWN';

export interface IntentPayload {
    type: IntentType,
    confidence: number,
    data?: Record<string, unknown>,
}