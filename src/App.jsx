import React, { useEffect, useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [data, setData] = useState(()=>{
    const savedData = localStorage.getItem("userData")
    return savedData ? JSON.parse(savedData) : []
  });

  const [editId, setEditId] = useState(null)


  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(data))
  }, [data])
  

  const sumbitHandler = () => {
    if (!name || !email || !number) {
      alert("all fields are required");
      return;
    }

    if(editId !== null){
      setData(data.map(item=>item.id ===editId ? {...item, name, email, number} : item))
      setEditId(null)
    }else{
      setData([...data, { id: data.length + 1, name, email, number }]);
    }
    setName("");
    setEmail("");
    setNumber("");
  };

  const deleteHandler = (id) => {
    setData(data.filter(item=>item.id !== id))
    }

    const editHandler = (id) => {
      const editItem = data.find(item => item.id === id)
      setName(editItem.name)
      setEmail(editItem.email)
      setNumber(editItem.number)
      setEditId(id)
    }

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <div className="h-screen w-full flex text-white">
      <div className="w-2/5 h-full flex items-center justify-center bg-neutral-800">
        <div className="w-100 h-130 flex gap-5 justify-center items-center flex-col rounded-2xl bg-neutral-300 shadow-lg shadow-white">
          <h1 className="text-red-600 text-2xl font-bold shadow-xl shadow-neutral-500/50">
            {editId !== null ? "Edit Info" : "Enter Your Info"}
          </h1>
          <div className="text-black w-70">
            <p>Name</p>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="bg-neutral-100 w-full rounded mt-1 px-2 py-2 outline-none shadow-sm focus:shadow-lg transition-shadow duration-300"
              type="text"
              placeholder="Enter Name"
            />
          </div>
          <div className="text-black w-70">
            <p>Email</p>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-neutral-100 w-full rounded mt-1 px-2 py-2 outline-none shadow-sm focus:shadow-lg transition-shadow duration-300"
              type="email"
              placeholder="Enter email"
            />
          </div>
          <div className="text-black w-70">
            <p>Number</p>
            <input
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
              className="bg-neutral-100 w-full rounded mt-1 px-2 py-2 outline-none shadow-sm focus:shadow-lg transition-shadow duration-300"
              type="text"
              placeholder="Enter number"
            />
          </div>
          <button
            onClick={sumbitHandler}
            className="bg-blue-500 px-7 py-2 rounded-sm text-xl transition-scale duration-300 hover:scale-[1.1]"
          >
            {editId !== null ? "Update" : "Sumbit"}
          </button>
        </div>
      </div>

      <div className="w-3/5 h-full bg-neutral-900 overflow-auto">
        <div className="flex items-center justify-center mt-2 uppercase text-3xl font-bold">
          <h1>user list</h1>
        </div>
        <div className="flex flex-wrap">
          {data.map((elem) => {
            return (
              <div
                key={elem.id}
                className="bg-neutral-300 w-[270px] rounded-2xl text-black p-5 m-4"
              >
                <p className="text-xl font-small">name: {elem.name} </p>
                <p className="text-xl font-small">email: {elem.email} </p>
                <p className="text-xl font-small">number: {elem.number} </p>
                <div className="w-full flex gap-5">
                  <button onClick={()=>deleteHandler(elem.id)} className="bg-red-600 px-5 py-1 rounded text-lg mt-2 text-white transition-scale duration-300 hover:scale-[1.1]">
                    Delete
                  </button>
                  <button onClick={()=>editHandler(elem.id)} className="bg-green-600 px-5 py-1 rounded text-lg mt-2 text-white transition-scale duration-300 hover:scale-[1.1]">
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
