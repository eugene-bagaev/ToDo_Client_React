const axios = require('axios');

const constants = {
    collections: {
        NOTE: 'note',
        WORKPLACE: 'wp',
        USER: 'user'
    },
    databases : {
        TODO: 'todo'
    },
    server: {
        GET_NOTES_ENDPOINT: 'http://46.101.211.139:3000/api',
        DELETE_NOTE_ENDPOINT: 'http://localhost:3000/api/notes?id='
    }
};

function getAllNotesFromDatabase(callbackFn) {
    fetch(constants.server.GET_NOTES_ENDPOINT, {
        headers: {
            "Content-Type": "text/plain"
        },
    })
        .then(res => res.json())
        .then((data) => callbackFn(data))
        .catch((error) => {console.error(error)})
}
function deleteNoteFromDatabaseHandler(noteId, callbackFn) {
    axios.delete(
        getFullUrlToDeleteNote(noteId),
        {},
        { headers: { 'Content-Type': 'application/json' } }
    )
        .then((dataResult) => {
            callbackFn(dataResult.data);
        })
        .catch((error) => {
            console.error('Delete note error: ', error);
        });
}

function getFullUrlToDeleteNote(noteId) {
    return constants.server.DELETE_NOTE_ENDPOINT + noteId;
}

module.exports = {getAllNotesFromDatabase, deleteNoteFromDatabaseHandler};

