var fs = require('fs');

var bz_glue = require('../lib/api_glue/bz');
var github_glue = require('../lib/api_glue/github');
var bug_resolver = require('../lib/bug_resolver');
var config = require('../ghb.json');



bz = bz_glue.init(config.bugzilla);
github = github_glue.init(config.github);

actions = {'status': 'RESOLVED', 'resolution': 'FIXED'};
landingInfo = [{repo: 'gaia', branch: 'master', hash: 'abcd123'}];

bug_resolver.resolve_bug(bz, 843928, landingInfo, actions,
    function(err) {
        if (!err) {
            console.log('Worked!');
        } else {
            console.log('Failed');
        }
    }
);
