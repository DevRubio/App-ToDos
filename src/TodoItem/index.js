import React from "react";
import { MdCheckBox, MdPlaylistRemove } from "react-icons/md";
import "./TodoItem.css";

function TodoItem(props) {
  return (
    <li className="TodoItem">
      <span
        className={`Icon Icon-check ${props.completed && "Icon-check--active"}`}
        onClick={props.onComplete}
      >
        <MdCheckBox />
      </span>
      <p className={`TodoItem-p ${props.completed && "TodoItem-p--complete"}`}>
        {props.text}
      </p>
      <span className="Icon Icon-delete" onClick={props.onDelete}>
        <MdPlaylistRemove/>
      </span>
    </li>
  );
}

export { TodoItem };
