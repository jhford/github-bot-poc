var debug = require('debug')('bug-resolver');
var util = require('util');

function resolve_bug(bz, bugNum, landingInfo, actions, callback) {
    /* landingInfo = [{ 'repo': 'name of repository',
                        'branch': 'branch that the code landed to',
                        'hash': 'commit id of code that landed'}]

       actions = { 'bug_obj_key': 'bug_obj_val' }
    */

    actions.comments = [{text:
        'Landed the following code:\n\n' +
        JSON.stringify(landingInfo, null, '  ')}];

    debug('Going to update bug %d with: %s', bugNum, actions);


    /* We have to grab the bug's update token and set it in the bug data to set.
       This is a requirement of the BzAPI and is done to make sure that we know
       that the data we are setting is on known values */
    bz.getBug(bugNum, actions, function(error, data) {
        actions.token = data.update_token;
        debug('Fetched update token (%s) for updating bug %d',
              actions.token, bugNum);
        bz.updateBug(bugNum, actions, function(error, data) {
            if (error) {
                return callback(
                    new Error('Error updating bug %d: %s', bugNum, error));
            }
            debug('Updated bug %d', bugNum);
            callback();
        });
    });

}

exports.resolve_bug = resolve_bug;
