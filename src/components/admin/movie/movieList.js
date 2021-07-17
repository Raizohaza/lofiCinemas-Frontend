import Table from 'react-bootstrap/Table'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { selectMovie , getMovieAsync, deleteMovieAsync} from '../../../features/movie/movieSlice';
export function MovieList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const moviesList = useSelector(selectMovie);
    console.log(moviesList);
    if(moviesList.length === 0 || moviesList.length ===1){
      dispatch(getMovieAsync());
    }
    let dem = 1;
    let components = moviesList.map((movie) =>
    {
      return(
        <tr key={movie.id}>
          <td>{dem++}</td>
          <td>{movie.Name}</td>
          <td>                
          <img src={movie.Poster}
                alt="..."/></td>
          <td>{movie.ReleaseDate}</td>
          <td>{movie.Duration}</td>
          <td>{movie.Description}</td>
          <td>{movie.Status}</td>
          <td>
            <Link to={`/admin/movie/${movie.id}/edit`}>Edit</Link>
          </td>
          <td>
            <Link onClick={(e)=>{
              e.preventDefault();
              dispatch(deleteMovieAsync({id:movie.id}));
              history.push('/admin/table');
            }}>Delete</Link>
          </td>
        </tr>
      );
    }
    );
    return (
      <div>

        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Poster</th>
              <th>Release Date</th>
              <th>Duration</th>
              <th>Description</th>
              <th>Status</th>
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