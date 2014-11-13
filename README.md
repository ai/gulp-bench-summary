# Gulp Bench Summary [![Build Status](https://travis-ci.org/ai/gulp-bench-summary.png)](https://travis-ci.org/ai/gulp-bench-summary)

Display gulp-bench results in nice table view.

Set the benchmark name of your project:

```js
gulp.task('bench', function () {
    var bench   = require('gulp-bench');
    var summary = require('gulp-bench-summary');
    return gulp.src('./benchmark.js', { read: false })
        .pipe(bench())
        .pipe(summary('PostCSS'));
});
```

And this library will compare it with other benchmarks:

```
[15:33:51] Starting 'bench'...
[15:33:51] Running suite Bootstrap [/home/ai/Dev/postcss/benchmark/general.js]...
[15:33:57]    Rework x 13.96 ops/sec ±5.65% (39 runs sampled)
[15:34:02]    PostCSS x 39.52 ops/sec ±7.87% (55 runs sampled)
[15:34:08]    CSSOM x 28.28 ops/sec ±4.95% (52 runs sampled)
[15:34:14]    Mensch x 18.97 ops/sec ±1.79% (41 runs sampled)
[15:34:21]    Gonzales x 4.29 ops/sec ±3.99% (16 runs sampled)
[15:34:28]    Gonzales PE x 4.31 ops/sec ±2.35% (17 runs sampled)
[15:34:34]    Stylecow x 7.01 ops/sec ±6.66% (21 runs sampled)
[15:34:34] Fastest test is PostCSS at 1.40x faster than CSSOM

PostCSS:     25 ms
CSSOM:       35 ms  (1.4 times slower)
Mensch:      53 ms  (2.1 times slower)
Rework:      72 ms  (2.8 times slower)
Stylecow:    143 ms (5.6 times slower)
Gonzales PE: 232 ms (9.2 times slower)
Gonzales:    233 ms (9.2 times slower)

[15:34:34] Finished 'bench' after 43 s
```
