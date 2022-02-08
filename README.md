# unLayer2be ![passing](https://raw.githubusercontent.com/barakaally/unLayer2be/master/passing.svg)
Unlayer2be is a library which can be used to convert BEE email design to Unlayer email design, or Html  to Unlayer design for unLayer email editor.

## Installations
```npm install unlayer2be ```

## Usage
``` import {Unlayer2be} from 'unlayer2be'  ```

### Get Unlayer  design from BEE Design

``` const design=Unlayer2be.design({..}); ``` 

### Get Unlayer design from BEE design Url encoded string

``` const design=Unlayer2be.from('beefree url encoded string');  ```

### Get Unlayer design from HTML page

``` const design=Unlayer2be.fromHtml('html');  ```

### Sample
![unlayer](https://unroll-images-production.s3.amazonaws.com/projects/0/1644079641638-unlayer.PNG)
