import React from 'react';
import axios from 'axios';

class EditReview extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            review: this.props.location.state.content.review,
            rating: this.props.location.state.content.rating,
            redirect: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        e.preventDefault();
        this.setState({
            review: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        let updatedReview = {
            review: this.state.review,
            rating: this.state.rating
        }
        axios.put(`http://localhost:3000/reviews/${this.props.location.state.content._id}`, updatedReview).then((res) => {
            console.log(res, "res");
        })
    }

    render(){
        return(
            <div>
               <input type="textarea" onChange={this.onChange} value={this.state.review}/>
               <button onClick={this.handleSubmit}>submit</button>
            </div>
        )
    }
}

export default EditReview