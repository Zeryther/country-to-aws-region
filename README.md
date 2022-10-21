# country-to-aws-region
JS library that helps get the closest AWS region from a country code

I have created this library, as I have faced the issue of targeting specific AWS regional endpoints from a Cloudflare Worker. Cloudflare gives me the user's country code in a request header, so I thought I could use this to my advantage.

This simple library helps you translate a country code to the nearest AWS region. It heavily relies on the Regional Data Centers mapping made by the TurnKey Linux team. You can find their repository [here](https://github.com/turnkeylinux/aws-datacenters). They also published an article about it [here](https://www.turnkeylinux.org/blog/geoip-amazon-regions).

## Installation

```sh
npm i country-to-aws-region
```

## Usage

### Resolving the nearest AWS region

```js
import { countryToAwsRegion } from 'country-to-aws-region';

const countryCode = 'DE'; // Get the country code from your request headers for example

console.log(countryToAwsRegion(countryCode)); // eu-central-1
```

### Filtering by specific AWS regions

Sometimes, you only want specific AWS regions to be available. In that case, you can pass an array of regions as the second parameter. The function will filter out all regions that do not match.

```js
import { countryToAwsRegion } from 'country-to-aws-region';

const countryCode = 'DE'; // Get the country code from your request headers for example
const regions = ['us-east-2', 'af-south-1'];

console.log(countryToAwsRegion(countryCode)); // us-east-2
```

## Contributing

### Updating the data

This repository contains an automatic script that will fetch and parse the data from the [TurnKey Linux repository](https://github.com/turnkeylinux/aws-datacenters):

```
npm run update-data
```

## License

This program was created and published by [Mehdi Baaboura](https://github.com/Zeryther) under the [MIT License](https://github.com/Zeryther/country-to-aws-region/blob/master/LICENSE).