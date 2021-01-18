import React from 'react';

const SearchBar = ({keyword,onChange}) => {
  const BarStyling = {width:"20rem", background:"#F2F1F9", border:"none", padding:"0.5rem", justifyContent: "center",  display: "flex",  alignItems: "center", margin: 10};
  return (
    <input 
     style={BarStyling}
     key="random1"
     value={keyword}
     placeholder={"Search Movies 🔎"}
     onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar