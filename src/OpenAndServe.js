const fs = require('fs');

exports.Fetch = (position) => {
    return fs.readFileSync(position, 'utf8');
}

exports.FetchAndReplace = (position, find, replaceWith) => {
    let OriginalFile = fs.readFileSync(position, 'utf8');
    for (let i = 0; i < find.length; i++) {
        OriginalFile = OriginalFile.replace(find[i], replaceWith[i]);
    }
    return OriginalFile;
}