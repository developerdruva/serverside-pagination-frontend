import React, { Fragment, useEffect, useState } from 'react';
import './users.css';
import _ from 'lodash';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [pages, setPages] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [usrCount, setUsrCount] = useState(0);
  
  useEffect(()=>{
      let usersCount = async () => {
        let res = await axios.get('http://localhost:8989/usersCount');
        if(res.data.count){
          setUsrCount(parseInt(res.data.count))
          let pagesCount = Math.ceil(parseInt(res.data.count)/pageSize);
          setPages( _.range(1, pagesCount+1))
        }else{
          console.log(res.data);
        }
      };
      usersCount();
      callUsers(currPage, pageSize)
  },[pageSize,currPage])

  let callUsers = async (page, size) => {
    try {
      let response = await axios.get(`http://localhost:8989/usersin?page=${page}&size=${size}`);
      if(response.data.data){
        setUsers(response.data.data)
      }else{
        setUsers(null);
      }
    } catch (error) {
        setUsers(null);
    }
  }
  return (
    <Fragment>
        <div className='container vh-100'>
          <h1 className='display-4 mt-2 text-center'>Server Side Pagination</h1>
          <div className='d-flex justify-content-center shadow m-5 mt-3 row mb-0 '>
               <table className="table table-hover text-secondary table-sm tablestyle">
                <thead >
                    <tr >
                        <th >Name</th>
                        <th >Email</th>
                        <th >Created At</th>
                        <th >Updated At</th>
                        <th >Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                      users ? users.map((item, index)=>{
                        return <tr key={index}>
                          <td>{item.userName}</td>
                          <td>{item.emailId}</td>
                          <td>{item.createdAt}</td>
                          <td>{item.updatedAt}</td>
                          <td><button className='btn btn-link text-decoration-none'>View</button></td>
                        </tr>
                      }) :
                      null
                    }
                </tbody>
            </table>
            <div className='d-flex justify-content-end'>

              <nav aria-label="Page navigation example" className='' style={{alignSelf:'right'}}>
              <ul className="pagination">
                <li className='page-link border-0 text-dark' width='200px'> 
                    <small>{users ?<> 
                      <span className='text-secondary'>{users[0].uid} to {users[users.length-1].uid}</span>
                      <span> of {usrCount}</span></>: null}
                    </small> 
                </li>
                <li className="page-item">
                  <button className="page-link me-1" aria-label="Previous" 
                    onClick={()=>{
                        if(currPage !== 0){
                          callUsers(currPage - 1, pageSize);
                          setCurrPage(currPage - 1);
                        }
                      }}>
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
                {
                  pages.map((item, index)=>{
                    return <li className="page-item" key={index}><button onClick={()=>{callUsers(item, pageSize);setCurrPage(item)}} className="page-link me-1" href="#" >{item}</button></li>
                  })
                }
                <li className="page-item">
                  <button className="page-link me-1" aria-label="Next" onClick={()=>{
                      if(currPage < pages.length){
                          callUsers(currPage + 1, pageSize);
                          setCurrPage(currPage + 1);
                      }
                      }}>
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
                <li className='page-item'>
                  <select type='tel' className='page-link me-1' 
                    onChange={(event)=>{callUsers(1, event.target.value);setPageSize(event.target.value)}} 
                    defaultValue='5' style={{width:'65px'}}>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                </li>
                <li className='page-item'>
                  <p className='page-link me-1 border-0 text-dark hover-none'>Goto</p>
                </li>
                <li className='page-item'>
                    <input type='tel' className='page-link'  value={currPage}
                      onChange={(event)=>{if(event.target.value <= pages.length){callUsers(event.target.value,pageSize);setCurrPage(event.target.value)}}}
                      style={{width:'50px'}}/>
                </li>
              </ul>
            </nav>
            </div>
          </div>
          </div>
    </Fragment>
  )
}

export default App