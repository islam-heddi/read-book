import NavBar from './NavBar'
function UpdateBook(props){

    return(
    <>
        <NavBar auth={props.auth}/>
        <div>
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                Name :
                            </td>
                            <td>
                                <input type="text" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Author :
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
                                <input type="number" min="1" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Cover picture :
                            </td>
                            <td>
                                <input type="file" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button>Update</button>
                <button type='reset'>Reset</button>
            </form>
        </div>
    </>
    )
}