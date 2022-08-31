import React, {useEffect, useState} from 'react';
import './index.scss';
import Collection from "./components/Collection";

const categories = [
    {"name": "Все"},
    {"name": "Море"},
    {"name": "Горы"},
    {"name": "Архитектура"},
    {"name": "Города"}
];

function App() {
    const[categoryId,setCategoryId]=useState(0)
    const [collection, setCollection] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoading,setIsLoading]=useState(true);
    const [page,setPage]=useState(1)


    const fetchCollection = async (categoryId) => {
        try {
            let category = categoryId ? `category=${categoryId}`: "";
            let response = await fetch(
                `https://630f20c1498924524a8668bf.mockapi.io/photo_collection?page=${page}&limit=3&${category}`);
            let json = await response.json();
            setCollection(json);

        } catch (e) {
            console.log(e.message)
        }finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        setIsLoading(true)
        fetchCollection(categoryId);

    }, [categoryId,page])

    return (
        <div className="App">
            <h1>Моя коллекция фотографий</h1>
            <div className="top">
                <ul className="tags">
                    {categories.map((obj,i) => (
                        <li className={categoryId===i?"active":""}
                            key={obj.name}
                            onClick={()=>setCategoryId(i)}
                        >{obj.name}</li>))
                    }
                </ul>
                <input className="search-input" placeholder="Поиск по названию" value={search}
                       onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <div className="content">
                { isLoading ? (<h2>Loading...Please wait!</h2>)
                    : (collection.filter((obj) => obj.name.toLowerCase().includes(search.toLowerCase()))
                    .map(obj => (
                        <Collection key={obj.id}
                                    name={obj.name}
                                    images={obj.photos}
                        />)))}
            </div>
            <ul className="pagination">
                {
                    [...Array(5)].map((_,i)=><li key={i}
                                                 className={page===i+1?"active":""}
                                                 onClick={()=>setPage(i+1)}
                    >{i+1}</li>)
                }
            </ul>
        </div>
    );
}

export default App;
