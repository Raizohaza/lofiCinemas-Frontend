import { useState,useEffect,Fragment } from 'react';
import {Table,Dropdown,ButtonGroup,Button} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link,useHistory } from 'react-router-dom';
import { selectCinema , getCinemaAsync,deleteCinemaAsync} from '../../../features/cinema/cinemaSlice';
import { selectCineplex ,getCineplexAsync} from '../../../features/cineplex/cineplexSlice';

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
              history.push('/admin/cinema');
            }}>Delete</Button>
          </td>
    </tr>
  );
}
);

export function CinemaList() {
  let history = useHistory();
  const dispatch = useDispatch();
  const curCinemaList = useSelector(selectCinema);
  const cineplexList = useSelector(selectCineplex);
  const [loading, setLoading] = useState(true);
  const [cinemaState, setCinemaState] = useState([]);
  
  useEffect(()=>{
    const fetchData = async ()=>{
      dispatch(getCineplexAsync());
      dispatch(getCinemaAsync()); 
    }
    fetchData();
  },[dispatch]);
  
  useEffect(()=>{
    const fetchData = async ()=>{
        console.log(curCinemaList);
        setCinemaState(curCinemaList.length > 1 ? curCinemaList:[]);
        setLoading(false);
    }
    fetchData();
  },[curCinemaList]);
  let components = cinemaState?mapCinemaList(cinemaState):[];


  function handleClick() {
    history.push("/admin/cinema/add");
  }
  let dropdownItem = cineplexList.map((cineplex)=>{
      return(
        <Dropdown.Item key={cineplex.id} onClick = {(e)=>{
          e.preventDefault();
          let tmp = curCinemaList ? curCinemaList.filter((cinema)=>cinema.CineplexId === cineplex.id):[];

          setCinemaState(tmp);
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