export interface DynamicResponse {
    parkingFacilityDynamicInformation: {
        description: String,
        identified: String,
        name: String,
        facilityActualStatus: {
            lastUpdated: Number,
            open: Boolean,
            full: Boolean,
            chargePointVacantSpaces: Number,
            parkingCapacity: Number,
            vacantSpaces: Number,
            parkingCapacityLower: Number,
            parkingCapacityUpper: Number,
            vacantSpacesLower: Number,
            vacantSpacesUpper: Number
        }
    }
}