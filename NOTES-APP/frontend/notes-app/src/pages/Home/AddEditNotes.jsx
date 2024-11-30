import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md'
import './AddEditNotes.css'
import axiosInstance from '../../utils/axiosinstance'

const AddEditNotes = ({noteData,type,onClose,getAllNotes,showToastMessage}) => {
    const [title,setTitle] = useState(noteData?.title||"");
    const [content,setContent] = useState(noteData?.content||"");
    const [tags,setTags] = useState(noteData?.tags||[]);
    const [error,setError] = useState();
    //   Add Note
    const addNewNote = async () =>{
        try{
            const response=await axiosInstance.post("/add-note",{
                title,
                content,
                tags,
            });
            if(response.data && response.data.newNote){
                showToastMessage("Note Added Successfully",'success')
                getAllNotes();
                onClose();
            }
        }catch(error){
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            }
        }  
    }
    // Edit Note
    const editNote = async () =>{
        const noteId = noteData._id
        console.log(noteId,"noteId in edit");
        try{
            const response = await axiosInstance.put("edit-note/" + noteId,{
                title,
                content,
                tags,
            })
            if(response.data && response.data.note){
                showToastMessage("Note Updated Successfully",'success')
                getAllNotes();
                onClose();
            }
            console.log(response,"response in edit");
        }catch(error){
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            }
        }
    }
    const handleAddNote = () =>{
        if(!title){
            setError("Please Enter the title");
            return;
        }
        if(!content){
            setError("Please Enter the content");
            return;
        }
        setError("");

        if (type ==='edit'){
            editNote()
        }else{
            addNewNote()
        }

    }
     return (
    <div className='edit-note-container'>
        <button className="remove-button" onClick={onClose}>
            <MdClose/>
        </button>
        <div className='notes-container'>
            <label className='input-label'>TITLE</label>
            <input
                type='text'
                className='title-input-box'
                placeholder='Go To Gym At 5'
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                />
        </div>
        <div className='notes-container'>
            <label className='input-label'>CONTENT</label>
            <textarea
                type='text'
                className='content-text-area'
                placeholder='Content'
                rows={10}
                value={content}
                onChange={(e)=>setContent(e.target.value)}
                />        
        </div>
        <div className='notes-container'>
            <label className='input-label'>TAGS</label>
            <TagInput tags={tags} setTags={setTags}/>
        </div>
        {error && <p className='error-text'>{error}</p>}
        <button className='editnote-btn' onClick={handleAddNote}>
            {type === "edit" ? "UPDATE" : "ADD" }
        </button>
    </div>
  )
}

export default AddEditNotes