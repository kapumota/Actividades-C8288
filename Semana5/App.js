// Parte 1
import React from 'react';
class App extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      name:"Kapu", }
this.updateNameState=this.updateNameState.bind(this);
}
  updateNameState(){
    this.setState({
      name:"Kapu Mota"});
  }
render()
  {
    return(
    <div>
    <p>{this.state.name}</p>
    <button onClick={()=>this.updateNameState()}>Muestra el nombre completo</button>
    </div>
      );
  }
}
 export default App;

// Parte 2

import React,{useState} from 'react';

 const App = () => {

  const [count, setCount] = useState(0);

  const handleIncrementByTen = () => {
    setCount(count + 10);
  };

  const handleDecrementByTen = () => {
    setCount(count - 10);
  };
  const resetCountHandler = () => {

    setCount(0)
  };


  return (
    <div>
      Initial Count: {count}
      <hr />
      <div>
        <button type="button" onClick={handleIncrementByTen}>
          Increment by 10
        </button>
        <button type="button" onClick={handleDecrementByTen}>
          Decrement by 10
        </button>
        <button type="button" onClick={resetCountHandler}>
      Reset to Initial State
        </button>
      </div>
    </div>
  );
};
export default App;

// Parte 3
import React, { useEffect, useState } from "react";
const App = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const API_URL = "https://dummyjson.com/users";

        const fetchSpeakers = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();

                setData(data.users);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchSpeakers();
    }, []);

    return (
        <>
        <ul>
      {data.map(item => (
        <li key={item.id}>
          {item.firstName} {item.lastName}
        </li>
      ))}
    </ul>
        </>
    );
};
export default App;

// Parte 4
import React, {useState } from "react";

const App = () => {

  const [speakerName]= useState("Kapu MoTA");
  return (
     <div>
       <h2>This is Parent Component</h2>
       <ImmediateChildComponent speakerName={speakerName} />
     </div>
    );
     }
    function ImmediateChildComponent({speakerName}) {
      return (
        <div>
          <h2>This is an immediate Child Component</h2><hr/>
          <GrandChildComponent speakerName={speakerName} />
        </div>
      );
    }
    function GrandChildComponent({speakerName}) {
      return (
        <div>
          <h3>This is a Grand Child Component</h3>
          <h4>Speakers Name: {speakerName}</h4>

        </div>
      );
}
export default App;

// Parte 5

import React, {useRef} from "react";
const App = () => {
    const inputRef = useRef(null);
    const clickButton = () => {
      inputRef.current.focus();
    };
    return (
      <>
        <input ref={inputRef} type="text" />
        <button onClick={clickButton}>Haz clic para centrarse en la entrada</button>
      </>
    );
  }
  export default App

// Parte 6
import { useReducer, useEffect } from "react";
import axios from "axios";


const initialState = {
  isLoading: false,
  error: null,
  data: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "getEventSchedule":
      return {
        ...state,
        isLoading: true,
      };
    case "getEventScheduleSuccess":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case "getEventScheduleFailure":
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("render", state)
  useEffect(() => {
    dispatch({ type:"getEventSchedule" });
    axios.get("http://localhost:8000/schedules/")
      .then((response) => {
        console.log("response", response);
        dispatch({ type: "getEventScheduleSuccess", payload: response.data });
      })
      .catch(() => {
        dispatch({ type: "getEventScheduleFailure" });
      });
  }, []);
  return (
    <div>
      <h2>Event Schedules</h2>
      {state.isLoading && <div>Loading...</div>}
      <ul>
        {state.data && state.data.map((schedule) => (
          <li key={schedule.id}>
            Time: {schedule.time} <br />
           Speaker:{schedule.speaker}<br />
            Subject: {schedule.subjectTitle}<br />
           Venue: {schedule.venue}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

// db.json
{    "schedules":
    [
        {
            "id":1,
            "time":"10.00 AM",
            "speaker": "Kapu Mota",
            "subjectTitle":"Intro to React Hooks",
            "venue":"Auditorium C"
        },
        {
            "id":2,
            "time":"12.00 AM",
            "speaker": "Chalo Zeta",
            "subjectTitle":"React Performance Optimization ",
            "venue":"Auditorium A"
        },

        {

            "id":3,
            "time":"2.00 PM",
            "speaker": "Ire Ire",
            "subjectTitle":"Intro to JavaScript",
            "venue":"Auditorium B"
        }
    ]
}

//Parte 7
import React, { useState} from "react";
const speakers = [
  {id: 10, name: "Kapu Mota"},
  { id: 11, name: "Chalo Zeta"},
];
const App = () => {
  const [text, setText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const onChangeText = (e) => {
    setText(e.target.value);
  };
  console.log("Text", text);
  const handleClick = (e) => {
    setSearchTerm(e.target.value);
  };
  console.log("Search Term", text);
  const filteredSpeakers = speakers.filter((speaker) => {
    console.log("Filtering speakers...");
    return speaker.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <div>
       <input type="text" onChange={onChangeText} />
        <button onClick={handleClick}>Search</button>
      </div>
      {filteredSpeakers.map((filteredSpeaker) => (
        <li key={filteredSpeaker.id}>{filteredSpeaker.name}</li>
      ))}
    </div>
  );
};

export default App;

//Parte 8
import React, { useState, useCallback } from "react";
import { v4 as uuid } from "uuid";

const App = () => {
  console.log("Rendering process for: App Component");
  const [speakers, setSpeakers] = useState([
    { id: "1", name: "Kapu Mota" },
    { id: "2", name: "Chalo Zeta" },
    { id: "3", name: "Ire Ire" },
    { id: "4", name: "Aco Aco" },
  ]);

  const [text, setText] = useState("");

  const handleTextInput = (e) => {
    setText(e.target.value);
  };

  const handleAddSpeaker = () => {
    setSpeakers(speakers.concat({ id: uuid(), name: text }));
  };

  const handleRemoveSpeaker = useCallback(
    (id) => setSpeakers(speakers.filter((user) => user.id !== id)),
    [speakers]
  );
  return (
    <div>
      <input type="text" value={text} onChange={handleTextInput} />
      <button type="button" onClick={handleAddSpeaker}>
        + Add a Speaker
      </button>

      <List list={speakers} onRemove={handleRemoveSpeaker} />
    </div>
  );
};

const List = React.memo(({ list, onRemove }) => {
  console.log("Rendering process for: List Component");
  return (
    <ul>
      {list.map((item) => (
        <ListItem key={item.id} item={item} onRemove={onRemove} />
      ))}
    </ul>
  );
});

const ListItem = React.memo(({ item, onRemove }) => {
  console.log("Rendering process for: ListItem Component");
  return (
    <li>
      {item.name}
      <button type="button" onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </li>
  );
});

export default App;

//Parte 9
import React from "react";
import useFetchSpeakers from "./useFetchSpeakers";

const App = () => {
  const API_URL = "https://dummyjson.com/users";
  const [data] = useFetchSpeakers(API_URL);
  return (
    <>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.firstName} {item.lastName}
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;

//useFetchSpeakers.js
import { useEffect, useState } from "react";

const useFetchSpeakers = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        setData(data.users);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchSpeakers();
  }, [url]);

  return [data];
};

export default useFetchSpeakers;
