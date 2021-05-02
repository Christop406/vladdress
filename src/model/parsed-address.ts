export interface ParsedAddress {

    /**
     * An ID generated from the name of the street that can be used for caching.
     */
    id: string;

    /**
     * The formatted and normalized address as a human-readable output.
     */
    formattedAddress: string;
    
    /**
     * The abbreviation of the state the address is in (e.g. `CA`)
     */
    stateAbbreviation: string;

    /**
     * The full name of the state the address is in.
     */
    stateName: string;

    /**
     * The name of the locality or city the address is in.
     */
    placeName: string;

    /**
     * The full line 1 of the address specified.
     */
    addressLine1: string;

    /**
     * The name of the street.
     */
    streetName?: string;

    /**
     * The suffix of the street name (e.g. `St.` in `Main St.`).
     */
    streetSuffix?: string;

    /**
     * For the US, this is this is the 5-digit ZIP code of the given address (e.g. `94021`). In Canada, this is the canadian-formatted code (`A1A-1A1`)
     */
    zipCode?: string;

    /**
     * In the US, this is the full, 9-digit zip code of the form (`94021-2228`)
     */
    zipCodePlusFour?: string;

    /**
     * The full line 2 of the address specified (e.g. `"Unit 1"`)
     */
    addressLine2?: string;

    /**
     * The direcion name of the street (if applicable) (e.g. `N` in `123 N Main St.`).
     */
    streetDirection?: string;

    /**
     * The address's street number (if supplied).
     */
    streetNumber?: string;
}