import { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import axios from 'axios';

function debounce(func, wait){
  let timeout;
  function debounced(...args){
    clearTimeout(timeout);
    timeout = setTimeout(()=>{
      func.apply(this, args)
    }, wait)
  }
  debounced.cancel = ()=>{
    clearTimeout(timeout);
  }
  return debounced;
}


function App() {

  
  // highlight name using useRef
  const nameRef = useRef(null);
  
  const [search, setSearch] = useState("");
  const handleSearch = useCallback(
    debounce((value)=>{
      setSearch(value);
      // console.log(value)
    },300)
    ,[])
  
  // Initialize users as an empty array
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    nameRef.current.focus();

    // get all users
    axios.get("http://localhost:4000/api/users")
      .then((res) => {
        // console.log("API response:", res.data);
        // Adjust according to the API response structure
        if (Array.isArray(res.data)) {
          setUsers(res.data);
        } else if (Array.isArray(res.data.users)) {
          setUsers(res.data.users);
        } else {
          setUsers([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
      
  }, []);


  // create a new user
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const city = e.target.city.value;
    const age = e.target.age.value;
    const salary = e.target.salary.value;

    const user = {name, email, city, age, salary};
    try {
      let result;
      if(editUser){
        result = await axios.put(`http://localhost:4000/api/users/${editUser._id}`, user);
        if(result.status === 200){
          setUsers(users.map((user) => user._id === editUser._id ? user = result.data.user : user));
        }
      }
      else{
        result = await axios.post("http://localhost:4000/api/users", user);
        if(result.status === 201){
          setUsers([...users, result.data.user]);
        }
      }
      e.target.reset();
      setEditUser(null);
      
    } catch (error) {
        console.log(error)
    }

  }

  // edit user
  const handleEdit = async (user) => {
    setEditUser(user);
  }

  const handleDelete = async (user, e) => {
    e.preventDefault();
    const id = user._id;
    try {
      const result = await axios.delete(`http://localhost:4000/api/users/${id}`);
      if(result.status === 200){
        // alert("User deleted successfully");
        setUsers([...users.filter((u) => u._id !== id)]);

      }
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <>
      <Navbar setSearch={handleSearch} />
      <div className="text-gray-900">
        <form onSubmit={handleSubmit} action="post" className="flex flex-wrap">
        <div >
          {/* name input */}
          <input ref={nameRef} defaultValue={editUser ? editUser.name : ""} required type="text" name="name" id="name" className="p-1 m-2 w-96 border border-gray-300 rounded" placeholder="name" />
          <input type="email" defaultValue={editUser ? editUser.email : ""} required name="email" id="email" className="p-1 m-2 w-96 border border-gray-300 rounded" placeholder="email" />
          <input type="text" defaultValue={editUser ? editUser.city : ""} required name="city" id="city" className="p-1 m-2 w-96 border border-gray-300 rounded" placeholder="city" />
          <input type="number" defaultValue={editUser ? editUser.age : ""} required name="age" id="age" className="p-1 m-2 w-96 border border-gray-300 rounded" placeholder="age" />
          <input type="number" defaultValue={editUser ? editUser.salary : ""} required name="salary" id="salary" className="p-1 m-2 w-96 border border-gray-300 rounded" placeholder="salary" />
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 w-16 cursor-pointer active:scale-95 rounded'>{editUser ? "Update" : "Submit"}</button>

          {editUser && (
            <button
            type="button"
            onClick={() => {
              setEditUser(null);
              e.target.reset();
            }}
            className="ml-3 bg-gray-500 hover:bg-gray-700 text-white font-bold h-10 w-16 cursor-pointer active:scale-95 rounded"
          >
            Cancel
          </button>
          )}
          
        </div>
        </form>
        <div className="px-3 py-4 flex justify-center">
          <table className='w-full'>
            <tbody>
              <tr className='border-b'>
                <td className="p-3">Name</td>
                <td className="p-3">Email</td>
                <td className="p-3">City</td>
                <td className="p-3">Age</td>
                <td className="p-3">Salary</td>
              </tr>

              {users.filter((user)=>user.name.toLowerCase().includes(search.toLowerCase()))
              .map((user)=>(
                <tr className='border-b hover:bg-amber-200' key={user._id}>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.city}</td>
                  <td className="p-3">{user.age}</td>
                  <td className="p-3">{user.salary}</td>
                  <td>
                    <button type="button" onClick={(e)=>handleEdit(user,e)} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline cursor-pointer">Edit</button>
                    <button type="button" onClick={(e)=>handleDelete(user,e)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline cursor-pointer">Delete</button>
                  </td>
                </tr>
              ))}


            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
