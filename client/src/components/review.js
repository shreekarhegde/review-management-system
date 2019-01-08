import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//package to implement star rating
import StarRatingComponent from 'react-star-rating-component';

//rating is set to 1 by default. With out providing a rate, its not possible to add a review.
class Review extends React.Component {
    constructor(props){
        super(props);
        this.state = {      
            addReview: ``,
            showReview: [],
            rating: 1
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    onSubmit(e){
        e.preventDefault();
        let formData = {
            rating: this.state.rating,
            review: e.target[0].value,
            user: this.props.location.state.userInfo._id
        }
        axios.post('http://localhost:3000/reviews', formData).then((res) => {
            this.setState({
                showReview: this.state.showReview.concat(res.data)
            })
        })
    }

    onClick(id){
        axios.delete(`http://localhost:3000/reviews/${id}`).then((res) => {
            this.setState(prevState => ({
                showReview: prevState.showReview.filter(review =>{
                    return review._id !== id
                })
            }))
        })
    }

    componentDidMount(){
        axios.get(`http://localhost:3000/users/${this.props.match.params.id}`).then((res) => {
            console.log(res.data, "data")
            if(res.data){
                this.setState({
                    showReview: res.data.reviews
                })
            } 
        })
    }

    render(){
        const { rating } = this.state;
        return(
            <div>
            <StarRatingComponent 
                name="rate1" 
                starCount={5}
                value={rating}
                onStarClick={this.onStarClick.bind(this)}
            />                    
            <form onSubmit={this.onSubmit}>
                <label> Add a review </label>    <br/>
                    <input type="textarea"/><br/>
                    <input type="submit"/>
                </form>
                {this.state.showReview.map((reviewContent, index) => {
                        return (<div key={index}>
                            <li>{reviewContent.review}
                                <button>
                                    <Link to={{pathname:"/edit", state: {content: reviewContent, userId: this.props.location.state.userInfo._id}}}>  edit  </Link>    
                                </button>
                                <button onClick={this.onClick.bind(this, reviewContent._id)}> Delete </button>
                            </li>
                        </div>)
                    })}
            </div>
        )
    }
}

export default Review;