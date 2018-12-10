console.log("this is loaded");

esports.spotify = {
    id: ProcessingInstruction.env.SPOTIFY_ID,
    secret: ProcessingInstruction.env.SPOTIFY_SECRET
};

exports.omdb = {
    key : process.env.apikey,
}

exports.bands = {
    appID : process.env.appID,
}