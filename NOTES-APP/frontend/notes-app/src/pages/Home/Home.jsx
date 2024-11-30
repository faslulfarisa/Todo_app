import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import './Home.css'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from "react-modal"
import axiosInstance from '../../utils/axiosinstance'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import AddNoteImg from '../../assets/images/add-note.png'
import NoNoteImg from '../../assets/images/no-note.png'
import Toast from '../../components/ToastMessage/Toast'

const Home = () => {
  const [openAddEditModal,setOpenAddEditModal]=useState({
    isShown:false,
    type:"add",
    data:null,
    
  });
  const [showToastMsg,setShowToastMsg]=useState({
    isShown:false,
    message:"",
    type:"add",
  })

  const [userInfo,setUserInfo]=useState();
  const [allNotes,setAllNotes]=useState([]);
  const [isSearch,setIsSearch]=useState(false);

  const handleEdit = (noteDetails) =>{
    setOpenAddEditModal({
      isShown:true,
      data:noteDetails,
      type:"edit"
    })
  }
  const showToastMessage=(message,type)=>{
      setShowToastMsg({
        isShown:true,
        message,
        type,
      })
  }

  const handleCloseToast = ()=>{
    setShowToastMsg({
      isShown:false,
      message:"",
      type:"",
    });
  };
  // Get User Info
  const getUserInfo = async ()=>{
      try{
          const response = await axiosInstance.get("/get-user");
          if(response.data && response.data.user){
              setUserInfo(response.data.user);
          }
      }catch(error){
          console.log(error,"get error");
      }
  };
  // Get all notes
  const getAllNotes = async ()=>{
      try{
          const response = await axiosInstance.get("/get-all-notes");
          if(response.data && response.data.notes){
              setAllNotes(response.data.notes)
          }
          console.log(response,"getall response");
      }catch(error){
          console.log("An unexpected error ocurred.Please try again");
      }
  }
  // Delete Note
  const deleteNote = async(data)=>{
    const noteId=data._id;
    try{
      const response = await axiosInstance.delete("delete-note/"+ noteId);
      console.log(response,"delete response");
      if(response.data && !response.data.error){
        showToastMessage("Note Deleted Successfully",'delete')
        getAllNotes();
      }
    }
    catch(error){
      console.log("An unexpected error ocurred.Please try again");
    }
  }
  // updateNotePinned
  const updateNotePinned = async(data)=>{
    console.log(data,"data");
    const noteId=data._id;
    try{
        const response =await axiosInstance.put("update-note-pinned/"+noteId,
          {
            isPinned:!data.isPinned,
          });
          console.log(response,"response-pinned");
          if(response.data && response.data.note){
            getAllNotes();
          }
    }catch(error){

    }
  }   
  // Search for a Note
  const onSearchNote = async(query)=>{
    try{
        console.log(query,"query");
        const response = await axiosInstance.get("/search-notes",{
          params:{query},
        })
        console.log(response);
        if(response.data && response.data.notes){
          setIsSearch(true)
          setAllNotes(response.data.notes)
        }
    }catch(error){
        console.log(error);
    }
  }
  const handleClearSearch=()=>{
    setIsSearch(false);
    getAllNotes();
  }

  useEffect(()=>{
    getAllNotes();
    getUserInfo();
  },[]);
  return (
    <>
      <Navbar 
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />
      <div className='home-container'>
        {allNotes.length >0 ? (
             <div className='note-container'>
             {allNotes.map((note,index)=>(
                 <NoteCard 
                   key={note._id}
                   title={note.title}
                   date={note.CreatedOn}
                   content={note.content}
                   tags={note.tags}
                   isPinned={note.isPinned}
                   onEdit={()=>handleEdit(note)}
                   onDelete={()=>deleteNote(note)}
                   onPinNote={()=>updateNotePinned(note)}
              />
             ))}
             </div>
        ):(
          <EmptyCard 
            imgSrc={isSearch?NoNoteImg:AddNoteImg}
            message={isSearch?`Oops!No notes found matching your search`:`Start creating your first note!Click the 'Add' button to note down 
              your thoughts,ideas,and reminders.Let's get started`}
            />
        )}
        <button 
            className='add-button '
            onClick={()=>{setOpenAddEditModal({
                isShown:true,
                type:"add",
                data:null
              })}}>
                <MdAdd style={{fontSize: '32px',color: 'white' }}/>
        </button>
        <Modal
             isOpen={openAddEditModal.isShown}
            //  type add or edit
             style={{
                overlay:{
                  backgroundColor: 'rgba(0, 0, 0, 0.2)'
                },
             }}
             className='modal'
        >
            <AddEditNotes
                type={openAddEditModal.type}
                noteData={openAddEditModal.data}
                onClose={()=>{
                  setOpenAddEditModal({
                    isShown:false,
                    type:"add",
                    data:null,
                  })
                }}
                getAllNotes={getAllNotes}
                showToastMessage={showToastMessage}
                />
        </Modal>
        <Toast
          isShown={showToastMsg.isShown}
          message={showToastMsg.message}
          type={showToastMsg.type}
          onClose={handleCloseToast}
          />
      </div>
    </>
  )
}

export default Home