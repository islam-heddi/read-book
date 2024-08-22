import NavBar from "./NavBar"

function ShowBook(props){

    return(
        <>
            <NavBar auth={props.auth}/> 
            <div>
                <h1>View the book</h1>
                <ul>
                    <li>Name : {props.data.name}</li>
                    <li>Author : {props.data.author}</li>
                    <li>pages : {props.data.pages}</li>
                </ul>
                <iframe src={props.data.pathbook} width="100%" height="100px" />
            </div>       
        </>
    )
}

export default ShowBook