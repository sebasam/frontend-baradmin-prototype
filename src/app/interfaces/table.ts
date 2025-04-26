export interface Table {
    _id?: string;
    number: number;
    status: 'available' | 'occupied' | 'reserved';
}
