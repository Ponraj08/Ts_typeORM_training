import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export interface Idatas {
  id: string;
  name: string;
  email: string;
  role: string;
}
function Home() {


  const navigate=useNavigate()
  const [overalldata, setOveralldata] = useState<Idatas[]>([]);

  const [editinput, setEditinput] = useState(false);
  const [nameEdit,setNameEdit]=useState("")
  const [emailEdit,setEmailEdit]=useState("")
  const [roleEdit,setRoleEdit]=useState("")
  const [idedit,setIdEdit]=useState("")
  const[erroralart,setErroralart]=useState("")

  //get method

  const gettingUsers = async () => {
    try {

      const token = localStorage.getItem("jwtToken");
   
      if (!token) {
          console.error("No token found. User might not be authenticated.");
          
      }

      const response = await axios.get(
        "http://localhost:5002/user/getusers",
        {
          headers: {
              Authorization: `Bearer ${token}`,  
          }
      }

      );
      console.log(response);
      const data: Idatas[] = response.data.map((datas: Idatas) => ({
        id: datas.id,
        name: datas.name,
        email: datas.email,
        role: datas.role,
      }));
      setOveralldata(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    gettingUsers();
  }, []);

  //delet users

  const deletingUsers = async (id: string, e: any) => {
    try {
      console.log(id);
      e.preventDefault();

      const token = localStorage.getItem("jwtToken");
   
      if (!token) {
          console.error("No token found. User might not be authenticated.");
          return;
      }

      await axios.delete(`http://localhost:5002/user/delet/${id}`,
      {
        headers: {
            Authorization: `Bearer ${token}`,  
        }
    });

      gettingUsers();
    } catch (response:any) {
      setErroralart(response.response.data.error);
      alert(erroralart)
    }
  };

  //edit users

 

  const editusers = async (id: string, e: any) => {
    try {
        e.preventDefault();

        const token = localStorage.getItem("jwtToken");

        if (!token) {
            console.error("No token found. User might not be authenticated.");
            return;
        }

        await axios.put(`http://localhost:5002/user/update/${id}`,
          {
              name: nameEdit,
              email: emailEdit,
              role: roleEdit,
          },
          {
              headers: {
                  Authorization: `Bearer ${token}`,  
              },
          }
      );
      gettingUsers();
    } catch (response:any) {
      setErroralart(response.response.data.error)
      alert(erroralart)
    }
  };


  const logout=(e:any)=>{

    try{

      e.preventDefault()
      const token=localStorage.removeItem("jwtToken")
      console.log(token)

      navigate('/')

    }catch(err){
      console.log(err)
    }

    
  }

  return (
    <>

    <div>
      <h1 className="m-5">User and Admin Tables</h1>

      <button className="btn btn-primary m-5" onClick={(e)=>{logout(e)}}>Logout</button>



    </div>

      <table className="table  table-bordered table-hover m-5  me-5">
        <thead>
          <tr>
            <th>s.no</th>
            <th>name</th>
            <th>email</th>
            <th>role</th>
            <th>delet</th>
            <th>edit</th>
          </tr>
        </thead>
        <tbody>
          {overalldata.map((data, index) => (
            <tr key={index}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.role}</td>
              <td>
                <button className="btn btn-danger m-5 fs-3"
                  onClick={(e) => {
                    deletingUsers(data.id, e);
                  }}
                >
                  delet
                </button>
              </td>
              <td>
                <button

                className="btn btn-warning m-5 fs-3"
                  onClick={() => {
                  setEditinput(true)
                  setIdEdit (data.id)
                  }}
                >
                  edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!editinput ? (
        <div></div>
      ) : 
      (
        <div>

            <h1 className="m-5">Edit users</h1>
          <div className="edit_input">
            <input type="text" placeholder="name" className="form-control ms-5 mb-4"  onChange={(e) => {setNameEdit(e.target.value);}} style={{width:"500px"}}/>
          </div>

          <div className="edit_input">
            <input type="password"  placeholder="email" className="form-control ms-5 mb-4"  required  onChange={(e) => { setEmailEdit(e.target.value);}} style={{width:"500px"}}/>
          </div>

          <div className="edit_input">
            <input type="password"  placeholder="role" className="form-control ms-5 mb-4" required  onChange={(e) => { setRoleEdit(e.target.value);}} style={{width:"500px"}}/>
          </div>

          <button className="btn btn-success m-5 fs-3" onClick={(e)=>{editusers(idedit,e)}}>update</button>
        </div>
      )}
    </>
  );
}

export default Home;
