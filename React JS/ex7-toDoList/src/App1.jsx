import { useState, useEffect } from "react";

export default function App1() { 
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);

    const _onSubmit = (e) => {
        setTodo(e.target.value);
        setTodoList(prev => [...prev, todo]);


    }


    return (
        <>
            
            <h4>To do List</h4>
            <form onSubmit={_onSubmit}>
                <input type="text" value={todo} />
                <button
        
                >추가</button>

            </form>
  </>
    );



}