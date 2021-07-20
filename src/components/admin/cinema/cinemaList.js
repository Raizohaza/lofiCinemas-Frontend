import { useState,useEffect,Fragment } from 'react';
import {Table,Dropdown,ButtonGroup,Button} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link,useHistory } from 'react-router-dom';
import { selectCinema , getCinemaAsync,deleteCinemaAsync} from '../../../features/cinema/cinemaSlice';
import { selectCineplex ,getCineplexAsync} from '../../../features/cineplex/cineplexSlice';
import API from 'api';
const mapCinemaList = cinemaList => cinemaList.map((cinema) =>
{
  const dispatch = useDispatch();
  const history = useHistory();

  return(
    <tr key={cinema.id}>
      <td>{cinema.id}</td>
      <td>{cinema.Name}</td>             
      <td>{cinema.Type}</td>
      <td>{cinema.Width}</td>
      <td>{cinema.Height}</td>
      <td>{cinema.CineplexId}</td>
      <td>
        <Button >
        <Link to={`/admin/cinema/${cinema.id}/edit`}>Edit</Link>
        </Button>
      </td>
      <td>
            <Button onClick={(e)=>{
              e.preventDefault();
              dispatch(deleteCinemaAsync({id:cinema.id}));
              window.location.reload();
              history.push('/admin/cinema',{update: false});
            }}>Delete</Button>
          </td>
    </tr>
  );
}
);

export function CinemaList() {
    const dispatch = useDispatch();
    let cinemaList = useSelector(selectCinema);
    const cineplexList = useSelector(selectCineplex);
    const [cinemaState, setCinemaState] = useState(cinemaList);
    const [loading, setLoading] = useState(true);
    // let selectedCineplex = null;
    if(cinemaList.length === 0 || cinemaList.length ===1){
        dispatch(getCineplexAsync());
        dispatch(getCinemaAsync());
    }
    let components = mapCinemaList(cinemaState);
    // useEffect(()=>{const fetchData = async()=>{
    //     let res = await API.get(`http://localhost:5000/cinemas`);     
    //     setCinemaState(res);
    // }
    // fetchData();
    // },[]);
    useEffect(()=>{const fetchData = async ()=>{
        setLoading(true);
        let res = await cinemaList;
        setCinemaState(res);
        setLoading(false);
    }
    fetchData();
  },[cinemaList]);
    let history = useHistory();

    function handleClick() {
      history.push("/admin/cinema/add");
    }
    let dropdownItem = cineplexList.map((cineplex)=>{
        return(
          <Dropdown.Item onClick = {(e)=>{
            e.preventDefault();
            cinemaList = cinemaList.filter((cinema)=>cinema.CineplexId === cineplex.id);
            setCinemaState(cinemaList);
            console.log(cinemaList);
          }}>
              {cineplex.Name}
          </Dropdown.Item>
        )
      });
      if (loading) {
        return <p>loading..</p>;
      }  
    return (
      <Fragment>
      <div>
        <Dropdown as={ButtonGroup}>
          
          <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
              
          <Dropdown.Menu>
                {dropdownItem}
          </Dropdown.Menu>
        </Dropdown>
        <Button onClick={handleClick}>
        Add
        </Button>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Width</th>
              <th>Height</th>
              <th>Cineplex Id</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>

            {components}
        </tbody>
      </Table>
      </div>
      </Fragment>
    );
  }