import React, { Fragment, useRef, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { isAuthenticated, logout } from "../helper/AuthHelper";
import M from "materialize-css";
import { API } from "../backend";

const NavBar = () => {
  const  searchModal = useRef(null)
  const [search,setSearch] = useState('')
  const history = useHistory();
  const [userDetails,setUserDetails] = useState([])
  const { user} = isAuthenticated();

  useEffect(()=>{
    M.Modal.init(searchModal.current)
},[])

const fetchUsers = (query)=>{
  setSearch(query)
  fetch(`${API}/search-users`,{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      query
    })
  }).then(res=>res.json())
  .then(results=>{
    setUserDetails(results.user)
  })
}
  return (
    <div className="navbar-fixed">
            {isAuthenticated() && (
    <nav>

      <div className="nav-wrapper white hoverbutton">
          <Link to="/home" className="brand-logo left" style={{paddingLeft: "200px" }} >
            Instagram
          </Link>
       

        <ul id="nav-mobile" className="right" >

            <Fragment >
            <li key="1" ><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>
            <div id="modal1" className="modal" ref={searchModal} style={{color:"black"}}>
              <div className="modal-content">
              <input
                                  type="text"
                                  placeholder="Search Users"
                                  value={search}
                                  onChange={(e)=>fetchUsers(e.target.value)}
                                />
                  <ul key = "8" className="collection">
                  {userDetails.map(item=>{
                 return ( <div key={item._id}><Link to={
                  item._id !== user._id
                    ? `/profile/${item._id}`
                    : `/profile`
                } onClick={()=>{
                   M.Modal.getInstance(searchModal.current).close()
                   setSearch('')
                 }}><li  className="collection-item" style={{color:"black"}}>{item.name}</li></Link> 
                 </div> )})}
                  </ul>
              </div>
              <div className="modal-footer">
              <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
              </div>
             </div>
              <li key="3" >
                <Link to="/profile" className="brand" >
                <i className="material-icons"> home</i>
                </Link>  
              </li>
              <li key="4" >
                <Link to="/explore" className="brand">
                <i className="material-icons"
                  > explore</i>
                </Link>
              </li >
              <li key="5" >
                <Link to="/create" className="brand ">
                <i className="material-icons">add_to_photos</i>
                </Link>
              </li>

              <li key="6" >
                <button
                  className="btn-small waves-effect waves-light blue hoverbuttons"
                  onClick={() => {
                    logout(() => {
                      history.push("/");
                    });
                  }}
                >
                  logout
                </button>
              </li>
            </Fragment>
        </ul>
      </div>
    </nav>

          )}

  
    </div>
);
};

export default NavBar;
