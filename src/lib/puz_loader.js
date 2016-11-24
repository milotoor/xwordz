/**
 * Utility for translating puzzle formats into the .ipuz file format, which is deliberately
 * intended to be open source. Screw you, Across Lite.
 */

const fs = require('fs');
const process = require('process');
const path = require('path');

const winston = require('winston')
const xpuz = require('xpuz');
const serverPaths = require(process.cwd() + '/conf/server.conf.js').paths;

/**
 * Generic puzzle loader. This is totally agnostic of the input puzzle's file format. All file type-
 * specific behavior should be delegated to inheriting classes.
 */
class PuzzleLoader {
    constructor (path) {
        this.inputFilePath = path;
    }

    /**
     * Main method of the `PuzzleLoader` classes. This initiates the chain of events that loads the
     * input file path, parses it, and writes the output file.
     */
    ingest () {
        // Make sure the input file is real
        this.confirmFileExists();

        const parsedContent = this.parse();
        this.writeFile(parsedContent);
    }

    /**
     * Attempt to access the file
     */
    confirmFileExists () {
        const fullFilePath = path.join(process.cwd(), this.inputFilePath);
        try {
            fs.accessSync(fullFilePath, fs.F_OK);
        } catch (err) {
            winston.log('error', `Unable to find puzzle at ${fullFilePath}! Exiting.`);
            throw err;
        }
    }

    parse () {
        throw Error('Puzzle file parsing is implementation specific!');
    }

    writeFile (puzInfo) {
        const puzPath = path.join(serverPaths.puzzles, puzInfo.info.title);
        fs.writeFile(puzPath, JSON.stringify(puzInfo, null, 4), { flag: 'wx' }, function (err) {
            if (err) throw err;
            console.log(`Saved puzzle ${puzInfo.info.title} to ${puzPath}`);
        });
    }
}


/**
 * `PuzzleLoader` specific to .puz files
 */
class PuzLoader extends PuzzleLoader {
    parse () {
        const
            puzLoader = new xpuz.Parsers.PUZ,
            puzParsed = puzLoader.parse(this.inputFilePath),
            puzInfo   = puzParsed.inspect().value;

        if (!puzInfo.info.title) {
            throw Error('Puzzle must have a title to be saved.');
        }

        return puzInfo;
    }
}


module.exports = function puzzleloader (path) {
    // Assume .puz
    new PuzLoader(path).ingest(path);
};
