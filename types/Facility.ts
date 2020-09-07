export interface Facility {
    lastUpdated: number,
    open: boolean,
    full: boolean,
    chargePointVacantSpaces: number,
    parkingCapacity: number,
    vacantSpaces: number,
    parkingCapacityLower: number,
    parkingCapacityUpper: number,
    vacantSpacesLower: number,
    vacantSpacesUpper: number
}