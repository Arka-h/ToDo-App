import React, { useRef, useState } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free";
import "@fortawesome/fontawesome-svg-core";
import { faMinusCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
export default function TableListitem({
  text,
  strike,
  toggleCompleted,
  deleteItem,
  updateState,
}) {
  const [editable, setEditable] = useState(0);
  const [prev, setPrev] = useStateWithCallbackLazy("");
  const [changed, setChanged] = useStateWithCallbackLazy("");
  const inputRef = useRef();

  const setVal = () => {
    if (editable) {
      //editable is true,capture the input into change
      setChanged(inputRef.current.innerText,(changed)=>{
        console.log("changed", changed);
        updateState(prev, changed, strike);
      });
    } else {
      // editable is false, capture the input into prev
      setPrev(inputRef.current.innerText);
    }
    setEditable((edit) => !edit);
  };
  return (
    <>
      <tr>
        <td
          className="col-lg"
          onClick={() => {
            toggleCompleted(text, strike, editable);
          }}
        >
          {strike ? (
            <div contentEditable={editable} ref={inputRef}>
              <strike>{text}</strike>
            </div>
          ) : (
            <div contentEditable={editable} ref={inputRef}>
              {text}
            </div>
          )}
        </td>
        <td>
          <a
            href="#"
            className="text-success"
            onClick={async () => {
              setVal();
            }}
          >
            <FontAwesomeIcon icon={faEdit} size="1x" />
          </a>
        </td>
        <td>
          <a
            href="#"
            className="text-danger"
            onClick={() => {
              deleteItem(text, strike);
            }}
          >
            <FontAwesomeIcon icon={faMinusCircle} size="1x" />
          </a>
        </td>
      </tr>
    </>
  );
}
