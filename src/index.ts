import { readFileSync } from 'fs';
import { countryRegionData } from './data';

/**
 * A list of all available AWS regions.
 */
export const awsRegions: string[] = [
    'us-east-1',
    'us-east-2',
    'us-west-1',
    'us-west-2',
    'af-south-1',
    'ap-east-1',
    'ap-southeast-3',
    'ap-south-1',
    'ap-northeast-3',
    'ap-northeast-2',
    'ap-southeast-1',
    'ap-southeast-2',
    'ap-northeast-1',
    'ca-central-1',
    'eu-central-1',
    'eu-west-1',
    'eu-west-2',
    'eu-south-1',
    'eu-west-3',
    'eu-north-1',
    'me-south-1',
    'me-central-1',
    'sa-east-1'
];

/**
 * A map of country codes with their respective AWS regions in order of latency.
 */
export const countryToAwsRegionMap = countryRegionData;

/**
 * Check what AWS region to use for a specific country.
 * The region with the lowest latency is returned.
 * 
 * @param country The country code to get the AWS regions for.
 * @param regions The list of regions to filter by. If not provided, all regions will be used.
 * @returns The AWS region to use for the given country.
 */
export function countryToAwsRegion(country: string, regions: string[] = []): string {
    if (regions.length === 0) {
        regions = awsRegions;
    }

    const countryRegions = countryToAwsRegionMap[country];

    for (const region of countryRegions) {
        if (regions.includes(region)) {
            return region;
        }
    }

    return regions[0];
}