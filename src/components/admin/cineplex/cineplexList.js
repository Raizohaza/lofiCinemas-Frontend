import {Table,Button} from 'react-bootstrap'
import { useSelector, useDispatch} from 'react-redux';
import { Link,useHistory } from 'react-router-dom';
import { selectCineplex , getCineplexAsync,deleteCineplexAsync} from '../../../features/cineplex/cineplexSlice';

export function CineplexList() {
    const dispatch = useDispatch();
    const cineplexList = useSelector(selectCineplex);
    //console.log(cineplexList);
    if(cineplexList.length === 0 || cineplexList.length ===1){
      dispatch(getCineplexAsync());
      
    }
    let dem = 1;
  let history = useHistory();

  function handleClick() {
    history.push("/admin/cineplex/add");
  }
    let components = cineplexList.map((cineplex) =>
    {
      return(
        <tr key={cineplex.id}>
          <td>{dem++}</td>
          <td>{cineplex.Name}</td>             
          <td>{cineplex.Address}</td>
          <td>
          <Button>
              <Link to={`/admin/cineplex/${cineplex.id}/edit`}>Edit</Link>
          </Button>
          </td>
          <td>
            <Button onClick={(e)=>{
              e.preventDefault();
              dispatch(deleteCineplexAsync({id:cineplex.id}));
              window.location.reload();
              history.push('/admin/cineplex');
            }}>Delete</Button>
          </td>
        </tr>
      );
    }
    );
    return (
      <div>
        <Button onClick={handleClick}>
        Add
        </Button>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Address</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {components}
          </tbody>
      </Table>
      </div>
      
    );
  }