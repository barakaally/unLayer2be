# unLayer2be
Convert Beeefree Email template json formart to Unlayer email template json format.

## Installations
```npm install unlayer2be ```

## Import
``` import {Unlayer2be} from 'unlayer2be'  ```

### Get UnlayerEmailjson from Beefree Design Json

``` const design=Unlayer2be.design({..}); ``` 

### Get UnlayerEmailJson from BeefreeEmailJson Url encoded string

``` const design=Unlayer2be.design('beefree url encoded string');  ```