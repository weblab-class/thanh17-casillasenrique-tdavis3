import React, { useState } from "react";
import NewBookmarkForm from "../modules/NewBookmarkForm";
import NewComponentModal from "../modules/NewComponentModal";
import closedIcon from "../../public/images/EditDropdownClosed.png";
import openedIcon from "../../public/images/EditDropdownOpened.png";
import newBookmark from "../../public/images/New_Bookmark.png";
import newGroup from "../../public/images/New_Group.png";
import newFolder from "../../public/images/New_Folder.png";
import newWidget from "../../public/images/New_Widget.png";

import "./EditBar.css";
import "../../utilities.css";

import {
    Dropdown,
    Image,
    Button
  } from 'semantic-ui-react'
   
const addBookmarkTrigger = (
    <Dropdown.Item 
        className="EditBar ui dropdown item" 
        image={ <img className="u-textCenter EditBar image" src={newBookmark}/>}
    />
);

const addGroupTrigger = (
    <Dropdown.Item 
        className="EditBar ui dropdown item" 
        image={ <img className="u-textCenter EditBar image" src={newGroup} />}
    />
);

const addFolderTrigger = (
    <Dropdown.Item 
        className="EditBar ui dropdown item" 
        icon={ <img className="u-textCenter EditBar image" src={newFolder} />}
    />
);

const addWidgetTrigger = (
    <Dropdown.Item 
        className="EditBar ui dropdown item" 
        icon={ <img className="u-textCenter EditBar image" src={newWidget} />}
    />
);

const openedImage = <Image className="EditBar-dropdown-button" src={openedIcon}/>;
const closedImage = <Image className="EditBar-dropdown-button" src={closedIcon}/>;

const EditBar = ({ handleSubmit }) => {
    
    const [trigger, setTrigger] =  useState(closedImage); 

    return (
        <Dropdown 
            onOpen={() => setTrigger(openedImage)} 
            onClose={() => setTrigger(closedImage)} 
            floating 
            direction="left" 
            trigger={trigger} 
            icon={null}
        >
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
            <NewComponentModal
                trigger={addWidgetTrigger}
                form={<NewBookmarkForm onSubmit={handleSubmit}/>}
            />
        </Dropdown.Menu>
      </Dropdown>
    );
}

export default EditBar;