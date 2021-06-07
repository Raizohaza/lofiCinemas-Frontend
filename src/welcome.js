import React from 'react';

class welcome extends React.Component{

   logout(){
       this.props.history.push('/logout' )
   }
    render(){
        const {username} = this.props.match.params;
        console.log(username);
        return(
            <div>
              <p>Hello {username}</p>
              <button onClick={this.logout.bind(this)}>Logout</button>
            </div>
        )
    }
}
export default welcome;