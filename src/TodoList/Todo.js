import React, { useEffect, useState } from "react";
import "./style.css";
import Tooltip from "@mui/material/Tooltip";

const getLocalData = () => {
  const lists = localStorage.getItem("listItem");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [addItem, setAddItem] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggelButton] = useState(false);

  const addItems = () => {
    if (!inputData) {
      alert("please add item first");
    } else if (inputData && toggleButton) {
      setAddItem(
        addItem.map((currElem) => {
          if (currElem.id === isEditItem) {
            return {
              ...currElem,
              name: inputData,
            };
          }
          return currElem;
        })
      );
      setInputData("");
      setIsEditItem(null);
      setToggelButton(false);
    } else {
      const newInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setAddItem([...addItem, newInputData]);
      setInputData("");
    }
  };
  //   edit item
  const editItem = (index) => {
    const item_edited = addItem.find((currElem) => {
      return currElem.id === index;
    });
    setInputData(item_edited.name);
    setIsEditItem(index);
    setToggelButton(true);
  };

  // delete item in the list
  const deleteItem = (index) => {
    const updatedItem = addItem.filter((currEle) => {
      return currEle.id !== index;
    });
    setAddItem(updatedItem);
  };
  // remove all Items from list
  const removeAll = () => {
    setAddItem([]);
  };
  // add data to localStorage
  useEffect(() => {
    localStorage.setItem("listItem", JSON.stringify(addItem));
  }, [addItem]);
  return (
    <>
      <div className="main-div">
        <div className="child_div">
          <figure className="image">
            <img src="./images/todo.jpg" alt="todo image" className="img" />
            <figcaption className="text">Add your list item here</figcaption>
          </figure>
          <div className="addItems">
            {/* Add Item */}
            <input
              type="text"
              placeholder="✍️Add Item..."
              className="form-control"
              value={inputData}
              onChange={(event) => {
                setInputData(event.target.value);
              }}
            />
            {/* toggle button to show edit and add button */}
            {toggleButton ? (
              <i
                className="fa-solid fa-pen-to-square edit"
                onClick={addItems}
              ></i>
            ) : (
              <i className=" fa-solid fa-plus addIcon" onClick={addItems}></i>
            )}
          </div>
          <div className="showItems">
            {/* show added item */}
            {addItem.map((currItem) => {
              return (
                <div className="eachItem" key={currItem.id}>
                  <h6>{currItem.name}</h6>
                  <div className="todoBtn">
                    <i
                      className="fa-solid fa-pen-to-square edit" //edit icon
                      onClick={() => editItem(currItem.id)}
                    ></i>
                    <i
                      className="fa-solid fa-trash delete"
                      onClick={() => deleteItem(currItem.id)} //delete item icon
                    ></i>
                  </div>
                </div>
              );
            })}
            {/* button to clear the List */}
            {addItem.length > 0 && (
              <Tooltip title="Delete All Items">
                <button className="btn" onClick={removeAll}>
                  Delete List
                </button>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
