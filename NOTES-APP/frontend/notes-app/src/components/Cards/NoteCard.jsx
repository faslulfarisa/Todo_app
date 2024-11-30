import React from 'react'
import {MdOutlinePushPin} from "react-icons/md";
import {MdCreate,MdDelete} from "react-icons/md"
import './NoteCard.css'
import moment from "moment"

const NoteCard = ({title,date,content,tags,isPinned,onEdit,onDelete,onPinNote}) => {
  return (
    <div className='note-card'>
        <div className='note-header'>
            <div>
                <h6>{title}</h6>
                <span>{moment(date).format('Do MMM YYYY')}</span>
            </div>
            <MdOutlinePushPin style={{color:isPinned? ' #2B85FF':'#cbd5e1'}} onClick={onPinNote}/>
        </div>
        <p className='note-content'>{content}</p>
        <div className='note-footer'>
            <div className='tags'>{tags.map((item)=>
                <span>#{item}</span>
                )}</div>
            <div className='actions'>
                <MdCreate className='icon-button-edit' onClick={onEdit}/>
                <MdDelete className='icon-button-delete' onClick={onDelete}/>
            </div>
        </div>
    </div>
  )
}

export default NoteCard