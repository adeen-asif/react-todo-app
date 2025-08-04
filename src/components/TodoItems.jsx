import React from "react";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

import { FaRegCircle } from "react-icons/fa";

import { MdDelete } from "react-icons/md";

const TodoItems = ({ id, text, isComplete, deleteTodo, toggle }) => {
  return (
    <div className="flex items-start my-3 gap-2 w-full max-w-full">
      {/* Icon toggle button - fixed size */}
      <div
        onClick={() => toggle(id)}
        className="cursor-pointer flex-shrink-0 pt-1"
      >
        <button type="button">
          {isComplete ? <IoCheckmarkDoneCircleOutline /> : <FaRegCircle />}
        </button>
      </div>

      {/* Text container - flex-grow to take remaining space, prevent overflow */}
      <div className="flex-1 overflow-hidden">
        <p
          title={text}
          className={`text-[17px] break-words whitespace-pre-wrap overflow-hidden ${
            isComplete ? "line-through text-slate-500" : "text-slate-700"
          }`}
        >
          {text}
        </p>
      </div>

      {/* Delete button */}
      <button
        type="button"
        onClick={() => deleteTodo(id)}
        className="flex-shrink-0 pt-1"
      >
        <MdDelete />
      </button>
    </div>
  );
};

export default TodoItems;
