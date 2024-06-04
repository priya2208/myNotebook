import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Add a note API CALL

  // for get notes function

  // API CALL - 1 get notes api call;
  const getNotes = async () => {
    // api call

    const response = fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1NzFiNzgwYWNhYmM2MzRjYTc5YjFiIn0sImlhdCI6MTcxNjk4Njc0OX0.6G6DEw5Y-iJkSO0gJ7fIp2ENKvy8m11qgs9dZagEzus",
      },
    });
    const json = (await response).json();
    setNotes(json);
  };

  //  API CALL 2 add note api call
  const addNote = async (title, description, tag) => {
    //toodo api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1NzFiNzgwYWNhYmM2MzRjYTc5YjFiIn0sImlhdCI6MTcxNjk4Njc0OX0.6G6DEw5Y-iJkSO0gJ7fIp2ENKvy8m11qgs9dZagEzus",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.push(note));
  };

  // API CALL -3 FOR DELETEING THE NOTES
  const deleteNote = async (id) => {
    //api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1NzFiNzgwYWNhYmM2MzRjYTc5YjFiIn0sImlhdCI6MTcxNjk4Njc0OX0.6G6DEw5Y-iJkSO0gJ7fIp2ENKvy8m11qgs9dZagEzus",
      },
    });
    const json = response.json();
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // API CALL NO- 4 FOR EDITING THE NOTES
  const editNote = async (id, title, description, tag) => {
    //API call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1NzFiNzgwYWNhYmM2MzRjYTc5YjFiIn0sImlhdCI6MTcxNjk4Njc0OX0.6G6DEw5Y-iJkSO0gJ7fIp2ENKvy8m11qgs9dZagEzus",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));

    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
