#!/usr/bin/env node
'use strict';

const size = require('window-size');
const Noise = require('simplex-noise');
const Worley = require('worley-noise');
const noise = new Noise(() => Math.random());
const worley = new Worley({ numPoints: 10 });

const getHelp = require('./help');
const fill = require('./index');

const patterns = {
    random: () => Math.random(),
    horizontal: (x) => x / (
        size.width - 1
    ),
    vertical: (x, y) => y / (
        size.height - 1
    ),
    simplex: (x, y) => Math.abs(noise.noise2D(x / 40, y / 50)),
    crazy: (x, y) => Math.abs(noise.noise2D(x / 35, y / 35)),
    worley: (x, y) => Math.abs(worley.getManhattan({ x: x / 40, y: y / 45 }, 2) / 3),
    stripes: (x, y) => {
        x /= size.width - 1;
        y /= size.height - 1;
        return .5 * (
            x - Math.floor(x) + y - Math.floor(y)
        );
    },
};

const pattern = process.argv[2];
if (!pattern || ['-h', '--help'].includes(pattern) || ~pattern.indexOf('--help') || ~pattern.indexOf('-h')) {
    console.log(getHelp(Object.keys(patterns)));
} else if (pattern in patterns) {
    fill(patterns[pattern]);
} else {
    process.stderr.write('Unknown pattern.\n');
}
