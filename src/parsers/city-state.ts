import { toTitleCase } from '../utils/strings';
import * as allCities from '../data/cities.json';

type StateCities = string[];

interface ParsePlaceNameResult {
    placeName: string | undefined;
    placeString: string | undefined;
}

export const parsePlaceName = (placeString: string | undefined, stateAbbreviation: string | undefined): ParsePlaceNameResult => {
    const citiesForState: StateCities = allCities[stateAbbreviation || ''];
    const lowercasePlaceString = placeString?.toLowerCase();
    
    const foundCity = citiesForState.find((cityName) => {
        return lowercasePlaceString?.endsWith(cityName.toLowerCase());
    });


    let resultPlaceName: string | undefined;

    if (foundCity) {
        placeString = placeString?.substring(0, placeString.length - foundCity.length);
        resultPlaceName = foundCity;
    } else {
        resultPlaceName = toTitleCase(placeString || '');
        placeString = '';
    }

    return {
        placeName: resultPlaceName,
        placeString,
    };
};