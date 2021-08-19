import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { selectMovie , getMovieAsync, deleteMovieAsync, reloadMovieList} from '../../../features/movie/movieSlice';
export function MovieList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const moviesList = useSelector(selectMovie);
    const Loading = useSelector((state) => state.movie.isLoading);
    if(moviesList.length <1 ){
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
          {/* <td>{movie.Description}</td> */}
          <td>{movie.Status}</td>
          <td>
            <Button>
              <Link to={`/admin/movie/${movie.id}/edit`}>Edit</Link>
            </Button>
          </td>
          <td>
            <Button onClick={(e)=>{
              e.preventDefault();
              dispatch(deleteMovieAsync({id:movie.id}));
            }}>Delete</Button>
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
              {/* <th>Description</th> */}
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