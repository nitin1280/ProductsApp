import React, { useState, useEffect } from 'react';
import "./search.css"
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';


const Search = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const API = `https://dummyjson.com/products`;

  useEffect(() => {
    const fetchApiData = async (url) => {
      const headers = {
        projectId: '',
      };
      try {
        const res = await fetch(url, { headers });
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setItems(data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchApiData(API);
  }, []);
   
  const navigate = useNavigate();

  const handleSearch = () => {
    const filtered = items.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleInputChange = (value) => {
    setSearchQuery(value);
    const suggested = items.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase()),
    );
    setSuggestions(suggested);
  };
   const handleClick = (value) =>{
    navigate(`/productsDetails/${value.id}`)
   }

   const handleHome = () =>{
    navigate('/');
   }
  return (
    <div>
        
      {/* <h2>Search</h2> */}
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="search-container">
      <a href=''><img src="https://png.pngtree.com/png-vector/20210206/ourmid/pngtree-hottest-product-png-image_2890048.jpg" alt="" className="lmg" onClick={handleHome}/></a>
        <input
          type="text" id='search-input'
          value={searchQuery}
          placeholder='Search Products'
          onChange={(e) => handleInputChange(e.target.value)}
        />
      
      </div>
      <br/>
      <div className="suggestions">
        {suggestions.map((suggestion, index) => (
          <>
          
          <div className="suggestion-card" key={index} onClick={()=>handleClick(suggestion)}>
            <img src={suggestion.thumbnail} alt={suggestion.title} />
            <span>Title: {suggestion.title}</span> <br/>
            <span>Rating: {suggestion.category}</span>  <br/>
            <span>Price: {suggestion.price}</span>  <br/>
            <span>Rating: {suggestion.rating}</span>  <br/>
            
            <button className="button">ADD To Cart</button>
          </div>
          
          </>
        ))}
      </div>
      

      <div className="container7">
        {searchResults.length > 0 ? (
          searchResults.map((card, index) => (
            <div className="card" key={index}>
              <img src={card.thumbnail} alt={card.title} className='img5'/>
              <p>Title: {card.category}</p>
              <p>Category: {card.rating}</p>
              <p>Brand: {card.brand}</p>
            <p>Rating(/5): {card.rating}</p>
             
              <button className="button">ADD To Cart</button>
            </div>
          ))
        ) : (
          items.map((card, index) => (
            <>
         
            <div className="card8" key={index} onClick={()=>handleClick(card)}>
              <img src={card.thumbnail} alt={card.title} className='img5'/>
              <p>Title: {card.title}</p>
              <p>Category: {card.category}</p>
              <p>Brand: {card.brand}</p>
              <p>Rating(/5): {card.rating}</p>
              
              <button className="button">Add To Cart</button>
            </div>
           
            </>
          ))
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Search;
