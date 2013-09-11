var debug = require('debug')('parse_commits');

function parseCommits(commitMsgs) {
    bugNums = [];
    bug_re = /bug *(\d+)/gi;
    for (var i = 0; i < commitMsgs.length; i++) {
        while (result = bug_re.exec(commitMsgs[i].msg)) {
            bugNums.push(result[1]);
            debug('Found a bug: %d', result[1]);
        }
        if (bugNums.length == 0) {
            debug('Found no bug in commit %s', commitMsgs[i].sha);
        } else {
            if (bugNums.length > 1) {
                debug('Found multiple bug numbers, using the first');
            }
            debug('Using bug %d for linking', bugNums[0]);
        }
    }
    return bugNums;
}

exports.parseCommits = parseCommits;
