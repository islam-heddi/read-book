import NavBar from './NavBar'
function Home(){

    const main = 
    <div>
        <h1>Read A book</h1>
        <p>
            in this web application you will be able to read 
        </p>
    </div>

    return(
    <>
        <NavBar />
        {main}
        <div>
            <h1>Best place for books lovers</h1>
            <p>Welcome to Read Book, your ultimate online destination for book lovers and avid readers alike. Our website is designed to provide a seamless
            and enriching experience for those who seek to discover, read, and share their love for books. Whether you're a fan of timeless classics,
            modern bestsellers, or niche genres, Read Book offers a vast library that caters to every literary taste. With an 
            intuitive interface and a variety of features, our platform is the perfect companion for anyone who enjoys immersing themselves in the
            world of literature.
            </p>
        </div>
    </>)
}

export default Home