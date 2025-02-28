document.addEventListener('DOMContentLoaded', () => {
    const createBtn = document.querySelector('.btn');
    const notesContainer = document.querySelector('.notes-cotainer');

    // Function to create a new note
    const createNote = () => {
        const newNote = document.createElement('div');
        newNote.classList.add('input-box');
        
        const noteContent = document.createElement('input');
        noteContent.classList.add('note-content');
        noteContent.type = 'text';
        noteContent.placeholder = 'Enter your note here...';

        const saveBtn = document.createElement('button');
        saveBtn.classList.add('save-btn');
        saveBtn.textContent = 'Save';

        const deleteBtn = document.createElement('img');
        deleteBtn.src = 'delete.webp';
        deleteBtn.alt = 'Delete';
        deleteBtn.classList.add('delete-btn');

        newNote.append(noteContent, saveBtn, deleteBtn);
        notesContainer.appendChild(newNote);

        // Save note content to localStorage
        saveBtn.addEventListener('click', () => {
            if (noteContent.value.trim()) {
                saveNotes();
                alert("Note saved successfully!");
            } else {
                alert("Cannot save empty note.");
            }
        });

        // Delete the note
        deleteBtn.addEventListener('click', () => {
            if (confirm("Are you sure you want to delete this note?")) {
                newNote.remove();
                saveNotes();
                alert("Note deleted.");
            }
        });
    };

    // Function to save all notes to localStorage
    const saveNotes = () => {
        const notes = [...document.querySelectorAll('.note-content')].map(note => note.value);
        localStorage.setItem('notes', JSON.stringify(notes));
    };

    // Function to load saved notes from localStorage
    const loadNotes = () => {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        savedNotes.forEach(noteContent => {
            const newNote = document.createElement('div');
            newNote.classList.add('input-box');

            const noteElement = document.createElement('input');
            noteElement.classList.add('note-content');
            noteElement.type = 'text';
            noteElement.value = noteContent;
            noteElement.placeholder = 'Enter your note here...';

            const saveBtn = document.createElement('button');
            saveBtn.classList.add('save-btn');
            saveBtn.textContent = 'Save';

            const deleteBtn = document.createElement('img');
            deleteBtn.src = 'delete.png';
            deleteBtn.alt = 'Delete';
            deleteBtn.classList.add('delete-btn');

            newNote.append(noteElement, saveBtn, deleteBtn);
            notesContainer.appendChild(newNote);

            // Save functionality for the loaded note
            saveBtn.addEventListener('click', saveNotes);

            // Delete functionality for the loaded note
            deleteBtn.addEventListener('click', () => {
                if (confirm("Are you sure you want to delete this note?")) {
                    newNote.remove();
                    saveNotes();
                    alert("Note deleted.");
                }
            });
        });
    };

    // Event listener for creating new notes
    createBtn.addEventListener('click', createNote);

    // Load saved notes on page load
    loadNotes();
});
