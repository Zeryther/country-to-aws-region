import { countryToAwsRegion } from '.'

describe('aws regions', () => {
    it('should return the correct region for a country', () => {
        expect(countryToAwsRegion('US')).toBe('us-east-2')
        expect(countryToAwsRegion('GB')).toBe('eu-west-2')
        expect(countryToAwsRegion('DE')).toBe('eu-central-1')
        expect(countryToAwsRegion('FR')).toBe('eu-west-3')
        expect(countryToAwsRegion('ES')).toBe('eu-west-3')
        expect(countryToAwsRegion('IT')).toBe('eu-south-1')
        expect(countryToAwsRegion('NL')).toBe('eu-central-1')
        expect(countryToAwsRegion('BE')).toBe('eu-west-3')
        expect(countryToAwsRegion('AT')).toBe('eu-south-1')
        expect(countryToAwsRegion('CH')).toBe('eu-south-1')
        expect(countryToAwsRegion('SE')).toBe('eu-north-1')
        expect(countryToAwsRegion('DK')).toBe('eu-north-1')
        expect(countryToAwsRegion('NO')).toBe('eu-north-1')
        expect(countryToAwsRegion('FI')).toBe('eu-north-1')
    })

    it('should return the correct region for a country when limiting the regions', () => {
        // test countryToAwsRegion with a list of regions, that is different from the default region
        expect(countryToAwsRegion('US', ['eu-west-2', 'eu-central-1'])).toBe('eu-west-2')
        expect(countryToAwsRegion('GB', ['eu-south-1', 'ap-northeast-3'])).toBe('eu-south-1')
    })
})