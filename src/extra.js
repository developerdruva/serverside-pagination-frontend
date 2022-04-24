<nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li className="page-item"><button className="page-link" href="#">1</button></li>
          <li className="page-item"><button className="page-link" href="#">2</button></li>
          <li className="page-item"><button className="page-link" href="#">3</button></li>
          <li className="page-item">
            <button className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>

      for(let i=0;i<10 ;i++){
        const body = {
          userName : `Rajesh Kumar${i}`,
          emailId : `developer.rajeshkumars${i}`,
          createdAt : '23-04-2022',
          updatedAt : '24-04-2022'
        }
        axios.post(`http://localhost:8989/adduser`, body).then((res,err)=>{ 
          console.log(res)
        })
    }