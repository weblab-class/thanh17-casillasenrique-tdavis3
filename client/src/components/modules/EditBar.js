import React, { useState } from "react";
import NewBookmarkForm from "../modules/NewBookmarkForm";
import NewComponentModal from "../modules/NewComponentModal";
import image from "../../public/images/bruh.png";


import "./EditBar.css";
import "../../utilities.css";

import {
    Dropdown,
    Image,
  } from 'semantic-ui-react'
   
const addBookmarkTrigger = (<Dropdown.Item className="EditBar ui dropdown item" image={ <img className="u-textCenter EditBar image" src={image} />}/>);
const addGroupTrigger = (<Dropdown.Item image={ <img src={image} />}/>);
const addFolderTrigger = (<Dropdown.Item icon={ <img src={image} />}/>);

const EditBar = ({ handleSubmit }) => {
    

    return (
        <Dropdown direction="right" icon="add">
        <Dropdown.Menu className="EditBar ui dropdown menu">
            <NewComponentModal 
                trigger={addBookmarkTrigger} 
                form={<NewBookmarkForm onSubmit={handleSubmit}/>}
            />
            <NewComponentModal
                trigger={addGroupTrigger}
                form={<NewBookmarkForm onSubmit={handleSubmit}/>}
            />
            <NewComponentModal
                trigger={addFolderTrigger}
                form={<NewBookmarkForm onSubmit={handleSubmit}/>}
            />
        </Dropdown.Menu>
      </Dropdown>
    );
}

export default EditBar;