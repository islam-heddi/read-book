import NavBar from "./NavBar"
function AddBook(props){

    return(
        <>
            <NavBar  auth={props.auth}/>
            <div>
                <h1>Add a book</h1>
                <form>
                    <tbody>
                        <table>
                            <tr>
                                <td>Name of book :</td> 
                                <td>
                                    <input type="text" />
                                </td>   
                            </tr>
                            <tr>
                                <td>
                                    author :    
                                </td>
                                <td>
                                    <input type="text" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Pages :
                                </td>
                                <td>
                                    <input type="number" min="1"/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    select book pdf :
                                </td>
                                <td>
                                    <input type="file" />
                                </td>
                            </tr>
                        </table>
                    </tbody>
                </form>
                
            </div>
        </>
    )
}

export default AddBook