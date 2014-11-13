var through = require('through2');

var indent = function (biggest, current) {
    for ( var i = 0; i < biggest - current.length; i++ ) {
        process.stdout.write(' ');
    }
};

module.exports = function (compare) {
    return through.obj(function (file, type, done) {
        var results = JSON.parse(file.contents.toString())
            .sort(function (a, b) {
                return b.hz - a.hz;
            });

        var longest = results.slice().sort(function (a, b) {
            return b.name.length - a.name.length;
        })[0].name.length;

        var slowest = results.map(function (i) {
            return Math.round((1 / i.hz) * 1000).toString().length;
        }).sort().reverse()[0];

        var compareHz;
        results.forEach(function (i) {
            if ( i.name == compare ) {
                compareHz = i.hz;
                return false;
            }
        });

        process.stdout.write('\n');
        results.forEach(function (i) {
            process.stdout.write(i.name + ': ');
            indent(longest, i.name);

            var time = Math.round((1 / i.hz) * 1000).toString();
            process.stdout.write(time + ' ms ');
            indent(slowest, time);

            if ( i.name != compare ) {
                var times;
                if ( i.hz > compareHz ) {
                    times = (i.hz / compareHz).toFixed(1);
                    process.stdout.write('(' + times + ' times faster)');
                } else {
                    times = (compareHz / i.hz).toFixed(1);
                    process.stdout.write('(' + times + ' times slower)');
                }
            }
            process.stdout.write('\n');
        });

        process.stdout.write('\n');
        done();
    });
});
